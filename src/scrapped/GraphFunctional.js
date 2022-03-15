import React, { Component} from "react";
import ReactDOM from "react-dom";
import { GraphView } from "react-digraph";
import { sample, getServerMonitoring, getUpdatedData } from "../creategraph/sample";
import {
  default as nodeConfig,
  CUSTOM_EMPTY_TYPE,
  NODE_KEY,
  SERVER_TYPE, 
  TEXTTRACT_TYPE,
  DATABASE_TYPE,
  BROWSER_TYPE,
  LAMBDA_TYPE,
  LOGIN_TYPE
} from "../creategraph/config";
import "./styles.css";

import AppContext from '../store/AppContext'


function Graph( props ){
    let customNodeRef = React.createRef();
    let myContext = useContext(AppContext)
    let state = {
       graph:  
//               sample,
              myContext.CURRENTWORKFLOW ,
      selected: {}
    };

    let [thisState , setState] = useState( {
        graph : myContext.CURRENTWORKFLOW,
        selected : {}
    })


    function getNodeIndex(searchNode) {
        return state.graph.nodes.findIndex(node => {
          return node[NODE_KEY] === searchNode[NODE_KEY];
        });
      }
    
      // Helper to find the index of a given edge
     function getEdgeIndex(searchEdge) {
        return state.graph.edges.findIndex(edge => {
          return (
            edge.source === searchEdge.source && edge.target === searchEdge.target
          );
        });
      }
    
      // Given a nodeKey, return the corresponding node
      function getViewNode(nodeKey) {
        const searchNode = {};
        searchNode[NODE_KEY] = nodeKey;
        const i = getNodeIndex(searchNode);
        return state.graph.nodes[i];
      }
    
      function deleteStartNode() {
        const graph = state.graph;
        graph.nodes.splice(0, 1);
        graph.nodes = [...state.graph.nodes];
        setState({ graph });
      };
    
      function onUpdateNode(viewNode) {
        const graph = state.graph;
        const i = getNodeIndex(viewNode);
    
        graph.nodes[i] = viewNode;
        setState({ graph });
      };
    
      function onSelectNode(viewNode, event){
        setState({ selected: viewNode });
      };
    
      function onSelectEdge(viewEdge){
        setState({ selected: viewEdge });
      };
    
      function onCreateNode(xpos, ypos , type){
        const graph = state.graph;
        
    
        const viewNode = {
          id: Date.now(),
          title: "",
          type: type ,
          x : xpos,
          y : ypos 
        };
    
        graph.nodes = [...graph.nodes, viewNode];
        //this.setState({ graph });
      };
    
    //   function onDeleteNode(viewNode, nodeId, nodeArr){
    //     const graph = state.graph;
    //     // Delete any connected edges
    //     const newEdges = graph.edges.filter((edge, i) => {
    //       return (
    //         edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
    //       );
    //     });
    
    //     graph.nodes = nodeArr;
    //     graph.edges = newEdges;
    
    //     setState({ graph, selected: null });
    //   };
    
    //   // Called when an edge is reattached to a different target.
    //   function onSwapEdge(sourceViewNode, targetViewNode, viewEdge) {
    //     const graph = state.graph;
    //     const i = getEdgeIndex(viewEdge);
    //     const edge = JSON.parse(JSON.stringify(graph.edges[i]));
    
    //     edge.source = sourceViewNode[NODE_KEY];
    //     edge.target = targetViewNode[NODE_KEY];
    //     graph.edges[i] = edge;
    //     // reassign the array reference if you want the graph to re-render a swapped edge
    //     graph.edges = [...graph.edges];
    
    //     setState({
    //       graph,
    //       selected: edge
    //     });
    //   };
    
    //   function onDeleteEdge(viewEdge, edges) {
    //     const { graph } = state;
    //     graph.edges = edges;
    //     setState({ graph, selected: null });
    //   };




    return (
        <div id="graph" className="w-4/6 h-4/6">
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={this.onCreateNode(500, 200 ,SERVER_TYPE)}> Rectangle  </button>
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={this.onCreateNode(700, 200 ,BROWSER_TYPE)} >  Circle </button>
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={this.onCreateNode(900, 200 ,LAMBDA_TYPE)}> Square </button>
          <button className='m-2 p-2 bg-white border-2 border-black' onClick={this.onCreateNode(500, 400, DATABASE_TYPE)}> Hexagon </button>
  
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
            nodeSubtypes
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
      );
}

export default Graph;