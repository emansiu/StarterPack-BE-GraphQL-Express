const mongo = require('mongoose');
const Schema = mongo.Schema;

const bookSchema = new Schema({
    id: Number,
    name: String,
    authorId: Number
});

module.exports = mongo.model('Book', bookSchema);