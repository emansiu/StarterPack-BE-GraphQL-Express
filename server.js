const express = require('express');
const expressGraphQL = require('express-graphql')
const {
    GraphQLSchema, GraphQLObjectType, GraphQLString
} = require('graphql');
const app = express()

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'graphql schema test',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello world'
            }
        })
    })
})

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))
app.listen(5000, () => console.log('server running'))