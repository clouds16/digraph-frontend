

import React, {useState, useEffect, useContext} from 'react'
import AppContext from '../store/AppContext'
import Axios from  'axios'

function AutoSave( props ){

    let myContext = useContext(AppContext);
    
    let [isSaving, setSaving] = useState(false)

    useEffect(()=> [
        setInterval( ()=>{
            autoSave()
        }, 1000)
    ], [])


    function autoSave(){

        setSaving(true)

        try{
            
            myContext.SETCURRENTWORKFLOW( props.data )
            setSaving(false)

        } catch (e){
            setSaving(false)
            alert("Could not save data")
            
        }
    }

    return (
        <>
            <div> {isSaving? "autosaving...." : "" }</div>
        </>
    )
}

export default AutoSave;