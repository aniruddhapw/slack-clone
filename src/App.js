import React, { useState } from "react";
import "./App.css";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Component/Chat";
import Login from "./Component/Login";
import { UserContext } from "./Component/UserContext";
import { useDispatch } from "react-redux";
import { clearUser, setUserData } from "./Store/Actions/userActions";

function App() {
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  dispatch(setUserData(user));
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setUser(user);
    dispatch(setUserData(user));

    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = (user) => {
    setIsAuthenticated(false);
    setUser(null);
    dispatch(clearUser);
    localStorage.setItem("isAuthenticated", false);
    localStorage.removeItem("user");
  };

  return (
    <div className="app">
      {isAuthenticated ? (
        <Router>
          <Header onLogout={handleLogout} />
          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/room/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </div>
        </Router>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
    // </UserContext.Provider>
  );
}

export default App;
