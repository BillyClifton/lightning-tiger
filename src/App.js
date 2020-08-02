import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "Home";
import Chat from "Chat";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
