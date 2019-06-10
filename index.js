// implement your API here
const express = require('express'); // import the express package

const db = require('./data/db');

const server = express(); // creates the server

server.use(express.json());  // read json data from frontend (middleware)

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
    res.send('Hello from Express');
});

// ---- ENDPOINTS ----

// Creates a user using the information sent inside the request body:
server.post('/users', (req, res) => {
    /*
        const newUser = req.body;
        db.insert(newUser)
            .then()
            .catch()
    */
});


// Returns an array of all the user objects contained in the database:
server.get('/users', (req, res) => {
    db.find()
        .then(users => res.status(201).json(users))
        .catch(err => res.status(500).json({ err: 'The users information could not be retrieved' }))
});


// Returns the user object with the specified id:
server.get('/users/:id', (req, res) => {
    db.findById(id)
    .then(count => {
        if (count) {
            res.sendStatus(204).end()
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist' })
        }
    })
    .catch(err => res.status(500).json({ err: 'The user information could not be retrieved' }))
});


// Removes the user with the specified id and returns the deleted user:
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(count => {
            if (count) {
                res.sendStatus(204).end()
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist' })
            }
        })
        .catch(err => res.status(500).json({ err: 'The user could not be removed' }))
});

// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original:
server.put('/users/:id', (req, res) => {

})


// watch for connections on port 5000
server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
);