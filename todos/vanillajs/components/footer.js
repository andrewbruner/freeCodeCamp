const footer = document.createElement('footer');
footer.classList.add('footer');
footer.style.display = 'none';

const todoCount = document.createElement('span');
todoCount.classList.add('todo-count');
const strong = document.createElement('strong');
strong.textContent = '0';
todoCount.append(strong);
todoCount.append(' items left');
footer.append(todoCount);

const ul = document.createElement('ul');
ul.classList.add('filters');
const filters = ['all', 'active', 'completed'];
for (let i = 0; i < filters.length; i++) {
	const li = document.createElement('li');
	const a = document.createElement('a');
	console.log(a.href);
	if (filters[i] === 'all') {
		a.href = '#/';
		a.classList.add('selected');
	} else {
		a.href = '#/' + filters[i];
	}
	a.textContent = filters[i].charAt(0).toUpperCase() + filters[i].slice(1);
	li.append(a);
	ul.append(li);
}
footer.append(ul);

const button = document.createElement('button');
button.classList.add('clear-completed');
button.style.display = 'none';
footer.append(button);

export default footer;