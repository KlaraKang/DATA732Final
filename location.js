/* CONSTANTS AND GLOBALS*/
  const width = window.innerWidth*.9,
        height = window.innerHeight*.8,
        margin = {top: 10, bottom: 30, left:40, right:10};

  let svg;
  let tooltip;

  /**
  * APPLICATION STATE
  * */
  let state = {
      data: null,
      hover: null
  };

  /**
  * LOAD DATA
  * */
  d3.json("./data/hateCrimeByLoc.json", d3.autotype).then(data => {
    state.data = data;
    console.log(state.data)
    init();
  });

  /**
  * INITIALIZING FUNCTION
  * this will be run *one time* when the data finishes loading in
  * */
  function init() {
    
    const container = d3.select("#container")
                    .style("position","relative");

    svg = container.append("svg")
          .attr("width", width)
          .attr("height", height)

    tooltip = container.append("div")
            .attr("class", "tooltip")
            .style("top", 0)
            .style("left", 0)
            .style("stroke", "black")
            .style("position", "absolute")

    const root = d3.hierarchy(state.data) // it applies hierarchal info into each record of the data 
          .sum(d => d.SUM_LOCATION_RECORDS)  // totality of the whole square of the SVG  
          // sorts by traversal order by default. the data is already sorted by descending order.  
          
    console.log(root)

    const treelayout = d3.treemap()
                        .size([width-margin.left-margin.right, 
                              height-margin.top-margin.bottom])
                        .paddingInner(2);

    const tree = treelayout(root)
    const leaf = tree.leaves()

    /*SELECT - DATA - JOIN */
    const colorScale = d3.scaleSequential()
                    .domain([0, 35000])
                    .interpolator(d3.interpolateReds)  
  
    /* const colorScale = d3.scaleOrdinal()
                    .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"])
  */
    console.log(tree)
    console.log(leaf)
    const leafGroup = svg
            .selectAll("g")
            .data(leaf)
            .join("g")
            .attr("transform", d=>`translate(${d.x0}, ${d.y0})`) // x0 y0 for starting, x1 y1 for ending points

    leafGroup.append("rect")
            .attr("class","rect")
            .attr("fill", d=>colorScale(d.data.SUM_LOCATION_RECORDS))
            .attr("stroke","gray")
            .attr("width", d => d.x1 - d.x0) // width for each rectangle
            .attr("height", d => d.y1 - d.y0) // height for each rectangle
  
    leafGroup.on("mouseenter", (event, d) => {
                state.hover = {
                    position: [d.x0, d.y0],
                    LOCATION_NAME: d.data.LOCATION_NAME,
                    SUM_LOCATION_RECORDS: d.data.SUM_LOCATION_RECORDS
                }
              draw();  
              })
              .on("mouseleave", () => {
                state.hover = null
                draw();
              })

    draw(); // calls the draw function
  }

  /**
  * DRAW FUNCTION
  * we call this every time there is an update to the data/state
  * */
  function draw() {
    if(state.hover){
      tooltip
      .html(`<div>${state.hover.LOCATION_NAME} <br> 
              ${state.hover.SUM_LOCATION_RECORDS} victims</div>`)
      .transition()
      .duration(70)
      .style("opacity", 0.8)
      .style("transform",`translate(${state.hover.position[0]}px, 
                                    ${state.hover.position[1]}px)`)
      .style("background","yellow")
    }
  };