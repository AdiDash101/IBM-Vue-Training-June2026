<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title>Task Details</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="task">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ task.name }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card class="ion-margin">
        <ion-card-header>
          <ion-card-title>{{ task.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>
              <h3>Status</h3>
              <p>{{ task.done ? 'Completed' : 'Pending' }}</p>
            </ion-label>
            <ion-checkbox
              slot="end"
              :checked="task.done"
              @ionChange="taskStore.toggleTask(task.id)"
            ></ion-checkbox>
          </ion-item>

          <ion-item>
            <ion-label>
              <h3>Due Date</h3>
              <p>{{ task.dueDate }}</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <h3>Task ID</h3>
              <p>{{ task.id }}</p>
            </ion-label>
          </ion-item>

          <div class="ion-margin-top">
            <ion-button
              expand="block"
              color="danger"
              @click="deleteAndGoBack"
            >
              Delete Task
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton
} from '@ionic/vue';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();

const task = computed(() => {
  const id = parseInt(route.params.id as string);
  return taskStore.tasks.find(t => t.id === id);
});

const deleteAndGoBack = () => {
  if (task.value) {
    taskStore.deleteTask(task.value.id);
    router.push('/tabs/tab1');
  }
};
</script>

<style scoped>
ion-card {
  max-width: 100%;
}
</style>
