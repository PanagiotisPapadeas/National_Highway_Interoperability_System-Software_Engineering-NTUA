import React, {useEffect, useState} from "react"
import "./App.css"
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9103/interoperability/api/",
  });

// const [debt, setDebt] = useState({})
  
// const showCharge = (() => {


//     const res = api.get("/admin/healthcheck").then(res => setDebt(res));
    //   var op1 = document.getElementById("operators1").value;
    //   var op2 = document.getElementById("operators2").value;
    //   var start = document.getElementById("start_datetime").value;
    //   var end = document.getElementById("end_datetime").value;
      
    // //   const res = api.get("/PassesCost/" + op1 + "/" + op2 + "/" + start + "/" + end)
    // //   .then(res => console.log(res.PassesCost));
    // // return api.get("/PassesCost/" + op1 + "/" + op2 + "/" + start + "/" + end)
    // return api.get("/admin/healthcheck")
    // .then(res => {
    //     console.log(res)
    //     return res;
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });

//   });

// const res = api.get("/admin/healthcheck").then((res) => {
// setAmount((amount) => res.dbconnection);
// console.log(amount);
// });
// const res = api.get("/admin/healthcheck").then((res) => setAmount((res.dbconnection)))
// console.log()
// const res = api.get("/PasssesCost/" + op1 + "/" + op2 + "/" + start + "/" + end)
// .then((res) => {
// console.log(res);
// setAmount(res.PassesCost);
// });


export default function Charges(){
    
    const [amount, setAmount] = useState(0)
        
    const chargeRequest = (() => {
        
    var op1 = document.getElementById("operators1").value;
    var op2 = document.getElementById("operators2").value;
    var start = document.getElementById("start_datetime1").value;
    var end = document.getElementById("end_datetime1").value;
    const res = api.get("PassesCost/" + op1 + "/" + op2 + "/" + start + "/" + end)
    .then((res) => {
        let newamount = JSON.stringify(res.data.PassesCost);
        alert(newamount);
    })
        // setAmount((amount) => (newamount));
    // console.log(amount);
    // console.log(op1);
    // console.log(op2);
    // console.log(start);
    // console.log(end);
        // alert(newamount);
        // setAmount((amount) => (newamount));   
        // alert(JSON.stringify(res.data.PassesCost));
        // setAmount(JSON.stringify(res.data.PassesCost));
        // return(JSON.stringify(res.data.PassesCost));
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
            <p>Operator2 owed <b>{amount}</b> to Operator1 
            in the specified time period.
            </p>
        </form>

        </>
    )
}
