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
if (process.env.MONGO_CONNECTION_URI) {
    Connection.url = process.env.MONGO_CONNECTION_URI;
} else {
    Connection.url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rwpmp.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
    // Connection.url = `${process.env.MONGO_CONNECTION_TYPE}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DB_NAME}?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000`;
    if (process.env.MONGO_DB_AUTHDB) {
        Connection.url += `&authSource=${process.env.MONGO_DB_AUTHDB}`;
    }
    if (process.env.MONGO_AUTH_MECHANISM) {
        Connection.url += `&authMechanism=${process.env.MONGO_AUTH_MECHANISM}`;
    }
}

Connection.options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports = { Connection };
