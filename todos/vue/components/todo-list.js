import Todos from './todos.js';

export default {
  data() {
    return {
      Todos
    }
  },
  template: `
		<ul>
			<li v-for="todo in Todos.todoList" :data-id=todo.id >
      <input type="checkbox" :checked="todo.isCompleted === 'true'" @change="event => Todos.toggleTodo(event)" />  
      <span @dblclick="event => Todos.editTodo(event)">{{ todo.text }}</span>
      <button @click="event => Todos.deleteTodo(event)">x</button>
      </li>
		</ul>`
}