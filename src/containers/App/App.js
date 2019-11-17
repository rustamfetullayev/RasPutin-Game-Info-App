import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Home from "../../components/Home/Home";
import Game from '../../components/Game/Game';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/games/:id" exact component={Game} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
