import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Switch, Route, useParams } from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import "materialize-css/dist/css/materialize.min.css";
import Charges from "./Charges";
import Stats from "./Stats";

//======================================================
// const user = localStorage.getItem('user');
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Switch>
//         <Route path="/" exact>
//           <App user = {user}/>
//         </Route>
//         <Route path = "/:id"></Route>
//       </Switch>
//   </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')  //Affects index.html's root div
// );
//======================================================

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')  //Affects index.html's root div
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();








// =======================DefaultReactCode================================
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// =================================================================