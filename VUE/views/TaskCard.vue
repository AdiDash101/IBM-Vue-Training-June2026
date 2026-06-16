<script setup>
// TODO 1 & 2: Define the task prop with type Object, required: true
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// TODO 3: Define emits for 'complete' and 'delete'
const emit = defineEmits(['complete', 'delete'])
</script>

<template>
  <div class="task-card" :class="{ completed: task.done }">

    <div class="task-header">
      <span class="name">{{ task.name }}</span>

      <span class="meta">
        <slot name="meta"></slot>
      </span>
    </div>

    <div class="task-actions">
      <button 
        class="btn-complete" 
        @click="emit('complete', task.id)"
      >
        {{ task.done ? 'Undo' : 'Complete' }}
      </button>

      <button 
        class="btn-delete" 
        @click="emit('delete', task.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 12px;
  transition: all 0.2s;
}
.task-card.completed {
  background: #f0fdf4;
  border-color: #86efac;
  opacity: 0.8;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.task-header span.name {
  font-weight: 600;
  font-size: 15px;
  color: #1B2A4A;
}
.task-header .meta {
  font-size: 12px;
  color: #9ca3af;
}
.task-actions {
  display: flex;
  gap: 8px;
}
.btn-complete {
  padding: 5px 14px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.btn-delete {
  padding: 5px 14px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
</style>