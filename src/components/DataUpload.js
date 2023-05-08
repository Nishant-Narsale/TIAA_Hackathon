import React, { useState } from 'react';
import {db} from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import '../css/DataUpload.css'

function CsvUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  function createTimeStamp(date, time){
    // const timestamp = new firebase.firestore.Timestamp.fromDate(new Date(`${date} ${time}`));
    // console.log(date, time)
    let newdate = new Date(`${date} ${time}`)
    let seconds = Math.floor(newdate.getTime() / 1000);
    let nanoseconds = (newdate.getTime() % 1000) * 1000000;
    // console.log(newdate, seconds, nanoseconds)
    let timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
    // console.log(timestamp)
    return timestamp;
  }

  const handleUpload = async () => {
    if (!file) {
      return;
    }


    // Read CSV file and add data to Firebase collection
    // const collectionRef = collection(db, 'csvData');

    const reader = new FileReader();
    reader.readAsText(file);


    reader.onload = () => {
      const rows = reader.result.split('\n');
      const headerRow = rows[0].split(',');
      const dataRows = rows.slice(1,rows.length);

    //   const batch = writeBatch(db);

      dataRows.forEach(async (dataRow) => {
        const data = {};
        const cells = dataRow.split(',');
        headerRow.forEach((header, index) => {
            data[header] = cells[index];
        });
        console.log(data)
        let arrival = data['arrival']
        let departure = data['departure']
        // console.log(arrival, departure);

        let arrival_timestamp = createTimeStamp(data['arrival_date'], arrival)
        let departure_timestamp = createTimeStamp(data['departure_date'], departure)

        data['arrival'] = arrival_timestamp;
        data['departure'] = departure_timestamp;

        delete data.arrival_date;
        delete data.departure_date;
        console.log(data)

        let stops = {}
        // for (let ct = 1; ct <= data['number_of_stops']; ct++) {
        //   // console.log(data[`stop_${ct}_halt`])
        //   stops[data[`stop_${ct}`]] = data[`stop_${ct}_halt`]
        //   // delete data[`stop_${ct}`];
        //   // delete data[`stop_${ct}_halt`];
        // }

        stops[data[`stop_1`]] = data[`stop_1_halt`]
        stops[data[`stop_2`]] = data["stop_2_halt\r"]
        delete data[`stop_1`];
        delete data[`stop_1_halt`];
        delete data[`stop_2`];
        delete data["stop_2_halt\r"];

        data['stops'] = stops;
        console.log(data)

        await setDoc(doc(db, "trains", data.train_number), data);


        // console.log(data)
        // const docRef = doc(collectionRef);
        // batch.set(docRef, data);
      });
    //   batch.commit();
    };
  };

  return (
    <div className='parent'>
      <input type="file" className="centered-container" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default CsvUploader;
