const express = require("express")
const mongoose = require("mongoose")
const httpError = require("http-errors")
const env = require("./config/config")
const {
    setCors
} = require("./middleware/security")
const indexRoute = require("./routes/indexRoute")
const musicianRoute = require("./routes/musicianRoute")
const projectRoutes = require("./routes/projectRoutes")

const app = express()
app.use(express.json({
    extended: true
}))

app.use(setCors)
app.use(express.static("client/build"))

// mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/vmr-db')
mongoose.connection.on("error", (err) => console.log(err))
mongoose.connection.on("open", () => console.log("database connected"))

app.use("/users", musicianRoute)
app.use("/api/projects", projectRoutes)

//client routes
app.use('/', indexRoute);
app.use('/musicianAccount', indexRoute);
app.use('/projects/:id?', indexRoute);
app.use('/signup', indexRoute);
app.use('/login', indexRoute);
app.use('/logout', indexRoute);
app.use('/musicians', indexRoute);
app.use('/service', indexRoute);
app.use('/support', indexRoute);
app.use('/profile/:id?', indexRoute);
app.use('/edit-account', indexRoute);
app.use('/delete-account', indexRoute);

// http errors
app.use((req, res, next) => {
    next(httpError(404))
})
app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        err: err.message
    })
})

// server
const port = process.env.PORT || 80

app.listen(port, () => {
    console.log(`Server has been started on port: ${port}`)
})
