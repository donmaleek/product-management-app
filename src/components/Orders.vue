<!--
 * Orders Component
 * 
 * @component Orders
 * @author Eng. Mathias Alfred Kasiba
 * @description Orders management page
 * @version 1.0
-->

<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Orders</h1>
        <p class="text-gray-500 mt-1">Manage and track customer orders.</p>
      </div>
      <div class="mt-4 md:mt-0 flex gap-3">
        <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium inline-flex items-center shadow-sm transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
          </svg>
          Filter
        </button>
        <button class="bg-indigo-900 hover:bg-indigo-800 text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center shadow-sm transition-colors">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Export
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      
      <div class="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        <div class="relative w-full md:w-96">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search orders..." 
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          >
        </div>

        <div class="flex gap-3 w-full md:w-auto">
          <div class="relative w-1/2 md:w-auto">
            <select class="appearance-none bg-gray-50 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full">
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[120px]">Order ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[200px]">Customer</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[100px]">Date</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[100px]">Amount</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[120px]">Status</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-900 tracking-wide min-w-[50px]"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.customer }}</div>
                <div class="text-xs text-gray-500">{{ order.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ order.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                ${{ order.amount.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full capitalize" 
                      :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-sm text-gray-500 order-2 sm:order-1">
          Showing <span class="font-medium text-gray-900">1</span> to <span class="font-medium text-gray-900">5</span> of <span class="font-medium text-gray-900">5</span> orders
        </div>
        
        <div class="flex gap-2 order-1 sm:order-2">
          <button class="h-8 w-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button class="h-8 w-8 flex items-center justify-center rounded border border-gray-200 bg-indigo-900 text-white font-medium text-sm">
            1
          </button>

          <button class="h-8 w-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * Sample orders data
 */
const orders = ref([
  {
    id: '1001',
    customer: 'John Smith',
    email: 'john.smith@email.com',
    date: '2024-01-15',
    amount: 299.99,
    status: 'processing'
  },
  {
    id: '1002',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    date: '2024-01-14',
    amount: 156.50,
    status: 'shipped'
  },
  {
    id: '1003',
    customer: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    date: '2024-01-13',
    amount: 89.99,
    status: 'delivered'
  },
  {
    id: '1004',
    customer: 'Emily Davis',
    email: 'emily.davis@email.com',
    date: '2024-01-12',
    amount: 245.75,
    status: 'pending'
  },
  {
    id: '1005',
    customer: 'Robert Brown',
    email: 'robert.b@email.com',
    date: '2024-01-11',
    amount: 199.99,
    status: 'cancelled'
  }
])

/**
 * Returns CSS classes based on order status
 */
const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
/* Component-specific styles */
</style>