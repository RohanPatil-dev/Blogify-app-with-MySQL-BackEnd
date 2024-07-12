const express = require('express')
const app = express()
const path = require("path")

const cors = require("cors")
const bodyParser = require("body-parser")

const port = 8081

app.use(cors())
app.use(bodyParser.json())

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//routes
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blogs")
const blogComments = require("./routes/blogComments")

// using route middleware
app.use("/", userRoute)
app.use("/blogs", blogRoute)
app.use("/comments",blogComments)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))