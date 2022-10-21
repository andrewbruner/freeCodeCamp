import Todos from './todos.js';

export default {
  data() {
    return {
      Todos
    }
  },
  template: `<h1>{{ Todos.title }}</h1>`
}