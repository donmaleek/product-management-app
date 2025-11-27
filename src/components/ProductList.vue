<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Products</h1>
        <p class="text-gray-500 mt-1">Manage your inventory and view product performance.</p>
      </div>
      <router-link to="/products/new" class="mt-4 md:mt-0 bg-indigo-900 hover:bg-indigo-800 text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center shadow-sm transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Add New Product
      </router-link>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      
      <div class="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        <div class="relative w-full md:w-96">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </span>
          <input 
            v-model="productsStore.searchQuery"
            type="text" 
            placeholder="Search by product name..." 
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          >
        </div>

        <div class="flex gap-3 w-full md:w-auto">
            <div class="relative w-1/2 md:w-auto">
              <select 
                :value="productsStore.selectedCategory"
                @change="selectCategory($event.target.value)"
                class="appearance-none bg-gray-50 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full"
              >
                <option value="">All Categories</option>
                <option v-for="cat in productsStore.categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div class="relative w-1/2 md:w-auto">
              <select 
                :value="productsStore.selectedStatus"
                @change="selectStatus($event.target.value)"
                class="appearance-none bg-gray-50 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full"
              >
                <option value="">Stock Status</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
        </div>
      </div>

      <div v-if="productsStore.isLoading" class="p-10 flex justify-center">
          <LoadingSpinner />
      </div>
      <div v-else-if="productsStore.error" class="p-10 text-center text-red-500">
          {{ productsStore.error }}
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[300px]">Product</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[100px]">Category</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[80px]">Price</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[120px]">Stock Status</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-900 tracking-wide min-w-[50px]"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full overflow-hidden">
                        <img class="h-full w-full object-cover" :src="product.thumbnail" :alt="product.title" onerror="this.onerror=null; this.src='https://placehold.co/100x100?text=P'" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.title }}</div>
                    <div class="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-[250px]">
                      {{ product.description }}
                    </div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-md bg-blue-50 text-blue-700 capitalize border border-blue-100">
                  {{ product.category }}
                </span>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                ${{ product.price.toFixed(2) }}
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div 
                      class="h-2.5 w-2.5 rounded-full mr-2"
                      :class="getStockColor(product.stock)"
                  ></div>
                  <span class="text-sm text-gray-600">
                      {{ getStockText(product.stock) }}
                  </span>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <router-link :to="`/products/${product.id}`" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="text-sm text-gray-500 order-2 sm:order-1">
              Showing <span class="font-medium text-gray-900">{{ startIndex + 1 }}</span> to <span class="font-medium text-gray-900">{{ endIndex }}</span> of <span class="font-medium text-gray-900">{{ productsStore.filteredProducts.length }}</span> results
            </div>
            
            <div class="flex gap-2 order-1 sm:order-2">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1"
                class="h-8 w-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              
              <button 
                v-for="page in totalPages" 
                :key="page" 
                @click="goToPage(page)"
                :class="{ 'bg-indigo-900 text-white': currentPage === page, 'bg-white text-gray-700 hover:bg-gray-50': currentPage !== page }"
                class="h-8 w-8 flex items-center justify-center rounded border border-gray-200 font-medium text-sm transition-colors"
              >
                {{ page }}
              </button>

              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages"
                class="h-8 w-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProductsStore } from '../stores/products'
import LoadingSpinner from './LoadingSpinner.vue'

const productsStore = useProductsStore()

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 10 

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, productsStore.filteredProducts.length))

const paginatedProducts = computed(() => {
  return productsStore.filteredProducts.slice(startIndex.value, endIndex.value)
})

const totalPages = computed(() => {
  return Math.ceil(productsStore.filteredProducts.length / itemsPerPage)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Watch for changes in filteredProducts to reset pagination to page 1
watch(() => productsStore.filteredProducts, () => {
  currentPage.value = 1;
});

// Category and Status filters
const selectCategory = (category) => {
  productsStore.selectedCategory = category;
};

const selectStatus = (status) => {
  productsStore.selectedStatus = status;
};

// Stock status helpers - Consistent with store logic
const getStockColor = (stock) => {
  if (stock > 50) return 'bg-green-500';
  if (stock > 10) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getStockText = (stock) => {
  if (stock > 50) return 'In Stock';
  if (stock > 10) return 'Low Stock';
  if (stock > 0) return `Only ${stock} left`;
  return 'Out of Stock';
};

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<style scoped>
/* Scoped styles specific to ProductList component */
</style>