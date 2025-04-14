const express = require('express');


// express app
const app = express();


// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(5000);

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