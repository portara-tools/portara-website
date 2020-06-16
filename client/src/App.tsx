import React from 'react';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div style={{ backgroundColor: "black"}}>
      <Router>
        <Route >
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/about' component={About} />
            <Route exact path='/account' component={Dashboard} />
          </Switch>
        </Route>
      </Router>
    </div>

  );
}

export default App;
