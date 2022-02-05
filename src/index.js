import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import logoJig from './App'; //Seamoss cut
import reportWebVitals from './reportWebVitals';
import logo from './fragmint.jpg';

console.log('index.js is running.');

function logoJig() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" id="thelogo" alt="logo" />
            </header>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <logoJig />
    </React.StrictMode>,
    document.getElementById('root')
);



export default logoJig;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
