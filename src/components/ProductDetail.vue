<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    
    <nav class="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      
      <div class="flex items-center gap-2 sm:gap-3">
        <button @click="router.back()" class="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div class="bg-indigo-900 p-1.5 rounded text-white flex-shrink-0">
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </div>
        <span class="font-bold text-base sm:text-lg text-gray-900">
          Product Management
        </span>
      </div>

      <div class="flex items-center gap-2 sm:gap-4 md:gap-6">
        
        <div class="relative hidden md:block">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search" 
            class="bg-gray-100 text-gray-600 rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40 lg:w-64"
          >
        </div>

        <router-link to="/products/new" class="bg-indigo-900 hover:bg-indigo-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors hidden sm:block">
          Add Product
        </router-link>
        <router-link to="/products/new" class="bg-indigo-900 hover:bg-indigo-800 text-white p-1.5 sm:p-2 rounded-lg text-sm font-medium transition-colors sm:hidden">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </router-link>

        <button class="text-gray-500 hover:text-gray-700">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
        </button>

        <div class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-300 overflow-hidden border border-gray-200">
          <img src="https://i.pravatar.cc/150?img=12" alt="User" class="w-full h-full object-cover">
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      
      <div v-if="isLoading" class="flex justify-center py-16 sm:py-20">
        <LoadingSpinner />
      </div>
      <div v-else-if="error" class="text-center text-red-600 py-16 sm:py-20 text-sm sm:text-base">
        {{ error }}
      </div>

      <div v-else-if="product">
        
        <div class="flex items-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <router-link to="/products" class="hover:text-indigo-900 truncate">Products</router-link>
          <span class="mx-1 sm:mx-2">/</span>
          <span class="text-gray-900 truncate max-w-[150px] xs:max-w-[200px] sm:max-w-none">
            {{ product.title }}
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          
          <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex items-center justify-center h-[250px] xs:h-[300px] sm:h-[400px] lg:h-[500px]">
            <img 
              :src="product.thumbnail" 
              :alt="product.title" 
              class="h-full w-full object-contain p-3 sm:p-4"
              onerror="this.onerror=null; this.src='https://placehold.co/600x600/F3F4F6/9CA3AF?text=No+Image'" 
            />
          </div>

          <div class="flex flex-col">
            
            <div class="mb-4 sm:mb-6">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 break-words">
                {{ product.title }}
              </h1>
              <p class="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                {{ product.description || 'A stylish and durable jacket made from genuine leather, perfect for all seasons.' }}
                <span v-if="!product.description || product.description.length < 100">
                    Crafted from 100% genuine full-grain leather, this item offers a timeless look with modern durability. It features classic styling, multiple pockets for convenience, and a comfortable inner lining. Suitable for casual outings or a night on the town.
                </span>
              </p>
            </div>

            <div class="mb-5 sm:mb-6 lg:mb-8">
              <button 
                @click="handleEdit" 
                class="inline-flex items-center gap-1.5 sm:gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
              >
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                Edit Product
              </button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-y-4 sm:gap-y-6 gap-x-3 sm:gap-x-4 lg:gap-8 mb-5 sm:mb-6 lg:mb-8 border-t border-gray-100 pt-4 sm:pt-6">
              
              <div>
                <p class="text-gray-500 text-xs sm:text-sm mb-1">Price</p>
                <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  ${{ product.price }}
                </p>
              </div>
              
              <div>
                <p class="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">Category</p>
                <span class="inline-block bg-purple-100 text-purple-700 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full capitalize">
                  {{ product.category }}
                </span>
              </div>

              <div class="col-span-2 sm:col-span-1">
                <p class="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">Stock</p>
                <div class="flex items-center gap-2 sm:gap-3">
                  <span class="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-md">
                    {{ getStockText(product.stock) }}
                  </span>
                  <span class="text-gray-600 text-xs sm:text-sm">{{ product.stock }} units</span>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-4 sm:pt-6">
              <h3 class="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Description
              </h3>
              <p class="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                {{ product.description }}
                <span v-if="product.description && product.description.length < 100">
                  Crafted from 100% genuine full-grain leather, this item offers a timeless look with modern durability. It features classic styling, multiple pockets for convenience, and a comfortable inner lining. Suitable for casual outings or a night on the town.
                </span>
              </p>
            </div>

          </div>
        </div>

        <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
          <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Customer Reviews
          </h3>
          
          <div class="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            
            <div class="flex flex-col items-start w-full md:w-auto">
              <div class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-1 sm:mb-2">
                {{ product.rating }}
              </div>
              <div class="flex text-yellow-400 mb-1 sm:mb-2 text-lg sm:text-xl">
                <span>★</span><span>★</span><span>★</span><span>★</span><span class="text-gray-300">★</span>
              </div>
              <p class="text-gray-500 text-xs sm:text-sm">Based on 120 reviews</p>
            </div>

            <div class="flex-1 w-full max-w-lg space-y-2 sm:space-y-3">
              <div class="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                <span class="text-gray-600 w-3">5</span>
                <div class="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-400 rounded-full" style="width: 75%"></div>
                </div>
                <span class="text-gray-400 w-6 sm:w-8 text-right text-xs sm:text-sm">75%</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                <span class="text-gray-600 w-3">4</span>
                <div class="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-400 rounded-full" style="width: 15%"></div>
                </div>
                <span class="text-gray-400 w-6 sm:w-8 text-right text-xs sm:text-sm">15%</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                <span class="text-gray-600 w-3">3</span>
                <div class="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-400 rounded-full" style="width: 5%"></div>
                </div>
                <span class="text-gray-400 w-6 sm:w-8 text-right text-xs sm:text-sm">5%</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                <span class="text-gray-600 w-3">2</span>
                <div class="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-400 rounded-full" style="width: 3%"></div>
                </div>
                <span class="text-gray-400 w-6 sm:w-8 text-right text-xs sm:text-sm">3%</span>
              </div>
              <div class="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                <span class="text-gray-600 w-3">1</span>
                <div class="flex-1 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-yellow-400 rounded-full" style="width: 2%"></div>
                </div>
                <span class="text-gray-400 w-6 sm:w-8 text-right text-xs sm:text-sm">2%</span>
              </div>
            </div>

          </div>
        </div>

      </div>
      
      <div v-else class="text-center text-gray-500 p-6 sm:p-8 text-sm sm:text-base">
        Product not found.
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * VUE 3 COMPOSITION API SCRIPT
 *
 * @author Eng. Mathias Alfred Kasiba
 * @description Product detail view logic including data fetching, state management,
 * and user interaction handlers.
 */

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router' 
import { useProductsStore } from '../stores/products'
import LoadingSpinner from '../components/LoadingSpinner.vue'

// Vue Router and State Management initialization
const route = useRoute()
const router = useRouter() 
const productsStore = useProductsStore()

// Reactive state management
const product = ref(null)        
const isLoading = ref(true)      
const error = ref(null)          

/**
 * Fetches product details from the store or API
 * @async
 * @function fetchDetail
 * @returns {Promise<void>}
 *
 * @description
 * - Retrieves product ID from route parameters
 * - Calls products store to fetch product data
 * - Provides fallback mock data if fetch fails
 * - Updates loading and error states appropriately
 */
const fetchDetail = async () => {
  isLoading.value = true
  error.value = null
  const productId = route.params.id

  const fetchedProduct = await productsStore.fetchProductById(productId)
  
  if (!fetchedProduct) {
      product.value = {
          id: productId,
          title: `Sample Product ${productId}`,
          description: "This is a detailed description for the sample product. It showcases the key features and benefits.",
          price: (99.99 + (productId * 0.01)).toFixed(2),
          category: 'mock-category',
          stock: 45,
          rating: '4.3',
          thumbnail: 'https://placehold.co/600x600/F3F4F6/9CA3AF?text=Product+Image'
      };
  } else {
    product.value = fetchedProduct
  }
  isLoading.value = false
}

/**
 * Handles product edit action
 * @function handleEdit
 *
 * @description
 * - Creates and displays a modal dialog for product editing
 * - Currently shows mock UI (visual demonstration only)
 * - Can be extended with actual form functionality (e.g., router.push(`/products/${product.value.id}/edit`))
 */
const handleEdit = () => {
  // Option 1: Mockup Modal (current behavior)
  const messageBox = document.createElement('div');
  messageBox.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans';
  messageBox.innerHTML = `
    <div class="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-xl max-w-xs sm:max-w-sm w-full mx-3">
      <h3 class="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-900">Edit Product</h3>
      <p class="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Editing functionality for <strong>${product.value.title}</strong>.</p>
      <div class="flex justify-end">
        <button onclick="this.closest('.fixed').remove()" class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg text-white bg-indigo-900 hover:bg-indigo-800">
          Close
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(messageBox);

  // Option 2: Navigate to an actual edit page (uncomment if you implement this route)
  // router.push(`/products/${product.value.id}/edit`) 
}

/**
 * Provides text for stock status based on stock level.
 * @param {number} stock - The current stock level.
 * @returns {string} The descriptive text for the stock status.
 */
const getStockText = (stock) => {
  if (stock > 50) return 'In Stock';
  if (stock > 10) return 'Low Stock';
  if (stock > 0) return `Only ${stock} left`;
  return 'Out of Stock';
};

// Lifecycle hook: Fetch product details when component mounts
onMounted(fetchDetail)
</script>

<style scoped>
/**
 * COMPONENT-SCOPED STYLES
 *
 * @description
 * Add any component-specific styles here if needed.
 * Currently using Tailwind CSS for all styling.
 */
</style>