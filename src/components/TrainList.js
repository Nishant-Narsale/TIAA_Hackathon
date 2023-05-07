import React, { useState, useEffect } from 'react';
import {db} from '../firebase';
import '../css/TrainList.css';
import { collection, query, where, getDocs } from "firebase/firestore";



function TrainList(props) {
    const [trains, setTrains] = useState([]);
    const {date, source, destination} = props;

    useEffect(() => {

        const fetchTrains = async () => {
            
            const q = query(collection(db, "trains"), where('source','==',source), where('destination','==',destination));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                let data = doc.data();
                data['id'] = doc.id;
                console.log(data)
                setTrains([...trains, data]);
                console.log(data.arrival.toDate());
            });
        }

        fetchTrains();
        // console.log(trains)
        // console.log(trains[0].arrival.toDate());
    }, [])


    return (
        <div>
            <main>
                <nav>
                    <div>
                        <img
                        src="https://www.irctc.co.in/nget/assets/images/secondry-logo.png"
                        />
                    </div>
                    <div class="nav-options">
                        <div class="dark-blue bold"><h3>HOME</h3></div>
                        <div class="dark-blue bold"><h3>REGISTER/LOGIN</h3></div>
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
                        
                        // <div key={train.id} class="train">
                        //     <div class="train-name">
                        //     <h3>{train.train_name}</h3>
                        //     <h3>|</h3>  
                        //     <h3>{train.train_number}</h3>
                        //     </div>
                    
                        <div key={train.id} class="train">
                            <div class="train-name">
                                <h3>{train.train_name}</h3>
                                <h3>|</h3>
                                <h3>{train.train_number}</h3>
                            </div>

                            <div class="train-schedule">
                                <div class="train-route">
                                <div class="train-stop">
                                    <div class="stop-name">Source</div>
                                    <div class="stop-time">10:00 AM</div>
                                    <div class="stop-date">1 Jan</div>
                                    <div class="stop-marker"></div>
                                </div>
                                <div class="train-stop">
                                    <div class="stop-name">Stop 1</div>
                                    <div class="stop-time">11:00 AM</div>
                                    <div class="stop-date">1 Jan</div>
                                    <div class="stop-marker"></div>
                                </div>
                                <div class="train-stop">
                                    <div class="stop-name">Stop 2</div>
                                    <div class="stop-time">12:00 PM</div>
                                    <div class="stop-date">1 Jan</div>
                                    <div class="stop-marker"></div>
                                </div>
                                <div class="train-stop">
                                    <div class="stop-name">Destination</div>
                                    <div class="stop-time">1:00 PM</div>
                                    <div class="stop-date">1 Jan</div>
                                    <div class="stop-marker"></div>
                                </div>
                                </div>
                            </div>

                            <div class="coaches">
                                <div class="coach" data-value="ac">
                                <span>AC</span>
                                </div>
                                <div class="coach" data-value="sleeper">
                                <span>Sleeper</span>
                                </div>
                                <div class="coach" data-value="general">
                                <span>General</span>
                                </div>
                            </div>
                            

                            <div class="cust-action">
                                <button>Book Now</button>
                            </div>
                        </div>

                    ))}
                    
                </div>
            </main>

        </div>
    )
}

export default TrainList;