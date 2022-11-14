const todos = {

	_todos: [],

	_createId() {
		let id = 0;
		this._todos.forEach(todo => id = parseInt(todo.id) >= id ? parseInt(todo.id) + 1 : id);
		return id < 10 ? `00${id}` : id < 100 ? `0${id}` : `${id}`;
	},

	/**
	 * Get an array of todo objects.
	 * @param {Object} [options] - The options object.
	 * @param {boolean} [options.showCompleted=true] - Whether completed todo objects are included in returned array.
	 * @returns {Object[]} An array of todo objects.
	 */
	getTodos({ showCompleted = true } = { }) {
		return showCompleted ? this._todos : this._todos.filter(todo => !todo.isComplete);
	},

	/**
	 * Add a new todo object.
	 * @param {string} text - The text of new todo object .
	 * @returns {Object} The new todo object.
	 */
	addTodo(text) {
		const newTodo = {
			id: this._createId(),
			text,
			isComplete: false,
		};
		this._todos = [...this._todos, newTodo];
		return newTodo;
	},

	/**
	 * Edit a todo object.
	 * @param {string} id - The ID of the todo object to edit. 
	 * @param {string} text - The new text of todo object to edit.
	 * @returns {Object} The edited todo object.
	 */
	editTodo(id, text) {
		let editedTodo;
		this._todos = this._todos.map(todo => todo.id === id ? editedTodo = { ...todo, text } : todo);
		return editedTodo;
	},

	/**
	 * Toggle a todo object's completion.
	 * @param {string} id - The ID of the todo object to toggle.
	 * @returns {Object} The toggled todo object.
	 */
	toggleTodo(id) {
		let toggledTodo;
		this._todos = this._todos.map(todo => todo.id === id ? toggledTodo = { ...todo, isComplete: !todo.isComplete } : todo);
		return toggledTodo;
	},

	/**
	 * Toggle all todo objects' completion.
	 * @returns {boolean} Whether all todo objects are now completed.
	 */
	toggleAllTodos() {
		const isComplete = this._todos.filter(todo => !todo.isComplete).length > 0;
		this._todos = this._todos.map(todo => ({ ...todo, isComplete }));
		return isComplete;
	},

	/**
	 * Move a todo object to a targeted array index.
	 * @param {string} id - The ID of the todo object to move. 
	 * @param {number} targetIndex - The target index to move the todo object.
	 * @returns {Object} The moved todo object.
	 */
	moveTodo(id, targetIndex) {
		const [movedTodo] = this._todos.filter(todo => todo.id === id);
		const originIndex = this._todos.findIndex(todo => todo.id === id);
		this._todos = originIndex > targetIndex
			// moving backward
			? [ ...this._todos.slice(0, targetIndex),
				  movedTodo,
					...this._todos.slice(targetIndex, originIndex),
					...this._todos.slice(originIndex + 1)
				]
			// moving forward
			: [ ...this._todos.slice(0, originIndex),
				  ...this._todos.slice(originIndex + 1, targetIndex + 1),
					movedTodo,
					...this._todos.slice(targetIndex + 1)
				];
			return movedTodo;
	},

	/**
	 * Delete a todo object
	 * @param {string} id - The ID of the todo object to delete.
	 * @returns {Object} The deleted todo object.
	 */
	deleteTodo(id) {
		const deletedTodo = this._todos.filter(todo => todo.id === id);
		this._todos = this._todos.filter(todo => todo.id !== id);
		return deletedTodo;
	},

	/**
	 * Delete all completed todo objects.
	 * @returns {Object[]} An array of all deleted todo objects.
	 */
	clearTodos() {
		const clearedTodos = this._todos.filter(todo => todo.isComplete);
		this._todos = this._todos.filter(todo => !todo.isComplete);
		return clearedTodos;
	},

};

todos.addTodo('one');
todos.addTodo('two');
todos.addTodo('three');
todos.addTodo('four');
todos.addTodo('zero');
console.log(todos.getTodos());