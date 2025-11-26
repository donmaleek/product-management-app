<template>
  <div class="flex h-screen bg-gray-100">

    <button
      v-if="!$route.meta.hideSidebar"
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-gray-600 shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#172A5A]"
    >
      <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>

    <div
      v-if="isSidebarOpen && !$route.meta.hideSidebar && isMobile"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
    ></div>

    <aside
      v-if="!$route.meta.hideSidebar"
      class="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 z-50 font-sans transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >

      <div class="px-8 py-8 flex items-center gap-4">
        <div class="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white shrink-0 shadow-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        </div>
        <div class="flex flex-col">
          <h1 class="font-bold text-gray-900 text-lg leading-none mb-1">E-Commerce</h1>
          <span class="text-xs text-blue-500 font-medium tracking-wide">Admin Panel</span>
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">

        <router-link
          to="/app/dashboard"
          @click="closeSidebar"
          class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
          :class="{ 'bg-indigo-50 text-[#172A5A]': $route.path.includes('/app/dashboard') }"
        >
          <svg class="w-5 h-5 mr-3 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          <span class="font-medium">Dashboard</span>
        </router-link>

        <router-link
          to="/app/products"
          @click="closeSidebar"
          class="flex items-center px-4 py-3 rounded-lg font-medium transition-colors"
          :class="$route.path.includes('/app/products') ? 'bg-indigo-50 text-[#172A5A]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          <span>Products</span>
        </router-link>

        <router-link
          to="/app/orders"
          @click="closeSidebar"
          class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
        >
          <svg class="w-5 h-5 mr-3 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span class="font-medium">Orders</span>
        </router-link>

        <router-link
          to="/app/customers"
          @click="closeSidebar"
          class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group"
        >
          <svg class="w-5 h-5 mr-3 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <span class="font-medium">Customers</span>
        </router-link>
      </nav>

      <div class="p-4 mb-4 space-y-4">

        <router-link
          to="/app/settings"
          @click="closeSidebar"
          class="flex items-center px-4 py-2 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="font-medium text-sm">Settings</span>
        </router-link>

        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center px-4 py-3 bg-[#000080] hover:bg-blue-900 text-white rounded-xl font-semibold shadow-md transition-all active:scale-95"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>

    </aside>

    <div
      class="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
      :class="{
        'lg:ml-64': isSidebarOpen && !$route.meta.hideSidebar, // Desktop: margin if sidebar is open AND not hidden by meta
        'lg:ml-0': (!isSidebarOpen || $route.meta.hideSidebar) && !isMobile, // Desktop: no margin if sidebar closed OR hidden by meta
        'ml-0': true // Mobile: always no margin (sidebar is overlay)
      }"
    >
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <router-view />
      </main>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Ensure this path is correct based on your project structure

// Router and Store initialization
const router = useRouter()
const route = useRoute() // To access route meta

const authStore = useAuthStore()

/**
 * COMPONENT STATE MANAGEMENT
 */
// isSidebarOpen starts open on desktop, closed on mobile by default
const isSidebarOpen = ref(window.innerWidth >= 1024);
const isMobile = ref(window.innerWidth < 1024);

/**
 * Toggles sidebar visibility state for mobile devices
 * @function toggleSidebar
 */
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

/**
 * Closes sidebar, primarily used for mobile devices after navigation or overlay click
 * @function closeSidebar
 */
const closeSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = false
  }
}

/**
 * Handles user logout process
 * @async
 * @function handleLogout
 */
const handleLogout = async () => {
  try {
    await authStore.logout()
    // The auth store's logout action should typically handle redirection to login
    // If not, you might add router.push('/login') here.
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// Handle window resize events for responsiveness
const handleResize = () => {
  const newIsMobile = window.innerWidth < 1024;
  if (isMobile.value !== newIsMobile) {
    isMobile.value = newIsMobile;
    // When switching to desktop view, ensure sidebar is open by default
    // When switching to mobile view, ensure sidebar is closed by default
    if (!isMobile.value) {
      isSidebarOpen.value = true;
    } else {
      isSidebarOpen.value = false;
    }
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Watch for route changes to close sidebar on mobile if navigating
// This improves UX by automatically closing the sidebar after a link is clicked
router.afterEach(() => {
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
});
</script>

<style scoped>
/* Custom scrollbar styling for the navigation area */
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

/* Base styles for router links, specific active styles handled by conditional classes */
button, .router-link {
  transition: all 0.2s ease-in-out;
}

/* Focus styles for accessibility */
button:focus, .router-link:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(23, 42, 90, 0.1);
}

/*
  Note on .router-link-active:
  Your active link styling is currently handled by `:class="{ 'bg-indigo-50 text-[#172A5A]': $route.path.includes('/app/dashboard') }"`
  within the template itself. If you want a global default 'router-link-active' style,
  you might add it here, but ensure it doesn't conflict with your specific conditional classes.
*/
</style>