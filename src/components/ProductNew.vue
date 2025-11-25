<!--
/**
 * PRODUCT CREATION FORM COMPONENT
 * 
 * @component ProductCreateForm
 * @author Eng. Mathias Alfred Kasiba
 * @description Provides a comprehensive form for creating new products with
 *              product information, pricing, inventory, and media upload.
 *              Features form validation and navigation handling.
 * 
 * @version 1.0
 * @created 2024
 * 
 * FEATURES:
 * - Multi-section product form
 * - Form validation and error handling
 * - Responsive design with card layout
 * - Cancel navigation to product list
 * - Loading states during submission
 * 
 * DEPENDENCIES:
 * - Vue 3 Composition API
 * - Vue Router for navigation
 * - Tailwind CSS for styling
 */
-->

<template>
  <!-- Main page container with centered layout -->
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
    
    <!-- Main Card Container -->
    <div class="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      
      <!-- Header Section -->
      <header class="p-10 border-b border-gray-100">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p class="text-gray-500">Enter the details below to add a new item to your inventory.</p>
      </header>

      <!-- Form Body -->
      <form @submit.prevent="handleSubmit" class="p-10 space-y-8">
        
        <!-- 
          PRODUCT INFORMATION SECTION
          - Basic product details
          - Title and description inputs
        -->
        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Product Information</h2>
          
          <!-- Product Title Input -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              Product Title
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              placeholder="Enter product title"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <!-- Product Description Textarea -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              placeholder="Provide a detailed description of the product"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
            ></textarea>
          </div>
        </section>

        <!-- 
          PRICING & INVENTORY SECTION
          - Price and stock quantity inputs
          - Category selection dropdown
        -->
        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Pricing & Inventory</h2>

          <!-- Responsive grid for price and stock inputs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Price Input with Currency Symbol -->
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div class="relative">
                <span class="absolute left-0 top-0 mt-3 ml-4 text-gray-500">$</span>
                <input
                  id="price"
                  v-model.number="form.price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
              </div>
            </div>

            <!-- Stock Quantity Input -->
            <div>
              <label for="stock" class="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                id="stock"
                v-model.number="form.stock"
                type="number"
                min="0"
                required
                placeholder="Enter stock quantity"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
          </div>

          <!-- Category Selection Dropdown -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div class="relative">
              <select
                id="category"
                v-model="form.category"
                required
                class="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 cursor-pointer pr-10"
              >
                <option value="" disabled selected>Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="apparel">Apparel</option>
                <option value="groceries">Groceries</option>
                <option value="home">Home Goods</option>
              </select>
              <!-- Custom dropdown arrow -->
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </section>

        <!-- 
          MEDIA UPLOAD SECTION
          - Drag & drop image upload area
          - Visual upload interface
        -->
        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Media</h2>

          <!-- Image Upload Placeholder -->
          <div 
            class="border-2 border-dashed border-gray-300 p-12 rounded-lg text-center cursor-pointer hover:border-blue-500 transition duration-150"
          >
            <!-- Upload Icon (Cloud) -->
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            
            <p class="mt-2 text-sm text-gray-600">
              <span class="font-semibold" :style="{ color: primaryColor }">Click to upload</span> or drag and drop
            </p>
            <p class="mt-1 text-xs text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>

            <!-- Hidden input for file upload simulation -->
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              class="sr-only" 
              accept="image/*"
            >
          </div>
        </section>

        <!-- Error Message Display -->
        <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {{ error }}
        </div>

        <!-- 
          FORM ACTION BUTTONS
          - Cancel navigation to product list
          - Save product submission
        -->
        <div class="flex justify-end pt-4 space-x-4">
          
          <!-- Cancel Button - Navigates back to product list -->
          <button
            type="button"
            @click="cancelForm"
            class="px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors border border-gray-300"
          >
            Cancel
          </button>
          
          <!-- Save Product Button -->
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-3 rounded-lg text-white font-medium shadow-md transition-colors disabled:opacity-50"
            :style="{ backgroundColor: primaryColor }"
            :class="{ 'hover:opacity-90': !loading }"
          >
            {{ loading ? 'Saving...' : 'Save Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
/**
 * VUE 3 COMPOSITION API SCRIPT
 * 
 * @author Eng. Mathias Alfred Kasiba
 * @description Product creation form logic including form state management,
 *              validation, submission handling, and navigation.
 */

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

// Vue Router initialization for navigation
const router = useRouter()

// Primary color constant for consistent styling
const primaryColor = '#172A5A' // Dark Blue

/**
 * FORM STATE MANAGEMENT
 * 
 * @typedef {Object} ProductForm
 * @property {string} title - Product name/title
 * @property {string} description - Product description
 * @property {string} category - Product category
 * @property {number} price - Product price
 * @property {number} stock - Stock quantity
 */
const form = reactive({
  title: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
})

// Reactive state for loading and error handling
const loading = ref(false)
const error = ref(null)

/**
 * Resets the form to its initial state
 * @function resetForm
 * 
 * @description
 * Clears all form fields and error messages
 */
const resetForm = () => {
  form.title = ''
  form.description = ''
  form.category = ''
  form.price = 0
  form.stock = 0
  error.value = null
}

/**
 * Handles form submission and product creation
 * @async
 * @function handleSubmit
 * 
 * @description
 * - Validates required fields
 * - Simulates API call for product creation
 * - Handles loading states and errors
 * - Resets form on successful submission
 */
const handleSubmit = async () => {
  loading.value = true
  error.value = null

  // Basic validation
  if (!form.title) {
    error.value = 'Product title is required.'
    loading.value = false
    return
  }
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Product to be saved:', JSON.parse(JSON.stringify(form)))
    
    // Simulate successful save
    // In production: await productStore.addProduct(form)
    
    // Show success message
    error.value = 'Product successfully added! (Form reset simulated)'
    
    // Reset form after successful submission
    resetForm()
    
  } catch (err) {
    error.value = 'Failed to save product. Please try again.'
    console.error('Error saving product:', err)
  } finally {
    loading.value = false
  }
}

/**
 * Cancels form and navigates back to product list
 * @function cancelForm
 * 
 * @description
 * - Navigates to '/products' route
 * - Resets form state before leaving
 */
const cancelForm = () => {
  // Reset form before navigation
  resetForm()
  
  // Navigate back to products list
  router.push('/products')
}
</script>

<style scoped>
/**
 * COMPONENT-SCOPED STYLES
 * 
 * @description
 * Additional component-specific styles.
 * Currently using Tailwind CSS for most styling.
 */

/* Ensure consistent font application */
div, input, textarea, select, button {
  font-family: 'Inter', sans-serif;
}

/* Custom focus styles for better accessibility */
input:focus, textarea:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>