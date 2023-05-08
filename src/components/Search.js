import React, { useState } from 'react';
import "../css/Search.css"
import { auth } from '../firebase'
import { signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import logoImg from '../static/logo.jpeg';



const Search=(props)=>{
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);
  const {setDate, setDestination, setSource, date, source, destination} = props;
  

    const handleSignOut = (event) => {
      signOut(auth).then(() => {
          console.log("signed out")
      }).catch((error) => {
          console.log(error)
      });
    }

    const handleSearch = (event) => {
      event.preventDefault();
      // console.log(source, destination, date);
      history.push('/trainlist');
    }

    // if(!user){
    //   history.push('/login');
    // }

    return (
    <>
      <nav className='navbar'>
        {/* <div><img src="https://www.irctc.co.in/nget/assets/images/secondry-logo.png"></img></div> */}
        <div><img className='logo' src={logoImg}></img></div>
        <div class="nav-options ">
          {user?
            <div class="dark-blue bold" onClick={handleSignOut}><h3>SIGN OUT</h3></div>
            : <div class="dark-blue bold" onClick={() => history.push('/login')}><h3>REGISTER/LOGIN</h3></div>
          }
          <div class="dark-blue bold"><h3>CONTACT US</h3> </div>
        </div>
        <div class="nav-left">
          <img src="https://sdk.irctc.corover.ai/askdisha-bucket/launcher.gif" class="disha-gif"></img>
          <img src="https://www.irctc.co.in/nget/assets/images/logo.png"></img>
        </div>
       </nav>
       <main className='main-container'>
        <div class="booking-form">
            <div class="header">
              {/* <img src="https://www.irctc.co.in/nget/assets/images/logo_top_eng.jpg" alt="Train Image" /> */}
              <h2>Book Ticket</h2>
              {/* <img src="https://www.irctc.co.in/nget/assets/images/G20_Logo.png" alt="Indian Railway Logo" /> */}
            </div>
            <form className='form'>
              <div class="first-part">
              <div>
              <label>
                Source:
                <input type="text" name="source" value={source} onChange={(e) => setSource(e.target.value)} />
              </label>
              <br />
              <label>
                Destination:
                <input type="text" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </label>
              </div>
              <div>
              <label>
                Date:
                <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
              </label>
              {/* <br />
              <label>
                Class:
                <select name="class">
                  <option value="sleeper">Sleeper</option>
                  <option value="ac">AC</option>
                  <option value="general">General</option>
                </select>
              </label> */}
              </div>
            </div>
              <br />
              <button type="submit" onClick={handleSearch}>Book Now</button>
            </form>
          </div>
       </main>
    </>
    )
}
export default Search;