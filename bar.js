var margin = {top: 20, right: 20, bottom: 30, left: 40},
 width = 960 - margin.left - margin.right,
 height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
 .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
 .range([height, 0]);

var xAxis = d3.svg.axis()
 .scale(x)
 .orient("bottom");

var yAxis = d3.svg.axis()
 .scale(y)
 .orient("left")
 .ticks(10);

var svg = d3.select("body").append("svg")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 d3.csv("https://data.cityofnewyork.us/resource/erm2-nwe9.csv?$where=starts_with(complaint_type,'Noise') AND created_date >='2015-08-01T00:00:00' AND incident_zip='11231' &$select=created_date", function (error, data) {
    if (error) throw error;