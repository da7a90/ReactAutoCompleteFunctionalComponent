const express = require('express');
const cors = require('cors');
// creating an express app
const app = express();

app.use(cors());
// defining a simple route that returns our data to the React frontend
app.get('/', (req, res) => {
    res.json({"data": ["JavaScript","Java","C","C++","Lisp","Go","Rust","Python","PHP","Ruby","C#","Swift","Kotlin","Dart","OCaml","Perl","Haskell","Solidity"]});
});

// listening for requests
app.listen(3030, () => {
    console.log("Server is listening on port 3030");
});