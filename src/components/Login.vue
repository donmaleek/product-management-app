<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-2 sm:px-4 md:px-6 py-4">

    <div class="flex flex-col items-center mb-4 sm:mb-6">
      <img 
        src="@/assets/logo.png" 
        alt="Your App Logo" 
        class="mx-auto h-16 sm:h-20 w-auto" 
      />
    </div>

    <div
      class="w-full max-w-full sm:max-w-sm bg-white px-3 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6 rounded-xl shadow-lg text-center overflow-hidden"
    >
      <div class="mb-4 sm:mb-6">
        <h2 class="text-lg sm:text-2xl font-semibold text-blue-900 mb-1">
          Welcome Back
        </h2>
        <p class="text-xs sm:text-sm text-gray-500">
          Sign in to manage your products.
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-3 sm:space-y-5 text-left">

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
            <span
              @click="isPasswordVisible = !isPasswordVisible"
              class="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 text-gray-400 cursor-pointer text-xs sm:text-sm"
              :title="isPasswordVisible ? 'Hide password' : 'Show password'"
            >
              {{ isPasswordVisible ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-1 sm:space-y-0">
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
          <router-link to="/forgot-password" class="text-blue-900 font-medium hover:underline text-center sm:text-left text-xs sm:text-sm">
            Forgot Password?
          </router-link>
        </div>

        <div v-if="error" class="text-red-600 text-xs sm:text-sm text-center">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center items-center gap-2 py-2 px-2 sm:py-3 sm:px-4
                 text-xs sm:text-sm font-semibold rounded-lg text-white
                 bg-blue-900 hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            v-if="loading"
            class="animate-spin h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent rounded-full"
          ></span>
          <span v-else>Login</span>
        </button>

      </form>
    </div>

    <div class="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
      <p>&copy; 2025 Platform Inc. All Rights Reserved</p>
    </div>
  </div>
</template>

<script setup>
/**
 * VUE 3 COMPOSITION API SCRIPT
 * * @author Eng. Mathias Alfred Kasiba
 * @description Login component logic including authentication handling,
 * form state management, and user interaction features.
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Store and Router initialization
const authStore = useAuthStore()
const router = useRouter()

/**
 * AUTHENTICATION CREDENTIALS STATE
 * * @typedef {Object} Credentials
 * @property {string} username - User's email or username
 * @property {string} password - User's password
 */
const credentials = ref({ username: '', password: '' })

/**
 * COMPONENT STATE MANAGEMENT
 * * @type {import('vue').Ref<boolean>} loading - Authentication process state
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
 * * @description
 * - Validates and submits user credentials
 * - Manages loading states during authentication
 * - Handles success and error responses
 * - Navigates to products page on successful login
 * * @example
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
 * * @description
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