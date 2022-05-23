import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [usernameReg, setusernameReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [loginstatus, setloginstatus] = useState("");

  const getuserInfo = () => {
    axios
      .post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log("userinfo sent from client");
      });
  };

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setloginstatus("wrong username/password combination");
        } else {
          setloginstatus("Welcome " + response.data[0].user_name);
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="registration">
          <h2>Register</h2>
          <div className="register">
            <label>Username: </label>
            <input
              type="text"
              placeholder="What's your name"
              onChange={(e) => setusernameReg(e.target.value)}
            ></input>

            <label>Password: </label>
            <input
              type="text"
              placeholder="Set password"
              onChange={(e) => setpasswordReg(e.target.value)}
            ></input>

            <button onClick={getuserInfo}>Register</button>
          </div>
        </div>
        <div className="login">
          <h2>Login</h2>
          <div className="log">
            <label>Username: </label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setusername(e.target.value)}
            ></input>
            <label>Password: </label>
            <input
              type="text"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            ></input>
            <button onClick={login}>Login</button>
          </div>
        </div>
      </div>
      <div className="output">{loginstatus}</div>
    </>
  );
}

export default App;
