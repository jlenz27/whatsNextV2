const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config()

app.use(express.json())

mongoose
.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => console.log(err));


app.listen(8800,()=>{
    console.log("Server is running on port 8800");
})