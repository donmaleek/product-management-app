<template>
  <div class="flex min-h-screen bg-gray-50 font-sans">
    
    <button 
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-[100] p-2 rounded-md bg-white text-gray-600 shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <div 
      v-if="isSidebarOpen" 
      @click="closeSidebar"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
    ></div>

    <aside 
      class="w-64 bg-white border-r border-gray-200 flex flex-col justify-between fixed h-screen z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div>
        <div class="h-20 flex items-center px-8">
          <div class="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold mr-3">E</div>
          <div>
            <h1 class="font-bold text-gray-800 text-lg leading-tight">E-Commerce</h1>
            <p class="text-xs text-blue-500">Admin Panel</p>
          </div>
        </div>

        <nav class="mt-8 px-4 space-y-2">
          <a href="#" @click="closeSidebar" class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </a>
          
          <a href="#" @click="closeSidebar" class="flex items-center px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            Products
          </a>

          <a href="#" @click="closeSidebar" class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Orders
          </a>

          <a href="#" @click="closeSidebar" class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Customers
          </a>
        </nav>
      </div>

      <div class="p-4 space-y-2">
        <a href="#" @click="closeSidebar" class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 transition-colors">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Settings
        </a>
        <button class="w-full flex items-center justify-center px-4 py-3 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 p-6 md:p-10 overflow-y-auto w-full md:ml-64">
      
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
                  <option value="">Category</option>
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
                  <option value="out_of_stock">Low Stock</option>
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
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[120px]">Stock</th>
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
               @click="nextPage" 
               :disabled="currentPage === totalPages"
               class="h-8 w-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
             </button>
           </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useProductsStore } from '../stores/products'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const productsStore = useProductsStore()

// --- Local State for Responsiveness ---
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  if (window.innerWidth < 1024) { // Close only on mobile breakpoints (Tailwind's 'lg' is usually 1024px)
    isSidebarOpen.value = false
  }
}

// --- Local State for Pagination ---
const currentPage = ref(1)
const itemsPerPage = ref(10)

// --- Actions/Handlers ---
const selectCategory = (category) => {
  productsStore.selectedCategory = category
}

const selectStatus = (status) => {
  productsStore.selectedStatus = status
}

// --- Stock Logic Helpers ---
const getStockColor = (stock) => {
    if (stock === 0) return 'bg-red-500'
    if (stock < 20) return 'bg-orange-500'
    return 'bg-green-500'
}

const getStockText = (stock) => {
    if (stock === 0) return 'Out of Stock'
    if (stock < 20) return `${stock} Low Stock`
    return `${stock} In Stock`
}

// --- Computed Pagination Logic ---
const totalPages = computed(() => {
  if (!productsStore.filteredProducts) return 0
  return Math.ceil(productsStore.filteredProducts.length / itemsPerPage.value)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  if (!productsStore.filteredProducts) return 0
  return Math.min(startIndex.value + itemsPerPage.value, productsStore.filteredProducts.length)
})

const paginatedProducts = computed(() => {
  if (!productsStore.filteredProducts) return []
  return productsStore.filteredProducts.slice(startIndex.value, endIndex.value)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// --- Watchers ---
watch([() => productsStore.searchQuery, () => productsStore.selectedCategory, () => productsStore.selectedStatus], () => {
  currentPage.value = 1
})

// --- Initialization ---
onMounted(() => {
  productsStore.fetchProducts()
})
</script>