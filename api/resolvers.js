// IMPORT THE CURRENT MODELS WE HAVE
const Authors = require('./models/model_author_example');
const Books = require('./models/model_book_example');

export const resolvers = {
    Query: {
        hello: () => "a string",
        books: () => Books.find(),
        authors: () => Authors.find()
    },
    Mutation: {
        addBook: (parent, { name, authorId }) => {
            const book = new Books({ name, authorId });
            return book.save();
        },
        updateBook: (parent, { name, authorId }) => {
            return Books.findOneAndUpdate(
                {
                    _id
                },
                {
                    name
                },
                {
                    new: true //<--true = after update, false = before update
                    //upsert:true will create it if it doesn't exist
                }
            )
        },
        deleteBook: (parent, { _id }) => {
            return Books.findOneAndDelete(
                {
                    _id
                }
            )
        },
        addAuthor: (parent, { name }) => {
            const author = new Authors({ name });
            return author.save();
        }
    }
};