# Starter Pack
## Back end server with GraphQL, Express, and MongoDB

### included library dependancies
* express (server routes)
* graphql (api and queries)
* express-graphql (puts the two together)
* dotenv (hide sensitive passwords)
* mongoose (managing MongoDB schema)

### dev dependancy
* nodemon

### scripts added to package.json
```json
"scripts":{
    "devStart":"nodemon server.js"
}
```

# Get Started
### Database
This start up is using an actual MongoDB database online, so you will need your own ***URI*** and ***Cluster*** which you can get for free at https://www.mongodb.com/cloud/atlas
### File Changes
* server.js contains a line that currently grabs nothing:
```javascript
mongo.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_YOUR_OWN_CLUSTER}`
```
* create a .env file and assign your own credentials:
```
DB_USERNAME=yourUsername
DB_PASSWORD=yourPassword
DB_YOUR_OWN_CLUSTER=yourClusterName
```
Finally, just run the following in your terminal:
```
npm install
npm run dev
```
This is will get your server up and running on localhost:5000
* since graphiql is set to true you can run queries at localhost:5000/graphql
