import Todos from './todos.js';

export default {
  data() {
    return {
      Todos
    }
  },
  template: `<footer>A webapp by {{ Todos.author }}</footer>`
}