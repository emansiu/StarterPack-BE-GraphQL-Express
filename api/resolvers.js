// IMPORT THE CURRENT MODELS WE HAVE
const Authors = require('./models/model_author_example');
const Books = require('./models/model_book_example');

export const resolvers = {
    Query: {
        hello: () => "a string",
        books: () => Books.find()
    },
    Mutation: {
        addBook: (_, { name, authorId }) => {
            const book = new Books({ name, authorId });
            return book.save();
        },
        addAuthor: (_, { name }) => {
            const author = new Authors({ name });
            return author.save();
        }
    }
};