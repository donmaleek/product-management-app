<!--
 * Customers Component
 * 
 * @component Customers
 * @author Eng. Mathias Alfred Kasiba
 * @description Customers management page
 * @version 1.0
-->

<template>
  <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Customers</h1>
        <p class="text-gray-500 mt-1">Manage your customer database and view customer details.</p>
      </div>
      <button class="mt-4 md:mt-0 bg-indigo-900 hover:bg-indigo-800 text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center shadow-sm transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Add Customer
      </button>
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
            placeholder="Search customers..." 
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          >
        </div>

        <div class="flex gap-3 w-full md:w-auto">
          <div class="relative w-1/2 md:w-auto">
            <select class="appearance-none bg-gray-50 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full">
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="new">New</option>
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
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[200px]">Customer</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[150px]">Contact</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[100px]">Orders</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[120px]">Total Spent</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-900 tracking-wide min-w-[100px]">Status</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-900 tracking-wide min-w-[50px]"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="customer in customers" :key="customer.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">
                    {{ customer.initials }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                    <div class="text-xs text-gray-500">Joined {{ customer.joinDate }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ customer.email }}</div>
                <div class="text-xs text-gray-500">{{ customer.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ customer.orders }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                ${{ customer.totalSpent.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full capitalize" 
                      :class="getStatusClass(customer.status)">
                  {{ customer.status }}
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
          Showing <span class="font-medium text-gray-900">1</span> to <span class="font-medium text-gray-900">5</span> of <span class="font-medium text-gray-900">5</span> customers
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
 * Sample customers data
 */
const customers = ref([
  {
    id: 1,
    name: 'John Smith',
    initials: 'JS',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'Jan 15, 2023',
    orders: 12,
    totalSpent: 2999.50,
    status: 'active'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    joinDate: 'Dec 3, 2023',
    orders: 8,
    totalSpent: 1567.25,
    status: 'active'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    initials: 'MW',
    email: 'mike.wilson@email.com',
    phone: '+1 (555) 345-6789',
    joinDate: 'Nov 21, 2023',
    orders: 3,
    totalSpent: 489.99,
    status: 'new'
  },
  {
    id: 4,
    name: 'Emily Davis',
    initials: 'ED',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    joinDate: 'Feb 8, 2023',
    orders: 15,
    totalSpent: 3245.75,
    status: 'active'
  },
  {
    id: 5,
    name: 'Robert Brown',
    initials: 'RB',
    email: 'robert.b@email.com',
    phone: '+1 (555) 567-8901',
    joinDate: 'Mar 15, 2023',
    orders: 0,
    totalSpent: 0,
    status: 'inactive'
  }
])

/**
 * Returns CSS classes based on customer status
 */
const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    new: 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
/* Component-specific styles */
</style>