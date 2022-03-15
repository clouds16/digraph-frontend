import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function RemoveButton( {data} ) {
    
    function onButtonPress(){
        try {
            alert("Are you sure you want to delete this data?")
            Axios.delete( process.env.URL +'/delete' || process.env.LOCAL + '/delete', {
                data: {
                    _id : data._id
                  }
            })
            console.log("success")
        }
        catch {
            alert('could not delete data')
        }
    }

    return (
        <>
            <button className="m-2 p-2 border-black border-1 bg-red-200 hover:scale-110" onClick={onButtonPress}> Delete </button>
        </>
    )
}

export default RemoveButton;