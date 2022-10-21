const Todos = {
	title: 'Todos',
	placeholder: 'What needs to be done?',
	todoList: [],
	author: 'Andrew Bruner',
	loadCookie() {
		let cookie = document.cookie;
		cookie = cookie.split('; ');
		cookie = cookie.find(cookie => cookie.startsWith('todos='));
		if (cookie) {
			cookie = cookie.split('=');
			cookie = cookie[1];
			cookie = JSON.parse(cookie);
			this.todoList = cookie.todoList;
		}
	},
	updateCookie() {
		let cookie = { todoList: this.todoList };
		cookie = JSON.stringify(cookie);
		document.cookie = `todos=${cookie}`;
	},
	addTodo(event) {
		if (event.key === 'Enter') {
			let text = event.target.value;
			event.target.value = '';
			let id = Date.now()
			id = id.toString();
			let isCompleted = 'false';
			this.todoList.push({ id, text, isCompleted });
			this.updateCookie();
		}
	},
	toggleTodo(event) {
		let todo = event.target.parentElement;
		let id = todo.dataset.id;
		todo = this.todoList.find(todo => todo.id === id);
		todo.isCompleted = todo.isCompleted === 'true' ? 'false' : 'true';
		this.updateCookie();
	},
	editTodo(event) {
		let span = event.target;
		let input = document.createElement('input');
		input.type = 'text';
		input.value = span.textContent;
		let updateTodo = () => {
			let text = input.value;
			let li = span.parentElement;
			let id = li.dataset.id;
			let todo = this.todoList.find(todo => todo.id === id);
			todo.text = text;
			input.remove();
			this.updateCookie();
		}
		input.addEventListener('blur', updateTodo );
		input.addEventListener('keydown', event => {
			if (event.key === 'Enter') {
				input.blur();
			}
		});
		
		span.textContent = '';
		span.append(input);
		input.focus();
	},
	deleteTodo(event) {
		let todo = event.target.parentElement;
		let id = todo.dataset.id;
		let index = this.todoList.findIndex(todo => todo.id === id);
		this.todoList.splice(index, 1);
		this.updateCookie();
	}
};

export default Todos;