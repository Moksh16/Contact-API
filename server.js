const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { connect } = require("mongoose");
const connect_db = require("./config/db_connection");

const app = express()
const dotenv = require("dotenv").config()
const port = process.env.PORT;

connect_db()
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require('./routes/userRoutes'));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`this is port ${port}`)
})

