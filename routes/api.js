const express = require('express');
const router = express.Router();

let data = [
    { id: 0, name: "person1", username: "user1" },
    { id: 1, name: "person2", username: "user2" },
    { id: 2, name: "person3", username: "user3" }
];

router.get('/person', function(req, res, next) {
    res.status(200).send(data);
});

router.get('/person/:id', function(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const person = data.find(person => person.id === id);
    if (person) {
        res.status(200).send(person);
    } else {
        res.status(404).send({ error: "Person not found" });
    }
});

router.post('/person', function(req, res, next) {
    const { id, name, username } = req.body;
    if (typeof id === 'number' && typeof name === 'string' && typeof username === 'string') {
        data.push({ id, name, username });
        res.status(201).send({ id, name, username });
    } else {
        res.status(400).send({ error: "Invalid data" });
    }
});

router.put('/person/:id', function(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const { name, username } = req.body;
    const personIndex = data.findIndex(person => person.id === id);
    if (personIndex !== -1) {
        if (typeof name === 'string' && typeof username === 'string') {
            data[personIndex] = { id, name, username };
            res.status(200).send(data[personIndex]);
        } else {
            res.status(400).send({ error: "Invalid data" });
        }
    } else {
        res.status(404).send({ error: "Person not found" });
    }
});

module.exports = router;