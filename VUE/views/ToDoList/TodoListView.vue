<script setup>
import { ref, computed } from 'vue'

const filter = ref('all')

const todos = ref([
  { id: 1, title: 'Start Program on AI Galaxa', completed: true },
  { id: 2, title: 'Do a pull into the repo space', completed: true },
  { id: 3, title: 'Initialize quantum drive systems', completed: true },
  { id: 4, title: 'Calibrate navigation sensors', completed: false },
  { id: 5, title: 'Deploy solar panel arrays', completed: false },
  { id: 6, title: 'Run diagnostics on life support', completed: true },
  { id: 7, title: 'Sync communication arrays with Earth', completed: false },
  { id: 8, title: 'Map asteroid field coordinates', completed: false },
  { id: 9, title: 'Refuel antimatter containment pods', completed: true },
  { id: 10, title: 'Update star charts database', completed: false },
  { id: 11, title: 'Test emergency escape protocols', completed: true },
  { id: 12, title: 'Analyze alien signal patterns', completed: false },
  { id: 13, title: 'Repair hull breach in sector 7', completed: true },
  { id: 14, title: 'Conduct spacewalk maintenance', completed: false },
  { id: 15, title: 'Optimize warp core efficiency', completed: false },
  { id: 16, title: 'Download planetary survey data', completed: true },
  { id: 17, title: 'Prepare cargo bay for docking', completed: false },
  { id: 18, title: 'Recalibrate gravity generators', completed: false },
  { id: 19, title: 'Monitor radiation levels', completed: true },
  { id: 20, title: 'Schedule crew rotation shifts', completed: false }
])

const loading = ref(false)
const error = ref(null)

const filteredTodos = computed(() => {
  if (filter.value === 'all') return todos.value
  if (filter.value === 'done') return todos.value.filter(todo => todo.completed)
  if (filter.value === 'pending') return todos.value.filter(todo => !todo.completed)
  
  return []
})
</script>

<template>
  <div class="todo-view">
    <h1>🛰️ DashLane Enterprise</h1>
    <p class="subtitle">Mission Control - Active Operations Log</p>

    <div>
      <div class="filters">
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
          [ ALL_SECTORS ]
        </button>
        <button :class="{ active: filter === 'done' }" @click="filter = 'done'">
          [ SECURED ]
        </button>
        <button :class="{ active: filter === 'pending' }" @click="filter = 'pending'">
          [ DRIFTING ]
        </button>
      </div>

      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id" :class="{ 'done-item': todo.completed }">
          <input type="checkbox" :checked="todo.completed" disabled class="cosmic-checkbox" />
          <span :class="{ 'completed-text': todo.completed }">
            {{ todo.title }}
          </span>
        </li>
      </ul>

      <div class="count">
        TRACKED_OBJECTS: {{ filteredTodos.length }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-view { 
  max-width: 560px; 
  margin: 40px auto; 
  padding: 24px; 
  font-family: 'Courier New', Courier, monospace; 
  background-color: #0B101D; 
  border: 2px solid #FFB000;  
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(255, 176, 0, 0.15);
  color: #ECEFF4;
}

h1 { 
  color: #FFB000; 
  margin-bottom: 4px; 
  font-size: 24px;
  letter-spacing: 2px;
  text-shadow: 0 0 8px rgba(255, 176, 0, 0.5);
}

.subtitle { 
  color: #64748B; 
  font-size: 12px; 
  margin-bottom: 24px; 
  text-transform: uppercase;
}

.loading { 
  text-align: center; 
  padding: 48px; 
  color: #00FF66; 
  font-size: 14px; 
  letter-spacing: 1px;
  font-weight: bold;
}

.error-box { 
  background: #2D1414; 
  border: 1px dashed #FF3333; 
  border-radius: 4px; 
  padding: 16px; 
  color: #FF6666;
}

.filters { 
  display: flex; 
  gap: 12px; 
  margin-bottom: 20px; 
}

.filters button { 
  padding: 6px 12px; 
  border: 1px solid #334155; 
  background: transparent; 
  color: #8A9AAB;
  cursor: pointer; 
  font-size: 12px; 
  font-family: inherit;
  transition: all 0.2s ease;
}

.filters button:hover {
  color: #FFB000;
  border-color: #FFB000;
}

.filters button.active { 
  background: #FFB000; 
  color: #0B101D; 
  border-color: #FFB000;
  font-weight: bold;
  box-shadow: 0 0 8px rgba(255, 176, 0, 0.4);
}

.todo-list { 
  list-style: none; 
  padding: 0; 
  margin: 0; 
}

.todo-list li { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
  padding: 12px; 
  background: #131A2C; 
  margin-bottom: 8px; 
  border-left: 3px solid #00E5FF; 
  font-size: 13px; 
}

.todo-list li.done-item { 
  opacity: 0.4; 
  border-left-color: #334155;
}

.todo-list li span { 
  flex: 1; 
}

.cosmic-checkbox {
  accent-color: #00E5FF;
}

.completed-text { 
  text-decoration: line-through; 
  color: #64748B; 
}

.count { 
  font-size: 11px; 
  color: #FFB000; 
  margin-top: 16px; 
  text-align: right;
}
</style>