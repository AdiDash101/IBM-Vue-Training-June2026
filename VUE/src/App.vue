<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <RouterView v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style>

:root {
  --bg-gradient: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --card-bg: rgba(255, 255, 255, 0.95);
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --success: #10b981;
  --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg-gradient);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-main);
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-container {
  width: 100%;
  max-width: 540px;
  padding: 20px;
  box-sizing: border-box;
}


.page-enter-active,
.page-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>