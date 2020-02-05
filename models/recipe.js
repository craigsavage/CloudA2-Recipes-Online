const mongoose = require('mongoose');

let recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: { type: String, default: 'https://www.eberhard.com/sites/default/files/default_images/NoImage_0_0.jpg' },
    like: { type: Number, default: 0 },
    dateCreated: { type: Date, default: Date.now },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);