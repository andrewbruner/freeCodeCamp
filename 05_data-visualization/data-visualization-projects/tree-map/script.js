let body = d3.select('body');

body.append('h1')
	.attr('id', 'title')
	.text('Movie Sales');

body.append('div')
	.attr('id', 'description')
	.text('Top 95 Highest Grossing Movies Grouped by Genre');

let treeMap = body.append('svg')
	.attr('id', 'tree-map')
	.attr('width', '960')
	.attr('height', 570);

let tooltip = body.append('div')
	.attr('class', 'tooltip')
	.attr('id', 'tooltip')
	.style('opacity', '0');

const MOVIE_SALES = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

d3.json(MOVIE_SALES)
	.then(movies => {

		const CATEGORY = ['Action','Drama','Adventure','Family','Animation','Comedy','Biography'];
		const PALETTE = ['#d64e12','#f9a52c','#efdf48','#8bd346','#60dbe8','#16a4d8','#9b5fe0'];

		let hierarchy = d3.hierarchy(movies)
			.sum(movie => movie.value);
		let treemap = d3.treemap()
			.size([960, 570])
			.padding(1);
		let root = treemap(hierarchy);

		let groups = treeMap.selectAll('g')
			.data(root.leaves())
			.enter()
			.append('g')
			.attr('class', 'group');

		groups.append('rect')
			.attr('class', 'tile')
			.attr('data-name', movie => movie.data.name)
			.attr('data-category', movie => movie.data.category)
			.attr('data-value', movie => movie.data.value)
			.attr('x', movie => movie.x0)
			.attr('y', movie => movie.y0)
			.attr('width', movie => movie.x1 - movie.x0)
			.attr('height', movie => movie.y1 - movie.y0)
			.attr('fill', movie => PALETTE[CATEGORY.indexOf(movie.data.category)])
			.on('mouseover', (event, movie) => {
				tooltip.style('opacity', '0.9')
					.attr('data-value', movie.data.value)
					.html(`Title: ${movie.data.name}<br>Genre: ${movie.data.category}<br>Value: ${movie.data.value}`);
			})
			.on('mouseout', () => tooltip.style('opacity', '0'));
		
		groups.append('text')
			.attr('class', 'tile-text')
			.attr('x', movie => movie.x0)
			.attr('y', movie => movie.y0 + 14)
			.text(movie => movie.data.name);

		let legend = body.append('svg')
			.attr('id', 'legend')
			.attr('width', '960')
			.append('g')
			.attr('transform', 'translate(0, 20)');

		let legendGroups = legend.selectAll('g')
			.data(root.children)
			.enter()
			.append('g')
			.attr('transform', (category, index) => `translate(${(960 / 8) * index}, 0)`);

		legendGroups.append('rect')
			.attr('class', 'legend-item')
			.attr('width', '15')
			.attr('height', '15')
			.attr('fill', category => PALETTE[CATEGORY.indexOf(category.data.name)]);
		
		legendGroups.append('text')
			.attr('x', '18')
			.attr('y', '13')
			.text(category => category.data.name);
	});
