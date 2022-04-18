const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

class Connection {
    static async open() {
        if (this.db) return this.db;
        this.db = await mongoose.connect(this.url, this.options);

        return this.db;
    }
}
Connection.db = null;
// Connection.url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rwpmp.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
Connection.url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

Connection.options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports = { Connection };
