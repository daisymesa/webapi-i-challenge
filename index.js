// implement your API here
const express = require('express'); // import the express package

const server = express(); // creates the server

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from Express');
});

// ---- ENDPOINTS ----

// Creates a user using the information sent inside the request body:
server.post('/users', (req, res) => {

});


// Returns an array of all the user objects contained in the database.
server.get('/users', (req, res) => {

});


// Returns the user object with the specified id.
server.get('/users/:id', (req, res) => {

});


// Removes the user with the specified id and returns the deleted user.
server.delete('/users/:id', (req, res) => {

});

// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/users/:id', (req, res) => {

})


// watch for connections on port 5000
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);