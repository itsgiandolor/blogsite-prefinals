const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// middleware for updating
app.use(methodOverride('_method'));

// connect to mongodb
const dbURI = 'mongodb+srv://astraeiaaaa:astraeiaaaa@blogs.wujlxjp.mongodb.net/?retryWrites=true&w=majority&appName=blogs'
mongoose.connect(dbURI)
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); // parses the data into a usable object

// routes
app.get('/', (req, res) => {
    // res.send('<h1> homepage </h1>');
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<h1> homepage </h1>');
    res.render('about', { title: 'About'} );
});


// blog routes
app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});