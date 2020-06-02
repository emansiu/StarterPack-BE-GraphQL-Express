const mongo = require('mongoose');
const Schema = mongo.Schema;

const authorSchema = new Schema({
    name: String
});

module.exports = mongo.model('Author', authorSchema);