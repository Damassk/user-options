const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/userOptions', {
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

app.listen(3021, () => {
    console.log('Server start on port 3021');
});
