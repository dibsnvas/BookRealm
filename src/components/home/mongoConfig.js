const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://albertmateinstein34:vxJ0w9HHTImXj1jv@bookrealm.7wgsixn.mongodb.net/?retryWrites=true&w=majority&appName=bookrealm";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) throw err;
  console.log("Connected to MongoDB");
});

module.exports = client;