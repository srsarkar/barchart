// Set our margins
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60
},
width = 700 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// Our X scale
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// Our Y scale
var y = d3.scale.linear()
    .rangeRound([height, 0]);

// Our color bands
var color = d3.scale.ordinal()
    .range(["#308fef", "#5fa9f3", "#1176db"]);

// Use our X scale to set a bottom axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Same for our left axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

    // Add our chart to the #chart div
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://data.cityofnewyork.us/resource/8wiv-nsvy.csv?"
  + "$select=Date and Time, NotificationType" 
  + "&$$app_token=ek56Up2jSU1vTl26SHLC15B8s", function (error, data) {
  ...
});

    // Make sure our numbers are really numbers
data.forEach(function (d) {
    d.year = +d.year;
    d.bus = +d.bus;
    d.paratransit = +d.paratransit;
    d.rail = +d.rail;
});

// Map our columns to our colors
color.domain(d3.keys(data[0]).filter(function (key) {
    return key !== "year";
}));

data.forEach(function (d) {
    var y0 = 0;
    d.types = color.domain().map(function (name) {
        return {
            name: name,
            y0: y0,
            y1: y0 += +d[name]
        };
    });
    d.total = d.types[d.types.length - 1].y1;
});