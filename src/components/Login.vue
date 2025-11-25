<!--
/**
 * LOGIN COMPONENT
 * 
 * @component LoginView
 * @author Eng. Mathias Alfred Kasiba
 * @description Authentication login interface with username/email and password
 *              input. Features password visibility toggle, remember me option,
 *              and responsive design for all device sizes.
 * 
 * @version 1.0
 * @created 2024
 * 
 * FEATURES:
 * - Responsive login form design
 * - Password visibility toggle
 * - Remember me functionality
 * - Form validation and error handling
 * - Loading states during authentication
 * - Forgot password navigation
 * 
 * DEPENDENCIES:
 * - Vue 3 Composition API
 * - Vue Router for navigation
 * - Pinia Auth Store for state management
 * - Tailwind CSS for responsive styling
 */
-->

<template>
  <!-- Main container with responsive background and centered layout -->
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-2 sm:px-4 md:px-6 py-4">

    <!-- 
      PLATFORM LOGO SECTION
      - Brand identity display
      - Responsive sizing for different screen sizes
    -->
    <div class="flex flex-col items-center mb-4 sm:mb-6">
      <div class="flex items-center space-x-1 sm:space-x-2 text-lg sm:text-xl font-semibold text-blue-800">
        <span class="text-xl sm:text-2xl text-blue-900">&#x1F4BE;</span>
        <span class="text-sm sm:text-base font-semibold">Platform Logo</span>
      </div>
    </div>

    <!-- 
      LOGIN CARD CONTAINER
      - Responsive width constraints
      - Card styling with shadow and rounded corners
      - Mobile-first padding approach
    -->
    <div
      class="w-full max-w-full sm:max-w-sm bg-white px-3 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 rounded-xl shadow-lg text-center overflow-hidden"
    >
      <!-- 
        CARD HEADER SECTION
        - Welcome message and instructions
        - Responsive typography scaling
      -->
      <div class="mb-4 sm:mb-6">
        <h2 class="text-lg sm:text-2xl font-semibold text-blue-900 mb-1">
          Welcome Back
        </h2>
        <p class="text-xs sm:text-sm text-gray-500">
          Sign in to manage your products.
        </p>
      </div>

      <!-- 
        LOGIN FORM
        - Form submission handling
        - Responsive spacing between form elements
      -->
      <form @submit.prevent="handleLogin" class="space-y-3 sm:space-y-5 text-left">

        <!-- 
          USERNAME/EMAIL INPUT FIELD
          - Accepts both email and username
          - Required field validation
          - Focus state styling
        -->
        <div>
          <label for="username" class="block text-xs sm:text-sm font-medium mb-1 text-blue-900">
            Email or Username
          </label>
          <input
            id="username"
            v-model="credentials.username"
            type="text"
            required
            placeholder="Email or Username"
            class="block w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                  focus:ring-blue-600 focus:border-blue-600 text-xs sm:text-sm"
          />
        </div>

        <!-- 
          PASSWORD INPUT FIELD
          - Password visibility toggle
          - Required field validation
          - Secure input handling
        -->
        <div>
          <label for="password" class="block text-xs sm:text-sm font-medium mb-1 text-blue-900">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="credentials.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              required
              placeholder="Enter your password"
              class="block w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                     focus:ring-blue-600 focus:border-blue-600 text-xs sm:text-sm pr-8 sm:pr-10"
            />
            <!-- 
              PASSWORD VISIBILITY TOGGLE
              - Toggles between text and password type
              - Emoji-based visual indicators
              - Accessible title attributes
            -->
            <span
              @click="isPasswordVisible = !isPasswordVisible"
              class="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 text-gray-400 cursor-pointer text-xs sm:text-sm"
              :title="isPasswordVisible ? 'Hide password' : 'Show password'"
            >
              {{ isPasswordVisible ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <!-- 
          REMEMBER ME AND FORGOT PASSWORD SECTION
          - Responsive flex layout
          - Checkbox for persistent login
          - Navigation link for password recovery
        -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-1 sm:space-y-0">
          <!-- Remember Me Checkbox -->
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="remember-me" class="ml-1 sm:ml-2 block text-gray-500 text-xs sm:text-sm">
              Remember me
            </label>
          </div>
          <!-- Forgot Password Link -->
          <a :href="router.resolve('/forgot-password').href" class="text-blue-900 font-medium hover:underline text-center sm:text-left text-xs sm:text-sm">
            Forgot Password?
          </a>
        </div>

        <!-- 
          ERROR MESSAGE DISPLAY
          - Shows authentication errors
          - Responsive text sizing
          - Centered alignment
        -->
        <div v-if="error" class="text-red-600 text-xs sm:text-sm text-center">
          {{ error }}
        </div>

        <!-- 
          LOGIN SUBMIT BUTTON
          - Loading state with spinner
          - Disabled state during authentication
          - Hover and focus states
        -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center items-center gap-2 py-2 px-2 sm:py-3 sm:px-4
                 text-xs sm:text-sm font-semibold rounded-lg text-white
                 bg-blue-900 hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <!-- Loading Spinner -->
          <span
            v-if="loading"
            class="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent rounded-full"
          ></span>
          <span v-else>Login</span>
        </button>

      </form>
    </div>

    <!-- 
      FOOTER SECTION
      - Copyright information
      - Responsive text sizing
      - Centered alignment
    -->
    <div class="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
      <p>&copy; 2025 Platform Inc. All Rights Reserved</p>
    </div>
  </div>
</template>

<script setup>
/**
 * VUE 3 COMPOSITION API SCRIPT
 * 
 * @author Eng. Mathias Alfred Kasiba
 * @description Login component logic including authentication handling,
 *              form state management, and user interaction features.
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Store and Router initialization
const authStore = useAuthStore()
const router = useRouter()

/**
 * AUTHENTICATION CREDENTIALS STATE
 * 
 * @typedef {Object} Credentials
 * @property {string} username - User's email or username
 * @property {string} password - User's password
 */
const credentials = ref({ username: '', password: '' })

/**
 * COMPONENT STATE MANAGEMENT
 * 
 * @type {import('vue').Ref<boolean>} loading - Authentication process state
 * @type {import('vue').Ref<string>} error - Authentication error message
 * @type {import('vue').Ref<boolean>} isPasswordVisible - Password field visibility state
 */
const loading = ref(false)
const error = ref('')
const isPasswordVisible = ref(false)

/**
 * Handles login form submission
 * @async
 * @function handleLogin
 * @returns {Promise<void>}
 * 
 * @description
 * - Validates and submits user credentials
 * - Manages loading states during authentication
 * - Handles success and error responses
 * - Navigates to products page on successful login
 * 
 * @example
 * // Successful login flow:
 * // 1. User enters credentials
 * // 2. handleLogin() called on form submit
 * // 3. Loading state activated
 * // 4. Auth store processes login
 * // 5. On success: redirect to /products
 * // 6. On failure: display error message
 */
const handleLogin = async () => {
  // Reset previous errors and activate loading state
  loading.value = true
  error.value = ''

  try {
    // Attempt authentication via auth store
    const result = await authStore.login(credentials.value)

    if (result.success) {
      // Successful login - redirect to products dashboard
      router.push('/products')
    } else {
      // Authentication failed - display error message
      error.value = result.error
    }
  } catch (err) {
    // Handle unexpected errors during authentication
    error.value = 'An unexpected error occurred. Please try again.'
    console.error('Login error:', err)
  } finally {
    // Always disable loading state regardless of outcome
    loading.value = false
  }
}
</script>

<style scoped>
/**
 * COMPONENT-SCOPED STYLES
 * 
 * @description
 * Additional component-specific styles beyond Tailwind CSS.
 * Currently using utility-first approach with Tailwind.
 */

/* Custom focus styles for better accessibility */
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Smooth transitions for interactive elements */
input, button {
  transition: all 0.2s ease-in-out;
}

/* Custom animation for loading spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>