const express = require("express")
const mongoose = require("mongoose")
const httpError = require("http-errors")
const env = require("./config/config")
// const { setCors } = require("./middleware/security")


const app = express()
app.use(express.json({ extended: true }))


// mongoDB
mongoose.connect(env.db, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("error", (err) => console.log(err))
mongoose.connection.on("open", () => console.log("database connected"))


// for testing
app.get('/', function (req, res) {
    res.send("hello from server")
})


// http errors
app.use((req, res, next) => {
    next(httpError(404))
})
app.use((err, req, res, next) => {
    res.json({ status: err.status, err: err.message })
})


// server
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server has been started on port: ${port}`)
})