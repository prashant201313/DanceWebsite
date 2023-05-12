const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const bodyparser = require("body-parser");
const app = express();
const port = 800;

// Deifne mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

const Contact = mongoose.model('Contact', contactSchema);

// EXPRRESS SPECIFIC STUFF
app.use('/static', express.static('static'));    // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');     // set the template engine as pug
app.set('views', path.join(__dirname, 'views'));     // Set the view directory

// ENDPOINT
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database");
    }).catch(() => {
        res.status(400).send("Item was not saved to database");
    });
    // res.status(200).render('contact.pug', params);
});



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})