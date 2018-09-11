import React from 'react'
import * as d3 from 'd3';

export default class Subgrid extends React.Component {
    
    constructor(props){
        super(props);
        let defaultData = require('./../data/genotypematrix.tsv');

        this.state = {
            sequence_1: defaultData[0].toString().split(''),
            sequence_2: defaultData[1].toString().split(''),
            svg: undefined,
            grid_data: []
        };
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
      
        console.log(JSON.stringify(t))

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
        }
      }

      buildGrid() {
        return this.lineMatrix(this.parseMatrix());

      }

    
    render() {
        
        let grid = this.buildGrid();

        return (
            <div {...grid} />
        )
    };
}