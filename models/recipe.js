const mongoose = require('mongoose');

let recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    like: Number,
    dateCreated: { type: Date, default: Date.now },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);