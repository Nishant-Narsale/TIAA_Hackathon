import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import {BrowserRouter as Router, Switch ,Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/"><SignIn /></Route>
          <Route exact path="/login"><SignIn /></Route>
          <Route exact path="/register"><SignUp /></Route>
          {/* <Route exact path="/train-list"><Home /></Route>
          <Route exact path="/admin"><Home /></Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
