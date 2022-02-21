import './App.css';
import React from 'react';
import Charges from "./Charges";
import Stats from "./Stats";
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:9103/interoperability/api",
  //apiURL: "http://localhost:9103"
});

class App extends React.Component
{
  // constructor(props)  //props->properties
  // {	  
	//   super(props);
	//   this.state = { user : props.user };
  // }

  // state = {
  //   values: []
  // }
  constructor(){
    super();

    api.get('/admin/healthcheck').then(res =>{
      console.log(res.data)
      // this.setState({values: res.data})
    })
  }
  
  render()
  {
    // let userName = this .state.user === null ? "<anonymous>" : this.state.user;
    return(
      
      <>
        {/* <select> name </select> */}
        {/* {this.state.values.map(value => <h2 key = {value.status}>{value.dbconnection}</h2>)} */}
        <div className="main_title">
          <h1>Welcome to <em>Highway Interoperability System</em></h1>
        </div>
          <Charges />
          <Stats />
        {/* <p>USERNAME: {userName}</p>  */}
      </>
    );
  }
}

export default App;










// ===================================================
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// ==================================================