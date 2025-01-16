const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

let notes = [
    {
        id: 1,
        note: "My new Note",
        author: "Me",
        date: "2025-01-15"
    }
];

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/notes', (request, response) => {
    response.json(notes);
});

app.post('/notes', (request, response) => {
    const note = {
        id: notes.length + 1,
        note: request.body.note,
        author: request.body.author,
        date: request.body.date
    }
    notes.push(note);
    response.json(note);
});

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.put('/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);

    if (note) {
        note.note = request.body.note;
        note.author = request.body.author;
        note.date = request.body.date;
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);

    if (note) {
        delete notes[id];
        response.status(204).end();
    } else {
        response.status(404).end();
    }
});