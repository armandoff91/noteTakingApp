const express = require("express")
const ExpressHandlerbars = require("express-handlebars")
let router = express.Router()
const NoteService = require("../services/NoteServices")
// create new instance of note service
const userId = 0
console.log("note service on!" + `user ${userId} logged in.`)
userInstance = new NoteService(userId)

router
    .route("/")
    .get((req, res) => {
        res.render("notes", {data: userInstance.list()})
    })
    .post((req, res) => {
        console.log(req.body)
        userInstance.add(req.body.newEntry)
        .then(() => {
            res.send(typeof(req.body))
            // res.render("notes", {data: userInstance.list()})
        })
    })

router
    .route("/:noteId")
    .put((req, res) => {
        console.log(req.body)
        userInstance.put(req.params.noteId, req.body.putEntry)
        .then(() => {
            res.render("notes", {data: userInstance.list()})
            // unconfirmed: if you do not wrap delete in promise, res will render before delete
        })
        .catch((err) => {
            console.error(err)
        })
    })
    .delete((req, res) => {
        console.log(`delete request recieved, noteId: ${req.params.noteId}`)
        userInstance.delete(req.params.noteId)
        // is it necessary to wrap res.render in .then()?
        .then(() => {
            res.render("notes", {data: userInstance.list()})
            // unconfirmed: if you do not wrap delete in promise, res will render before delete
        })
        .catch((err) => {
            console.error(err)
        })
    })


module.exports = router;