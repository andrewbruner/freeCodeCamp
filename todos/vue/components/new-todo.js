import Todos from './todos.js';

export default {
  data() {
    return {
			Todos
    }
  },
  template: `<input @keydown="event => Todos.addTodo(event)" @blur="event => Todos.addTodo(event)" type="text" :placeholder="Todos.placeholder" autofocus />`
}