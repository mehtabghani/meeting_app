'use strict';

var User = require('../models/User.model');
var Note = require('../models/Note.model');

exports.allUserNotes = function (req, res) {
    //Find all users

    User.find({})
        .sort( {username: 1})
        .exec(function(err, users){
            if(err){
                console.log('Getting error while finding users');
                res.send(err);
                return;
            }

            return res.render('newnote', {
               title: 'New Note',
                users: users
            });

        });
};

exports.createNote = function (req, res) {
    // creating a new note

    // Creating a new Note
    var newNote = new Note();
    newNote.memberName = req.body.memberName;
    newNote.project = req.body.project;
    newNote.workYesterday = req.body.workYesterday;
    newNote.workToday = req.body.workToday;
    newNote.impediment = req.body.impediment;

    newNote.save(function(err) {
        if(err) {
            var errMsg = 'Sorry, there was an error saving ' + err;
            res.render('newnote', {
                title: 'Note - new note (error)',
                message: errMsg
            });
        } else {
            console.log('Meeting note has been saved ');
            res.redirect(301, '/');
        }
    });
};
