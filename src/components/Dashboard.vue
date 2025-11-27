<!--
 * Dashboard Component
 * 
 * @component Dashboard
 * @author Eng. Mathias Alfred Kasiba
 * @description Main dashboard with overview metrics and quick actions
 * @version 1.0
-->

<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
    
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-500 mt-1">Welcome to your e-commerce admin panel</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Total Products</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalProducts }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalOrders }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Total Customers</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalCustomers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-yellow-100 text-yellow-600 mr-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">Revenue</p>
            <p class="text-2xl font-bold text-gray-900">${{ stats.revenue.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div class="space-y-3">
          <router-link 
            :to="{ name: 'AddProduct' }" 
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span class="font-medium text-gray-900">Add New Product</span>
          </router-link>
          
          <router-link 
            :to="{ name: 'ProductList' }" 
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <span class="font-medium text-gray-900">View All Products</span>
          </router-link>

          <router-link 
            :to="{ name: 'Orders' }" 
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="font-medium text-gray-900">Manage Orders</span>
          </router-link>

          <router-link 
            :to="{ name: 'Customers' }" 
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span class="font-medium text-gray-900">View Customers</span>
          </router-link>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div class="space-y-3">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center p-3 border border-gray-200 rounded-lg">
            <div class="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ activity.message }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Products -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">Recent Products</h2>
        <router-link 
          :to="{ name: 'ProductList' }" 
          class="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View All Products
        </router-link>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="product in recentProducts" :key="product.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <img :src="product.thumbnail" :alt="product.title" class="w-8 h-8 object-cover rounded">
              </div>
              <div>
                <h3 class="font-medium text-gray-900 text-sm">{{ product.title }}</h3>
                <p class="text-sm text-gray-500">${{ product.price.toFixed(2) }}</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs px-2 py-1 rounded-full" 
                    :class="getStockClass(product.stock)">
                {{ getStockText(product.stock) }}
              </span>
              <router-link 
                :to="{ name: 'ProductDetail', params: { id: product.id } }" 
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

/**
 * Dashboard statistics
 */
const stats = ref({
  totalProducts: 0,
  totalOrders: 24,
  totalCustomers: 156,
  revenue: 12540.50
})

/**
 * Recent activity data
 */
const recentActivity = ref([
  {
    id: 1,
    message: 'New order #10025 received',
    time: '2 minutes ago'
  },
  {
    id: 2,
    message: 'Product "Wireless Headphones" stock updated',
    time: '1 hour ago'
  },
  {
    id: 3,
    message: 'New customer registration',
    time: '3 hours ago'
  }
])

/**
 * Recent products
 */
const recentProducts = ref([])

/**
 * Get stock status class
 */
const getStockClass = (stock) => {
  if (stock > 50) return 'bg-green-100 text-green-800'
  if (stock > 10) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

/**
 * Get stock status text
 */
const getStockText = (stock) => {
  if (stock > 50) return 'In Stock'
  if (stock > 10) return 'Low Stock'
  return 'Out of Stock'
}

onMounted(async () => {
  // Load products if not already loaded
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
  
  // Update stats with actual product count
  stats.value.totalProducts = productsStore.products.length
  
  // Get recent products (last 6)
  recentProducts.value = productsStore.products.slice(0, 6)
})
</script>

<style scoped>
/* Component-specific styles */
</style>