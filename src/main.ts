import { createApp } from 'vue'
import App from '@/App.vue'
import '@/style.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import VueMaplibreGl from '@indoorequal/vue-maplibre-gl'
import { setWorkerUrl } from 'maplibre-gl'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'

const app = createApp(App)

app.use(VueMaplibreGl)

setWorkerUrl(workerUrl)

app.mount('#app')
