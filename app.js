const express = require("express")
const ExpressHandlerbars = require("express-handlebars")
const notes = require("./routes/notes")
const bodyParser = require("body-parser")

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// view Engine
app.engine("handlebars", ExpressHandlerbars())
app.set('view engine', 'handlebars')

// serve static file
app.use(express.static('public'))

// landing page
app.get('/', (req, res) => {
    res.render("index")
})

// router for "/notes"
// will be wrapped in a class in a later stage of the project, initialize when login done
app.use("/notes", notes)


app.listen(3000, () => {
    console.log("app is listening to port: 3000")
})