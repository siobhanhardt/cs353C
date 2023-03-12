import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from '../src/login/Login';
import MuteButton from '../src/indexConpomments/MuteButton';
// import '../path/to/antd.css';

ReactDOM.render(
    <React.StrictMode>

        <MuteButton />
        <Login />
    </React.StrictMode>,
    document.getElementById('root')
);