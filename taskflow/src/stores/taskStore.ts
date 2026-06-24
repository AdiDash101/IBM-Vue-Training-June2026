import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Task {
  id: number
  name: string
  done: boolean
  dueDate: string
}

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([
    { id: 1, name: 'Complete Day 3 Routing Assignment', done: false, dueDate: '2026-06-17' },
    { id: 2, name: 'Install Pinia and Fix Imports', done: true, dueDate: '2026-06-17' },
    { id: 3, name: 'Build a Vue Masterpiece', done: false, dueDate: '2026-06-20' }
  ])

  const addTask = (task: { name: string; dueDate?: string }) => {
    const newTask: Task = {
      id: Date.now(),
      name: task.name,
      done: false,
      dueDate: task.dueDate || new Date().toISOString().split('T')[0]
    }
    tasks.value.push(newTask)
  }

  const toggleTask = (id: number) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.done = !task.done
    }
  }

  const deleteTask = (id: number) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  return { tasks, addTask, toggleTask, deleteTask }
})
