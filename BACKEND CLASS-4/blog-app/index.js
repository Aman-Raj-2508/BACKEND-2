const express = require("express");

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const blogRoutes = require('./routes/blogRoutes');

app.use("/api/v1", blogRoutes);

app.listen(PORT, () => {
    console.log(`server started successfully at ${PORT}`);
})

const dbConnect = require('./config/database');
dbConnect();


app.get("/", (req, res) => {
    res.send("This is blog Homepage");
})