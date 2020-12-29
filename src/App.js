import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Watchlist } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/watchlist" exact component={() => <Watchlist />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;