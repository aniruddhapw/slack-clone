import React, { useState } from "react";
import "./App.css";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Component/Chat";
import Login from "./Component/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUser(user);
    console.log(user.name);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = (user) => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.setItem("isAuthenticated", false);
    localStorage.removeItem("user");
  };

  return (
    <div className="app">
      {isAuthenticated ? (
        <Router>
          <Header onLogout={handleLogout} />
          <div className="app__body">
            <Sidebar user={user} />
            <Switch>
              <Route path="/room/:roomId">
                <Chat user={user} />
              </Route>
              <Route path="/">
                <Chat user={user} />
              </Route>
            </Switch>
          </div>
        </Router>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
