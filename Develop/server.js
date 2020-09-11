const fs = require("fs");
const express = require("express");
//const { response } = require("express");

const bodyParser = require("body-parser");

const db = require("./db/db.json");

const server = express();

const jsonParser = bodyParser.json();

// server.use(express.bodyParser());
server.use(express.static(__dirname + '/public'));


// console.log(__dirname);
// response.sendFile(__dirname + )


// GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
server.get("/api/notes", (request, response) => {
    fs.readFile("./db/db.json", "utf8", (error, data) => {
        response.send(JSON.parse(data));
    })

});

// POST `/api/notes` - Should receive a new note to save on the request body, 
// add it to the `db.json` file, and then return the new note to the client.

// This means you'll need to find a way to give each note a unique `id` when it's saved. 
// id = DATE and TIME ??
server.post("/api/notes", jsonParser, (request, response) => {
    const note = request.body;
    console.log(note);
    fs.readFile("./db/db.json", "utf8", (error, data) => {
        let dbNotes = JSON.parse(data);

        // Let's assign a new id to the new note, before saving it to db.json
        note.id = (new Date()).getTime();

        // Add the new note to the dbNotes object
        dbNotes.push(note);

        // Show the new future db.json contents
        console.log(dbNotes);

        // Save the new db.json contents
        fs.writeFile("./db/db.json", JSON.stringify(dbNotes), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The db.json was updated with a new note!");
        }); 

        // Send the new note back to the client
        // response.send(data);
        response.send(note);
    })

});

// DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. 
// In order to delete a note, you'll need to read all notes from the `db.json` file, 
// remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
server.delete("/api/notes/:id", (request, response) => {
    // fs.readFile("./movies.html", "utf8", (error, data) => {
        //response.send(JSON.stringify(request.params.id));
    // })

    fs.readFile("./db/db.json", "utf8", (error, data) => {
        let dbNotes = JSON.parse(data);

        // Remove the existing note that match the id provided
        dbNotes = dbNotes.filter(note => note.id !== parseInt(request.params.id));

        // Show the new future db.json contents
        console.log(dbNotes);

        // Save the new db.json contents
        fs.writeFile("./db/db.json", JSON.stringify(dbNotes), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The db.json was updated due to a deleted note!");
        }); 

        // Send the new note back to the client
        // response.send(data);
        response.send(dbNotes);
    })

});

// GET `/notes` - Should return the `notes.html` file.
server.get("/notes", (request, response) => {
    // console.log(request);
    // response.sendFile("/notes.html");
    fs.readFile("./public/notes.html", "utf8", (error, data) => {
        response.send(data);
    })

});

//GET `*` - Should return the `index.html` file
server.get("*", (request, response) => {
    fs.readFile("./public/index.html", "utf8", (error, data) => {
        response.send(data);
    })

});






server.listen(3001, () => {
    console.log("The server is listening on port 3001")
});


// CNTL-C to kill express