import {useState , useEffect, useContext} from 'react'
import AppContext from './store/AppContext'
import Application from './components/Application'
import {CUSTOM_EMPTY_TYPE, SPECIAL_TYPE , SPECIAL_EDGE_TYPE } from './creategraph/config'
import defaultData from './creategraph/defaultdata'

function App() {

  //let [backEnd , setBackEnd] = useState('http://localhost:3100/')
  let [currentWorkflow , setCurrentWorkflow] = useState(defaultData)
  let [nodes, setNodes] = useState(defaultData.nodes)
  let [edges, setEdges] = useState(defaultData.edges)

  let Store = {
    CURRENTWORKFLOW : currentWorkflow ,
    SETCURRENTWORKFLOW : setCurrentWorkflow  ,
    NODES : nodes,
    SETNODES : setNodes ,
    EDGES : edges, 
    SETEDGES : setEdges
  }


  return (
    <AppContext.Provider value={Store}>    
        <Application />
    </AppContext.Provider>

  );
}

export default App;

// <Graph style={{ height: "150px" }} />