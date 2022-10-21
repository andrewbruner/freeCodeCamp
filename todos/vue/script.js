import { createApp } from 'vue';
import App from './components/app.js';
import Todos from './components/todos.js';

const app = createApp(App);
document.title = Todos.title;
Todos.loadCookie();
app.mount('#app');