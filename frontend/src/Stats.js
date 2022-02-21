import React from "react"
import "./App.css"

export default function Stats(){
    return(
        <>
            <br></br>
            <form>
                <ul>
                    <li>Choose a station and a time period to view the number of passes</li>                
                </ul>
        
                <div className="fields">
                    <input placeholder="StationID"></input>
                </div>
            </form>
        </>
    )
}