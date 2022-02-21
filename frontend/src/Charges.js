import React from "react"
import "./App.css"

export default function Charges(){
    return(
        <>
        <br></br>
        <form>
        <ul>
            <li>Choose two operators to see the amount owned from OP2 to OP1
                <br></br>and two dates to specify the wanted time period:
            </li>
        </ul>
            <ol>
                <li>
                    <label>Choose Operator1: </label>
                    <select name="operators" id="operators">
                        <option value="aodos">Attiki Odos</option>
                        <option value="gefyra">Gefyra</option>
                        <option value="egnatia">Egnatia Odos</option>
                        <option value="kentriki_odos">Kentriki Odos</option>
                        <option value="moreas">Moreas</option>
                        <option value="nea_odos">Nea Odos</option>
                        <option value="olympia_odos">Olympia Odos</option>    
                    </select>
                </li>
                <li>
                <label>Choose Operator2: </label>
                    <select name="operators" id="operators">
                        <option value="aodos">Attiki Odos</option>
                        <option value="gefyra">Gefyra</option>
                        <option value="egnatia">Egnatia Odos</option>
                        <option value="kentriki_odos">Kentriki Odos</option>
                        <option value="moreas">Moreas</option>
                        <option value="nea_odos">Nea Odos</option>
                        <option value="olympia_odos">Olympia Odos</option>    
                    </select>
                </li>
                <br></br>
                <li>
                    <label htmlFor="pass_datetime">Starting Datetime: </label>
                    <input type="text" placeholder="2020-03-23 13:46:27" required size="14" maxLength={19}></input>
                </li>
                <li>
                    <label htmlFor="pass_datetime">Ending Datetime: </label>
                    <input type="text" placeholder="2020-03-23 13:46:27" required size="14" maxLength={19}></input>
                </li>
            </ol>
            <input type="submit" value="Submit" size="10"></input>
        </form>
        </>
    )
}