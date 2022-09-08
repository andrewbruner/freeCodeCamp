let body = d3.select('body');

let main = body.append('div')
	.attr('id', 'main');

let title = main.append('h1')
	.attr('id', 'title')
	.text('United States Educational Attainment');

let description = main.append('div')
	.attr('id', 'description')
	.text(`Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)`);

let svg = main.append('svg')
	.attr('width', '960')
	.attr('height', '600');

const EDUCATION_FILE = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const COUNTIES_FILE = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

Promise.all([d3.json(EDUCATION_FILE), d3.json(COUNTIES_FILE)])
	.then(data => {
		let educationData = data[0];
		let scale = [3,12,21,30,39,48,57,66];
		let pallete = ['#c1e7ff','#a3cbe5','#86b0cc','#6996b3','#4c7c9b','#2d6484','#004c6d'];
		let countiesData = data[1];
		countiesData = topojson.feature(countiesData, countiesData.objects.counties).features;
		let path = d3.geoPath();

		let legend = svg.append('g')
			.attr('class', 'key')
			.attr('id', 'legend')
			.attr('transform', 'translate(0, 40)')
			.attr('fill', 'none')
			.attr('font-size', '10')
			.attr('font-family', 'sans-serif')
			.attr('text-anchor', 'middle');

		legend.selectAll('rect')
			.data(scale)
			.enter()
			.append('rect')
			.attr('height', '8')
			.attr('x', (data, index) => 600 + (33 * index))
			.attr('width', (data, index) => index === 7 ? 0 : 33)
			.attr('fill', (data, index) => pallete[index]);

		let ticks = legend.selectAll('g')
			.data(scale)
			.enter()
			.append('g')
			.attr('class', 'tick')
			.attr('opacity', '1')
			.attr('transform', (data, index) => `translate(${600.5 + (33 * index)}, 0)`);

		ticks.append('line')
			.attr('stroke', 'currentColor')
			.attr('y2', '13');
		
		ticks.append('text')
			.attr('fill', 'currentColor')
			.attr('y', '16')
			.attr('dy', '0.71em')
			.text(data => `${data}%`);

		let counties = svg.append('g')
			.attr('class', 'counties');
		
		counties.selectAll('path')
			.data(countiesData)
			.enter()
			.append('path')
			.attr('class', 'county')
			.attr('data-fips', county => county.id)
			.attr('data-education', county => educationData.filter(area => area.fips === county.id)[0].bachelorsOrHigher)
			.attr('fill', county => {
				let score = educationData.filter(area => area.fips === county.id)[0].bachelorsOrHigher;
				return score < scale[1] ? pallete[0]
					: score < scale[2] ? pallete[1]
					: score < scale[3] ? pallete[2]
					: score < scale[4] ? pallete[3]
					: score < scale[5] ? pallete[4]
					: score < scale[6] ? pallete[5]
					: pallete[6]
			})
			.attr('d', path)
			.on('mouseover', (event, county) => {
				tooltip.style('opacity', '0.9')
					.style('left', () => `${d3.pointer(event)[0] + 75}px`)
					.style('top', () => `${d3.pointer(event)[1] + 160}px`)
					.attr('data-education', () => educationData.filter(area => area.fips === county.id)[0].bachelorsOrHigher)
					.text(() => {
						let area = educationData.filter(area => area.fips === county.id)[0];
						return `${area.area_name}, ${area.state}: ${area.bachelorsOrHigher}%`;
					});
			})
			.on('mouseout', () => {
				tooltip.style('opacity', '0');
			});

		let tooltip = body.append('div')
			.attr('class', 'tooltip')
			.attr('id', 'tooltip')
			.style('opacity', '0');
	});
