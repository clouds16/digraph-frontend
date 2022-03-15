import React, { useContext} from 'react'
import AppContext from '../store/AppContext'


function LoadWorkflow( props ){

    const myContext =  useContext(AppContext);
    const currentWorkflow = myContext.CURRENTWORKFLOW ;
    let nodes = myContext.NODES;
    let setNodes = myContext.SETNODES;
    let edges = myContext.EDGES ;
    let setEdges = myContext.SETEDGES;

    function LoadButtonPressed(){
        console.log("props data: ",  props.data)
        myContext.SETCURRENTWORKFLOW(props.data)
        setNodes(props.data.nodes)
        setEdges(props.data.edges)

    }   

    return (
        <>
            <button className="m-2 p-2 border-black border-1 bg-green-200 hover:scale-125 " onClick={LoadButtonPressed} > Load </button>
        </>
    )
}

export default LoadWorkflow;