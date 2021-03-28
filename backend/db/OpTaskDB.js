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

  // this function gets a user object by Id
  opDB.getUserById = async function (query) {
    let client;
    console.log("Finding user...");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connecting to OpTask DB...");
    const db = client.db(DB_NAME);
    const usersCollection = db.collection("users");
    const results = await usersCollection.findOne({
      _id: new ObjectId(query),
    });
    return results;
  };

  // this function gets projects for a user
  opDB.getUserProjects = async function (userId) {
    let client;
    console.log("Getting projects...");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connecting to OpTask DB...");
    const db = client.db(DB_NAME);
    const projectsCollection = db.collection("projects");
    const results = await projectsCollection
      .find({ ownerId: userId })
      .toArray();
    return results;
  };

  opDB.createProject = async (projectObject) => {
    let client;
    console.log("Creating project...");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connecting to OpTask DB...");
    const db = client.db(DB_NAME);
    const projectsCollection = db.collection("projects");
    const result = await projectsCollection.insertOne(projectObject);
    return result;
  };

  opDB.getProject = async (projectId) => {
    let client;
    console.log("Getting project");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("connecting to the db");
    const db = client.db(DB_NAME);
    const projectsCollection = db.collection("projects");
    const result = await projectsCollection.findOne({
      _id: new ObjectId(projectId),
    });
    return result;
  };

  opDB.createTask = async (taskObject) => {
    let client;
    console.log("Creating task...");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connecting to OpTask DB...");
    const db = client.db(DB_NAME);
    const tasksCollection = db.collection("tasks");
    const result = await tasksCollection.insertOne(taskObject);
    return result;
  };

  opDB.getTasks = async (projectId) => {
    let client;
    console.log("Getting tasks...");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connecting to OpTask DB...");
    const db = client.db(DB_NAME);
    const tasksCollection = db.collection("tasks");
    const results = await tasksCollection
      .find({ projectId: projectId })
      .toArray();
    return results;
  };

  opDB.updateTaskTimelineState = async (newTimelineData) => {
    let client;
    console.log("Updating task timeline...");
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log("Connecting to OpTask DB...");
    const db = client.db(DB_NAME);
    const tasksCollection = db.collection("tasks");
    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(newTimelineData.id) },
      {
        $set: {
          taskState: newTimelineData.newState,
        },
      }
    );
    console.log("completed update");
    return result;
  };
  return opDB;
}

module.exports = OpTaskDB();
