/**
 * AUTHENTICATION STORE (Pinia)
 * 
 * @file stores/auth.js
 * @author Eng. Mathias Alfred Kasiba
 * @description Centralized authentication state management using Pinia.
 *              Handles user login, logout, session persistence, and
 *              authentication state across the application.
 * 
 * @version 1.0
 * @created 2024
 * 
 * FEATURES:
 * - User authentication state management
 * - JWT token storage and validation
 * - Local storage persistence for session recovery
 * - Mock authentication for development/testing
 * - Real API integration for production
 * - Computed authentication status
 * 
 * DEPENDENCIES:
 * - Pinia for state management
 * - Axios for HTTP requests
 * - Vue 3 Composition API
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

/**
 * AUTHENTICATION STORE DEFINITION
 * 
 * @function useAuthStore
 * @description Pinia store for managing authentication state and operations
 * 
 * Store Structure:
 * - State: token, user information
 * - Getters: computed authentication status
 * - Actions: login, logout, session restoration
 */
export const useAuthStore = defineStore('auth', () => {
  // =============================================
  // REACTIVE STATE DEFINITIONS
  // =============================================

  /**
   * Authentication Token State
   * 
   * @type {import('vue').Ref<string>}
   * @description
   * - Stores JWT token for authenticated requests
   * - Persisted in localStorage for session recovery
   * - Empty string indicates no active session
   */
  const token = ref(localStorage.getItem('auth_token') || '')

  /**
   * User Information State
   * 
   * @type {import('vue').Ref<Object|null>}
   * @description
   * - Stores authenticated user data
   * - Persisted in localStorage for session recovery
   * - Null indicates no authenticated user
   */
  const user = ref(JSON.parse(localStorage.getItem('user_info') || 'null'))

  // =============================================
  // COMPUTED PROPERTIES (GETTERS)
  // =============================================

  /**
   * Authentication Status Checker
   * 
   * @type {import('vue').ComputedRef<boolean>}
   * @description
   * - Returns true if user has valid authentication token
   * - Used throughout app for route guards and conditional rendering
   * - Automatically updates when token state changes
   * 
   * @example
   * // Usage in components:
   * const authStore = useAuthStore()
   * if (authStore.isAuthenticated) {
   *   // User is logged in
   * }
   */
  const isAuthenticated = computed(() => !!token.value)

  // =============================================
  // ACTIONS (STORE METHODS)
  // =============================================

  /**
   * User Authentication Handler
   * 
   * @async
   * @function login
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.username - User's username or email
   * @param {string} credentials.password - User's password
   * @returns {Promise<{success: boolean, error?: string}>}
   * 
   * @description
   * Handles user authentication with dual-mode support:
   * 1. Mock authentication for development/testing with specific credentials
   * 2. Real API authentication for production/other users
   * 
   * Authentication Flow:
   * 1. Check for mock credentials (development mode)
   * 2. If mock match, return success with mock token
   * 3. Otherwise, make real API call to authentication endpoint
   * 4. Store token and user data on successful authentication
   * 5. Return appropriate success/error response
   * 
   * @example
   * // Successful login:
   * const result = await authStore.login({ username: 'user', password: 'pass' })
   * if (result.success) {
   *   // Redirect to dashboard
   * } else {
   *   // Show error message
   * }
   */
  const login = async (credentials) => {
    // =============================================
    // MOCK AUTHENTICATION (Development/Testing)
    // =============================================
    
    /**
     * Development Credentials Configuration
     * @constant
     * @description
     * Pre-defined credentials for local development and testing
     * Bypasses API calls for faster development iteration
     */
    const MOCK_USERNAME = 'mathayo77'
    const MOCK_PASSWORD = 'mathayo77'
    
    if (credentials.username === MOCK_USERNAME && credentials.password === MOCK_PASSWORD) {
      console.log('Auth Store: Using mock authentication for development')
      
      // Set mock authentication data
      token.value = 'mock-token-123'
      user.value = { username: credentials.username }
      
      // Persist to localStorage for session recovery
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user_info', JSON.stringify(user.value))
      
      return { success: true }
    }

    // =============================================
    // REAL API AUTHENTICATION (Production)
    // =============================================
    
    try {
      /**
       * API Authentication Request
       * @description
       * Makes actual HTTP request to authentication endpoint
       * Uses dummyjson.com as example authentication service
       */
      const response = await axios.post('https://dummyjson.com/auth/login', credentials)
      
      // Validate successful authentication response
      if (response.data.token) {
        // Update store state with authenticated user data
        token.value = response.data.token
        user.value = response.data
        
        // Persist authentication data to localStorage
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user_info', JSON.stringify(response.data))
        
        console.log('Auth Store: User authenticated successfully via API')
        return { success: true }
      } else {
        // Handle unexpected API response (no token provided)
        console.error('Auth Store: API response missing authentication token')
        return { 
          success: false, 
          error: 'Authentication failed: Invalid server response' 
        }
      }
    } catch (error) {
      /**
       * Authentication Error Handling
       * @description
       * Handles various authentication failure scenarios:
       * - Invalid credentials (401)
       * - Network errors
       * - Server errors (5xx)
       * - Unexpected API responses
       */
      console.error('Auth Store: Authentication API error:', error)
      
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      }
    }
  }

  /**
   * User Logout Handler
   * 
   * @function logout
   * @description
   * Clears user authentication state and removes persisted data
   * Should be called when user explicitly logs out or session expires
   * 
   * Logout Process:
   * 1. Clear reactive state (token and user)
   * 2. Remove persisted data from localStorage
   * 3. (Optional) Invalidate token on server side
   * 
   * @example
   * // Usage in components:
   * const handleLogout = () => {
   *   authStore.logout()
   *   router.push('/login')
   * }
   */
  const logout = () => {
    console.log('Auth Store: Logging out user')
    
    // Clear reactive state
    token.value = ''
    user.value = null
    
    // Remove persisted data from localStorage
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
    
    // Optional: Add server-side token invalidation here
    // await axios.post('/api/auth/logout')
  }

  /**
   * Session Restoration Handler
   * 
   * @function restoreSession
   * @description
   * Attempts to restore user session from persisted storage (localStorage)
   * Called during application initialization to maintain login state
   * across page refreshes and browser sessions
   * 
   * Restoration Process:
   * 1. Check for existing token in localStorage
   * 2. If token exists, restore state from localStorage
   * 3. (Optional) Validate token with server for extra security
   * 
   * @example
   * // Usage in main.js/app.js:
   * const authStore = useAuthStore()
   * authStore.restoreSession()
   */
  const restoreSession = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user_info')
    
    if (savedToken) {
      console.log('Auth Store: Restoring user session from localStorage')
      
      // Restore state from persisted storage
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      
      // Optional: Add token validation with server here
      // This ensures the token hasn't been revoked or expired
    } else {
      console.log('Auth Store: No saved session found in localStorage')
    }
  }

  // =============================================
  // STORE PUBLIC INTERFACE
  // =============================================

  /**
   * Store Public API
   * 
   * @description
   * Exposes state, getters, and actions to the rest of the application
   * All returned values are reactive and can be used in Vue components
   */
  return {
    // State
    token,
    user,
    
    // Getters
    isAuthenticated,
    
    // Actions
    login,
    logout,
    restoreSession
  }
})

/**
 * STORE USAGE EXAMPLES
 * 
 * @example
 * // Component usage:
 * import { useAuthStore } from '@/stores/auth'
 * 
 * const authStore = useAuthStore()
 * 
 * // Check authentication status
 * if (authStore.isAuthenticated) {
 *   console.log('User is logged in:', authStore.user)
 * }
 * 
 * // Perform login
 * const result = await authStore.login({
 *   username: 'user@example.com',
 *   password: 'password123'
 * })
 * 
 * // Perform logout
 * authStore.logout()
 * 
 * @example
 * // Route guard usage (in router):
 * router.beforeEach((to, from, next) => {
 *   const authStore = useAuthStore()
 *   
 *   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
 *     next('/login')
 *   } else {
 *     next()
 *   }
 * })
 */