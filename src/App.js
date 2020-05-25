import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App({label}) {

  const [count, setCount] = useState(0);

  //arrow funkcija
  const addOne = () => {
    const added = count + 1;
    setCount(added);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>{
           label
        }</div>
        <p>
          {
            count
          }
        </p>
        <button onClick={addOne}>PLUS</button>
      </header>
    </div>
  );
}

export default App;
