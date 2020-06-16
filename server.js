require('dotenv').config() //<--enables you to access your environment variables. You have to create your own .env files and match the DB_USERNAME etc.
import { ApolloServer, gql } from 'apollo-server-express';
import mongo from 'mongoose';
import express from 'express';
import { resolvers } from './api/resolvers';
import { typeDefs } from './api/typeDefs';

const app = express();

//CONNECT TO YOUR OWN MONGODB CLUSTER
mongo.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_YOUR_OWN_CLUSTER}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongo.connection.once('open', () => {
    console.log('connected to database');
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

//-------------------GET PORT TO LISTEN ON-----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`running server on port ${PORT}`));




// // Use GraphQL as MiddleWare 
// app.use('/graphql', expressGraphQL({
//     schema,
//     graphiql: true
// }))

// // ---SERVE STATIC ASSETS FOR PRODUCTION AND DEV-----
// if (process.env.NODE_ENV === "production") {
//     // set static folder. __dirname if file is in root
//     app.use(express.static("public"));

//     // Now assign the file to use to land on
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "public", "index.html"));
//     })
// } else {
//     app.use(express.static('public'))
// }


// // // //-------------------GET PORT TO LISTEN ON-----------------
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`running server on port ${PORT}`));

