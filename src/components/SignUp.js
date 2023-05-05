import React, { useState } from 'react';
import {auth, db} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 


function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);


    const handleSignUp = (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then(registeredUser => {
            try {
                const docRef = addDoc(collection(db, "usersCollection"), {
                    uid: registeredUser.user.uid,
                    is_admin: false,
                    first: "Nishant",
                    last: "Narsale"
                }).then(
                    console.log("Document written")
                );
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            
        })
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
          <form onSubmit={handleSignUp}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    );
  }

export default SignUp;
  