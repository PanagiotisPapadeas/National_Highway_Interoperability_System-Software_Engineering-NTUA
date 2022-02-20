import React from "react"
import "./App.css"

export default function Charges(){
    return(
        <>
        <br></br>
        <div>
            <ul>
                <li>Choose two operators to see the amount owned from OP1 to OP2</li>
            </ul>
        </div>
        <div className="fields">
        <input placeholder="Operator1" required></input><input placeholder="Operator2" required></input>
        </div>
        
        
        </>
    )
}