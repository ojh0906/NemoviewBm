import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./_router";

createApp(App).mount('#app')

const app = createApp(App)
    .use(router)
    .mount('#app')
