<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Completed</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Completed Tasks</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="task in completedTasks" :key="task.id" @click="navigateToTask(task.id)" button>
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

      <div v-if="completedTasks.length === 0" class="ion-padding ion-text-center">
        <p>No completed tasks yet. Complete a task to see it here!</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
  IonIcon
} from '@ionic/vue';
import { trashOutline } from 'ionicons/icons';
import { useTaskStore } from '@/stores/taskStore';

const router = useRouter();
const taskStore = useTaskStore();

const completedTasks = computed(() => {
  return taskStore.tasks.filter(task => task.done === true);
});

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
