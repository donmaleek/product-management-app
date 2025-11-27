<!--
 * Product Creation Form Component
 * 
 * @component ProductCreateForm
 * @author Eng. Mathias Alfred Kasiba
 * @description Form for creating new products with validation and navigation
 * @version 1.0
-->

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
    
    <div class="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      
      <header class="p-10 border-b border-gray-100">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p class="text-gray-500">Enter the details below to add a new item to your inventory.</p>
      </header>

      <form @submit.prevent="handleSubmit" class="p-10 space-y-8">
        
        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Product Information</h2>
          
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

        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Pricing & Inventory</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
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
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Media</h2>

          <div 
            class="border-2 border-dashed border-gray-300 p-12 rounded-lg text-center cursor-pointer hover:border-blue-500 transition duration-150"
          >
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            
            <p class="mt-2 text-sm text-gray-600">
              <span class="font-semibold" :style="{ color: primaryColor }">Click to upload</span> or drag and drop
            </p>
            <p class="mt-1 text-xs text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>

            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              class="sr-only" 
              accept="image/*"
            >
          </div>
        </section>

        <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {{ error }}
        </div>

        <div class="flex justify-end pt-4 space-x-4">
          
          <button
            type="button"
            @click="cancelForm"
            class="px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors border border-gray-300"
          >
            Cancel
          </button>
          
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const primaryColor = '#172A5A'

/**
 * Form state for product creation
 */
const form = reactive({
  title: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
})

const loading = ref(false)
const error = ref(null)

/**
 * Resets the form to initial state and clears any errors
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
 * Handles form submission with validation and product creation
 * Validates required fields and simulates API call
 */
const handleSubmit = async () => {
  loading.value = true
  error.value = null

  if (!form.title) {
    error.value = 'Product title is required.'
    loading.value = false
    return
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Product to be saved:', JSON.parse(JSON.stringify(form)))
    
    error.value = 'Product successfully added! (Form reset simulated)'
    
    resetForm()
    
  } catch (err) {
    error.value = 'Failed to save product. Please try again.'
    console.error('Error saving product:', err)
  } finally {
    loading.value = false
  }
}

/**
 * Cancels form editing and navigates back to products list
 * Resets form before navigation
 */
const cancelForm = () => {
  resetForm()
  router.push('/products')
}
</script>

<style scoped>
div, input, textarea, select, button {
  font-family: 'Inter', sans-serif;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>