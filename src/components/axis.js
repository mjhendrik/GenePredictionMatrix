import React from 'react'
import * as d3 from 'd3';

export default class Axis extends React.Component {
    static defaultData = require("./../data/genotypematrix.tsv");
   
   

    prepareCircle() {

        let jsonCircles = [
        { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
        { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
        { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];

        let svgContainer = d3.select("body").append("svg")
        .attr("width", 200)
        .attr("height", 200);

        let circles = svgContainer
        .selectAll("circle")
        .append("g")
        .data(jsonCircles)
        .enter()
        .append("circle");

        let circleAttributes = circles
        .attr("cx", function (d) { return d.x_axis; })
        .attr("cy", function (d) { return d.y_axis; })
        .attr("r", function (d) { return d.radius; })
        .style("fill", function(d) { return d.color; });

        return circleAttributes;

    }

    prepareGrid(){
       
        // console.log(this.defaultData)

        // console.log(this.props.)

        let svg = null,
        width = 800,
        height = 650,
        gX = null,
        gY = null;

        svg = d3.select("body").append("svg");

        let xScale = d3.scaleLinear()
        .domain([-width / 2, width / 2])
        .range([0, width]);

        let yScale = d3.scaleLinear()
        .domain([-height / 2, height / 2])
        .range([height, 0]);

        let xAxis = d3.axisBottom(xScale)
        .ticks((width + 2) / (height + 2) * 25)
        .tickSize(height)
        .tickPadding(8 - height);

        let yAxis = d3.axisRight(yScale)
        .ticks(25)
        .tickSize(width)
        .tickPadding(8 - width);

        gX = svg.append("g")
        .attr("class", "axis axis--x")
        .call(xAxis);

        gY = svg.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    return svg;

    }
    
    render() {
        let grid = this.prepareGrid();
        // let circles = this.prepareCircle();
        return (
            <div {...grid} />
        )
    };
}