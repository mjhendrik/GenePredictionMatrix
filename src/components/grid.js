import React from 'react'
import * as d3 from 'd3';

export default class Grid extends React.Component {
    
    constructor(props){
        super(props);
        let defaultData = require('./../data/genotypematrix.tsv');

        this.state = {
            sequence_1: defaultData[0].toString().split(''),
            sequence_2: defaultData[1].toString().split(''),
            svg: undefined,
            grid_data: [],
            sync_data: []
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

        let column = row.selectAll('.square')
            .data(function(d) { 
                return d; })
            .enter().append('rect')
            .attr("id", function(d, i) { 
                return d.row + "-" + i; 
            })
            .attr('class','square')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; })
            .style('fill', '#fff')
            .style('stroke', '#222')
            .on('click', function(d) {
                d.click ++;
                if ((d.click)%4 == 0 ) { d3.select(this).style('fill','#fff'); }
                if ((d.click)%4 == 1 ) { d3.select(this).style('fill','#2C93E8'); }
                if ((d.click)%4 == 2 ) { d3.select(this).style('fill','#F56C4E'); }
                if ((d.click)%4 == 3 ) { d3.select(this).style('fill','#838690'); }
                else { d3.select(this).style('fill','#838690'); }
            });

         return column;

    }

    loadText(row) {

        let text = row.selectAll('.text')
            .data(function(d) { 
                return d; 
            })
            .enter().append('text')
            .attr('x', function(d) { return d.x + 5; })
            .attr('y', function(d) { return d.y + 20; })
            .attr('width', function(d) { return d.width; })
            .attr('height', function(d) { return d.height; })
            .style('fill', '#222')
            .style('stroke', '#8B0000')
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
        const allEqual = arr => arr.every( v => v === arr[0] );

        var tr = d3.transition()
        .duration(750)
        .ease(d3.easeLinear);
        let rln = S1.length + 0;
        let fontSize = '12px';
        let cellColor = '#000000';

        let row = undefined;
        let col = undefined;

        let getWCell = (obj) => {
            return Number(d3.select(obj).text());//Left value
        }

        let getNCell = (obj) => {
            return Number(d3.select(obj).text());//Up value
        }

        let getNWCell = (obj) => {
            return Number(d3.select(obj).text());//Up value
        }

        let writeCellText = (obj) => {
            let eq = allEqual([ obj[0], obj[1], obj[2] ]);
            const diagonal = obj[2];

            const scoreDiag = (S1[obj[3]] !== S2[obj[4]]) ? diagonal : (diagonal + 1); //Get diagonal+1 if the gene value is same
            const scoreLeft = obj[0];
            const scoreUp = obj[2];
            const rect = row+'-'+col;

            this.state.sync_data.push({"rect": rect, "score": scoreDiag});

            //When Gene letters match set the color to the changed value and return the max
            if(scoreDiag > diagonal) {
                col = '#CCCCCC';
                svg.select("rect[id='"+rect+"']")
                .transition()
                .duration(2000)
                .style('fill','#c9cce2')
                .style('stroke', cellColor)
            }

            return Math.max(scoreDiag, scoreLeft, scoreUp);

        }

        d3.selectAll('svg text')
        .each(function(d, i, n) {
            row = d.row;
            col = d.column;

            if(row===0 && col===0){
                d3.select(this)
                    .text('');
            }

            if(row < rln) {
                if (col === 1 || row === 1) {
                    d3.select(this)
                    .style('fill','#F56C4E')
                    .style('stroke', cellColor)
                    .style('font-size', '12')
                    .text('0');
                }
                else if (col > 1 && row > 1 && row < rln) {
                    let txt = writeCellText(
                        [getWCell(n[i-1]), getNCell(n[i-(rln)]), getNWCell(n[i-(rln+1)]),col,row]
                    );

                    d3.select(this)
                    .style('fill','#F56C4E')
                    .style('stroke', cellColor)
                    .style('font-size', fontSize)
                    .text(txt);
                }
            }
        });
    }

    buildGrid() {
        let S1 = this.state.sequence_1;
        let S2 = this.state.sequence_2;
        let t = S1.length; //35

        let svg = null, width = 910, height = 910;
        
        var simulation = d3.forceSimulation()
        .force("forceX", d3.forceX().strength(.1).x(width * .5))
        .force("forceY", d3.forceY().strength(.1).y(height * .5))
        .force("center", d3.forceCenter().x(width * .5).y(height * .5))
        .force("charge", d3.forceManyBody().strength(-15));

        let data = new Array();
        let tdata = new Array();
        let xpos = 1;
        let ypos = 1;
        let w = 25;
        let h = 25;
        let xseq = '';
        let yseq = '';

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
        .attr('id', 'genoDyn')
        .attr('width', width)
        .attr('height', height);

        let row = svg.selectAll('.row')
        .data(data)
        .enter().append('g')
        .attr('class', 'row');

        //Generate Columns and Rows
        this.loadColumns(row)
        this.loadText(row)
        
        //Set SVG to state
        this.state.svg = svg;

        this.callBack();
 
        return svg;
    }
    
    render() {
        let grid = this.buildGrid();

        return (
            <div {...grid} />
        )
    };
}