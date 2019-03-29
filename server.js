const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const users = require("./users");
const matches = require("./matches");
const comments = require("./comments");



app.use(bodyParser.json());

app.post("/register", (req, res) =>{
    users.push(req.body);

    res.end();
});

app.get("/login/users/:id", (req, res) => {
    const CurrentUser = users.find(u => u.id === parseInt(req.params.id));

    res.json(CurrentUser);
});

app.get("/users", (req, res) => {  // Function only for admins

    res.json(users);
});


app.put("/login/users/:id", (req, res) => {
    const CurrentUser = users.find(u => u.id === parseInt(req.params.id));
    const UpdateUser = req.body;

    CurrentUser.firstName = UpdateUser.firstname;
    CurrentUser.lastName = UpdateUser.lastname;
    CurrentUser.age = UpdateUser.age;

    res.json();
});


app.delete("/login/users/:id", (req, res) => {
    const idToDelete = req.params.id;
    const indexToDelete = users.findIndex(u => u.id === parseInt(idToDelete));
  
    users.splice(indexToDelete, 1);
  
    res.json();
});

app.get("/matches", (req, res) => {
    res.json(matches);
});

app.post("/matches", (req, res) => {
    const match = req.body;
    matches.push(match);

    res.json();
});

app.get("/matches/:id", (req, res) => {
    const CurrentMatch = matches.find(m => m.id === parseInt(req.params.id));

    res.json(CurrentMatch);
});

app.put("/matches/:id", (req, res) => {
    const CurrentMatch = matches.find(m => m.id === parseInt(req.params.id));
    const UpdateMatch = req.body;

    CurrentMatch.namematch = UpdateMatch.namematch;
    CurrentMatch.result = UpdateMatch.result;
    CurrentMatch.date = UpdateMatch.date;

    res.json();
});

app.delete("/matches/:id", (req, res) => {
    const idMatch = req.params.id;
    const IdDeleteMatch = matches.findIndex(m => m.id === parseInt(idMatch));

    matches.splice(IdDeleteMatch, 1);

    res.json();
});

app.post("/matches/:id/comments", (req, res) => {
    const CurrentMatch = matches.find(m => m.id === parseInt(req.params.id));
    const comment = req.body;

    comments.push(comment);

    res.json();
});

app.get("/matches/:id/comments/:com", (req, res) => {
    const CurrentMatch = matches.find(m => m.id === parseInt(req.params.id));
    const CurrentComment = comments.find(c => c.id === parseInt(req.params.com));

    res.end(`${CurrentMatch.namematch} ${CurrentMatch.result} Comment:${CurrentComment.text}`);
});

app.listen(4444, () => {
    console.log(`Listening on ${4444}`);
  });
