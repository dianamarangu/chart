
// 1. The 'VISUAL SPACE' that I am working with...  see http://stackoverflow.com/questions/21639305/d3js-take-data-from-an-array-instead-of-a-file
// 1a. MARGINS: width and height
		var margin = {top: 40, right: 20, bottom: 30, left: 40},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;
			
// 1b. FORMATS... looking good..
		//var formatPercent = d3.format("") //hold for now not working as I want in the y axis (tickformat).. so changed used ticks

	
// 1c. SCALES: I have space and data.. need to make sure the data fits in the space :-)...scale
		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);    //categorical data
	
		var y = d3.scale.linear()
			.range([height, 0])
					
// 1d. AXES: this is how we will visualize the axes
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			//.tickFormat(formatPercent)
			.ticks(10);
// 1e. TIP
		var tip = d3.tip()
			.attr('class', 'd3-tip') //references the css file
			.offset([-10, 0])
			.html(function(d) {return d.hburden_rank + ": <span style='color:yellow'>" + d3.round(d.mr) + "<strong></strong> % of TB cohort";})
			
// 1f. SVG... the container where all the action will be happening
		var svg = d3.select("body").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.call(tip); 

		
// 2. GETTING IN THE ELEMENTS ATTACHED TO THE DATA into the visual space * http://bost.ocks.org/mike/bar/3/ * http://stackoverflow.com/questions/21639305/d3js-take-data-from-an-array-instead-of-a-file

// 2a. DATA DOMAIN: Data - already read into the html as data.js that is the data downloaded: order matters [data, map code, running code]
		
		data.sort(function(a,b) {return Number(a.hburden_rankn) - Number(b.hburden_rankn)}); //sorted the 22hbc in ascending order 1,2,3...22
		
		x.domain(data.map(function(d) { return d.hburden_rankn; }));
		y.domain([0, d3.max(data, function(d) { return d.mr; })]);
		
		
		
// 2b. Data embedded ELEMENTS added into the container i.e. svg... these are the axes and bars (references css file)
		svg.append("text")
		.attr("class", "title")
		.attr("x", x(data[0].name))
		.attr("y", -26)
		.text("Do Country-specific TB Case Fatality Rates Influence WHO STOP Strategy Uptake?");
		
		
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll(".tick text")
			.call(wrap, x.rangeBand());

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 10)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Frequency");

		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.hburden_rankn); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.mr); })
			.attr("height", function(d) { return height - y(d.mr); })
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)



// 3 Additional Functionality
// 3a. TEXT WRAPPING
		function wrap(text, width) {
		text.each(function() {
			var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.1, // ems
			y = text.attr("y"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
			while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			}
			}
		});
	}
 
// 3b. BUTTON SETS
			$('#s1').buttonset()
			$('#s2').buttonset()
			$('#s3').buttonset()
			$('#s4').buttonset()
			$('#s5').buttonset()
			$('#s6').buttonset()

			$('#s1').on('click', function() {
			// Get value of radio
			var s1 = $('input[name="Component"]:checked').attr('id')
	
			// Do something about it
			//settings.sex = sex
			//draw()
			})
 
  