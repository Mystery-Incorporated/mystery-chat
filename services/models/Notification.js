require('dotenv').config()
var mongoose = require('mongoose');

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

/**
 * Notification Schema
 * 
 * 0 - follow
 * 1 - new message
 * 99 - other
 */
var schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: false,
        minlength: 4,
        validate: /^[a-z0-9_-]+$/i
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    subtitle: {
        type: String,
        required: true,
        unique: false
    },
    data: {
        type: new Schema({
            from: {
                type: String,
                required: true, 
                unique: false,
                default: ''
            },
            id: {
                type: Number,
                required: true, 
                unique: false,
                default: 99
            }
        }),
        required: false,
        unique: false
    },
    read: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true });


module.exports = mongoose.model('Notification', schema);
