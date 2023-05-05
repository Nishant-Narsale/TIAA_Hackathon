import React, { useState } from 'react';
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";


function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);


    const handleSignIn = (event) => {
      event.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          // Handle sign-in error here
          console.log(error);
        });
    };

    const handleSignOut = (event) => {
        signOut(auth).then(() => {
            console.log("signed out")
        }).catch((error) => {
            console.log(error)
        });
    }
  
    return (
      <div>
        {loading && <p>Loading...</p>}
        {user ? (
            <>
            <p>You are already signed in as {user.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
            </>
        ) : (
          <form onSubmit={handleSignIn}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
          </form>
        )}
      </div>
    );
  }

export default SignIn;
  