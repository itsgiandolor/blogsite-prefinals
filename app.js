const express = require('express');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://astraeiaaaa:astraeiaaaa@blogs.wujlxjp.mongodb.net/?retryWrites=true&w=majority&appName=blogs'
mongoose.connect(dbURI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

// routes
// homepage
app.get('/', (req, res) => {
    // res.send('<h1> homepage </h1>');
    res.render('index');
});

// about page
app.get('/about', (req, res) => {
    // res.send('<h1> homepage </h1>');
    res.render('about');
});

// create blog page
app.get('/create', (req, res) => {
    res.render('create');
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});