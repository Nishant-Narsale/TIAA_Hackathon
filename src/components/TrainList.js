import React, { useState, useEffect } from 'react';
import {db} from '../firebase';
import '../css/TrainList.css';
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'
import { signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import logoImg from '../static/logo.jpeg';


function TrainList(props) {
    const [trains, setTrains] = useState([]);
    const [tickets, setTickets] = useState();
    const {date, source, destination} = props;
    const [type, setType] = useState("general");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const [booked, setBooked] = useState(false);


    useEffect(() => {

        const fetchTrains = async () => {
            // console.log(source, destination,date)
            
            const q = query(collection(db, "trains"), where('source','==',source), where('destination','==',destination));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc,id) => {
                let data = doc.data();
                data['id'] = doc.id;
                // console.log(doc.id())
                setTrains([...trains, data]);
                // console.log(data.stops);
            });

            // console.log(trains)
        }

        fetchTrains();
        console.log(trains)
        // console.log(trains[0].arrival.toDate());
    }, [])

    const handleSignOut = (event) => {
        signOut(auth).then(() => {
            console.log("signed out")
        }).catch((error) => {
            console.log(error)
        });
      }

    const handleBooking = async (e,t_number) => {
        e.preventDefault();

        let train;

        trains.forEach((d) => {
            if(d.train_number == t_number){
                train = d;
            }
        })

        if(train[`${type}_seats`]>=tickets){
            train[`${type}_seats`] = train[`${type}_seats`] - tickets;
        }else{
            alert(`Only ${train[`${type}_seats`]} of ${type} are available`);
            return;
        }

        await setDoc(doc(db, 'tickets', `${train.train_number};${user.uid};${type}`), {
            uid: user.uid,
            tid: train.train_number,
            type: type,
            count: tickets
        })
        await setDoc(doc(db, 'trains', train.train_number), train);

        alert(`Congratulations..\nYour ${tickets} ${type} tickets for ${train.train_name} are booked.`);
        setBooked(true);
    }

    const handleType = (event) => {
        setType(event.target.value);
    };
    
    const getCoachClassName = (coachType) => {
    if (type === coachType) {
        return "coach selected";
    } else {
        return "coach";
    }
    };

    const handleRegister = () => {
        history.push('/login')
    }

    return (
        <div>
            <main>
                <nav>
                    <div>
                        <img className='logo' src={logoImg}></img>
                    </div>
                    <div class="nav-options">
                    {user?
                        <div class="dark-blue bold" onClick={handleSignOut}><h3>SIGN OUT</h3></div>
                        : <div class="dark-blue bold" onClick={handleRegister}><h3>REGISTER/LOGIN</h3></div>
                    }
                        <div class="dark-blue bold"><h3>CONTACT US</h3></div>
                    </div>
                    <div class="nav-left">
                        <img
                        src="https://sdk.irctc.corover.ai/askdisha-bucket/launcher.gif"
                        style={{height: 80 + 'px', width: 80 + 'px'}}
                        />
                        <img src="https://www.irctc.co.in/nget/assets/images/logo.png" />
                    </div>
                </nav>
                <div class="train-list">
                    {trains.map((train, ind) => (
                    
                        <div key={train.id} class="train">
                            <div class="train-name">
                                <h3>{train.train_name}</h3>
                                <h3>|</h3>
                                <h3>{train.train_number}</h3>
                            </div>

                            <div class="train-schedule">
                                <div class="train-route">
                                <div class="train-stop">
                                    <div class="stop-name">{train.source}</div>
                                    <div class="stop-time">{train.arrival.toDate().toString().slice(0,-31)}</div>
                                    <div class="stop-date">Departure</div>
                                    <div class="stop-marker"></div>
                                </div>
                                <div class="train-stop">
                                    <div class="stop-name">{Object.keys(train.stops)[0]}</div>
                                    <div class="stop-time">{Object.values(train.stops)[0].slice(3)} min</div>
                                    <div class="stop-date">Halt</div>
                                    <div class="stop-marker"></div>
                                </div>
                                <div class="train-stop">
                                    <div class="stop-name">{Object.keys(train.stops)[1]}</div>
                                    <div class="stop-time">{Object.values(train.stops)[1].slice(3)} min</div>
                                    <div class="stop-date">Halt</div>
                                    <div class="stop-marker"></div>
                                </div>
                                <div class="train-stop">
                                    <div class="stop-name">{train.destination}</div>
                                    <div class="stop-time">{train.arrival.toDate().toString().slice(0,-31)}</div>
                                    <div class="stop-date">Arrival</div>
                                    <div class="stop-marker"></div>
                                </div>
                                </div>
                            </div>

                            <form>
                                <div className="coaches">
                                    <label className={getCoachClassName("ac")}>
                                        <input type="radio" name="coach" value="ac" onChange={handleType} />
                                        <span>AC ({booked ? (type=='ac' ? train.ac_seats - tickets : train.ac_seats) : train.ac_seats})</span>
                                    </label>
                                    <label className={getCoachClassName("sleeper")}>
                                        <input type="radio" name="coach" value="sleeper" onChange={handleType} />
                                        <span>Sleeper ({booked ? (type=='sleeper' ? train.sleeper_seats - tickets : train.sleeper_seats) : train.sleeper_seats})</span>
                                    </label>
                                    <label className={getCoachClassName("general")}>
                                        <input type="radio" name="coach" value="general" onChange={handleType} />
                                        <span>General ({booked ? (type=='general' ? train.general_seats - tickets : train.general_seats) : train.general_seats})</span>
                                    </label>
                                </div>

                                <div className='num-tickets'>
                                    <label htmlFor='tickets'>Tickets :</label>
                                    <input type='number' name='tickets' onChange={(e) => setTickets(e.target.value)} placeholder='Number of tickets' />
                                </div>
                                

                                <div class="cust-action">
                                    <button type='submit' onClick={(e) => handleBooking(e,train.train_number)}>Book Now</button>
                                </div>
                            </form>
                        </div>

                    ))}
                    
                </div>
            </main>

        </div>
    )
}

export default TrainList;