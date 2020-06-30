import React, {useState} from 'react';
import Header from './components/Header.js';
import SignIn from './components/SignIn.js';
import './App.css';

function App() {
  const [signIn, setSignIn] = useState(false);
  const signIn_F = (state) =>{
    setSignIn(state);
  }
  return (
    <div className="Div_App_style">
      <Header signIn_F_P={signIn_F}/>
      {signIn ? <SignIn signIn_F_P={signIn_F}/> : null}
    </div>
  );
}

export default App;
