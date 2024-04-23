// server.js
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://albertmateinstein34:vxJ0w9HHTImXj1jv@bookrealm.7wgsixn.mongodb.net/?retryWrites=true&w=majority&appName=bookrealm";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
let collection;

async function connectToMongo() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        collection = client.db("bookrealm").collection("comments");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}


connectToMongo();

app.get('/comments/:id', async (req, res) => {
    let comments = await collection.find({ bookId: req.params.id }).toArray();
    if (comments.length === 0) {
        await collection.insertOne({ bookId: req.params.id, comments: [] });
        comments = [];
    }
    res.send(comments);
});

app.post('/comments/:id', async (req, res) => {
    const comment = req.body;
    comment.bookId = req.params.id;
    const book = await collection.findOne({ bookId: req.params.id });
    if (book) {
        await collection.updateOne({ bookId: req.params.id }, { $push: { comments: comment } });
    } else {
        await collection.insertOne({ bookId: req.params.id, comments: [] });
    }
    res.send({ status: 'success' });
});

app.listen(3001, () => console.log('Server is running on port 3001'));
