const mongoose = require('mongoose');

const userOptionsSchema = new mongoose.Schema({
    name: String,
    value: String
});

module.exports = mongoose.model('UserOptions', userOptionsSchema);
