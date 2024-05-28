import { createApp } from 'vue'
import 'normalize.css'
import './type.css'
import router from './router'
import App from './App.vue'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import Prism from 'prismjs';

VMdPreview.use(githubTheme, {
  Prism,
});
const app =createApp(App)
app.use(router)
app.use(VMdPreview)
app.mount('#app')
