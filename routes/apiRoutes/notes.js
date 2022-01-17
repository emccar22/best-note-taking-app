const router = require('express').Router();
const { findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

router.get('/notes', (req,res) => {
    let result = notes;
    res.json(result);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.delete('./notes/:id', (req, res) => {
    const note = notes.find(n => n.id == req.params.id);
    if (!note) return res.status(404).send('The note with the given ID is not found')

    const index = notes.indexOf(note);
    notes.splice(index, 1);
    updateDb(notes)

    res.send(note);
});



router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;