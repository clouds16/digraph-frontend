import React, { Component, useContext } from "react";
import ReactDOM from "react-dom";
import { GraphView } from "react-digraph";
import sample from "../creategraph/sample";
//import AutoSave from '../components/AutoSaveState'
import SaveWorkflow from "../components/SaveWorkflow";

import {
  default as nodeConfig,
  EMPTY_EDGE_TYPE,
  CUSTOM_EMPTY_TYPE,
  POLY_TYPE,
  SPECIAL_CHILD_SUBTYPE,
  SPECIAL_EDGE_TYPE,
  SPECIAL_TYPE,
  SKINNY_TYPE, NODE_KEY
} from "../creategraph/config2";

import "./styles.css";


class Graph extends Component {
  constructor(props) {
    super(props);
    this.customNodeRef = React.createRef();

    this.state = {
      //name: props.name,
      graph:  
              //sample,
              props.graphData,
              // {
              //   nodes: props.nodes,
              //   edges: props.edges,
              //   name: props.name
              // },
      selected: {}
    };
  }

 // static getDerivedStateFromProps(props, state);


  getNodeIndex(searchNode) {
    return this.state.graph.nodes.findIndex(node => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  }

  // Helper to find the index of a given edge
  getEdgeIndex(searchEdge) {
    return this.state.graph.edges.findIndex(edge => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  }

  // Given a nodeKey, return the corresponding node
  getViewNode(nodeKey) {
    const searchNode = {};
    searchNode[NODE_KEY] = nodeKey;
    const i = this.getNodeIndex(searchNode);
    return this.state.graph.nodes[i];
  }

  deleteStartNode = () => {
    const graph = this.state.graph;
    graph.nodes.splice(0, 1);
    graph.nodes = [...this.state.graph.nodes];
    this.setState({ graph });
  };

  onUpdateNode = viewNode => {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({ graph });
  };

  onSelectNode = (viewNode, event) => {
    this.setState({ selected: viewNode });
  };

  onSelectEdge = viewEdge => {
    this.setState({ selected: viewEdge });
  };

  onCreateNode = (type) => {
    let p = prompt("Give this processor a name: ")

    console.log("Create new : ", type)
    const graph = this.state.graph;
    

    const viewNode = {
      id: Date.now(),
      title: p,
      type: type ,
      x : Math.random()* 200,
      y : Math.random()*300
    };

    graph.nodes = [...graph.nodes, viewNode];
    console.log(this.state.graph)
    //this.setState({ graph });
  };


  onCreateEdge = (sourceViewNode, targetViewNode) => {
    const graph = this.state.graph;
    // This is just an example - any sort of logic
    // could be used here to determine edge type
    const type =
      sourceViewNode.type === SPECIAL_TYPE
        ? SPECIAL_EDGE_TYPE
        : EMPTY_EDGE_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type
    };

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      graph.edges = [...graph.edges, viewEdge];
      this.setState({
        graph,
        selected: viewEdge
      });
    }
  };



  onDeleteNode = (viewNode, nodeId, nodeArr) => {
    const graph = this.state.graph;
    // Delete any connected edges
    const newEdges = graph.edges.filter((edge, i) => {
      return (
        edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
      );
    });

    graph.nodes = nodeArr;
    graph.edges = newEdges;

    this.setState({ graph, selected: null });
  };

  // Called when an edge is reattached to a different target.
  onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    graph.edges[i] = edge;
    // reassign the array reference if you want the graph to re-render a swapped edge
    graph.edges = [...graph.edges];

    this.setState({
      graph,
      selected: edge
    });
  };

  onDeleteEdge = (viewEdge, edges) => {
    const { graph } = this.state;
    graph.edges = edges;
    this.setState({ graph, selected: null });
  };






  render() {
    const { graph, selected } = this.state;

    return (
      <>


        <div id="graph" className="w-4/6 h-4/6">
        <div className=" text-2xl "> Workflow Name : {graph.name } </div>
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={ () => this.onCreateNode(POLY_TYPE)} >  Hexagon  </button>
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={ ()=> this.onCreateNode(SKINNY_TYPE)}> Square </button>
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={ ()=> this.onCreateNode(SPECIAL_TYPE)}> Diamond </button> 
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={ ()=> this.onCreateNode(EMPTY_EDGE_TYPE)}> Rectangle  </button>
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={ () => this.onCreateEdge(this.graph.nodes[0], this.graph.nodes[1])} >  Edge  </button>
          {/* <button className='m-2 p-2 bg-white border-2 border-black' onClick={ ()=> saveWorkflow } >  Save  </button>  */}
          {/* <AutoSave data={graph} /> */}

          <SaveWorkflow data={graph} />
          <button onClick={ ()=> this.forceUpdate()} > Check current state </button>

          <GraphView 
            showGraphControls={true}
            gridSize="100rem"
            gridDotSize={1}
            renderNodeText={false}
            ref="GraphView"
            nodeKey={NODE_KEY}
            nodes={graph.nodes}
            edges={graph.edges}
            selected={selected}
            nodeTypes={nodeConfig.NodeTypes}
            nodeSubtypes={nodeConfig.NodeSubtypes}
            edgeTypes={nodeConfig.EdgeTypes}
            onSelectNode={this.onSelectNode}
            onCreateNode={this.onCreateNode}
            onUpdateNode={this.onUpdateNode}
            onDeleteNode={this.onDeleteNode}
            onSelectEdge={this.onSelectEdge}
            onSwapEdge={this.onSwapEdge}
            onDeleteEdge={this.onDeleteEdge}
            // readOnly
          />
          </div>

      </>

    );
  }
}

export default Graph;


