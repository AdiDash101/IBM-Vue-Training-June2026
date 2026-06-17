import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Add the explicit .js extension here:
import router from '../views/activity3/router-index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')