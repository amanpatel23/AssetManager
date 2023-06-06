const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/asset_manager');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to the database: MONOGODB'));
db.once('open', () => console.log('connected to the database: MONGODB'));

module.exports = db;