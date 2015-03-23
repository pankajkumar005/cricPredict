var drawChart = function(selector, data, config) {
	
	var filteredData = filterData(data, config),
		pieData = convertData(filteredData, config);

	var width = 960,
		height = 500,
		radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var arc = d3.svg.arc()
		.outerRadius(radius - 10)
		.innerRadius(0);

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.val; });

	var svg = d3.select(selector).append("svg")
		.attr("width", width)
		.attr("height", height)
	  .append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		
	var g = svg.selectAll(".arc")
      .data(pie(pieData))
	  .enter().append("g")
      .attr("class", "arc");

	  g.append("path")
		  .attr("d", arc)
		  .style("fill", function(d) { return color(d.data.key); });

	  g.append("text")
		  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		  .attr("dy", ".35em")
		  .style("text-anchor", "middle")
		  .text(function(d) { return d.data.key + "(" + d.data.percentage + "% - "+ d.data.number +" matches)"; });
},
convertData = function(data, config) {
	var pieData = [];
	data.each(function(d){
		var obj = pieData.find(function(_p){
			return _p.key == d[config.count];
		});
		if(!obj) {
			pieData.push({
					key: d[config.count],
					val: 1
			});
		} else {
			obj.val = obj.val + 1;
		}
	});
	var total = pieData.pluck("val").reduce(function(p, c){
		return p + c;
	});
	
	pieData.each(function(_p){
		_p["percentage"] = ((_p.val/total) * 100).toFixed(2);
		_p["number"] = _p.val;
	});
	
	return pieData;
};
