const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const users = require("./users");

app.use(bodyParser.json());

app.get("/users", (request, response) => {
    console.log(request.body);
    response.json(users);
});

app.post("/users",(request, response) => {
    console.log(request.body);
    const user = request.body;
    //users.push([user.id, user.fistName,user.lastName, user.age]);
    users.push({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age
    });
});

app.delete("/users", (request, response) => {
    console.log(request.body);
    const del = request.body;
    users.splice(del.id-1, 1);

});

app.get("/usersfind", (request, response) => {
    console.log(request.body);
    const look = request.body;
    const result = users.find( found => found.id === look.id);
    response.json(result);
});

app.get("/usersByAge", (request, response) => {
    console.log(request.body);
    const result = users.sort(function(a,b) {
        return a.age - b.age;
    });
    response.json(result);
});

app.get("/usersSortedByFirstName", (request, response) => {
    console.log(request.body);
    const result = users.sort(function(a,b) {
        
        var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
        return -1;
        }
        if (nameA > nameB) {
        return 1;
        }

        // names must be equal
        return 0;
    });
    response.json(result);
});

app.get("/usersWithFirstNameContainingString", (request, response) => {
    console.log(request.body);
    const shouldStartWith = request.body;
    const result = users.filter((first) => first.firstName.startsWith(shouldStartWith.words));
    response.json(result);

});

app.get("/usersOlderThan", (request, response) => {
    console.log(request.body);
    const years = request.body;
    const result = users.filter(old => old.age > years.age);
    response.json(result);
});


app.listen(4444, () => {
    console.log(`Listening on ${4444}`);
  });
