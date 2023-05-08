import './App.css';
import SignIn from './components/SignIn';
import Search from './components/Search';
import DataUpload from './components/DataUpload'
import New from './components/New'
import TrainList from './components/TrainList'
import SearchTrain  from './components/SearchTrain';
import {BrowserRouter as Router, Switch ,Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  return (
    <>
      <Router>
      <Switch>
          <Route exact path="/"><Search setDate={setDate} setDestination={setDestination} setSource={setSource} date={date} source={source} destination={destination} /></Route>
          <Route exact path="/login"><SignIn /></Route>
          <Route exact path="/trainlist"><TrainList date={date} source={source} destination={destination} /></Route>
          <Route exact path="/admin/dataUpload"><DataUpload /></Route>
          {/* <Route exact path="/train-list"><Home /></Route>
          <Route exact path="/admin"><Home /></Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
