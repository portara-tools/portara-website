import React from 'react';
// import { useTheme} from '@material-ui/core/styles';
import LandingPage from './components/LandingPage';
import About from './components/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Router>
        <Route >
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/about' component={About} />
          </Switch>

        </Route>
      </Router>
    </div>

  );
}

export default App;
