const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL) 
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

    app.use("/api/pins", pinRoute);
    app.use("/api/users", userRoute);



app.listen(8800, () => {
    console.log("Server is running on port 8800");
})