const express = require('express');

const app = express();

//used to parse req.body in express , used in PUT or POST request
const bodyparser = require('body-parser');

// specifically parse JSON data and add it to the request.body object
app.use(bodyparser.json());

app.listen(3000, () => {
    console.log("Server started at port 3000");
});

// Creating route
app.get('/', (req, res) => {
    res.send("Hello jii");
})

app.post('/api/cars', (req, res) => {
    const { name, brand } = req.body;
    console.log(name);
    console.log(brand);
    res.send("car submitted successfully");
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabse', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log("Connection Succesfull") })
    .catch((error) => { console.log("Received an error") });