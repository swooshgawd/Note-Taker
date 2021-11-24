// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality

const express = require('express');
const path = require("path");
const db = require("./db/db.json")
const fs = require("fs")
const uniqid = require('uniqid');
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

app.get("/api/notes", (req,res) => {
    res.json(db)
})

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})

app.post("/api/notes", (req,res) => {
    let note = req.body
    note.id = uniqid();
    db.push(note)
    fs.writeFileSync(path.join(__dirname,"./db/db.json"),JSON.stringify(db))
    res.json("Note added to databases")
})
// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
