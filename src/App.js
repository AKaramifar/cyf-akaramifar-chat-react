import React, {useState} from 'react';
import Header from './components/Header.js';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import './App.css';

function App() {
  const [userState, setUserState] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const signIn_F = (state) =>{
    setSignIn(state);
  }
  const signUp_F = (state) =>{
    setSignUp(state);
  }
  const setUserState_F = (userStateParm) =>{
    setUserState(userStateParm)
  }
  return (
    <div className="Div_App_style">
      <Header signUp_Func_Parm={signUp_F} signIn_Func_Parm={signIn_F} userState_Parm={userState} setUserState_Func_Parm={setUserState_F}/>
      {signIn ? <SignIn signUp_Func_Parm={signUp_F} signIn_Func_Parm={signIn_F} setUserState_Func_Parm={setUserState_F}/> : null}
      {signUp ? <SignUp signUp_Func_Parm={signUp_F}  signIn_Func_Parm={signIn_F} setUserState_Func_Parm={setUserState_F}/> : null}
    </div>
  );
}

export default App;
