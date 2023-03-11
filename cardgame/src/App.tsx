import React from 'react';
import logo from './logo.svg';
import styles from "./App.module.css";
import {Layout,Typography} from "antd"

function App() {
  return (
    <div className={styles.App}>
      <div>
        <Layout.Header>
          <img src={logo} alt=""/>
          <Typography.Title level={2}>Card Game</Typography.Title>
        </Layout.Header>
      </div>
    </div>
  );
}

export default App;
