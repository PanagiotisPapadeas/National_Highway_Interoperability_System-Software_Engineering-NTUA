import React, { useEffect, useState } from "react"
import "./App.css"
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9103/interoperability/api/",
});



//===================================Cascading dropdown lists=====================================    
var operatorStations = {
    "Attiki Odos": ["AO00", "AO01", "AO02", "AO03", "AO04", "AO05", "AO06", "AO07", "AO08", "AO09", "AO10", "AO11", "AO12", "AO13", "AO14", "AO15", "AO16", "AO17", "AO18", "AO19"],
    "Gefyra": ["GF00"],
    "Egnatia Odos": ["EG00", "EG01", "EG02", "EG03", "EG04", "EG05", "EG06", "EG07", "EG08", "EG09", "EG10", "EG11", "EG12"],
    "Kentriki Odos": ["KO00", "KO01", "KO02", "KO03", "KO04", "KO05", "KO06", "KO07", "KO08", "KO09"],
    "Moreas": ["MR00", "MR01", "MR02", "MR03", "MR04", "MR05", "MR06", "MR07", "MR08"],
    "Nea Odos": ["NE00", "NE01", "NE02", "NE03", "NE04", "NE05", "NE06", "NE07", "NE08", "NE09", "NE10", "NE11", "NE12", "NE13", "NE14", "NE15", "NE16"],
    "Olympia Odos": ["OO00", "OO01", "OO02", "OO03", "OO04", "OO05", "OO06", "OO07", "OO08", "OO09", "OO10", "OO11", "OO12", "OO13"]
}

window.onload = function () {
    var operName = document.getElementById("operator");
    var statID = document.getElementById("station");
    for (var x in operatorStations) {
        operName.options[operName.options.length] = new Option(x, x);
    }
    operName.onchange = function () {
        //Empty StationID dropdown
        statID.length = 1;
        //display correct values
        var y = operatorStations[this.value];
        for (var i = 0; i < y.length; i++) {
            statID.options[statID.options.length] = new Option(y[i], y[i]);
        }
    }
}
//===============================================================================================================

export default function Stats() {
    // var passNum;

    const [passNum, setPassNum] = useState();
    
    const passesRequest = (async () => {
        var station = document.getElementById("station").value;
        var start = document.getElementById("start_datetime2").value;
        var end = document.getElementById("end_datetime2").value;
        const res = api.get("PassesPerStation/" + station + "/" + start + "/" + end)
        .then((res) => {
            alert("Total number of passes between " + start + " and " + end + " on station " + station + " is: " + res.data.NumberOfPasses);
    }); 
});

    return (
        <>
            <br></br>
            <form id="stats">
                <ul>
                    <li>Choose a stationID and a time period to view the number of passes: </li>
                </ul>
                <ol>
                    <li>
                        Operator: <select defaultValue={"selected"} name="operator" id="operator">
                            <option value="">Select Operator</option>
                        </select>
                        <br></br>
                    </li>
                    <li>
                        StationID: <select defaultValue={"selected"} name="station" id="station">
                            <option value="">Select Station</option>
                        </select>
                        <br></br>
                        <br></br>
                    </li>
                    <li>
                        <label htmlFor="pass_datetime_start2">Starting Datetime: </label>
                        <input type="text" placeholder="2020-03-23 13:46:27" required size="14" maxLength={19} id="start_datetime2"></input>
                    </li>
                    <li>
                        <label htmlFor="pass_datetime_end2">Ending Datetime: </label>
                        <input type="text" placeholder="2020-03-23 13:46:27" required size="14" maxLength={19} id="end_datetime2"></input>
                    </li>
                </ol>
                <input onClick={passesRequest} type="submit" value="Submit" size="10"></input>
                <br></br>
                <br></br>
                {/* <p>Number of passes in the specified time period: <b>{passNum}</b></p>             */}
            </form>
        </>
    )
}