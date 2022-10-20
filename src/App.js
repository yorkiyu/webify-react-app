import logo from './logo.svg';
import './App.css';
import cloudbase from '@cloudbase/js-sdk';
import { useEffect, useState } from 'react';

const app = cloudbase.init({
  env: 'webify-react-app-1fed9o5f5e38683'
});

const auth = app.auth();
const db = app.database();
async function login(){
  await auth.anonymousAuthProvider().signIn();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  const loginState = await auth.getLoginState();
  console.log(loginState.isAnonymousAuth); // true
}

function App() {
  const [collection, setCollection] = useState({});
  
  useEffect(() => {
    getCollection();
  }, []);

  async function getCollection() {
    await login();
    try {
      const res = await db.collection("yorkyu-webify").get();
      setCollection(res);
    } catch (error) {
      console.log(error); 
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div style={{fontSize: 14}}>云数据库：{JSON.stringify(collection)}</div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Webify, Yorkyu Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
