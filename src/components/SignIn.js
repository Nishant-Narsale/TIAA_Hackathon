import React, { useState } from 'react';
import { auth, db } from '../firebase'
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import "../css/SignIn.css"


function SignIn() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [user, loading, error] = useAuthState(auth);


    const handleSignIn = (event) => {
      event.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          // Handle sign-in error here
          console.log(error);
        });
    };

    const handleSignUp = (event) => {
      event.preventDefault();

      createUserWithEmailAndPassword(auth, email, password, username)
      .then(registeredUser => {
          try {
              const docRef = addDoc(collection(db, "usersCollection"), {
                  uid: registeredUser.user.uid,
                  is_admin: false
              }).then(
                  console.log("Document written")
              );
          } catch (e) {
              console.error("Error adding document: ", e);
          }
              
        })
        .catch((error) => {
          // Handle sign-up error here
          console.log(error);
        });
    };

    if(user){
      history.push('/');
    }

    if(loading){
      return (
        <p>loading..</p>
      )
    }
  
    return (
      <div className='signin_body'>
          <div class="login-container">  	
            <input type="checkbox" id="chk" aria-hidden="true"/>

            <div class="signup">
              <form onSubmit={handleSignUp}>
                <label class="lab" for="chk" aria-hidden="true">Sign up</label>
                <input class="inp" type="text" name="txt" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} required=""/>
                <input class="inp" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required=""/>
                <input class="inp" type="password" name="pswd" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                <button class="subbtn">Sign up</button>
              </form>
            </div>

            <div class="login">
              <form onSubmit={handleSignIn}>
                <label class="lab" for="chk" aria-hidden="true">Login</label>
                <input class="inp" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required=""/>
                <input class="inp" type="password" name="pswd" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required=""/>
                <button class="subbtn">Login</button>
              </form>
            </div>
          </div>
        
      </div>
    );
  }

export default SignIn;
  