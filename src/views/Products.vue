<template>
  <!-- Navbar -->
  <AppNavbar class="fixed top-0 left-0 w-full z-50" />

  <!-- Page Content -->
  <div class="container mx-auto px-2 sm:px-4 md:px-6 pt-24 pb-8">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
      <div>
        <h1 class="text-xl sm:text-3xl font-bold text-gray-900 mb-1">Products</h1>
        <p class="text-gray-600 text-xs sm:text-sm">
          Manage your inventory and new product performance
        </p>
      </div>

      <!-- Add Product Button -->
      <router-link
        to="/products/new"
        class="flex items-center gap-2 bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:bg-blue-800 transition-colors text-xs sm:text-sm"
      >
        <span class="text-lg sm:text-xl font-bold">+</span>
        <span>Add Product</span>
      </router-link>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow p-3 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-4 justify-between overflow-x-auto">
      <!-- Search -->
      <div class="flex-1 w-full">
        <input
          v-model="productsStore.searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-xs sm:text-sm"
        />
      </div>

      <!-- Filters -->
      <div class="flex gap-2 flex-shrink-0 mt-2 sm:mt-0">
        <!-- Category Button Dropdown -->
        <div class="relative">
          <button
            @click="showCategoryDropdown = !showCategoryDropdown"
            class="flex items-center justify-between w-28 sm:w-36 px-3 sm:px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none text-xs sm:text-sm"
          >
            <span>{{ selectedCategory || 'Category' }}</span>
            <span class="ml-2 text-gray-400">▼</span>
          </button>
          <div v-if="showCategoryDropdown" class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-auto">
            <ul>
              <li
                v-for="category in productsStore.categories"
                :key="category"
                @click="selectCategory(category)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm"
              >
                {{ category }}
              </li>
              <li @click="selectCategory('')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm">All Categories</li>
            </ul>
          </div>
        </div>

        <!-- Stock Status Button Dropdown -->
        <div class="relative">
          <button
            @click="showStatusDropdown = !showStatusDropdown"
            class="flex items-center justify-between w-28 sm:w-36 px-3 sm:px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none text-xs sm:text-sm"
          >
            <span>{{ selectedStatus || 'Stock Status' }}</span>
            <span class="ml-2 text-gray-400">▼</span>
          </button>
          <div v-if="showStatusDropdown" class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-auto">
            <ul>
              <li @click="selectStatus('in_stock')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm">In Stock</li>
              <li @click="selectStatus('out_of_stock')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm">Out of Stock</li>
              <li @click="selectStatus('')" class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm">All Status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <div v-if="productsStore.isLoading" class="p-6 flex justify-center">
        <LoadingSpinner />
      </div>

      <div v-else-if="productsStore.error" class="p-6 text-center text-red-600">
        {{ productsStore.error }}
      </div>

      <div v-else-if="productsStore.filteredProducts.length === 0" class="p-6 text-center text-gray-500">
        No products found
      </div>

      <table v-else class="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
        <thead class="bg-gray-50 sticky top-0 z-20">
          <tr>
            <th class="px-3 sm:px-6 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th class="px-3 sm:px-6 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th class="px-3 sm:px-6 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-3 sm:px-6 py-2 text-left font-medium text-black uppercase tracking-wider">Stock Status</th>
            <th class="px-3 sm:px-6 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="product in paginatedProducts"
            :key="product.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-3 sm:px-6 py-2 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                  <img :src="product.thumbnail" :alt="product.title" class="h-full w-full rounded-full object-cover" />
                </div>
                <div class="ml-2 sm:ml-4">
                  <div class="font-medium text-gray-900 truncate">{{ product.title }}</div>
                  <div class="text-gray-500 truncate max-w-[150px] sm:max-w-xs">{{ product.description }}</div>
                </div>
              </div>
            </td>
            <td class="px-3 sm:px-6 py-2 whitespace-nowrap">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-primary capitalize">
                {{ product.category }}
              </span>
            </td>
            <td class="px-3 sm:px-6 py-2 whitespace-nowrap text-gray-900">${{ product.price }}</td>
            <td class="px-3 sm:px-6 py-2 whitespace-nowrap text-gray-900 capitalize">{{ product.stockStatus }}</td>
            <td class="px-3 sm:px-6 py-2 whitespace-nowrap">
              <router-link :to="`/products/${product.id}`" class="text-primary hover:text-blue-900 transition-colors text-xs sm:text-sm">View</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row items-center justify-between mt-4 px-2 sm:px-4 py-2 bg-white rounded-lg shadow gap-2 text-xs sm:text-sm">
      <div class="text-gray-600">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ productsStore.filteredProducts.length }}
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >&lt;</button>
        <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue' // Added 'watch'
import { useProductsStore } from '../stores/products'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import AppNavbar from '../components/AppNavbar.vue'

const productsStore = useProductsStore()

// Dropdown state
const showCategoryDropdown = ref(false)
const showStatusDropdown = ref(false)
const selectedCategory = ref('')
const selectedStatus = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 5
const totalPages = computed(() => Math.ceil(productsStore.filteredProducts.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, productsStore.filteredProducts.length))
const paginatedProducts = computed(() => productsStore.filteredProducts.slice(startIndex.value, endIndex.value))

const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

// Dropdown select
const selectCategory = (category) => { selectedCategory.value = category; productsStore.selectedCategory = category; showCategoryDropdown.value = false }
const selectStatus = (status) => { selectedStatus.value = status; productsStore.selectedStatus = status; showStatusDropdown.value = false }

// IMPORTANT: Watch for changes in search/filters and reset pagination to page 1
watch([() => productsStore.searchQuery, selectedCategory, selectedStatus], () => {
  currentPage.value = 1
})

onMounted(() => productsStore.fetchProducts())
</script>