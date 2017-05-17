const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');
const asyncController = require('../controllers/async.controller');

//ROUTE: Home page
router.get('/', asyncController.homePage);
router.post('/', asyncController.noteByMember);

//ROUTE: New notes
router.get( '/newnote'  , notesController.allUserNotes);
router.post('/newnote'  , notesController.createNote);

module.exports = router;
