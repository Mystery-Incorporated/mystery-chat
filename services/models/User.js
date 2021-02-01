require('dotenv').config()
var mongoose = require('mongoose');

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

/**
 * User Schema
 */
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        validate: /^[a-z0-9_-]+$/i
    },
    firstname: {
        type: String,
        required: true,
        unique: false
    },
    lastname: {
        type: String,
        required: true,
        unique: false
    },
    avatar: {
        type: String,
        required: false,
        unique: false,
        default: ''
    },
    bio: {
        type: String,
        required: false,
        unique: false,
        default: ''
    },
    avatarType: {
        type: Number,
        required: false,
        unique: false,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true,
        unique: false
    },
    following: {
        type: [String],
        required: true,
        unique: false,
        default: []
    },
    sent: {
        type: Number,
        required: false,
        unique: false,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true });


module.exports = mongoose.model('User', userSchema);
