const mongo = require('mongoose');
const Schema = mongo.Schema;

const bookSchema = new Schema({
    id: Number,
    name: {
        type: String,
        required: true
    },
    authorId: String
});

module.exports = mongo.model('Book', bookSchema);