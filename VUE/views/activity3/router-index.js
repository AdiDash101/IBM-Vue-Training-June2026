import { createRouter, createWebHistory } from 'vue-router'
import { defineStore } from 'pinia'
import { ref } from 'vue'


import HomeView from './HomeView.vue'
import TaskDetailView from './TaskDetailView.vue'


export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([
    { id: 1, name: 'Complete Day 3 Routing Assignment', done: false, dueDate: '2026-06-17' },
    { id: 2, name: 'Install Pinia and Fix Imports', done: true, dueDate: '2026-06-17' },
    { id: 3, name: 'Build a Vue Masterpiece', done: false, dueDate: '2026-06-20' }
  ])
  return { tasks }
})

// 2. ROUTER CONFIGURATION
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomeView },
  { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 3. NAVIGATION GUARD
router.beforeEach((to, from, next) => {
  if (to.meta.requiresTask) {
    const taskStore = useTaskStore()
    const taskId = Number(to.params.id)
    const taskExists = taskStore.tasks.some(t => t.id === taskId)
    
    if (!taskExists) {
      return next({ path: '/home', query: { error: 'notfound' } })
    }
  }
  next() 
})

export default router