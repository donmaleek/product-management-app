/**
 * PRODUCTS STORE (Pinia)
 * 
 * @file stores/products.js
 * @author Eng. Mathias Alfred Kasiba
 * @description Centralized product data management using Pinia.
 *              Handles product CRUD operations, filtering, search,
 *              and state management across the application.
 * 
 * @version 1.0
 * @created 2024
 * 
 * FEATURES:
 * - Product data state management
 * - CRUD operations (Create, Read, Update, Delete)
 * - Real-time search and filtering
 * - Category management
 * - Stock status filtering
 * - Loading states and error handling
 * - Authentication-integrated API calls
 * 
 * DEPENDENCIES:
 * - Pinia for state management
 * - Axios for HTTP requests
 * - Vue 3 Composition API
 * - Auth Store for authentication headers
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

/**
 * PRODUCTS STORE DEFINITION
 * 
 * @function useProductsStore
 * @description Pinia store for managing product data and operations
 * 
 * Store Structure:
 * - State: products list, loading states, errors, filters
 * - Getters: filtered products, categories, computed data
 * - Actions: CRUD operations, API calls, data manipulation
 */
export const useProductsStore = defineStore('products', () => {
  // =============================================
  // REACTIVE STATE DEFINITIONS
  // =============================================

  /**
   * Products List State
   * 
   * @type {import('vue').Ref<Array<Object>>}
   * @description
   * - Main array storing all product objects
   * - Populated from API calls
   * - Updated during CRUD operations
   */
  const products = ref([])

  /**
   * Loading State Indicator
   * 
   * @type {import('vue').Ref<boolean>}
   * @description
   * - Tracks ongoing API operations
   * - Used for loading spinners and UI feedback
   * - Automatically managed during async operations
   */
  const isLoading = ref(false)

  /**
   * Error Message State
   * 
   * @type {import('vue').Ref<string>}
   * @description
   * - Stores error messages from failed operations
   * - Empty string indicates no errors
   * - Cleared at the start of new operations
   */
  const error = ref('')

  /**
   * Search Query State
   * 
   * @type {import('vue').Ref<string>}
   * @description
   * - User-entered search term for product filtering
   * - Used in computed filteredProducts getter
   * - Case-insensitive matching on product titles
   */
  const searchQuery = ref('')

  /**
   * Selected Category Filter
   * 
   * @type {import('vue').Ref<string>}
   * @description
   * - Currently selected category for filtering
   * - Empty string shows all categories
   * - Used in computed filteredProducts getter
   */
  const selectedCategory = ref('')

  /**
   * Selected Stock Status Filter
   * 
   * @type {import('vue').Ref<string>}
   * @description
   * - Currently selected stock status for filtering
   * - Empty string shows all statuses
   * - Options: 'in_stock', 'low_stock', 'out_of_stock'
   * - Used in computed filteredProducts getter
   */
  const selectedStatus = ref('')

  // =============================================
  // EXTERNAL STORE DEPENDENCIES
  // =============================================

  /**
   * Authentication Store Instance
   * 
   * @description
   * - Provides authentication token for authorized API calls
   * - Used to construct authorization headers
   * - Ensures only authenticated users can modify data
   */
  const authStore = useAuthStore()

  // =============================================
  // COMPUTED PROPERTIES (GETTERS)
  // =============================================

  /**
   * Filtered Products List
   * 
   * @type {import('vue').ComputedRef<Array<Object>>}
   * @description
   * - Dynamically filters products based on search, category, and stock status
   * - Reacts to changes in searchQuery, selectedCategory, and selectedStatus
   * - Returns filtered subset of products array
   * 
   * Filtering Logic:
   * 1. Apply search filter on product titles (case-insensitive)
   * 2. Apply category filter if selected
   * 3. Apply stock status filter if selected
   * 4. Return filtered array
   * 
   * Stock Status Classification:
   * - in_stock: stock > 50
   * - low_stock: stock > 10 and ≤ 50
   * - out_of_stock: stock ≤ 10
   * 
   * @example
   * // Usage in components:
   * const productsStore = useProductsStore()
   * const displayedProducts = productsStore.filteredProducts
   */
  const filteredProducts = computed(() => {
    let filtered = products.value

    // Apply search filter
    if (searchQuery.value) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory.value) {
      filtered = filtered.filter(product => 
        product.category === selectedCategory.value
      )
    }

    // Apply stock status filter
    if (selectedStatus.value) {
      filtered = filtered.filter(product => {
        const stock = product.stock
        let status = ''
        
        // Stock status classification logic
        if (stock > 50) status = 'in_stock'
        else if (stock > 10) status = 'low_stock'
        else status = 'out_of_stock'
        
        return status === selectedStatus.value
      })
    }

    return filtered
  })

  /**
   * Available Categories List
   * 
   * @type {import('vue').ComputedRef<Array<string>>}
   * @description
   * - Extracts unique categories from products list
   * - Used for category filter dropdowns
   * - Automatically updates when products change
   * 
   * @example
   * // Usage in components:
   * const categories = productsStore.categories
   * // Returns: ['electronics', 'clothing', 'home', ...]
   */
  const categories = computed(() => {
    return [...new Set(products.value.map(product => product.category))].sort()
  })

  // =============================================
  // UTILITY FUNCTIONS
  // =============================================

  /**
   * Authentication Headers Generator
   * 
   * @function getAuthHeaders
   * @returns {Object} HTTP headers with authentication token
   * 
   * @description
   * Constructs authorization headers for authenticated API requests
   * Includes Bearer token from auth store and content type
   * 
   * @example
   * // Returns: { 
   * //   Authorization: 'Bearer mock-token-123', 
   * //   'Content-Type': 'application/json' 
   * // }
   */
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${authStore.token}`,
    'Content-Type': 'application/json'
  })

  /**
   * Stock Status Classifier
   * 
   * @function getStockStatus
   * @param {number} stock - Product stock quantity
   * @returns {string} Stock status classification
   * 
   * @description
   * Classifies product stock into status categories
   * Consistent with filtering logic in filteredProducts
   * 
   * Classification:
   * - in_stock: stock > 50
   * - low_stock: stock > 10 and ≤ 50
   * - out_of_stock: stock ≤ 10
   * 
   * @example
   * getStockStatus(100) // returns 'in_stock'
   * getStockStatus(25)  // returns 'low_stock'
   * getStockStatus(5)   // returns 'out_of_stock'
   */
  const getStockStatus = (stock) => {
    if (stock > 50) return 'in_stock'
    if (stock > 10) return 'low_stock'
    return 'out_of_stock'
  }

  // =============================================
  // ACTIONS (STORE METHODS) - READ OPERATIONS
  // =============================================

  /**
   * Fetch All Products
   * 
   * @async
   * @function fetchProducts
   * @returns {Promise<void>}
   * 
   * @description
   * Retrieves complete product list from API
   * Updates products state with fetched data
   * Handles loading states and errors
   * 
   * Process Flow:
   * 1. Set loading state and clear errors
   * 2. Make API GET request to products endpoint
   * 3. Update products state with response data
   * 4. Handle errors and reset loading state
   * 
   * @example
   * // Usage in components:
   * await productsStore.fetchProducts()
   */
  const fetchProducts = async () => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.get('https://dummyjson.com/products')
      products.value = response.data.products
      console.log(`Products Store: Fetched ${products.value.length} products`)
    } catch (err) {
      error.value = 'Failed to fetch products'
      console.error('Products Store: Error fetching products:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch Single Product by ID
   * 
   * @async
   * @function fetchProductById
   * @param {string|number} id - Product identifier
   * @returns {Promise<Object>} Product data object
   * 
   * @description
   * Retrieves detailed information for a single product
   * Used for product detail views and editing
   * Throws error for handling in calling components
   * 
   * @example
   * // Usage in components:
   * try {
   *   const product = await productsStore.fetchProductById(1)
   * } catch (error) {
   *   // Handle fetch error
   * }
   */
  const fetchProductById = async (id) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)
      console.log(`Products Store: Fetched product ${id}`)
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch product'
      console.error(`Products Store: Error fetching product ${id}:`, err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // =============================================
  // ACTIONS (STORE METHODS) - WRITE OPERATIONS
  // =============================================

  /**
   * Create New Product
   * 
   * @async
   * @function addProduct
   * @param {Object} productData - New product data
   * @returns {Promise<Object>} Created product data from API
   * 
   * @description
   * Creates a new product via authenticated API call
   * Adds the new product to the beginning of products list
   * Requires authentication token for authorization
   * 
   * @example
   * // Usage in components:
   * const newProduct = await productsStore.addProduct({
   *   title: 'New Product',
   *   price: 99.99,
   *   category: 'electronics'
   * })
   */
  const addProduct = async (productData) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.post(
        'https://dummyjson.com/products/add',
        productData,
        { headers: getAuthHeaders() }
      )
      // Add new product to beginning of list for immediate UI update
      products.value.unshift(response.data)
      console.log('Products Store: Added new product:', response.data.title)
      return response.data
    } catch (err) {
      error.value = 'Failed to add product'
      console.error('Products Store: Error adding product:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update Existing Product
   * 
   * @async
   * @function updateProduct
   * @param {string|number} id - Product identifier to update
   * @param {Object} productData - Updated product data
   * @returns {Promise<Object>} Updated product data from API
   * 
   * @description
   * Updates an existing product via authenticated API call
   * Finds and replaces the product in local state
   * Requires authentication token for authorization
   * 
   * @example
   * // Usage in components:
   * const updatedProduct = await productsStore.updateProduct(1, {
   *   title: 'Updated Product Name',
   *   price: 129.99
   * })
   */
  const updateProduct = async (id, productData) => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await axios.put(
        `https://dummyjson.com/products/${id}`,
        productData,
        { headers: getAuthHeaders() }
      )
      // Update product in local state for immediate UI reflection
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
      console.log(`Products Store: Updated product ${id}`)
      return response.data
    } catch (err) {
      error.value = 'Failed to update product'
      console.error(`Products Store: Error updating product ${id}:`, err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete Product
   * 
   * @async
   * @function deleteProduct
   * @param {string|number} id - Product identifier to delete
   * @returns {Promise<void>}
   * 
   * @description
   * Deletes a product via authenticated API call
   * Removes the product from local state
   * Requires authentication token for authorization
   * 
   * @example
   * // Usage in components:
   * await productsStore.deleteProduct(1)
   * // Product is immediately removed from local state
   */
  const deleteProduct = async (id) => {
    isLoading.value = true
    error.value = ''
    try {
      await axios.delete(
        `https://dummyjson.com/products/${id}`,
        { headers: getAuthHeaders() }
      )
      // Remove product from local state for immediate UI update
      products.value = products.value.filter(p => p.id !== id)
      console.log(`Products Store: Deleted product ${id}`)
    } catch (err) {
      error.value = 'Failed to delete product'
      console.error(`Products Store: Error deleting product ${id}:`, err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // =============================================
  // STORE PUBLIC INTERFACE
  // =============================================

  /**
   * Store Public API
   * 
   * @description
   * Exposes state, getters, and actions to the rest of the application
   * All returned values are reactive and can be used in Vue components
   */
  return {
    // State
    products,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    selectedStatus,
    
    // Getters
    filteredProducts,
    categories,
    
    // Actions
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Utility functions
    getStockStatus
  }
})