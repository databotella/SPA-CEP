// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importando Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Icones especificos
import { faSearch, faArrowLeft, faMapMarkerAlt, faBuilding, faCity, faPhone } from '@fortawesome/free-solid-svg-icons'
library.add(faSearch, faArrowLeft, faMapMarkerAlt, faBuilding, faCity, faPhone) // Icones

createApp(App)
	.component('font-awesome-icon', FontAwesomeIcon) //componente global
	.use(router)
	.mount('#app')
