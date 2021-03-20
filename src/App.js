import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Area from './components/Area/Area';
import Register from './components/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({});
  return (
    <userContext.Provider value={[user, setUser]}>
      <Router>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <PrivateRoute path="/ride/:name">
            <Area />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
