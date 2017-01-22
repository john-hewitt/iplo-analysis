function draw_graph(data, sortedData, color1_, color2_){
	if (data == undefined || sortedData == undefined || color1_ == undefined || color2_ == undefined) return;
	var width = 800;
	var height = 600;

	var color1 = color1_.toString()
	var color2 = color2_.toString()

	// Array of key (string) values (tuple)
	var jsData = d3.entries(data);
	var sortedData = d3.entries(sortedData);
	var numTokens = 0;
	var maxFrequency = 0;
	var maxLog = 0;
	var minLog = 0;

	//Each element[0] is string, element[1] is (log, freq)
	var highestLogs = sortedData[0].value[0];
	var lowestLogs = sortedData[0].value[1];

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

	// console.log(jsData);
	// console.log(lowestLogs);
	// console.log(highestLogs);

	var body = d3.select("body");

	var canvas = d3.select("body")
				 .append("svg")
				 .attr("width", width)
				 .attr("height", height)
				 .attr("class", "graph-svg")
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
					.range([5, 25]);

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
				   		.attr("opacity", function(d){return opacityScale(Math.abs(d.value[0]))})
				   		.attr("id", function(d){return d.key + "_circle"});

	var upperLabels = canvas.selectAll("h6")
					 .data(highestLogs)
					 .enter()
					 		.append("text")
					 		.attr("y", function(d, i){return logScale(d[1][0])})
					 		.attr("x", function(d){return frequencyScale(d[1][1])})
					 		.attr("fill", "black")
					 		.attr("opacity", function(d){if(Math.abs(d[1][0]) < 0.2*maxLogMagnitude &&
					 			Math.abs(d[1][0]) < 1.96 || d[1][1] < 2) return 0;
					   		 else return 1.5*opacityScale(Math.abs(d[1][0]))})
					 		.attr("font-size", function(d){return fontSizeScale(Math.abs(d[1][0])) + "px"})
					 		.attr("text-anchor", "middle")
					 		.attr("dy", ".3em")
					 		.text(function(d){return d[0]})
					 		.attr("id", function(d){return d[0] + "_label"});

	var lowerLabels = canvas.selectAll("h6")
					 .data(lowestLogs)
					 .enter()
					 		.append("text")
					 		.attr("y", function(d, i){return logScale(d[1][0])})
					 		.attr("x", function(d){return frequencyScale(d[1][1])})
					 		.attr("fill", "black")
					 		.attr("opacity", function(d){if(Math.abs(d[1][0]) < 0.2*maxLogMagnitude &&
					 			Math.abs(d[1][0]) < 1.96 || d[1][1] < 2) return 0;
					   		 else return 1.5*opacityScale(Math.abs(d[1][0]))})
					 		.attr("font-size", function(d){return fontSizeScale(Math.abs(d[1][0])) + "px"})
					 		.attr("text-anchor", "middle")
					 		.attr("dy", ".3em")
					 		.text(function(d){return d[0]})
					 		.attr("id", function(d){return d[0] + "_label"});;

	//Each element[0] is string, element[1] is (log, freq)
	var upperSideLabels = canvas.selectAll("h6")
					 .data(highestLogs)
					 .enter()
					 		.append("text")
					 		.attr("y", function(d, i){return ((logScale(0)) - height*0.2) / 10 * i + height*0.2})
					 		.attr("x", width - 100)
					 		.attr("fill", function(d){if (d[1][0] > 0) return color1;
					   								  else return color2;})
					 		.attr("opacity", function(d){return 1.5*opacityScale(Math.abs(d[1][0]))})
					 		.attr("font-size", function(d){return fontSizeScale(Math.abs(d[1][0])) + "px"})
					 		.attr("text-anchor", "middle")
					 		.attr("dy", ".3em")
					 		.attr("id", function(d){return d[0]})
					 		.text(function(d){return d[0]});

	var lowerSideLabels = canvas.selectAll("h6")
					 .data(lowestLogs)
					 .enter()
					 		.append("text")
					 		.attr("y", function(d, i){return (0.8*height - logScale(0)) / 10 * (i) + logScale(0) + 25})
					 		.attr("x", width - 100)
					 		.attr("fill", function(d){if (d[1][0] > 0) return color1;
					   								  else return color2;})
					 		.attr("opacity", function(d){return 1.5*opacityScale(Math.abs(d[1][0]))})
					 		.attr("font-size", function(d){return fontSizeScale(Math.abs(d[1][0])) + "px"})
					 		.attr("text-anchor", "middle")
					 		.attr("dy", ".3em")
					 		.attr("id", function(d){return d[0]})
					 		.text(function(d){return d[0]});

	var moveToFront = function() {
	  return this.each(function(){
	    this.parentNode.appendChild(this);
	  });
	};

	lowerSideLabels.on("mouseover",
	 function(d,i){$("#" + d[0] + "_circle").parent().append($("#" + d[0] + "_circle"));
	 			   $("#" + d[0] + "_label").parent().append($(("#" + d[0] + "_label")));
	 				d3.select("#" + d[0] + "_circle")
					 .style("stroke", color2)
					 .style("stroke-width", 5)
					 .style("stroke-opacity", 1);
		});

	lowerSideLabels.on("mouseout",
	 function(d,i){d3.select("#" + d[0] + "_circle")
					 .style("stroke", color2)
					 .style("stroke-width", 5)
					 .style("stroke-opacity", 0);
		});

	upperSideLabels.on("mouseover",
	 function(d,i){$("#" + d[0] + "_circle").parent().append($("#" + d[0] + "_circle"));
	 			   $("#" + d[0] + "_label").parent().append($(("#" + d[0] + "_label")));
	 				d3.select("#" + d[0] + "_circle")
					 .style("stroke", color1)
					 .style("stroke-width", 5)
					 .style("stroke-opacity", 1);
		});

	upperSideLabels.on("mouseout",
	 function(d,i){d3.select("#" + d[0] + "_circle")
					 .style("stroke", color1)
					 .style("stroke-width", 5)
					 .style("stroke-opacity", 0);
		});

	canvas.append("g")
			.attr("transform", "translate(0," + logScale(0) + ")")
			.attr("opacity", 0.4)
			.call(xAxis);

	canvas.append("g")
			.attr("transform", "translate(50, 0)")
			.attr("opacity", 0.4)
			.call(yAxis);
}