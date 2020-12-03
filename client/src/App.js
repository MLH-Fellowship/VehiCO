import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './routes/Main';
import Landing from './routes/Landing';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/map" component={Main} />
      </Router>
    </div>
  );
}

export default App;
