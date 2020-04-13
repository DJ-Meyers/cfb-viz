// Core
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Recruiting from './components/pages/Recruiting';
import PlayByPlay from './components/pages/PlayByPlay';
import About from './components/pages/About';

// 3rd Party Components
import { Container } from 'semantic-ui-react';

// Context
import TeamsState from './context/teams/TeamsState';
import RecruitsState from './context/recruits/RecruitsState';

// Other
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <TeamsState>
      <RecruitsState>
        <Router>
          <div className="App">
            <Navbar />
            <Container style={{ marginTop: '2rem' }}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Recruiting" component={Recruiting} />
                <Route exact path="/PlayByPlay" component={PlayByPlay} />
                <Route exact path="/About" component={About} />
              </Switch>
            </Container>
          </div>
        </Router>
      </RecruitsState>
    </TeamsState>
  );
}

export default App;
