// SETUP =====
const express        = require('express'),
      app            = express(),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override');

// DB MODELS SETUP
const Recipe = require('./models/recipe'),
      Comment = require('./models/comment');

mongoose.connect('mongodb+srv://RecipeAdmin:RecipePassword@recipesonline-6rvfv.mongodb.net/recipes?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');  // Tells express that we are going to be using ejs
app.use(express.static(__dirname + '/public')); // link to the stylesheets

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  // override with POST having ex: "?_method=DELETE" in url

// ROUTES
app.get('/', (req, res) => {
    res.redirect('/recipes');
});

// INDEX - shows all recipes
app.get('/recipes', (req, res) => {
    // Finds all recipes in the database and renders the index page with them
    Recipe.find({}, (err, recipes) => {
        if(err) { console.log('Error finding recipes\n', err); }
        else {
            console.log( 'Recipes found:\n', recipes );
            res.render('index', { recipes: recipes });
        }
    });
});

// CREATE - add new recipes
app.post('/recipes', (req, res) => {
    // Clears database (for testing purposes)
    // Recipe.deleteMany({}, (err) => { console.log('DB cleared'); });

    // if user did not provide an image url, then 'No Image Avaiable' image will be set
    if(req.body.recipe.image === "") {
        req.body.recipe.image = 'https://www.eberhard.com/sites/default/files/default_images/NoImage_0_0.jpg';
    }

    // Creates a new recipe in the database then redirects to /recipes get route
    Recipe.create(req.body.recipe, (err, recipe) => {
        if(err) { console.log('There was an error adding to database\n', err); }
        else { 
            console.log('New Recipe:', recipe);
            res.redirect('/recipes');
        }
    });
});

// SHOW - shows more information about a single recipe
app.get('/recipes/:id', (req, res) => {
    // Searches the database for a recipe matching that id then renders a page with that recipe details
    Recipe.findById(req.params.id, (err, recipe) => {
        if(err) { console.log('There was an error with finding the recipe\n', err); }
        else { res.render('showRecipe', { recipe: recipe}); }
    });
});

// DELETE - deletes the selected recipe from database
app.delete('/recipes/:id', (req, res) => {
Recipe.findOneAndDelete(req.params.id, (err, deletedRecipe) => {
        if(err) { console.log('There was an error deleting the recipe\n', err); }
        else {
            console.log(deletedRecipe.title + ' was deleted from database.');
            res.redirect('/recipes');
        }
    });
});

// SERVER
app.listen(process.env.PORT | 3000, () => {
    console.log('The Server has started!');
})