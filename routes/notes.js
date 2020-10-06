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
        console.log(userInstance.list())
        res.render("notes", {data: userInstance.list()})
    })
    .post((req, res) => {
        console.log(req.body)
    })

router
    .route("/:noteId")
    .put((req, res) => {
        // req.params.id
        res.send("this is put notes: " + req.params.noteId)
    })
    .delete((req, res) => {
        console.log(`delete request recieved, noteId: ${req.params.noteId}`)
        userInstance.delete(req.params.noteId)
        res.render("notes", {data: userInstance.list()})
        // userInstance.delete(req.params.noteId).then(() => {
        //     res.render("notes", {data: userInstance.list()})
        //     console.log(userInstance.list())
        // })
        // (unconfirmed: if you do not wrap delete in promise, res will render before delete

    })


module.exports = router;