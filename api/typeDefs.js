import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Author {
        _id: ID!
        name:String!
        books:[Book]
    }
    type Book{
        _id: ID!
        name: String!
        authorId: ID
        author: Author
    }
    type Query {
        hello: String!
        books:[Book!]!
        authors:[Author!]

    }
    type Mutation {
        addBook(name:String!,authorId:String):Book!
        updateBook(name:String!):Book
        deleteBook(_id:ID!):Book
        addAuthor(name:String!):Author!
    }
`;