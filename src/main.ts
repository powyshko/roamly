import { createApp } from 'vue';
import App from '@/App.vue';
import '@/styles/variables.css';
import '@/styles/style.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import VueMaplibreGl from '@indoorequal/vue-maplibre-gl';
import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import router from '@/app/router';

const app = createApp(App);

app.use(VueMaplibreGl);

setWorkerUrl(workerUrl);

app.use(router);

app.mount('#app');
