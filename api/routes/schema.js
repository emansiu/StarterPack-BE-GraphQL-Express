const graphql = require('graphql');

// import all models
const Authors = require('../models/model_author_example');
const Books = require('../models/model_book_example');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLList, GraphQLNonNull, } = require('graphql');


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents an author of a buook',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return Books.find(book => book.authorId === author.id)
            }
        }
    })
})
const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return Authors.find(author => author.id === book.authorId)
            }
        }
    })
})

// ====================== MUTATIONS ===================
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
                books.push(book)
                return book
            }
        }
    })
})

// ====================== ROOT QUERY =========================
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A single book',
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => Books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'list of all books',
            resolve: () => Books
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => Authors.find(author => author.id === args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'list of all authors',
            resolve: () => Authors
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})