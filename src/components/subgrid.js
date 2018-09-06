import React from 'react'
import * as d3 from 'd3';

export default class Subgrid extends React.Component {

    
    
    constructor(props){
        super(props);
        let defaultData = require('./../data/genotypematrix.tsv');

        console.log('SUBGRID')

        this.state = {
            sequence_1: defaultData[0].toString().split(''),
            sequence_2: defaultData[1].toString().split(''),
            svg: undefined,
            grid_data: []
        };
    }

    parseData(data){
        let S1 = this.state.sequence_1;
        let S2 = this.state.sequence_2;
        let input = this.state.grid_data;
        let r = input[0];
        let c = input[1];

        if(r === 0){
            let xtext = S1[c];
            data[r].push({
                row: r,
                column: c,
                x: input[2],
                y: input[3],
                width: input[4],
                height: input[5],
                xid: xtext,
                yid: null
            })
        }
        else {
            if(c === 0){
                let ytext = S2[r]; 
                data[r].push({
                    row: r,
                    column: c,
                    x: input[2],
                    y: input[3],
                    width: input[4],
                    height: input[5],
                    xid: null,
                    yid: ytext })
            }
            else{
       
                data[r].push({
                    row: r,
                    column: c,
                    x: input[2],
                    y: input[3],
                    width: input[4],
                    height: input[5],
                    xid: null,
                    yid: null })
            }
        }

        return data;

    }

    loadColumns(row) {

        let column = row.selectAll(".square")
            .data(function(d) { 
                return d; })
            .enter().append("rect")
            .attr("class","square")
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("width", function(d) { return d.width; })
            .attr("height", function(d) { return d.height; })
            .style("fill", "#fff")
            .style("stroke", "#222")
            .on('click', function(d) {
                d.click ++;
                if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
                if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
                if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
                if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
                else { d3.select(this).style("fill","#838690"); }
            });

         return column;

    }

    loadText(row) {

        let text = row.selectAll(".text")
            .data(function(d) { 
                return d; 
            })
            .enter().append("text")
            .attr("x", function(d) { return d.x + 5; })
            .attr("y", function(d) { return d.y + 20; })
            .attr("width", function(d) { return d.width; })
            .attr("height", function(d) { return d.height; })
            .style("fill", "#222")
            .style("stroke", "#8B0000")
            .text(function (d) {
                let txt = '';
                if(d.yid) {txt = d.yid}
                else if(d.xid) {txt = d.xid}
                
                return txt;
            })

        return text;

    }

    callBack() {
        let S1 = this.state.sequence_1;
        let S2 = this.state.sequence_2;
        let svg = this.state.svg;
        let row = undefined;
        let col = undefined;
        let left_col = undefined;
        let right_col = undefined;

        let upper_row = undefined;
        let opt = [[S1.length],[S2.length]];
        let gap = 2; 
        let substitution = 1; 
        let match = 0;

        

        d3.selectAll("svg text").each(function(d, i) {
            row = d.row;
            col = d.column;
            left_col = col - 1;
            right_col = col + 1;
            upper_row = row - 1;

            if (col > 1 && row > 1) {

                const scoreDiag = S1[col - 1] + (S1[col] === S2[row]) ? '0' : '1';
                const scoreLeft = 2;
                const scoreUp = 2;
                // const scoreLeft = S1[col - 1] + 2;
                // const scoreUp = S2[row - 1] + 2;

               let txt = Math.min(Math.min(scoreDiag, scoreLeft), scoreUp);

            //    console.log(d3.select(this).text()[i-1])
            //    console.log(d3.select("text:nth-child(1)"))

              

                d3.select(this)
                .style("fill", "#222")
                .style("stroke", "#8B0000")
                .text(txt);

                

            }

        });

        
    }

    matrixGrid() {
        let S1 = this.state.sequence_1;
        let S2 = this.state.sequence_2;
        let t = S1.length; //35

        let svg = null,
        width = 910,
        height = 910,
        gX = null,
        gY = null;
        
        let data = new Array();
        let tdata = new Array();
        let xpos = 1;
        let ypos = 1;
        let w = 25;
        let h = 25;
        let xseq = "";
        let yseq = "";

        // iterate for rows & parse data
        for (var r = 0; r <= t; r++) {

            data.push( new Array() );
            for (var c = 0; c < t; c++) {
                this.state.grid_data = [r,c,xpos,ypos,w,h,xseq,yseq];
                data = this.parseData(data);
                
                xpos += w;
            }

            xpos = 1;
            ypos += h; 
        }

        svg = d3.select('body')
        .append('svg')
        .attr("id", "genoDyn")
        .attr('width', width)
        .attr('height', height);

        let row = svg.selectAll(".row")
        .data(data)
        .enter().append("g")
        .attr("class", "row");

        //Generate Columns and Rows
        this.loadColumns(row)
        this.loadText(row)
        
        //Set SVG to state
        this.state.svg = svg;

        this.callBack();
 
        return svg;
    }


    parseMatrix() {
        let s1 = this.state.sequence_1;
        let s2 = this.state.sequence_2;
        const t = [ ];
        for (let r = 0; r <= s1.length; ++r) {
          t[r] = [ 0 ];
        }
        for (let c = 0; c <= s2.length; ++c) {
          t[0][c] = 0;
        }
      
        for (let r = 1; r <= s1.length; ++r) {
          for (let c = 1; c <= s2.length; ++c) {
            const left = t[r][c - 1];
            const above = t[r - 1][c];
            let leftAndAbove = t[r - 1][c - 1];
      
            if (s1[r - 1] === s2[c - 2]) {
              ++leftAndAbove;
            }
      
            t[r][c] = Math.max(left, above, leftAndAbove);
          }
        }
      
        return t;
      }

    lineMatrix(m) {
        for (const row of m) {
          const line = ['['];
          for (const col of row) {
            if (col < 10) {
              line.push(' ');
            }
            line.push(String(col));
            line.push(', ');
          }
          line.pop();
          line.push(']');
          console.log(line.join(''));
        }
      }


    
    render() {
        let grid = this.lineMatrix(this.parseMatrix());

        return (
            <div {...grid} />
        )
    };
}