require('dotenv').config() //<--enables you to access your environment variables. You have to create your own .env files and match the DB_USERNAME etc.
const express = require('express');
const expressGraphQL = require('express-graphql')
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLList, GraphQLNonNull, } = require('graphql');
const schema = require('./api/routes/schema');
const mongo = require('mongoose')
const app = express()



mongo.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_YOUR_OWN_CLUSTER}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongo.connection.once('open', () => {
    console.log('connected to database');
})

// Use GraphQL as MiddleWare 
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))


// // //-------------------GET PORT TO LISTEN ON-----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`running server on port ${PORT}`));