/* CONSTANTS AND GLOBALS */
  const width = window.innerWidth*.9,
        height = window.innerHeight*.8,
        margin = {top: 20, bottom: 40, left:40, right:30},
        radius = 2.5;

  // global empty variables
  let xScale, yScale, colorScale;
  let year_menu;
  let offense_types;
  let svg, tooltip;

  /* APPLICATION STATE */
  let state = {
      data: [],  
      hover: null,
      selection: "All" //default selection
  };

  /* LOAD DATA */
  // + SET YOUR DATA PATH
  d3.csv("./data/hateCrime_offenseType.csv", d => {
    return {
      DATA_YEAR: new Date(+d.DATA_YEAR, 0, 1),
      OFFENSE_TYPES: d.OFFENSE_TYPES,
      SUM_OFFENSE_RECORDS: +d.SUM_OFFENSE_RECORDS
    }
  }).then(raw_data => {

    // group and sum the data
    var sum_victim = d3.rollup(raw_data, v=>d3.sum(v, g=>g.SUM_OFFENSE_RECORDS),
                              d => d.OFFENSE_TYPES, d=>d.DATA_YEAR)  // Reduced, but it's an InternMap
    
    // reorganizing to a flat array
    function unroll(rollup, keys, label = "value", p ={}){
              return Array.from(rollup, ([key, value]) => 
              value instanceof Map ? unroll(value, keys.slice(1), label, 
              Object.assign({}, { ...p, [keys[0]]: key } ))
              : Object.assign({}, { ...p, [keys[0]]: key, [label] : value })
              ).flat();
            } 
    sums = unroll(sum_victim, ["OFFENSE_TYPES", "DATA_YEAR"], "SUM_OFFENSE_RECORDS")
  
    // save the summed data to application state
    state.data = sums;

    state.data.forEach((d,i) => {d.id = i+1;});
    console.log("state", state.data)
    init();
  });

  /* INITIALIZING FUNCTION */
  // this will be run *one time* when the data finishes loading in
  function init() {
    // + SCALES
    xScale = d3.scaleTime()
              .domain(d3.extent(state.data, d =>d.DATA_YEAR)) //extent gets min and max at the same time.
              .range([margin.left, width-margin.right])
    
    yScale = d3.scaleLinear()
              .domain(d3.extent(state.data, d=>d.SUM_OFFENSE_RECORDS))
              .range([height-margin.bottom, margin.top])

    colorScale = d3.scaleOrdinal()
                .range(["#FF00FF","#c83349","#588c7e","#ff0000","#FFA500","#674d3c",
                "#c1502e","#9400D3","#FF0000","#d64161","#70007a","#FF4500","#6b5b95",
                "#87bdd8","#e06377","#ff6f69","#ffcc5c","#7e4a35","#484f4f","#e4d1d1",
                "#b0aac0","#d9ecd0","#3b3a30","#4040a1","#bc5a45","#618685","#ffef96",
                "#80ced6","#50394c","#d5f4e","#f18973","#c94c4c","#034f84","#eea29a",
                "#82b74b","#eca1a6","#405d27","#c1946a","#b9936c","#eca1a6","#e0876a",
                "#e3eaa7","#ff7b25","#ada397","#6b5b95","#feb236","#b2ad7f","#5b9aa0",])

    // + AXES
    const xAxis = d3.axisBottom(xScale).ticks(20)
    const yAxis = d3.axisLeft(yScale)

    // + UI ELEMENT SETUP
    /*manual drop-down menu */
    const selectElement = d3.select("#dropdown")
  
    selectElement.selectAll("option") // "option" is a HTML element
                .data(["All",
                      ...new Set(state.data.map(d => d.OFFENSE_TYPES).sort(d3.ascending))]) 
                .join("option")
                .attr("value", d => d) // what's on the data
                .text(d=> d) // what user can see

  /* set up event listener to filter data based on dropdown menu selection*/
    selectElement.on("change", event => {
      state.selection = event.target.value
      draw();
    });

    // + CREATE SVG ELEMENT
    const container = d3.select("#container")
                          .style("position","relative");

    svg = container.append("svg")
          .attr("width", width)
          .attr("height", height)

    tooltip = container
          .append("div")
          .attr("class", "tooltip")
          .style("visibility", "hidden")

    // + CALL AXES to draw Axis lines
    const xAxisGroup = svg.append("g")
        .attr("class","xAxis")
        .attr("transform", `translate(${0},${height-margin.bottom})`)
        .call(xAxis)
        .append("text")
            .attr("y", margin.bottom)
            .attr("x", width/2)
            .attr("fill", "navy")
            .attr("font-size","14px")
            .attr("text-anchor", "middle")
            .text("<Year>"); 
    
    const yAxisGroup = svg.append("g")
        .attr("class","yAxis")
        .attr("transform", `translate(${margin.left},${0})`)
        .call(yAxis)
        .append("text")
            .attr("y", margin.top-5)
            .attr("x", margin.left-20)
            .attr("fill", "navy")
            .attr("font-size","14px")
            .attr("text-anchor", "middle")
            .text("<Incident Volume>"); 

    draw(); // calls the draw function
  }

  /* DRAW FUNCTION */
  // we call this every time there is an update to the data/state
  function draw() {

    // + FILTER DATA BASED ON STATE
    const filteredData = state.data
        .filter(d => state.selection === "All" || 
                      state.selection === d.OFFENSE_TYPES)
    console.log(filteredData)

    svg.selectAll("circle.dot")
      .data(filteredData, d=>d.id) // to match data to unique id
      .attr("id", (d,i)=>i)
      .join(
        // + HANDLE ENTER SELECTION
        enter => enter
        .append("circle")
        .attr("class","dot")      
        .attr("r", radius)
        .attr("cx", 0)
        .attr("cy", d => yScale(d.SUM_OFFENSE_RECORDS))
        .attr("fill", "black")
          .on("mouseover", function(event, d, i){
            tooltip
              .html(`<div>${d.OFFENSE_TYPES}</div>
                    <div>${d.SUM_OFFENSE_RECORDS} counts</div>`)
              .style("visibility", "visible")
          })
          .on("mousemove", function(event){
            tooltip
              .style("top", event.pageY - 55 + "px")
              .style("left", event.pageX + 0 + "px")
          })
          .on("mouseout", function(event, d) {
            tooltip
              .html(``)
              .style("visibility", "hidden");
          })
        .call(enter => enter
          .transition()
          .duration(500)
          .attr("r", radius*1.5)
          .attr("cx", d => xScale(d.DATA_YEAR))
          .attr("fill", d => colorScale(d.OFFENSE_TYPES))
          )
        ,
        // + HANDLE UPDATE SELECTION
        update => update,

        // + HANDLE EXIT SELECTION
        exit => exit
          .transition()
          .duration(500)
          .delay(150)
          .attr("cx", 0)
          .remove("dot")
        )      
  };