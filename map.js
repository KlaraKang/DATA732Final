/* CONSTANTS AND GLOBALS*/
const width = window.innerWidth * 0.9,
height = window.innerHeight * 0.8,
margin = { top: 20, bottom: 20, left: 20, right: 20 },
radius = 3;     

let xScale, yScale, colorScale;
let year_menu;
let svg;
let geojson, projection;
    
/**
* APPLICATION STATE
* */
let state = {
    data:[],
    hover: null,
    selectYear: 2020
};

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
    d3.json("./data/usState.geojson"),
    d3.csv("./data/hateCrime_map_year.csv", d=> {
        d.DATA_YEAR = +d.DATA_YEAR
        d.SUM_VICTIM_COUNT= +d.SUM_VICTIM_COUNT
        {return d}
    }),
    ]).then(([geojson, usState]) => {

    // save the summed data to application state
    state.data = usState;
        
    year_menu = Array.from(d3.group(state.data, d=>d.DATA_YEAR).keys())
    year_menu = year_menu.sort(d3.descending)

    // SPECIFY PROJECTION: IN SCALES AREA SPECIFY PROJECTION as scale
    projection = d3.geoAlbersUsa()
                    .fitSize([width - margin.left - margin.right, 
                    height - margin.top - margin.bottom], geojson)

    // Scale of dots
    colorScale = d3.scaleSequential()
                   .domain([0,500])//d3.extent(state.data, d=>d.SUM_VICTIM_COUNT))
                   .interpolator(d3.interpolateOrRd)                     
     
    // For the vertical legend
    yLegend = d3.scaleLinear()
                .domain([1,11])
                .rangeRound([58, 300]);

    // Scale of the legend color
    legendColor = d3.scaleThreshold()
               .domain(d3.range(2, 18))
               .range(d3.schemeReds[9]);  

    // CREATE SVG ELEMENT
    const container = d3.select("#container")
                        .style("position", "relative");

    svg = container.append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .style("position", "relative");
    
    // PREPARE TO JOIN DATA+DRAW GEO OUTLINES
    // DEFINE PATH FUNCTION TO DRAW LINES
    const pathGen = d3.geoPath(projection);
        
    // SELECTALL-DATA-JOIN
    // Because we joined two datasets, we need 2 joins here.
    
    svg.selectAll("path")
    .data(geojson.features)
    .join("path")
    .attr("d", d => pathGen(d))
    .attr("fill", "#F5EACB")
    .attr("stroke", "black")
    .style("opacity",0.2) 

    tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("visibility", "hidden")

    // VERTICAL LEGEND
    g = svg.append("g"); 
    g.selectAll("rect")
     .data(legendColor.range().map(function(d) {
            d = legendColor.invertExtent(d);
            if (d[0] == null) d[0] = yLegend.domain()[0];
            if (d[1] == null) d[1] = yLegend.domain()[1];
            return d;
            }))
     .enter().append("rect")
     .attr("height", 25)
     .attr("x",-26)
     .attr("y", function(d) { 
            return yLegend(d[0])+12; })
     .attr("width", 23)
     .attr("fill", function(d) { return legendColor(d[0]); });

    // legend title
    g.append("text")
     .attr("font-family", "sans-serif")
     .attr("x", -42)
     .attr("y", 58)
     .attr("fill", "#DEF5FE")
     .attr("text-anchor", "start")
     .attr("font-size", "10px")
     .attr("font-weight", "bold")
     .text("Victim Counts");

    // Place the legend axis with the values in it
    g.attr("transform", `translate(${width-margin.right}, ${0})`)
     .call(d3.axisRight(yLegend)
     .tickSize(0)
     .tickFormat(function(y, i) { 
        if(i>8) return "";
        if(i==0) return "≤" + 10;
        if(i==8) return "≥"+ 400;      
        return y*40; })
     .tickValues(legendColor.domain()))
     .select(".domain")
     .remove()
    
    // + UI ELEMENT SETUP
    /*manual drop-down menu */
    const selectElement = d3.select("#dropdown")

    selectElement.selectAll("options") // "option" is a HTML element
                 .data(year_menu) 
                 .join("option")
                 .attr("value", d => d) // what's on the data
                 .text(d=> d) // what users can see
    
    /* set up event listener to filter data based on dropdown menu selection*/
    selectElement.on("change", event => {
        console.log(event.target.value) // to check if filtered 

        state.selectYear = +event.target.value

        console.log("new state", state) // to check changes after selection
        draw(); 
    });
                    
    draw(); // calls the draw function
});

/**
* DRAW FUNCTION
* call this every time there is an update to the data/state
* */
function draw() {

    // + FILTER DATA BASED ON STATE
    const filteredData = state.data
            .filter(d => state.selectYear === d.DATA_YEAR) 
            console.log(filteredData)
    
    svg.selectAll("circle")
        .data(filteredData, d => d.INCIDENT_ID/5)
        .join(
            enter => enter
            .append("circle")
            .attr("r", 2)
            .attr("transform", d => {
                  const [x, y] = projection([d.longitude, d.latitude])
                    return `translate(${x}, ${y})`
                })
            .attr("fill","white")
                .on("mouseover", function(event, d, i){
                    tooltip
                    .html(`<div>${d.STATE_NAME}:</div>
                            <div>${d.SUM_VICTIM_COUNT} Victims</div>`)
                    .style("visibility", "visible")
                })
                .on("mousemove", function(event){
                    tooltip
                    .style("top", event.pageY - 10 + "px")
                    .style("left", event.pageX +10 +"px")
                })
                .on("mouseout", function(event, d) {
                    tooltip
                    .html(``)
                    .style("visibility", "hidden");
                })
            .call(enter => enter.transition()
                .delay(500)
                .attr("r", d=>d.SUM_VICTIM_COUNT*0.025)                    
                .attr("fill", d=> colorScale(d.SUM_VICTIM_COUNT))
            )
            ,
            // + HANDLE UPDATE SELECTION
            update => update
            ,
            // + HANDLE EXIT SELECTION
            exit => exit
            .transition()
            .duration(500)
            .attr("fill","gray")
            .attr("r", (radius*.25))
            .delay(250)
            .attr("cx", 0)
            .remove() 
        )   

}; 
