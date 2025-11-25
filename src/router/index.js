/**
 * VUE ROUTER CONFIGURATION
 * 
 * @file router/index.js
 * @author Eng. Mathias Alfred Kasiba
 * @description Main router configuration for the E-Commerce Admin Panel.
 *              Defines all application routes, navigation guards, and
 *              authentication-based route protection.
 * 
 * @version 1.0
 * @created 2024
 * 
 * FEATURES:
 * - Route-based code splitting
 * - Authentication guards for protected routes
 * - Automatic redirection for authenticated/unauthenticated users
 * - 404 catch-all route handling
 * - Web History mode for clean URLs
 * 
 * DEPENDENCIES:
 * - Vue Router 4
 * - Pinia Store (auth)
 * - Vue 3 Composition API
 */

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../components/Login.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import ProductList from '../components/ProductList.vue'
import ProductDetail from '../components/ProductDetail.vue'
import ProductNew from '../components/ProductNew.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue' // Used as a dummy component for Reports/Settings

/**
 * APPLICATION ROUTE CONFIGURATION
 * 
 * @type {Array<import('vue-router').RouteRecordRaw>}
 * 
 * Route Structure:
 * - Public routes: Accessible without authentication
 * - Protected routes: Require valid authentication
 * - Placeholder routes: For future feature implementation
 * - Fallback routes: Handle 404 and invalid paths
 */
const routes = [
  // =============================================
  // PUBLIC ROUTES (No authentication required)
  // =============================================
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { 
      requiresAuth: false,
      title: 'Login - Admin Panel'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { 
      requiresAuth: false,
      title: 'Reset Password - Admin Panel'
    }
  },

  // =============================================
  // PROTECTED ROUTES (Authentication required)
  // =============================================
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList,
    meta: { 
      requiresAuth: true,
      title: 'Products - Admin Panel',
      breadcrumb: 'Products'
    }
  },
  {
    path: '/products/new',
    name: 'ProductNew',
    component: ProductNew,
    meta: { 
      requiresAuth: true,
      title: 'Add New Product - Admin Panel',
      breadcrumb: 'Add Product'
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { 
      requiresAuth: true,
      title: 'Product Details - Admin Panel',
      breadcrumb: 'Product Details'
    },
    props: true // Pass route params as props to component
  },

  // =============================================
  // PLACEHOLDER ROUTES (Future feature implementation)
  // =============================================
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LoadingSpinner, // Placeholder for future dashboard
    meta: { 
      requiresAuth: true,
      title: 'Dashboard - Admin Panel',
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: LoadingSpinner, // Placeholder for orders management
    meta: { 
      requiresAuth: true,
      title: 'Orders - Admin Panel',
      breadcrumb: 'Orders'
    }
  },
  {
    path: '/customers',
    name: 'Customers',
    component: LoadingSpinner, // Placeholder for customer management
    meta: { 
      requiresAuth: true,
      title: 'Customers - Admin Panel',
      breadcrumb: 'Customers'
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: LoadingSpinner, // Placeholder for analytics/reports
    meta: { 
      requiresAuth: true,
      title: 'Reports - Admin Panel',
      breadcrumb: 'Reports'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: LoadingSpinner, // Placeholder for application settings
    meta: { 
      requiresAuth: true,
      title: 'Settings - Admin Panel',
      breadcrumb: 'Settings'
    }
  },

  // =============================================
  // FALLBACK ROUTES (Error handling)
  // =============================================
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    redirect: '/products',
    meta: { 
      requiresAuth: true,
      title: 'Page Not Found - Admin Panel'
    }
  }
]

/**
 * ROUTER INSTANCE CONFIGURATION
 * 
 * @type {import('vue-router').Router}
 * 
 * Configuration Options:
 * - history: Uses HTML5 History Mode for clean URLs (requires server configuration)
 * - routes: Application route definitions
 * - scrollBehavior: Custom scroll behavior (can be added if needed)
 */
const router = createRouter({
  /**
   * HTML5 History Mode
   * - Removes hash (#) from URLs
   * - Requires server configuration for SPA fallback
   * - Provides cleaner, more traditional URLs
   */
  history: createWebHistory(),
  
  /**
   * Route Definitions
   * - All application routes and their configurations
   */
  routes,

  /**
   * Scroll Behavior Configuration
   * - Uncomment and customize if needed for specific scroll requirements
   */
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { top: 0 }
  //   }
  // }
})

/**
 * GLOBAL NAVIGATION GUARD
 * 
 * @description
 * Intercepts all navigation requests to implement authentication-based
 * route protection and user experience optimizations.
 * 
 * Guard Logic Flow:
 * 1. Check if target route requires authentication
 * 2. Verify user authentication status from auth store
 * 3. Apply appropriate redirects based on auth status and target route
 * 4. Allow navigation to proceed if all checks pass
 * 
 * @param {import('vue-router').RouteLocationNormalized} to - Target route
 * @param {import('vue-router').RouteLocationNormalized} from - Source route
 * @param {Function} next - Navigation control function
 */
router.beforeEach((to, from, next) => {
  /**
   * Authentication Store Instance
   * - Provides current authentication state
   * - Manages user session information
   */
  const authStore = useAuthStore()
  
  /**
   * Route Authentication Requirements
   * - Checks if any matched route requires authentication
   * - Uses route meta field for configuration
   */
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  /**
   * User Authentication Status
   * - Retrieved from Pinia auth store
   * - Typically checks for valid token/user session
   */
  const isAuthenticated = authStore.isAuthenticated

  // =============================================
  // AUTHENTICATION LOGIC DECISIONS
  // =============================================

  /**
   * Scenario 1: Protected Route without Authentication
   * - User tries to access protected route without being logged in
   * - Redirect to login page to authenticate
   */
  if (requiresAuth && !isAuthenticated) {
    console.log('Navigation Guard: Redirecting to login - authentication required')
    next({ name: 'Login' })
    return
  }

  /**
   * Scenario 2: Authenticated User Accessing Login Page
   * - User is already logged in but tries to access login page
   * - Redirect to main application area (products list)
   * - Prevents unnecessary re-authentication
   */
  if (!requiresAuth && isAuthenticated && to.name === 'Login') {
    console.log('Navigation Guard: Redirecting to products - user already authenticated')
    next({ name: 'ProductList' })
    return
  }

  /**
   * Scenario 3: Normal Navigation
   * - All checks pass, allow navigation to proceed
   * - This covers:
   *   a) Authenticated users accessing protected routes
   *   b) Unauthenticated users accessing public routes
   *   c) All other valid navigation scenarios
   */
  console.log('Navigation Guard: Allowing navigation to', to.name)
  next()
})

/**
 * GLOBAL AFTER EACH HOOK (Optional - for analytics, logging, etc.)
 * 
 * @description
 * Can be used for post-navigation tasks like:
 * - Analytics tracking
 * - Page view logging
 * - Dynamic title updates
 * - Performance monitoring
 */
// router.afterEach((to, from) => {
//   // Update document title based on route meta
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   
//   // Track page view for analytics
//   console.log(`Navigated from ${from.name} to ${to.name}`)
// })

/**
 * ROUTER INSTANCE EXPORT
 * 
 * @description
 * Default export of configured router instance for use in main Vue application.
 */
export default router