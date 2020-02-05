// SETUP =====
const express    = require('express'),
      app        = express(),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser');

// DB MODELS SETUP
const Recipe = require('./models/recipe'),
      Comment = require('./models/comment');

mongoose.connect('mongodb+srv://RecipeAdmin:RecipePassword@recipesonline-6rvfv.mongodb.net/recipes?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => {
    res.redirect('/recipes');
});

app.get('/recipes', (req, res) => {
    Recipe.find({}, (err, found) => {
        console.log( 'Recipes found:\n', found )
    })
    res.render('index');
});

// Creates a new recipe in the database then redirects to /recipes get route
app.post('/recipes', (req, res) => {
    // Clears database (for testing purposes)
    Recipe.deleteMany({}, (err) => { console.log('DB cleared'); });

    // if user did not provide an image url, then 'No Image Avaiable' image will be set
    if(req.body.recipe.image === "") {
        req.body.recipe.image = 'https://www.eberhard.com/sites/default/files/default_images/NoImage_0_0.jpg';
    }

    Recipe.create(req.body.recipe, (err, recipe) => {
        if(err) { console.log('There was an error adding to database\n', err); }
        else { 
            console.log('New Recipe:', recipe);
            res.redirect('/recipes');
        }
    });
});

// SERVER
app.listen(process.env.PORT | 3000, () => {
    console.log('The Server has started!');
})