function draw_graph(data){

	var width = 800;
	var height = 600;
	//take colors as inputs from user?
	var color1 = "red";
	var color2 = "blue";
	var jsData = d3.entries(data);

	var numTokens = 0;
	var maxFrequency = 0;
	var maxLog = 0;
	var minLog = 0;

	for(var i = 0; i < jsData.length; i++){
		numTokens += jsData[i].value[1]; 
		if(jsData[i].value[1] > maxFrequency){
			maxFrequency = jsData[i].value[1];
		}
		if(jsData[i].value[0] > maxLog){
			maxLog = jsData[i].value[0];
		}
		if(jsData[i].value[0] < minLog){
			minLog = jsData[i].value[0];
		}
	}

	var maxLogMagnitude = Math.max(Math.abs(maxLog), Math.abs(minLog));

	console.log(jsData);

	var body = d3.select("body");

	var canvas = d3.select("body")
				 .append("svg")
				 .attr("width", width)
				 .attr("height", height)
				 .append("g");
				 // .attr("transform", "translate(20, 20)");


	var logScale = d3.scaleLinear()
					.domain([minLog, maxLog])
					.range([height*0.2, height*0.8]);

	var frequencyScale = d3.scaleLinear()
					.domain([0, maxFrequency])
					.range([width*0.2, width*0.8]);

	var radiusScale = d3.scaleLinear()
					.domain([0, maxLogMagnitude])
					.range([15, 25]);

	var opacityScale = d3.scaleLinear()
					   .domain([0, maxLogMagnitude])
					   .range([0.1, 0.5]);

	var fontSizeScale = d3.scaleLinear()
						.domain([0, maxLogMagnitude])
						.range([10, 20]);

	var xAxis = d3.axisBottom()
				.scale(frequencyScale)
				.ticks(3);

	var yAxis = d3.axisLeft()
				.scale(logScale)
				.ticks(3);

	// d.value[0] = log score
	// d.value[1] = frequency
	// d.key = token string
	var circles = canvas.selectAll("circle")
				  .data(jsData)
				  .enter()
				  		.append("circle")
				  		.attr("cy", function(d){return logScale(d.value[0])})
				  		.attr("cx", function(d){return frequencyScale(d.value[1])})
				  		.attr("r", function(d){return radiusScale(Math.abs(d.value[0]))})
				   		.attr("fill", function(d){if (d.value[0] > 0) return color1;
				   								  else return color2;})
				   		.attr("opacity", function(d){if(Math.abs(d.value[0]) < 0.5*maxLogMagnitude &&
				   			Math.abs(d.value[0]) < 1.96) return 0;
				   		 else return opacityScale(Math.abs(d.value[0]))})
				   		.a

	var labels = canvas.selectAll("text")
				 .data(jsData)
				 .enter()
				 		.append("text")
				 		.attr("y", function(d){return logScale(d.value[0])})
				 		.attr("x", function(d){return frequencyScale(d.value[1])})
				 		.attr("fill", function(d){if (d.value[0] > 0) return color1;
				   								  else return color2;})
				 		.attr("opacity", function(d){if(Math.abs(d.value[0]) < 0.5*maxLogMagnitude &&
				 			Math.abs(d.value[0]) < 1.96) return 0;
				   		 else return 1.5*opacityScale(Math.abs(d.value[0]))})
				 		.attr("font-size", function(d){return fontSizeScale(Math.abs(d.value[0])) + "px"})
				 		.attr("text-anchor", "middle")
				 		.attr("dy", ".3em")
				 		.text(function(d){return d.key})

	canvas.append("g")
			.attr("transform", "translate(0," + height/2 + ")")
			.attr("opacity", 0.4)
			.call(xAxis);

	canvas.append("g")
			.attr("transform", "translate(50, 0)")
			.attr("opacity", 0.4)
			.call(yAxis);
	// var circle = canvas.append("circle")
	// 			 .attr("cx", 250)
	// 			 .attr("cy", 250)
	// 			 .attr("r", 50)
	// 			 .attr("fill", "red");

	// var line = canvas.append("line")
	// 			.attr("x1", 50)
	// 			.attr("y1", 50)
	// 			.attr("x2", 100)
	// 			.attr("y2", 100)
	// 			.attr("stroke", "black");

	// body.append("text")
	// 	.text(data.hi);
}