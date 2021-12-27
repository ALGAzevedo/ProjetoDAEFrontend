import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Toaster from "@meforma/vue-toaster"
import FieldErrorMessage from "./components/global/FieldErrorMessage";
import ConfirmationDialog from "./components/global/ConfirmationDialog";

import CustomConfirmationDialog from "./components/global/CustomConfirmationDialog";

// Import Shared compontents
import './assets/css/dashboard.css';

import AppHeader from "./components/shared/AppHeader";


let toastOptions = {
    position: 'top',
    timeout: 3000,
    pauseOnHover: true
}

const apiDomain = "http://localhost:8080/cardiacos"





const app = createApp(App).use(store).use(router).use(Toaster, toastOptions)




store.$toast = app.$toast

axios.defaults.baseURL = `${apiDomain}/api`
app.config.globalProperties.$serverUrl = apiDomain


app.config.globalProperties.$axios = axios

// Remove the following line latter
// this.$userId with represent the logged in user
//app.config.globalProperties.$userId = 1

app.component('field-error-message', FieldErrorMessage)
app.component('confirmation-dialog', ConfirmationDialog)
app.component('custom-confirmation-dialog', CustomConfirmationDialog)

app.component('AppHeader',AppHeader)



app.mount('#app')



