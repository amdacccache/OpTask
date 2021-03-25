require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

function OpTaskDB() {
  const opDB = {};

  const url = process.env.DB_STRING;
  const DB_NAME = "OpTask";

  // this function will return a basic client promise for the database.
  // this function is being used to have express-session save data on the DB.
  opDB.getConnection = async function () {
    let client;
    console.log("Creating connection...");
    client = new MongoClient(url, { useUnifiedTopology: true }).connect();
    return client;
  };

  // save a new user to the DB
  opDB.saveNewUser = async function (newUser) {
    let client;
    console.log("Saving user....");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(DB_NAME);
    const usersCollection = db.collection("users");
    const result = await usersCollection.insertOne(newUser);
    return result.insertedCount;
  };

  // try to find a user given a username
  opDB.getUserByEmail = async function (query) {
    let client;
    console.log("Finding user...");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connecting to OpTask DB...");
    const db = client.db(DB_NAME);
    const usersCollections = db.collection("users");
    const results = await usersCollections.findOne({
      username: query,
    });
    return results;
  };

  opDB.getUserById = async function (query) {
    let client;
    console.log("Finding user...");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connecting to OpTask DB...");
    const db = client.db(DB_NAME);
    const usersCollections = db.collection("users");
    const results = await usersCollections.findOne({
      _id: new ObjectId(query),
    });
    return results;
  };

  return opDB;
}

module.exports = OpTaskDB();
