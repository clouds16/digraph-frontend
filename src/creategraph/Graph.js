import React, { Component, useContext ,useState , useEffect } from "react";
import ReactDOM from "react-dom";
import { GraphView } from "react-digraph";
import sample from "./sample";
import SaveWorkflow from "../components/SaveWorkflow";
import AppContext from '../store/AppContext'

import {
  default as nodeConfig,
  EMPTY_EDGE_TYPE,
  CUSTOM_EMPTY_TYPE,
  POLY_TYPE,
  SPECIAL_CHILD_SUBTYPE,
  SPECIAL_EDGE_TYPE,
  SPECIAL_TYPE,
  SKINNY_TYPE, NODE_KEY
} from "./config";

import "./styles.css";

function FGraph( {graphData} ) {


let myContext = useContext(AppContext)
let workflow = myContext.CURRENTWORKFLOW;
let setWorkflow = myContext.SETCURRENTWORKFLOW
  //let workflow = graphData ;

let nodes = myContext.NODES;
let setNodes = myContext.SETNODES;
let edges = myContext.EDGES ;
let setEdges = myContext.SETEDGES;

// const [nodes, setNodes] = useState(workflow.nodes);
// const [edges, setEdges] = useState(workflow.edges);

const [selected, setSelected] = useState(null);

let graph = {
  nodes,
  edges,
  name : ""
}

function onCreateEdge(src, tgt) {
  console.log("edge created");
  console.log(src);
  console.log(tgt);
  let name = prompt("Enter Edge Name")

  const newEdge = {
    handleText : name ,
    source: src.id,
    target: tgt.id,
    type: SPECIAL_EDGE_TYPE
  };

  setEdges((prev) => [...prev, newEdge]);
  //workflow.edges = [...workflow.edges, newEdge]
  //setWorkflow({ ...edges, newEdge})
  
}

function onCreateNode(nodeType) {
  const title = prompt('Enter name: ');
  const x = 0;
  const y = 300;


  var type = nodeType;
  console.log(nodeType);

  const viewNode = {
    id: Date.now(),
    title,
    type,
    x,
    y
  };

  setNodes((prev) => [...prev, viewNode]);

  //setWorkflow( {...nodes, nodes : viewNode})
}

function onCreateNodeClick(x, y) {
  const type = "square";
  const title = "New Node";
  const viewNode = {
    id: Date.now(),
    title,
    type,
    x,
    y
  };
  console.log(viewNode);
  setNodes((prev) => [...prev, viewNode]);
  //setWorkflow( {...nodes, nodes : viewNode})

}

function onUpdateNode(viewNode) {
  console.log("on update node: " , viewNode);
  onSelectNode(viewNode);
  var i, index;
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].id === viewNode.id) index = i;
  }

  var mycopy = nodes;
  mycopy[index] = viewNode;
  //setNodes(mycopy);
  //setWorkflow( {[nodes] : mycopy} )
}

function onSelectNode(viewNode, event) {
  console.log("selected node: ", viewNode);
  setSelected(viewNode);
}

function onDeleteNode(viewNode, nodeId, nodeArr) {
  console.log("on delete node");
  console.log(viewNode);

  // Delete any connected edges
  const newEdges = edges.filter((edge, i) => {
    return edge.source !== viewNode.id && edge.target !== viewNode.id;
  });

  console.log("new edges");
  console.log(newEdges);

  // graph.nodes = nodeArr;

  var newNodes = nodes.filter((node, i) => {
    return node.id !== viewNode.id;
  });

  setEdges(newEdges);
  setNodes(newNodes);
}

function onSelectEdge(viewEdge) {
  console.log("on select edge");
  // Deselect events will send Null viewNode
  setSelected(viewEdge);
}

function onSwapEdge(sourceViewNode, targetViewNode, viewEdge) {
  var i, index;
  console.log(viewEdge);
  for (i = 0; i < edges.length; i++) {
    if (
      edges[i].source === viewEdge.source &&
      edges[i].target === viewEdge.target
    )
      index = i;
  }

  const edge = {
    source: sourceViewNode.id,
    target: targetViewNode.id,
    handleText: viewEdge.handleText,
    type: viewEdge.type
  };

  //edge.source = sourceViewNode;
  //edge.target = targetViewNode;
  console.log(sourceViewNode);
  console.log(targetViewNode);
  var mycopy = edges;

  mycopy[index] = edge;
  console.log(index);

  // reassign the array reference if you want the graph to re-render a swapped edge

  setEdges(mycopy);
}

  function onDeleteEdge(e, ed) {
    console.log("on delete edge");
    var i, index;
    for (i = 0; i < edges.length; i++) {
      if (edges[i].source === e.source && edges[i].target == e.target)
        index = i;
    }
    console.log(e);

    var mycopy = edges;
    mycopy.splice(index, 1);
    setEdges(mycopy);
    // implement find index by id first
  }

  



  return (
    <div id="graph" className="w-4/6 h-4/6">
    <h1 className=" text-2xl "> WORKFLOW TITLE: {workflow.name? workflow.name : "NO WORKFLOW TITLE"} </h1>
    <button className='m-2 p-2 bg-white border-2 border-black hover:bg-yellow-400' onClick={ () => onCreateNode(POLY_TYPE)} >  Hexagon  </button>
    <button className='m-2 p-2 bg-white border-2 border-black hover:bg-yellow-400' onClick={ ()=> onCreateNode(SKINNY_TYPE)}> Rectangle </button>
    <button className='m-2 p-2 bg-white border-2 border-black hover:bg-yellow-400' onClick={ ()=> onCreateNode(SPECIAL_TYPE)}> Diamond </button> 
    <button className='m-2 p-2 bg-white border-2 border-black hover:bg-blue-400' onClick={ ()=> onCreateEdge(nodes[0] , selected) }> Add Edge </button>

    
    <SaveWorkflow  data={graph} />
    
    <GraphView 
      showGraphControls={true}
      gridSize="100rem"
      gridDotSize={1}
      renderNodeText={false}
      ref= {React.useRef("GraphView")}
      nodeKey={NODE_KEY}
      nodes={nodes}
      edges={edges}
      selected={selected}
      nodeTypes={nodeConfig.NodeTypes}
      nodeSubtypes={nodeConfig.NodeSubtypes}
      edgeTypes={nodeConfig.EdgeTypes}
      onSelectNode={onSelectNode}
      onCreateNode={ onCreateNode}
      onCreateEdge={ onCreateEdge}
      onUpdateNode={onUpdateNode}
      onDeleteNode={onDeleteNode}
      onSelectEdge={onSelectEdge}
      onSwapEdge={onSwapEdge}
      onDeleteEdge={onDeleteEdge}
      // readOnly
    />
  </div>
  )

}

export default FGraph;

 {/* } //let graph = myContext.CURRENTWORKFLOW 

  //let setGraph = myContext.SETCURRENTWORKFLOW

  let [graph, setGraph] = useState({
    ...workflow ,
    //...props.graphData,
    selected : {}
  })

  let nodes = graph.nodes
  let edges = graph.edges


  //let [selected, setSelected] = useState({})

  function getNodeIndex(searchNode) {
    return nodes.findIndex(node => {
      console.log(node[NODE_KEY] === searchNode[NODE_KEY])
      return node[NODE_KEY] === searchNode[NODE_KEY];

    });
  }

  function getEdgeIndex(searchEdge) {
    return edges.findIndex(edge => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  }

  function getViewNode(nodeKey) {
    const searchNode = {};
    searchNode[NODE_KEY] = nodeKey;
    const i = getNodeIndex(searchNode);
    return nodes[i];
  }

  function deleteStartNode(){
    //const graph = graph;
    graph.nodes.splice(0, 1);
    graph.nodes = [...nodes];
    setGraph({ graph });
  };

  function onUpdateNode(viewNode){
    //const graph = graph;
    const i = getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    setGraph({ graph });
    console.log(graph)
  };

  function onSelectNode(viewNode, event){
    setGraph({ selected: viewNode });
  };

  function onSelectEdge(viewEdge){
    setGraph({ selected: viewEdge });
    console.log(graph.selected)
  };

  function onCreateNode(type){
    let p = prompt("Give this processor a name: ")

    console.log("Create new : ", type)
    //const graph = graph;
    

    const viewNode = {
      id: Date.now(),
      title: p,
      type: type ,
      x : Math.random()* 200,
      y : Math.random()*300
    };

    graph.nodes = [...graph.nodes, viewNode];
    console.log(graph)
    //setGraph({ graph });
  };


  function onCreateEdge(sourceViewNode, targetViewNode){
    //const graph = graph;
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
      setGraph({
        graph,
        selected: viewEdge
      });
      //setSelected({selected: viewEdge})
    }
  };



  function onDeleteNode(viewNode, nodeId, nodeArr){
    //const graph = graph;
    // Delete any connected edges
    const newEdges = graph.edges.filter((edge, i) => {
      return (
        edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
      );
    });

    graph.nodes = nodeArr;
    graph.edges = newEdges;

    setGraph({ graph,
      selected: null });
    //setSelected({})
  };  

  // Called when an edge is reattached to a different target.
  function onSwapEdge(sourceViewNode, targetViewNode, viewEdge) {
    //const graph = graph;
    const i = getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    graph.edges[i] = edge;
    // reassign the array reference if you want the graph to re-render a swapped edge
    graph.edges = [...graph.edges];

    setGraph({
      graph,
      selected: edge
    });
    //setSelected({})
  };

  function onDeleteEdge(viewEdge, edges) {
    //const { graph } = this.state;
    graph.edges = edges;
    setGraph({ graph, selected: null  });
    //setSelected({selected: null})
  };

*/}


