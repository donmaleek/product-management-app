<!--
/**
 * SIDEBAR NAVIGATION COMPONENT
 * 
 * @component AppSidebar
 * @author Eng. Mathias Alfred Kasiba
 * @description Main navigation sidebar for the admin panel with responsive
 *              mobile behavior, route navigation, and user actions.
 *              Features collapsible mobile menu and active route highlighting.
 * 
 * @version 1.0
 * @created 2024
 * 
 * FEATURES:
 * - Responsive mobile-first sidebar
 * - Hamburger menu toggle for mobile
 * - Active route highlighting
 * - Smooth transitions and animations
 * - Logout functionality
 * - Navigation menu with icons
 * 
 * DEPENDENCIES:
 * - Vue 3 Composition API
 * - Vue Router for navigation
 * - Pinia Auth Store for logout
 * - Tailwind CSS for responsive styling
 */
-->

<template>
  <div>
    <!-- 
      MOBILE MENU TOGGLE BUTTON
      - Only visible on mobile screens (lg:hidden)
      - Fixed positioning for accessibility
      - Toggles sidebar visibility
    -->
    <button 
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-gray-600 shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#172A5A]"
    >
      <!-- Hamburger Menu Icon (when sidebar closed) -->
      <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <!-- Close Icon (when sidebar open) -->
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- 
      MOBILE OVERLAY BACKDROP
      - Semi-transparent overlay when sidebar is open on mobile
      - Clicking overlay closes sidebar
      - Only visible on mobile breakpoints
    -->
    <div 
      v-if="isSidebarOpen" 
      @click="closeSidebar"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
    ></div>

    <!-- 
      MAIN SIDEBAR CONTAINER
      - Fixed positioning for persistent navigation
      - Responsive transform transitions
      - Z-index for proper layering
    -->
    <aside 
      class="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 z-50 font-sans transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      
      <!-- 
        SIDEBAR HEADER / BRANDING
        - Logo and application title
        - Admin panel badge
      -->
      <div class="px-8 py-8 flex items-center gap-4">
        <!-- Logo Container -->
        <div class="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white shrink-0 shadow-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <!-- Application Title -->
        <div class="flex flex-col">
          <h1 class="font-bold text-gray-900 text-lg leading-none mb-1">E-Commerce</h1>
          <span class="text-xs text-blue-500 font-medium tracking-wide">Admin Panel</span>
        </div>
      </div>

      <!-- 
        MAIN NAVIGATION MENU
        - Scrollable navigation area
        - Route links with active states
        - Hover effects and transitions
      -->
      <nav class="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        
        <!-- Dashboard Navigation Link -->
        <router-link 
          to="/dashboard" 
          @click="closeSidebar" 
          class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
        >
          <svg class="w-5 h-5 mr-3 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
          <span class="font-medium">Dashboard</span>
        </router-link>

        <!-- Products Navigation Link with Active State -->
        <router-link 
          to="/products" 
          @click="closeSidebar"
          class="flex items-center px-4 py-3 rounded-lg font-medium transition-colors"
          :class="$route.path.includes('/products') ? 'bg-indigo-50 text-[#172A5A]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <span>Products</span>
        </router-link>

        <!-- Orders Navigation Link -->
        <router-link 
          to="/orders" 
          @click="closeSidebar" 
          class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
        >
          <svg class="w-5 h-5 mr-3 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span class="font-medium">Orders</span>
        </router-link>

        <!-- Customers Navigation Link -->
        <router-link 
          to="/customers" 
          @click="closeSidebar" 
          class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
        >
          <svg class="w-5 h-5 mr-3 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <span class="font-medium">Customers</span>
        </router-link>
      </nav>

      <!-- 
        SIDEBAR FOOTER SECTION
        - Settings navigation
        - Logout action button
      -->
      <div class="p-4 mb-4 space-y-4">
        
        <!-- Settings Navigation Link -->
        <router-link 
          to="/settings" 
          @click="closeSidebar" 
          class="flex items-center px-4 py-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="font-medium text-sm">Settings</span>
        </router-link>

        <!-- Logout Action Button -->
        <button 
          @click="handleLogout"
          class="w-full flex items-center justify-center px-4 py-3 bg-[#000080] hover:bg-blue-900 text-white rounded-xl font-semibold shadow-md transition-all active:scale-95"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </div>

    </aside>
  </div>
</template>

<script setup>
/**
 * VUE 3 COMPOSITION API SCRIPT
 * 
 * @author Eng. Mathias Alfred Kasiba
 * @description Sidebar component logic including mobile responsiveness,
 *              navigation handling, and user authentication actions.
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Router and Store initialization
const router = useRouter()
const authStore = useAuthStore()

/**
 * COMPONENT STATE MANAGEMENT
 * 
 * @type {import('vue').Ref<boolean>} isSidebarOpen - Controls sidebar visibility on mobile
 */
const isSidebarOpen = ref(false)

/**
 * Toggles sidebar visibility state
 * @function toggleSidebar
 * 
 * @description
 * Switches between open and closed states for mobile sidebar
 * Used by hamburger menu button
 */
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

/**
 * Closes sidebar on mobile devices
 * @function closeSidebar
 * 
 * @description
 * - Closes sidebar when navigation links are clicked on mobile
 * - Only affects mobile breakpoints (width < 1024px)
 * - Desktop sidebar remains always visible
 */
const closeSidebar = () => {
  if (window.innerWidth < 1024) { // Mobile breakpoint check
    isSidebarOpen.value = false
  }
}

/**
 * Handles user logout process
 * @async
 * @function handleLogout
 * @returns {Promise<void>}
 * 
 * @description
 * - Calls auth store logout method
 * - Redirects to login page on success
 * - Handles potential logout errors
 * 
 * @example
 * // Logout flow:
 * // 1. User clicks logout button
 * // 2. handleLogout() called
 * // 3. Auth store clears user session
 * // 4. Redirect to login page
 * // 5. Error handling if logout fails
 */
const handleLogout = async () => {
  try {
    // Call auth store to clear user session and tokens
    await authStore.logout()
    
    // Redirect to login page after successful logout
    router.push('/')
  } catch (error) {
    // Log error for debugging, could show user notification in production
    console.error('Logout failed:', error)
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

/* Custom scrollbar for navigation menu */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 20px;
}

/* Enhanced hover effects for navigation items */
.router-link-active:not([class*="bg-indigo-50"]) {
  @apply text-gray-900 bg-gray-50;
}

/* Smooth transitions for all interactive elements */
button, .router-link {
  transition: all 0.2s ease-in-out;
}

/* Focus styles for accessibility */
button:focus, .router-link:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(23, 42, 90, 0.1);
}
</style>