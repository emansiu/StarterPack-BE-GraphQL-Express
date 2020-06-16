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
        author:Author
    }
    type Query {
        hello: String!
        books:[Book!]!
    }
    type Mutation {
        addBook(name:String!):Book!
        addAuthor(name:String!):Author!
    }
`;