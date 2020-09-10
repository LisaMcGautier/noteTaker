const fs = require("fs");
const express = require("express");
const { response } = require("express");

const server = express();


// console.log(__dirname);
// response.sendFile(__dirname + )



// match urls from starter code index.js file
server.get("/api/notes", (request, response) => {
    fs.readFile("../db/db.json", "utf8", (error, data) => {
        response.send(data);
    })

});

server.post("/api/notes", (request, response) => {
    fs.readFile("./foods.html", "utf8", (error, data) => {
        response.send(data);
    })

});

server.delete("/api/notes/:id", (request, response) => {
    // fs.readFile("./movies.html", "utf8", (error, data) => {
        response.send(JSON.stringify(request.params));
    // })

});

server.get("/notes", (request, response) => {
    fs.readFile("../public/notes.html", "utf8", (error, data) => {
        response.send(data);
    })

});

server.get("/", (request, response) => {
    fs.readFile("../public/index.html", "utf8", (error, data) => {
        response.send(data);
    })

});

server.get("*", (request, response) => {

    response.send("Catch-all route");
});




server.listen(3001, () => {
    console.log("The server is listening on port 3001")
});


// CNTL-C to kill express