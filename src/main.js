import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

// auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`

const app = createApp(App)

app.use(store).use(router).mount('#app')
