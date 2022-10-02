d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
	.then(function(dataset) {
		console.log(dataset);

		// CONFIGURATION
		const title = 'Doping in Professional Bicycle Racing';
		const subtitle = '35 Fastest times up Alpe d\'Huez';
		const width = 1000;
		const height = 600;
		const padding = 50;
		const xScale = d3.scaleLinear()
			.domain([
				d3.min(dataset, function(data) {
					return data.Year - 1;
				}),
				d3.max(dataset, function(data) {
					return data.Year + 1;
				})
			])
			.range([padding, width - padding]);
		const yScale = d3.scaleTime()
			.domain([
				d3.max(dataset, function(data) {
					return d3.timeParse('%M:%S')(data.Time);
				}),
				d3.min(dataset, function(data) {
					return d3.timeParse('%M:%S')(data.Time);
				})
			])
			.range([height - padding, padding]);
		const xAxis = d3.axisBottom(xScale)
			.tickFormat(function(year) {
				return year.toString();
			});
		const yAxis = d3.axisLeft(yScale)
			.tickFormat(d3.timeFormat('%M:%S'));
		
		// SVG
		const svg = d3.select('body')
			.append('svg')
			.attr('width', width)
			.attr('height', height);
		
		// TITLE
		svg.append('text')
			.attr('id', 'title')
			.text(title)
			.attr('x', width / 2)
			.attr('y', padding / 2)
			.attr('text-anchor', 'middle');
		svg.append('text')
			.attr('id', 'subtitle')
			.text(subtitle)
			.attr('x', width / 2)
			.attr('y', padding / 2 + 20)
			.attr('text-anchor', 'middle');

		// AXES
		svg.append('g')
			.attr('id', 'x-axis')
			.attr('transform',`translate(0, ${height - padding})`)
			.call(xAxis);
		svg.append('g')
			.attr('id', 'y-axis')
			.attr('transform', `translate(${padding}, 0)`)
			.call(yAxis);

		// LEGEND
		const legend = svg.append('g')
			.attr('id', 'legend')
		
		legend.append('rect')
			.attr('width', 10)
			.attr('height', 10)
			.attr('x', width - padding)
			.attr('y', height / 2)
			.attr('fill', 'cornflowerblue');

		legend.append('rect')
			.attr('width', 10)
			.attr('height', 10)
			.attr('x', width - padding)
			.attr('y', height / 2 + 20)
			.attr('fill', 'tomato');

		legend.append('text')
			.attr('x', width - padding - 10)
			.attr('y', height / 2 + 10)
			.attr('text-anchor', 'end')
			.text('No doping allegations');

		legend.append('text')
			.attr('x', width - padding - 10)
			.attr('y', height / 2 + 30)
			.attr('text-anchor', 'end')
			.text('Riders with doping allegations');

		// CIRCLES
		svg.selectAll('circle')
			.data(dataset)
			.enter()
			.append('circle')
			.attr('class', 'dot')
			.attr('data-xvalue', function(data) {
				return data.Year;
			})
			.attr('data-yvalue', function(data) {
				return d3.timeParse('%M:%S')(data.Time)
			})
			.attr('data-name', function(data) {
				return data.Name;
			})
			.attr('data-nationality', function(data) {
				return data.Nationality;
			})
			.attr('data-doping', function(data) {
				return data.Doping;
			})
			.attr('cx', function(data) {
				return xScale(data.Year);
			})
			.attr('cy', function(data) {
				return yScale(d3.timeParse('%M:%S')(data.Time));
			})
			.attr('r', 5)
			.attr('stroke', 'black')
			.attr('fill', function(data) {
				if (data.Doping) {
					return 'tomato';
				}
				else {
					return 'cornflowerblue';
				}
			})
			.on('mouseover', function(event) {
				d3.select('body')
					.append('div')
					.attr('id', 'tooltip')
					.style('position', 'absolute')
					.style('left', event.target.cx.baseVal.value + 20 + 'px')
					.style('top', event.target.cy.baseVal.value + 'px')
					.style('background-color', 'lightsteelblue')
					.style('opacity', 0.9)
					.style('border-radius', '5px')
					.style('padding', '5px')
					.style('margin', '0')
					.attr('data-year', event.target.dataset.xvalue)
					.attr('data-time', event.target.dataset.yvalue)
					.html(`
						${event.target.dataset.name}, ${event.target.dataset.nationality}</br>
						Year: ${event.target.dataset.xvalue}, Time: ${new Date(event.target.dataset.yvalue).getMinutes()}:${new Date(event.target.dataset.yvalue).getSeconds() < 10 ? '0' + new Date(event.target.dataset.yvalue).getSeconds() : new Date(event.target.dataset.yvalue).getSeconds()}</br>
						${event.target.dataset.doping}
					`)
			})
			.on('mouseout', function(event) {
				d3.select('#tooltip')
					.remove();
			});
	});