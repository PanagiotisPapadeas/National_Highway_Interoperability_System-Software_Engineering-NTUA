import React, {useEffect, useState} from "react"
import "./App.css"
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9103/interoperability/api/",
  });

// const [debt, setDebt] = useState({})

export default function Charges(){
    
    // const [amount, setAmount] = useState(0)
        
    const chargeRequest = (async () => {
        
    var op1 = document.getElementById("operators1").value;
    var op2 = document.getElementById("operators2").value;
    var start = document.getElementById("start_datetime1").value;
    var end = document.getElementById("end_datetime1").value;
    const res = api.get("PassesCost/" + op1 + "/" + op2 + "/" + start + "/" + end)
    .then((res) => {
        alert("The amount of money " + op2 + " owns to " + op1 + " is: " + JSON.stringify(res.data.PassesCost));
    })
});
    return(
        <>
        <br></br>
        <form id="charges">
            <ul>
                <li>Choose two operators to see the amount owned from OP2 to OP1
                    <br></br>and two dates to specify the wanted time period:
                </li>
            </ul>
            <ol>
                <li>
                    <label>Choose Operator1: </label>
                    <select name="operators1" id="operators1">
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
                    <select name="operators2" id="operators2">
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
                    <label htmlFor="pass_datetime_start1">Starting Datetime: </label>
                    <input type="text" placeholder="2020-03-23 13:46:27" required size="14" maxLength={19} id = "start_datetime1"></input>
                </li>
                <li>
                    <label htmlFor="pass_datetime_end1">Ending Datetime: </label>
                    <input type="text" placeholder="2020-03-23 13:46:27" required size="14" maxLength={19} id = "end_datetime1"></input>
                </li>
            </ol>
            <input onClick={chargeRequest} type="submit" value="Submit" size="10"></input>
            {/* <p>Operator2 owed <b>{amount}</b> to Operator1 
            in the specified time period.
            </p> */}
        </form>

        </>
    )
}
