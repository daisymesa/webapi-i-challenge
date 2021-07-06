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

    const { name, bio, created_at, updated_at } = req.body;
    if (name === undefined || bio === undefined) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    } else {
        db.insert(req.body)
    }
    db.catch(error => res.status(500).json({ error: 'There was an error while saving the user to the database' }))
});


// Returns an array of all the user objects contained in the database:
server.get('/users', (req, res) => {
    db.find()
        .then(users => res.status(201).json(users))
        .catch(error => res.status(500).json({ error: 'The users information could not be retrieved' }))
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
        .catch(error => res.status(500).json({ error: 'The user information could not be retrieved' }))
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
        .catch(error => res.status(500).json({ error: 'The user could not be removed' }))
});

// Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original:
server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    db.update(id, user)
        .then(count => {
            if (count) {
                res.status(200).json({ success: true, count })
            } else {
                res.status(404).json({ message: 'There is ano hub with the specified id' })
            }
        })
        .catch(error => res.status(500).json({ error: 'The user information could not be modified' }))
})


// watch for connections on port 5000
server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
);