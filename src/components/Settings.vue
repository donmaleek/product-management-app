<!--
 * Settings Component
 * 
 * @component Settings
 * @author Eng. Mathias Alfred Kasiba
 * @description Application settings page
 * @version 1.0
-->

<template>
  <div class="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
    
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-500 mt-1">Manage your application preferences and configurations.</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      
      <!-- General Settings -->
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">General Settings</h2>
        
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
              <p class="text-sm text-gray-500">Receive email updates about your account activity.</p>
            </div>
            <button class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
                    :class="emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'"
                    @click="emailNotifications = !emailNotifications">
              <span class="sr-only">Use setting</span>
              <span aria-hidden="true" 
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" 
                    :class="emailNotifications ? 'translate-x-5' : 'translate-x-0'"></span>
            </button>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-900">SMS Notifications</h3>
              <p class="text-sm text-gray-500">Receive SMS alerts for important updates.</p>
            </div>
            <button class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
                    :class="smsNotifications ? 'bg-indigo-600' : 'bg-gray-200'"
                    @click="smsNotifications = !smsNotifications">
              <span class="sr-only">Use setting</span>
              <span aria-hidden="true" 
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" 
                    :class="smsNotifications ? 'translate-x-5' : 'translate-x-0'"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Account Settings -->
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
        
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              id="name"
              v-model="user.name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              id="email"
              v-model="user.email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              id="phone"
              v-model="user.phone"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Preferences -->
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
        
        <div class="space-y-4">
          <div>
            <label for="language" class="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              id="language"
              v-model="preferences.language"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label for="timezone" class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              id="timezone"
              v-model="preferences.timezone"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="est">Eastern Time (EST)</option>
              <option value="cst">Central Time (CST)</option>
              <option value="mst">Mountain Time (MST)</option>
              <option value="pst">Pacific Time (PST)</option>
            </select>
          </div>

          <div>
            <label for="currency" class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              id="currency"
              v-model="preferences.currency"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
              <option value="jpy">JPY (¥)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="p-6">
        <div class="flex justify-end space-x-4">
          <button class="px-6 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors border border-gray-300">
            Cancel
          </button>
          <button 
            @click="saveSettings"
            class="px-6 py-2 rounded-lg text-white font-medium shadow-md transition-colors bg-indigo-900 hover:bg-indigo-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * Notification settings
 */
const emailNotifications = ref(true)
const smsNotifications = ref(false)

/**
 * User profile data
 */
const user = ref({
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+1 (555) 123-4567'
})

/**
 * User preferences
 */
const preferences = ref({
  language: 'en',
  timezone: 'est',
  currency: 'usd'
})

/**
 * Saves the current settings
 */
const saveSettings = () => {
  console.log('Saving settings:', {
    emailNotifications: emailNotifications.value,
    smsNotifications: smsNotifications.value,
    user: user.value,
    preferences: preferences.value
  })
  
  // Simulate API call
  setTimeout(() => {
    alert('Settings saved successfully!')
  }, 1000)
}
</script>

<style scoped>
/* Component-specific styles */
</style>