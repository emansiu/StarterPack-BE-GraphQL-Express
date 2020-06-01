const mongo = require('mongoose');
const Schema = mongo.Schema;

const authorSchema = new Schema({
    id: Number,
    name: String
});

module.exports = mongo.model('Book', authorSchema);