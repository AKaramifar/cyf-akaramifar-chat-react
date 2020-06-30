import React from 'react';
import './SignIn.css';

const SignIn = ({signIn_F_P}) => {
    return(
        <div className="Div_SignIn_Style" onClick={() => signIn_F_P(false)}>

        </div>
    )
}

export default SignIn;