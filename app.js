const express    = require('express'),
      app        = express(),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/recipesOnline', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))