const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true, trim: true},
        name: {type: String, required: true},
        surnames: {type: String, required: true},
        email: {type: String, required: true, unique: true, trim: true},
        password: {type: String, required: true, trim: true},
        rol: {type: String, default: 'user', enum: ['admin', 'user']},
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model('users', userSchema);
module.exports = User;