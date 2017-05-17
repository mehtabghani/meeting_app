'use strict';

const User = require('../models/User.model');
const Note = require('../models/Note.model');
const async = require('async');

module.exports.homePage =  function (req, res) {
    //Gather all notes and users

    async.parallel([
        function(callback) {
            let query = Note.find({});
            query.sort({createdOn:'desc'})
                .limit(12)
                .exec(function(err, result){
                    callback(err, result);
                });
        },
        function(callback) {
            let query = User.find({});
            query.sort({username:1})
                .exec(function(err, result){
                    callback(err, result);
                });
        }
    ], function(err, results) {
        // optional callback
        if(err)
            console.log(err)

        res.render('index', {
            notes: results[0],
            users: results[1]
        })
    });
};

module.exports.noteByMember = function(req, res) {

    async.parallel([
        function(callback) {
            let query = Note.find({});
            query.where({memberName: req.body.memberName})
                .sort( {createdOn: 'desc'})
                .exec(function (err, notes) {
                    callback(err, notes)

                });
        },
        function(callback) {

            let query = User.find({});
            query.sort({username:1})
                .exec(function(err, result){
                    callback(err, result);
                });
        }
    ], function(err, results) {
        // optional callback

        if(err)
            console.log(err)

        res.render('index', {
            notes: results[0],
            users: results[1]
        })
    });
};