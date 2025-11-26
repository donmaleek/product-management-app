// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' 

// Components assumed to be in src/components/
import Login from '../components/Login.vue'
import ProductList from '../components/ProductList.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductDetail from '../components/ProductDetail.vue'
import NotFound from '../components/NotFound.vue'
import ForgotPassword from '../components/ForgotPassword.vue' // Correct import path now confirmed

// MainLayout is in src/layouts/
import MainLayout from '../layouts/MainLayout.vue' 

const router = createRouter({
  history: createWebHistory('/product-management-app/'), 
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false, hideSidebar: true, hideNavbar: true, title: 'Login' }
    },
    // Add the ForgotPassword route here, typically alongside other non-authenticated routes
    {
      path: '/forgot-password',
      name: 'ForgotPassword', // Consistent naming convention
      component: ForgotPassword,
      meta: { requiresAuth: false, hideSidebar: true, hideNavbar: true, title: 'Forgot Password' }
    },
    // RECTIFIED: Removed '/app' parent route.
    // Instead, define routes that should use MainLayout directly.
    // Each route that needs MainLayout will have it as its component,
    // and the actual content will be rendered in MainLayout's <router-view>.
    {
      path: '/', // Changed root path to also use MainLayout if needed or redirect
      component: MainLayout, // MainLayout now acts as the top-level layout for authenticated pages
      children: [
        {
          path: '', // Default child route for '/' after login
          redirect: '/products', // Redirects from / to /products (within MainLayout)
          meta: { requiresAuth: true }
        },
        {
          path: 'products', // Matches /product-management-app/products
          name: 'ProductList',
          component: ProductList, // ProductList will be rendered inside MainLayout's <router-view>
          meta: { requiresAuth: true, hideSidebar: false, title: 'Product List' }
        },
        {
          path: 'products/new', // Matches /product-management-app/products/new
          name: 'AddProduct',
          component: AddProduct, // AddProduct will be rendered inside MainLayout's <router-view>
          meta: { requiresAuth: true, hideSidebar: true, title: 'Add New Product' }
        },
        {
          path: 'products/:id', // Matches /product-management-app/products/:id
          name: 'ProductDetail',
          component: ProductDetail, // ProductDetail will be rendered inside MainLayout's <router-view>
          meta: { requiresAuth: true, hideSidebar: true, title: 'Product Detail' }
        }
      ]
    },
    // RECTIFIED: Removed the separate / redirect. The MainLayout's child redirect handles this.
    // You might also consider a more explicit redirect from '/' to '/login' if not authenticated.
    // For now, the beforeEach guard handles initial redirection.

    // Catch-all route for 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound, 
      meta: { hideSidebar: true, hideNavbar: true, title: 'Page Not Found' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // This part of your guard for rehydrating from localStorage is fine.
  if (!authStore.isAuthenticated && localStorage.getItem('userToken')) {
    // Assuming setToken exists on your authStore and takes a token string
    // If your authStore.restoreSession() handles this, you might call that instead.
    authStore.setToken(localStorage.getItem('userToken')); 
    console.log("Navigation Guard: Rehydrating auth store from localStorage.");
  }

  const requiresAuth = to.meta.requiresAuth !== false; 
  const isAuthenticated = authStore.isAuthenticated; 

  console.log(`Navigating to: ${to.path}. Requires Auth: ${requiresAuth}, Is Authenticated: ${isAuthenticated}`);

  if (requiresAuth && !isAuthenticated) {
    console.log(`Navigation Guard: Access denied. Redirecting to Login.`);
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    console.log(`Navigation Guard: Already authenticated. Redirecting from Login to ProductList.`);
    // RECTIFIED: Redirect to the correct ProductList path without '/app'
    next({ name: 'ProductList' }); 
  } else {
    next();
  }
});

export default router