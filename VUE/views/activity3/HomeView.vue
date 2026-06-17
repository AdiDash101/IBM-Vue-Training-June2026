<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from './router-index'

const taskStore = useTaskStore()
const route     = useRoute()

const showErrorBanner = computed(() => route.query.error === 'notfound')
</script>

<template>
  <div class="home-view card">
    <header class="header">
      <h1><> My Tasks</h1>
      <span class="task-count">{{ taskStore.tasks.filter(t => !t.done).length }} left</span>
    </header>

    <div class="error-banner" v-if="showErrorBanner">
      <span class="icon">⚠️</span>
      <p>Task not found. Redirected back to home.</p>
    </div>

    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id" class="task-item">
        <RouterLink :to="`/task/${task.id}`" class="task-link">
          <div class="task-content">
            <div class="checkbox-indicator" :class="{ checked: task.done }">
              <span v-if="task.done">✓</span>
            </div>
            <span :class="{ done: task.done }" class="task-name">{{ task.name }}</span>
          </div>
          <span class="arrow">→</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
h1 {
  font-size: 24px;
  margin: 0;
  font-weight: 700;
}
.task-count {
  background: #e0e7ff;
  color: var(--primary);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.error-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  color: #991b1b;
}
.error-banner p { margin: 0; font-size: 14px; }
.task-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.task-item {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  background: #ffffff;
}
.task-item:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);
}
.task-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  text-decoration: none;
  color: inherit;
}
.task-content { display: flex; align-items: center; gap: 14px; }
.checkbox-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  transition: all 0.2s ease;
}
.checkbox-indicator.checked {
  background: var(--success);
  border-color: var(--success);
}
.task-name { font-size: 15px; font-weight: 500; transition: color 0.2s; }
.done { text-decoration: line-through; color: var(--text-muted); }
.arrow { color: #94a3b8; transition: transform 0.2s, color 0.2s; font-weight: bold; }
.task-item:hover .arrow { transform: translateX(4px); color: var(--primary); }
</style>