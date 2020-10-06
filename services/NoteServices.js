const fs = require("fs")

// note = fs.readFileSync(__dirname + "/../storage/notes.json", "utf-8")
// console.log(JSON.parse(note)["users"][0]["entries"]) // lets have a gander

class NoteService {
    constructor(userId) {
        this.note = []
        this.userId = userId
        this.refresh()
    }

    readStoragePromise() {
        return new Promise((resolve, reject) => {
            resolve(JSON.parse(fs.readFileSync(__dirname + "/../storage/notes.json", "utf-8")))
        })
    }

    refresh() {
        return this.readStoragePromise().then((result) => {
            this.note = result.users[this.userId].entries
        })
    }

    list() {
        return this.note
    }

    writeStorage() {
        return this.readStoragePromise()
        .then((result) => {
            result.users[this.userId].entries = this.note
            return result
        }
        ).then((result) => {
            fs.writeFileSync(__dirname + "/../storage/notes.json", JSON.stringify(result))
            console.log(result.users[this.userId].entries)
        })
    }

    add(text) {
        this.refresh()
        .then(() => {
            this.note.push(text)
        })
        .then(
            this.writeStorage()
        )
    }

    put(noteIndex, revisedText) {
        this.refresh()
        .then(() => {
            this.note[noteIndex] = revisedText
        })
        .then(
            this.writeStorage()
        )
    }

    delete(noteIndex) {
        return this.refresh()
        .then(() => {
            this.note.splice(noteIndex, 1)
        })
        .then(
            this.writeStorage()
        )
    }
}

samNote = new NoteService(0) // for testing
module.exports = NoteService