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

