import { createRouter, createWebHistory } from 'vue-router'

// Import the TodoListView component
import TodoListView from '../../views/ToDoList/TodoListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoListView
    }
  ]
})

export default router