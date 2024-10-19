const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyparser = require('body-parser')
let cors = require('cors')


// console.log(process.env) // remove this after you've confirmed it is working
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passop";
const app = express();
const port = 3000;
app.use(bodyparser.json())
app.use(cors())

client.connect();

// get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  //   res.send('Hello World!')
  res.json(findResult);
});



// save a password
app.post("/", async (req, res) => {
    const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password)
  res.send({success : true , result : findResult});
});



// delete a password by id
app.delete("/", async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  //   res.send('Hello World!')
  res.send({success : true , result : findResult});
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
