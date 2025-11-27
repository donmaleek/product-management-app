// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' 

// Components assumed to be in src/components/
import Login from '../components/Login.vue'
import ProductList from '../components/ProductList.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductDetail from '../components/ProductDetail.vue'
import NotFound from '../components/NotFound.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import Orders from '../components/Orders.vue'
import Customers from '../components/Customers.vue'
import Settings from '../components/Settings.vue'
import Dashboard from '../components/Dashboard.vue' // Add this import

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
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: { requiresAuth: false, hideSidebar: true, hideNavbar: true, title: 'Forgot Password' }
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard, // Changed from redirect to component
          meta: { requiresAuth: true, title: 'Dashboard' }
        },
        {
          path: 'products',
          name: 'ProductList',
          component: ProductList,
          meta: { requiresAuth: true, title: 'Product List' }
        },
        {
          path: 'products/new',
          name: 'AddProduct',
          component: AddProduct,
          meta: { requiresAuth: true, title: 'Add New Product' }
        },
        {
          path: 'products/:id',
          name: 'ProductDetail',
          component: ProductDetail,
          meta: { requiresAuth: true, title: 'Product Detail' }
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true, title: 'Orders' }
        },
        {
          path: 'customers',
          name: 'Customers',
          component: Customers,
          meta: { requiresAuth: true, title: 'Customers' }
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
          meta: { requiresAuth: true, title: 'Settings' }
        }
      ]
    },
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

  if (!authStore.isAuthenticated && localStorage.getItem('userToken')) {
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
    console.log(`Navigation Guard: Already authenticated. Redirecting from Login to Dashboard.`);
    next({ name: 'Dashboard' }); // Changed from ProductList to Dashboard
  } else {
    next();
  }
});

export default router