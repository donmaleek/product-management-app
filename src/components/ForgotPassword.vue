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
          Reset Password
        </h2>
        <p class="text-xs sm:text-sm text-gray-500">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form @submit.prevent="handleReset" class="space-y-3 sm:space-y-5 text-left">

        <div>
          <label for="email" class="block text-xs sm:text-sm font-medium mb-1 text-blue-900">
            Email Address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="your.email@example.com"
            class="block w-full px-2 sm:px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                  focus:ring-blue-600 focus:border-blue-600 text-xs sm:text-sm"
          />
        </div>

        <div v-if="message" :class="message.type === 'success' ? 'text-green-600' : 'text-red-600'" class="text-xs sm:text-sm text-center">
          {{ message.text }}
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
          <span v-else>Send Reset Link</span>
        </button>
      </form>
      
      <router-link to="/login" class="block mt-4 text-blue-900 font-medium hover:underline text-xs sm:text-sm">
        &#x2190; Back to Login
      </router-link>
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
 * @description Password reset component logic including email validation,
 * API simulation, and user feedback management.
 */

import { ref } from 'vue'

/**
 * COMPONENT STATE MANAGEMENT
 * * @type {import('vue').Ref<string>} email - User's email address for password reset
 * @type {import('vue').Ref<boolean>} loading - API call loading state
 * @type {import('vue').Ref<Object|null>} message - Success/error message object
 * @property {string} message.type - Message type: 'success' or 'error'
 * @property {string} message.text - Message content to display
 */
const email = ref('')
const loading = ref(false)
const message = ref(null)

/**
 * Handles password reset form submission
 * @async
 * @function handleReset
 * @returns {Promise<void>}
 * * @description
 * - Validates email format and submits reset request
 * - Simulates API call with timeout
 * - Provides user feedback based on result
 * - Handles loading states during the process
 * * @example
 * // Successful reset flow:
 * // 1. User enters valid email address
 * // 2. handleReset() called on form submit
 * // 3. Loading state activated (1.5 second simulation)
 * // 4. Success message displayed with email confirmation
 * * @example
 * // Failed reset flow:
 * // 1. User enters invalid email (missing @ symbol)
 * // 2. handleReset() called on form submit
 * // 3. Loading state activated
 * // 4. Error message displayed about account not found
 */
const handleReset = async () => {
  // Activate loading state and clear previous messages
  loading.value = true
  message.value = null

  try {
    // Simulate API call to password reset service
    // In production, this would be: await authService.requestPasswordReset(email.value)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Basic email validation (in production, this would be server-side validation)
    if (email.value.includes('@')) {
      // Success case - reset link sent
      message.value = {
        type: 'success',
        text: `Password reset link sent to ${email.value}. Check your inbox!`
      }
      
      // Optional: Clear email field after successful submission
      // email.value = ''
    } else {
      // Error case - invalid email format
      message.value = {
        type: 'error',
        text: 'Could not find an account with that email.'
      }
    }
  } catch (error) {
    // Handle unexpected errors during the reset process
    message.value = {
      type: 'error',
      text: 'An error occurred while processing your request. Please try again.'
    }
    console.error('Password reset error:', error)
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
input, button, a {
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

/* Enhanced hover effects for navigation link */
a:hover {
  transform: translateX(-2px);
}
</style>