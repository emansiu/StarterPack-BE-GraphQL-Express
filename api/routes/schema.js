const graphql = require('graphql');
const axios = require('axios');

// import all models
const Authors = require('../models/model_author_example');
const Books = require('../models/model_book_example');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLList, GraphQLNonNull, } = require('graphql');


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents an author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return Books.find({ authorId: author.id })
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
        authorId: { type: GraphQLNonNull(GraphQLID) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return Authors.findById(book.authorId)
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
            resolve: (parent, args) => Books.findById(args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'list of all books',
            resolve: () => Books.find({})
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => Authors.findById(args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'list of all authors',
            resolve: () => Authors.find({})
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
                authorId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                let book = new Books({
                    name: args.name,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add a new Author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                let author = new Authors({
                    name: args.name
                })
                return author.save();

            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})