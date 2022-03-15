import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import RemoveButton from './RemoveButton'
import UpdateButton from './UpdateButton'
import LoadButton from './LoadButton'

function GetGraphs(){
    let [data , setData] = useState([])

    function newData(){
        Axios.get(process.env.URL +'/read' || process.env.LOCAL + '/read').then( (response)=> {
            setData(...data , response.data )
        } ).catch( (e)=> {
            console.log("Could not log data")
        } )
    }

    useEffect( ()=> {
        newData()

        setInterval(() => {
            newData()
        }, 1000 );
        
        
    }, [])

    return(
        <div>
            {   data? 
                data.map((item) => {
                    return (
                        <div className=" bg-sky-300 p-3 m-5">
                            <h1> {item.name} </h1>
                            
                            <LoadButton data={item}/>
                            <RemoveButton data={item} />
                            <UpdateButton data={item} />
                        </div>
                    )
                } ) : <> <p> No data selected </p></>
            }

        </div>
    )
}

export default GetGraphs;