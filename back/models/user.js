const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    likes: {type: Number, defaut:0 },
    dislikes: {type: Number, defaut:0 },
    usersLiked: {type: [String] },
    usersDisliked: { type: [String] }
    
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);