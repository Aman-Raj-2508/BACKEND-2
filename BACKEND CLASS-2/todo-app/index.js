const express = require("express");
const app = express();

// to let this app listen on some PORT we need the PORT from config file
require('dotenv').config();

const PORT = process.env.PORT || 4000; // ya toh port env file se aayega aur agr nhi atta toh by default 4000 PORT pr listen karwao
//controller ke andar hm data pass kiye but without parser it will show error, So

// Middleware to parse JSON request body
app.use(express.json()); // this is the parser.

//import routes for  TODO Api
const todoRoutes = require('./routes/todos');

//Mount the TODO Api Routes
app.use("/api/v1", todoRoutes);

//start server
app.listen(PORT, () => {
    console.log(`server started successfully at ${PORT}`);
})

//connect to the database
const dbConnect = require('./config/database');
dbConnect();

//default route
app.get('/', (req, res) => {
    res.send('<h1> THIS IS HOMEPAGE BABY</h1>');
})
