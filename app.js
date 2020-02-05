// SETUP =====
const express    = require('express'),
      app        = express(),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser');

// DB MODELS SETUP
const Recipe = require('./models/recipe'),
      Comment = require('./models/comment');

mongoose.connect('mongodb+srv://RecipeAdmin:RecipePassword@recipesonline-6rvfv.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => {
    res.send('hi')
});

// SERVER
app.listen(process.env.PORT | 3000, () => {
    console.log('The Server has started!');
})