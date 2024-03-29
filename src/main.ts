import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import App from './App.vue'

import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App);
app.use(PrimeVue);
app.directive('tooltip', Tooltip);
app.mount('#app')
