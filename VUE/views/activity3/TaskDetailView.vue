<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from './router-index'

const route  = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const task = computed(() => taskStore.tasks.find(t => t.id === Number(route.params.id)))

function goBack() {
  router.push('/home')
}
</script>

<template>
  <div class="detail-view card">
    <div v-if="task">
      <button class="back-btn" @click="goBack">
        <span>←</span> Back to list
      </button>

      <h1 class="task-title">{{ task.name }}</h1>
      
      <div class="meta-section">
        <div class="meta-item">
          <span class="label">Status</span>
          <span class="badge" :class="task.done ? 'badge-success' : 'badge-pending'">
            {{ task.done ? 'Completed' : 'Pending Action' }}
          </span>
        </div>
        
        <div class="meta-item">
          <span class="label">Due Date</span>
          <span class="date-text"><> {{ task.dueDate || 'No deadline' }}</span>
        </div>
      </div>
    </div>

    <div v-else class="fallback">
      <p>⚠️ Task records could not be found.</p>
      <button class="back-btn" @click="goBack">Return Home</button>
    </div>
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
.back-btn {
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  margin-bottom: 28px;
}
.back-btn:hover {
  background: #f1f5f9;
  color: var(--text-main);
  border-color: #cbd5e1;
}
.task-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px 0;
  line-height: 1.4;
}
.meta-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid #edf2f7;
  padding-top: 20px;
}
.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.badge {
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
}
.badge-success { background: #d1fae5; color: #065f46; }
.badge-pending { background: #fef3c7; color: #92400e; }
.date-text {
  font-size: 14px;
  color: var(--text-main);
  font-weight: 500;
}
.fallback { text-align: center; padding: 20px 0; }
.fallback p { color: #ef4444; margin-bottom: 16px; font-weight: 500; }
</style>