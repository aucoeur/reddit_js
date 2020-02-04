// Require Libraries
require('dotenv').config();
const express = require('express');

// Set db
require('./data/reddit-db');

// App Setup
const app = express();
const port = process.env.PORT

// Middleware
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/',(req, res)  => {
    res.render('index')
})

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
})

// Controllers
require('./controllers/posts.js')(app);

// Run Server
app.listen(port, () => console.log(`Listening on port ${port}!`))