import ReactDOM from 'react-dom';
import React, { Component } from 'react'
import Graph from './components/graph';
import Grid from './components/grid'
import Subgrid from './components/subgrid'
import { DropdownButton, MenuItem } from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');


class Radial extends Component {
    constructor(props){
       super(props);
        var csvFilePath = require("./data/genotypematrix.tsv");
        this.textInput = React.createRef();
        this.renderGraph = this.renderGraph.bind(this);

        this.state = {
            data: csvFilePath,
            page: 'graph',
            a: false
        };
    }
    
    componentWillMount() {}
    componentDidMount() {}
    componentDidUpdate() {
        this.renderGraph();
    }
    renderGraph(){
        if (this.state.page === 'graph') {
          return ( <Graph ></Graph> );
        } else {
          return ( <Subgrid></Subgrid> );
        }
      }

 render() {

    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
        <div>
            {/* <select className="btn-warning selectpicker" data-style="btn-warning" onChange={this.changeOption} value={this.state.value}>
                <option value="graph">Svg Drive</option>
                <option value="subgraph">Data Drive</option>
                <option value="C">Chart Drive</option>
            </select> */}

            <button type="button" className="btn btn-info" onClick={() => this.setState(
                {
                    page: 'subgraph',
                    a: !this.state.a
                }
            )}> Data Graph </button>

          <h2 className="pagination-centered"> Gene-Prediction Data by Dynamic Programming</h2>
            { this.renderGraph() }
        </div>
      );
    }
 }

 ReactDOM.render(<Radial />,
    document.getElementById('root')        
);
