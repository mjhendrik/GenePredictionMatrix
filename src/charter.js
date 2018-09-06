import ReactDOM from 'react-dom';

import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { csv } from 'csv-loader';

class BarChart extends Component {
    constructor(props){
       super(props);
       
       this.state = {
           data:[ 1,2,3,5,8,13,21,34,55],
           size: [0, 500]
       };
       this.createBarChart = this.createBarChart.bind(this);
       
    }
    componentDidMount() {
       this.createBarChart();
    }
    componentDidUpdate() {
       this.createBarChart();
    }
    createBarChart() {
       const node = this.node;
       const dataMax = max(this.state.data);
       const yScale = scaleLinear()

          .domain([0, dataMax])
          .range([0, this.state.size[1]])
    select(node)
       .selectAll('rect')
       .data(this.state.data)
       .enter()
       .append('rect')
    
    select(node)
       .selectAll('rect')
       .data(this.state.data)
       .exit()
       .remove()
    
    select(node)
       .selectAll('rect')
       .data(this.state.data)
       .style('fill', '#fe9922')
       .attr('x', (d,i) => i * 25)
       .attr('y', d => (this.state.size[1] - yScale(d)))
       .attr('height', d => yScale(d))
       .attr('width', 25)
    }
 render() {
       return <svg ref={node => this.node = node}
       width={1000} height={1000}>
       </svg>
    }
 }

 ReactDOM.render(<BarChart />,
    document.getElementById('root')        
);

//  export default BarChart