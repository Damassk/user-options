const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const port = process.env.PORT || 3021;
const {MONGO_HOSTNAME = 'localhost', MONGO_PORT = '27017', MONGO_DB = 'userOptions'} = process.env;

const app = express();

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once('open', () => {
    console.log('Server connected to MongoDB');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
});
