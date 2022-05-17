const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7247517280",
  database: "authenticationsystem",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "INSERT INTO userinfo (user_name,password) VALUES(?,?)",
    [username, password],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("userinfo received");
      }
    }
  );

  res.send("userinfo received by server");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM userinfo WHERE user_name = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        res.send({ err: err });
      } else if (results.length > 0) {
        res.send(results);
      } else {
        res.send({ message: "wrong username/password" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server running at port 30001");
});
