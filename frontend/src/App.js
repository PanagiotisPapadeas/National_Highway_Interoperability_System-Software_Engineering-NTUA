import './App.css';
import React from 'react';
import Charges from "./Charges";
import Stats from "./Stats";


export default function App(){
  return(      
      <>
        <div className="main_title">
          <h1>Welcome to <em>Highway Interoperability System</em></h1>
        </div>
        <div className="sub_div">
          <Charges />
          <Stats />
        </div>
      </>
    );
  }

















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