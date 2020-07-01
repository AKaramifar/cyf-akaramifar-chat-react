import React, {useState} from 'react';
import Header from './components/Header.js';
import SignIn from './components/SignIn.js';
import './App.css';

function App() {
  const [userState, setUserState] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const signIn_F = (state) =>{
    setSignIn(state);
  }
  const setUserState_F = (userStateParm) =>{
    setUserState(userStateParm)
  }
  return (
    <div className="Div_App_style">
      <Header signIn_Func_Parm={signIn_F} userState_Parm={userState}/>
      {signIn ? <SignIn signIn_Func_Parm={signIn_F} setUserState_Func_Parm={setUserState_F}/> : null}
    </div>
  );
}

export default App;
