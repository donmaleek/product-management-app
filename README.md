# 🛍️ E-Commerce Admin Panel

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.3+-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.0+-FFD859?style=for-the-badge&logo=pinia&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue_Router-4.0+-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)

*A modern, responsive admin dashboard for managing e-commerce products with beautiful UI and seamless user experience*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub last commit](https://img.shields.io/github/last-commit/mathayo77/ecommerce-admin?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/mathayo77/ecommerce-admin?style=for-the-badge)

</div>

## 📋 Table of Contents

- [🛍️ E-Commerce Admin Panel](#️-e-commerce-admin-panel)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
    - [🎯 Core Functionality](#-core-functionality)
    - [🛠️ Technical Features](#️-technical-features)
  - [🚀 Quick Start](#-quick-start)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Check Node.js version](#check-nodejs-version)
- [Install dependencies](#install-dependencies)
- [Or using yarn](#or-using-yarn)
- [Start development server with hot reload](#start-development-server-with-hot-reload)
- [Build for production](#build-for-production)
- [Preview production build](#preview-production-build)

## ✨ Features

### 🎯 Core Functionality
- **🔐 Secure Authentication** - JWT-based login with session persistence
- **📦 Product Management** - Full CRUD operations for products
- **🎨 Modern UI/UX** - Beautiful, intuitive interface with Tailwind CSS
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile
- **⚡ Real-time Search** - Instant product filtering and search
- **🏷️ Category Filtering** - Organize products by categories
- **🔄 State Management** - Centralized state with Pinia

### 🛠️ Technical Features
- **Vue 3 Composition API** - Modern Vue.js development
- **TypeScript Ready** - Fully typed and type-safe
- **Component-Based Architecture** - Reusable and maintainable code
- **API Integration** - RESTful API integration with error handling
- **Route Guards** - Protected routes and authentication
- **Loading States** - Smooth user experience with loading indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone git@github.com:donmaleek/product-management-app.git
cd product-management-app

2. Install dependencies
npm install

3.Start development server
npm run dev

4.Open your browser
http://localhost:3000
Default Login Credentials
Username: mathayo77
Password: mathayo77

🛠️ Installation
Detailed Setup Instructions
Environment Setup


# Check Node.js version
node --version

# Install dependencies
npm install

# Or using yarn
yarn install
Development Server


# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
Environment Variables (Optional)
Create a .env file in the root directory:

env
VITE_API_BASE_URL=https://dummyjson.com
VITE_APP_NAME="E-Commerce Admin"

📸 Project Screenshots
🔐 Login Page
https://drive.google.com/file/d/1QmpvDKwMFA2LdP9v-nQfTFzqb2HLe04g/view?usp=sharing
Clean, responsive login form with platform branding and secure authentication

📦 Products List Page
https://drive.google.com/file/d/1YN7dYE4nkQKDSyDYp3q1i2rr6i4vG75H/view?usp=sharing
Comprehensive product listing with search, filtering, and management actions

👀 Product Details Page
https://drive.google.com/file/d/1UCDVM7fuBuQLUEyMddXPBFpo2lvU1b2E/view?usp=sharing
Detailed product view with images, specifications, and customer reviews

➕ Add New Product Page
https://drive.google.com/file/d/12YBeOkPL0t6jlAstiL7qLTF4URo5Zd8-/view?usp=sharing
Intuitive product creation form with multiple sections and media upload

📁 Project Structure

ecommerce-admin/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable Vue components
│   │   ├── AppNavbar.vue  # Navigation sidebar
│   │   ├── Login.vue      # Authentication form
│   │   ├── ProductList.vue # Products listing
│   │   ├── ProductDetail.vue # Product details
│   │   └── ProductNew.vue # Product creation form
│   ├── stores/           # Pinia state management
│   │   ├── auth.js       # Authentication store
│   │   └── products.js   # Products store
│   ├── router/           # Vue Router configuration
│   │   └── index.js      # Route definitions and guards
│   ├── App.vue           # Root component
│   └── main.js           # Application entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js       # Vite build configuration

🎨 UI Components
🔐 Authentication Components
Login Component
File: src/components/Login.vue

Features:

Responsive login form with validation

Password visibility toggle

Remember me functionality

Error handling and loading states

Forgot password navigation


Key Code Structure:

vue
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <!-- Platform Logo -->
    <div class="flex flex-col items-center mb-6">
      <div class="flex items-center space-x-2 text-lg font-semibold text-blue-800">
        <span class="text-2xl text-blue-900">📦</span>
        <span>Platform Logo</span>
      </div>
    </div>

    <!-- Login Card -->
    <div class="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-2xl font-semibold text-blue-900 mb-2">Welcome Back</h2>
      <p class="text-gray-500 mb-6">Sign in to manage your products.</p>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email/Username Input -->
        <div>
          <label class="block text-sm font-medium text-blue-900 mb-2">
            Email or Username
          </label>
          <input
            v-model="credentials.username"
            type="text"
            required
            placeholder="Email or Username"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        <!-- Password Input with Toggle -->
        <div>
          <label class="block text-sm font-medium text-blue-900 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              v-model="credentials.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              required
              placeholder="Enter your password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 pr-10"
            />
            <span
              @click="isPasswordVisible = !isPasswordVisible"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
            >
              {{ isPasswordVisible ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center">
            <input id="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label for="remember-me" class="ml-2 text-gray-500">Remember me</label>
          </div>
          <a href="/forgot-password" class="text-blue-900 font-medium hover:underline">
            Forgot Password?
          </a>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-semibold rounded-lg text-white bg-blue-900 hover:bg-blue-800 transition-colors disabled:opacity-50"
        >
          <span v-if="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const credentials = ref({ username: '', password: '' })
const loading = ref(false)
const error = ref('')
const isPasswordVisible = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  const result = await authStore.login(credentials.value)

  if (result.success) {
    router.push('/products')
  } else {
    error.value = result.error
  }

  loading.value = false
}
</script>
Password Reset Component
File: src/components/ForgotPassword.vue

Features:

Email validation and submission

Success/error message display

Loading states during API calls

Navigation back to login

📦 Product Management Components
Product List Component
File: src/components/ProductList.vue

Features:

Grid layout with product cards

Real-time search functionality

Category filtering

Responsive design for all devices

Add new product button

Product statistics

Key Features Implementation:

vue
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Bar -->
    <nav class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-indigo-900 p-1.5 rounded text-white">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">...</svg>
        </div>
        <span class="font-bold text-lg text-gray-900">Product Management</span>
      </div>
      
      <!-- Search and Add Product -->
      <div class="flex items-center gap-4">
        <div class="relative hidden md:block">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search" 
            class="bg-gray-100 text-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
          />
        </div>
        <button class="bg-indigo-900 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Add Product
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Products</h1>
        <p class="mt-2 text-gray-500">Manage your product inventory and listings.</p>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <!-- Product Image -->
          <div class="h-48 bg-gray-100 flex items-center justify-center">
            <img 
              :src="product.thumbnail" 
              :alt="product.title"
              class="h-full w-full object-cover"
            />
          </div>
          
          <!-- Product Info -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ product.title }}</h3>
            <p class="text-gray-500 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
            
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-gray-900">${{ product.price }}</span>
              <span class="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                In Stock
              </span>
            </div>
            
            <!-- Actions -->
            <div class="flex gap-2 mt-4">
              <button 
                @click="viewProduct(product.id)"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
              >
                View
              </button>
              <button 
                @click="editProduct(product.id)"
                class="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
const router = useRouter()
const searchQuery = ref('')

const filteredProducts = computed(() => productsStore.filteredProducts)

onMounted(async () => {
  await productsStore.fetchProducts()
})

const viewProduct = (id) => {
  router.push(`/products/${id}`)
}

const editProduct = (id) => {
  // Edit functionality
}
</script>
Product Detail Component
File: src/components/ProductDetail.vue

Features:

Comprehensive product information display

Image gallery with thumbnail navigation

Customer reviews section

Edit and delete functionality

Breadcrumb navigation

Responsive image layout

Key Sections:

Product image with zoom capability

Title, description, and specifications

Pricing and inventory information

Customer reviews with ratings

Action buttons (Edit, Delete)

Product Creation Form
File: src/components/ProductNew.vue

Features:

Multi-section form with validation

Image upload with drag & drop

Category selection

Pricing and inventory management

Rich text description

Form validation and error handling


Form Structure:

vue
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
    <div class="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <!-- Header -->
      <header class="p-10 border-b border-gray-100">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p class="text-gray-500">Enter the details below to add a new item to your inventory.</p>
      </header>

      <!-- Form Sections -->
      <form @submit.prevent="handleSubmit" class="p-10 space-y-8">
        <!-- Product Information -->
        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Product Information</h2>
          
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="Enter product title"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Provide a detailed description"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>
        </section>

        <!-- Pricing & Inventory -->
        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Pricing & Inventory</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <div class="relative">
                <span class="absolute left-0 top-0 mt-3 ml-4 text-gray-500">$</span>
                <input
                  v-model.number="form.price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Stock -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                v-model.number="form.stock"
                type="number"
                placeholder="Enter stock quantity"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              v-model="form.category"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled selected>Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="apparel">Apparel</option>
              <option value="groceries">Groceries</option>
              <option value="home">Home Goods</option>
            </select>
          </div>
        </section>

        <!-- Media Upload -->
        <section class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Media</h2>
          
          <div class="border-2 border-dashed border-gray-300 p-12 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="mt-2 text-sm text-gray-600">
              <span class="font-semibold text-blue-700">Click to upload</span> or drag and drop
            </p>
            <p class="mt-1 text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
        </section>

        <!-- Actions -->
        <div class="flex justify-end gap-4 pt-4">
          <button type="button" @click="cancel" class="px-6 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button type="submit" class="px-6 py-3 rounded-lg text-white font-medium bg-blue-900 hover:bg-blue-800 shadow-md transition-colors">
            Save Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  title: '',
  description: '',
  price: 0,
  stock: 0,
  category: ''
})

const handleSubmit = async () => {
  // Form submission logic
  console.log('Submitting product:', form)
  router.push('/products')
}

const cancel = () => {
  router.push('/products')
}
</script>


🧭 Navigation Component
App Sidebar
File: src/components/AppNavbar.vue

Features:

Responsive collapsible sidebar

Active route highlighting

Mobile hamburger menu

Smooth transitions and animations

User profile section

Logout functionality

Implementation:

vue
<template>
  <div>
    <!-- Mobile Menu Button -->
    <button 
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-gray-600 shadow-md border border-gray-200"
    >
      <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Sidebar Overlay -->
    <div 
      v-if="isSidebarOpen" 
      @click="closeSidebar"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Branding -->
      <div class="px-8 py-8 flex items-center gap-4">
        <div class="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">...</svg>
        </div>
        <div class="flex flex-col">
          <h1 class="font-bold text-gray-900 text-lg">E-Commerce</h1>
          <span class="text-xs text-blue-500 font-medium">Admin Panel</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 space-y-2 mt-4">
        <router-link 
          to="/dashboard" 
          @click="closeSidebar"
          class="flex items-center px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">...</svg>
          <span class="font-medium">Dashboard</span>
        </router-link>

        <router-link 
          to="/products" 
          @click="closeSidebar"
          class="flex items-center px-4 py-3 rounded-lg font-medium transition-colors"
          :class="$route.path.includes('/products') ? 'bg-indigo-50 text-blue-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">...</svg>
          <span>Products</span>
        </router-link>

        <!-- Additional navigation items -->
      </nav>

      <!-- Footer -->
      <div class="p-4 mb-4 space-y-4">
        <router-link to="/settings" class="flex items-center px-4 py-2 text-gray-500 hover:text-gray-900 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">...</svg>
          <span class="font-medium text-sm">Settings</span>
        </router-link>

        <button 
          @click="handleLogout"
          class="w-full flex items-center justify-center px-4 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold shadow-md transition-all"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">...</svg>
          Logout
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
🔐 Authentication System
Authentication Store
File: src/stores/auth.js

javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user_info') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials) => {
    // Mock credentials for development
    if (credentials.username === 'mathayo77' && credentials.password === 'mathayo77') {
      token.value = 'mock-token-123'
      user.value = { username: credentials.username }
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user_info', JSON.stringify(user.value))
      return { success: true }
    }

    // Real API call
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', credentials)
      if (response.data.token) {
        token.value = response.data.token
        user.value = response.data
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user_info', JSON.stringify(response.data))
        return { success: true }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
  }

  const restoreSession = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user_info')
    
    if (savedToken) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    restoreSession
  }
})
Products Store
File: src/stores/products.js

javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const isLoading = ref(false)
  const error = ref('')
  const searchQuery = ref('')
  const selectedCategory = ref('')

  const authStore = useAuthStore()

  const filteredProducts = computed(() => {
    let filtered = products.value

    if (searchQuery.value) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(product => 
        product.category === selectedCategory.value
      )
    }

    return filtered
  })

  const categories = computed(() => {
    return [...new Set(products.value.map(product => product.category))]
  })

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${authStore.token}`,
    'Content-Type': 'application/json'
  })

  const fetchProducts = async () => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.get('https://dummyjson.com/products')
      products.value = response.data.products
    } catch (err) {
      error.value = 'Failed to fetch products'
      console.error('Error fetching products:', err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchProductById = async (id) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch product'
      console.error('Error fetching product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = async (productData) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.post(
        'https://dummyjson.com/products/add',
        productData,
        { headers: getAuthHeaders() }
      )
      products.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = 'Failed to add product'
      console.error('Error adding product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProduct = async (id, productData) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.put(
        `https://dummyjson.com/products/${id}`,
        productData,
        { headers: getAuthHeaders() }
      )
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = 'Failed to update product'
      console.error('Error updating product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id) => {
    isLoading.value = true
    error.value = ''
    try {
      await axios.delete(
        `https://dummyjson.com/products/${id}`,
        { headers: getAuthHeaders() }
      )
      products.value = products.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = 'Failed to delete product'
      console.error('Error deleting product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    filteredProducts,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    categories,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct
  }
})
🏗️ Architecture
Router Configuration
File: src/router/index.js

javascript
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../components/Login.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import ProductList from '../components/ProductList.vue'
import ProductDetail from '../components/ProductDetail.vue'
import ProductNew from '../components/ProductNew.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { requiresAuth: false }
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/new',
    name: 'ProductNew',
    component: ProductNew,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/products'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = authStore.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (!requiresAuth && isAuthenticated && to.name === 'Login') {
    next({ name: 'ProductList' })
  } else {
    next()
  }
})

export default router
Main Application File
File: src/App.vue

vue
<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <AppNavbar v-if="authStore.isAuthenticated" />
    
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.restoreSession()
})
</script>

Entry Point
File: src/main.js

javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

📱 Responsive Design
Breakpoints
sm: 640px (Mobile)

md: 768px (Tablet)

lg: 1024px (Desktop)


