<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Task Manager</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Task Manager</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="task in taskStore.tasks" :key="task.id" @click="navigateToTask(task.id)" button>
          <ion-checkbox
            slot="start"
            :checked="task.done"
            @ionChange="taskStore.toggleTask(task.id)"
            @click.stop
          ></ion-checkbox>
          <ion-label>
            <h2 :class="{ 'task-done': task.done }">{{ task.name }}</h2>
            <p>Due: {{ task.dueDate }}</p>
          </ion-label>
          <ion-button
            slot="end"
            fill="clear"
            color="danger"
            @click.stop="taskStore.deleteTask(task.id)"
          >
            <ion-icon :icon="trashOutline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>

      <!-- Floating Action Button -->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="openAddTaskModal">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- Add Task Modal -->
      <ion-modal :is-open="isModalOpen" @didDismiss="closeAddTaskModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Add New Task</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeAddTaskModal">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Task Name</ion-label>
            <ion-input 
              v-model="newTaskName" 
              placeholder="Enter task name"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Due Date</ion-label>
            <ion-input 
              v-model="newTaskDate" 
              type="date"
            ></ion-input>
          </ion-item>
          <ion-button 
            expand="block" 
            @click="addTask"
            class="ion-margin-top"
          >
            Add Task
          </ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonButtons,
  IonInput
} from '@ionic/vue';
import { addOutline, trashOutline } from 'ionicons/icons';
import { useTaskStore } from '@/stores/taskStore';

const router = useRouter();
const taskStore = useTaskStore();
const isModalOpen = ref(false);
const newTaskName = ref('');
const newTaskDate = ref('');

const openAddTaskModal = () => {
  isModalOpen.value = true;
};

const closeAddTaskModal = () => {
  isModalOpen.value = false;
  newTaskName.value = '';
  newTaskDate.value = '';
};

const addTask = () => {
  if (newTaskName.value.trim()) {
    taskStore.addTask({
      name: newTaskName.value,
      dueDate: newTaskDate.value || new Date().toISOString().split('T')[0]
    });
    closeAddTaskModal();
  }
};

const navigateToTask = (taskId: number) => {
  router.push(`/tabs/tasks/${taskId}`);
};
</script>

<style scoped>
.task-done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
