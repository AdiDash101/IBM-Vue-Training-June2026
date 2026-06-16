<script setup>
// Step 1: Import the Vue tools we need
import { ref, computed } from 'vue'

// ============================================
// 📝 STEP 2: CREATE YOUR DATA (STATE)
// ============================================

// TODO 2.1: Create a reactive variable for the input box
const newTaskName = ref('') 

// TODO 2.2: Create a reactive array to store all tasks
const tasks = ref([]) 


// ============================================
// 🧮 STEP 3: CREATE AUTOMATIC CALCULATIONS
// ============================================

// TODO 3.1: Count total tasks
const totalCount = computed(() => {
  return tasks.value.length
})

// TODO 3.2: Count completed tasks
const doneCount = computed(() => {
  return tasks.value.filter(task => task.done).length
})

// TODO 3.3: Count pending (not done) tasks
const pendingCount = computed(() => {
  return totalCount.value - doneCount.value
})


// ============================================
// 🎬 STEP 4: CREATE FUNCTIONS (ACTIONS)
// ============================================

// TODO 4.1: Function to add a new task
function addTask() {
  // Step 4.1a: Check if input is empty or just spaces
  if (newTaskName.value.trim() === '') {
    return  // Exit the function early if empty
  }

  // Step 4.1b: Create a new task object and add it to the array
  tasks.value.push({ 
    id: Date.now(), 
    name: newTaskName.value.trim(), 
    done: false 
  })

  // Step 4.1c: Clear the input box
  newTaskName.value = ''
}

// TODO 4.2: Function to toggle a task between done/not done
function toggleTask(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.done = !task.done  // ! means "opposite of"
  }
}

// TODO 4.3: Function to remove a task
function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="app">
    <h1>📋 My Task Counter</h1>
    <p class="subtitle">Stay organized and get things done!</p>

    <div class="input-row">
      <input 
        type="text"
        v-model="newTaskName"
        @keyup.enter="addTask"
        placeholder="What needs to be done?"
      />
      
      <button @click="addTask">
        ➕ Add Task
      </button>
    </div>

    <div class="stats">
      <span>📌 Total: {{ totalCount }}</span>
      <span>✅ Done: {{ doneCount }}</span>
      <span>⏳ Pending: {{ pendingCount }}</span>
    </div>

    <p v-if="tasks.length === 0" class="empty">
      🎉 No tasks yet! Add one above to get started.
    </p>

    <ul v-else class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <input 
          type="checkbox" 
          v-model="task.done"
          @change="toggleTask(task.id)"
        />
        
        <span :class="{ done: task.done }">
          {{ task.name }}
        </span>
        
        <button class="remove-btn" @click="removeTask(task.id)">
          🗑️ Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>


.app {
  max-width: 500px;
  margin: 40px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

h1 {
  color: white;
  margin-bottom: 8px;
  font-size: 32px;
  text-align: center;
}

.subtitle {
  color: rgba(255,255,255,0.9);
  text-align: center;
  margin-bottom: 24px;
  font-size: 14px;
}

/* Input section */
.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-row input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.input-row input:focus {
  outline: 3px solid #ffd700;
}

.input-row button {
  padding: 12px 20px;
  background: #ffd700;
  color: #333;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: transform 0.2s;
}

.input-row button:hover {
  transform: scale(1.05);
  background: #ffed4e;
}

/* Statistics bar */
.stats {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background: rgba(255,255,255,0.95);
  border-radius: 12px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stats span {
  font-size: 14px;
}

/* Empty state message */
.empty {
  text-align: center;
  color: rgba(255,255,255,0.8);
  font-style: italic;
  margin: 40px 0;
  font-size: 16px;
}

/* Task list */
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: white;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.task-list li:hover {
  transform: translateX(5px);
}

.task-list li input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-list li span {
  flex: 1;
  font-size: 15px;
  color: #333;
}

/* Strikethrough style for completed tasks */
.done {
  text-decoration: line-through;
  color: #999 !important;
  opacity: 0.6;
}

.remove-btn {
  padding: 6px 12px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: #ff5252;
}

/* 🎉 BONUS: Add animations when tasks appear */
.task-list li {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>