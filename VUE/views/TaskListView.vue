<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
const tasks = ref([
  { id: 1, name: 'Learn Vue Props', done: true, dueDate: 'Today' },
  { id: 2, name: 'Master Component Emits', done: false, dueDate: 'Tomorrow' },
  { id: 3, name: 'Understand Named Slots', done: false, dueDate: 'Friday' }
])

// TODO 2: Write handleComplete(id)
function handleComplete(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.done = !task.done // Toggle the boolean state
  }
}

// TODO 3: Write handleDelete(id)
function handleDelete(id) {
  // Filter out the task that matches the ID we want to delete
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>

    <template v-if="tasks.length > 0">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @complete="handleComplete"
        @delete="handleDelete"
      >
        <template #meta>
          🗓️ Due: {{ task.dueDate }}
        </template>
      </TaskCard>
    </template>

    <div v-else class="empty-state">
      <p>Oh no tasks here!</p>
    </div>
    
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 { 
  color: #1B2A4A; 
  margin-bottom: 24px; 
}

/* Styled empty state to match your clean theme */
.empty-state {
  text-align: center;
  padding: 32px;
  background: #f9fafb;
  border: 2px dashed #e5e7eb;
  border-radius: 10px;
  color: #9ca3af;
  font-size: 16px;
  font-weight: 500;
}
</style>