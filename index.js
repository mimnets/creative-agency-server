const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ak6zw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

client.connect(err => {
    const serviceCollections = client.db("creativeAgency").collection("services");
    const orderCollections = client.db("creativeAgency").collection("orders");
    const reviewCollections = client.db("creativeAgency").collection("reviews");

    app.get('/services', (req, res) => {
        serviceCollections.find({})
        .toArray((err, documents) => {
            res.send(documents);
            // console.log(documents);
        })
    })

    app.get("/services/:id", (req, res) => {
        serviceCollections.find({_id: ObjectID(req.params.id)})
        .toArray((err, documents) =>{
          res.send(documents[0]);
        })
      })

      app.get("/service", (req,res) => {
        orderCollections.find({})
        .toArray((err, documents) =>{
          res.send(documents);
        })
      })

      app.get("/reviews", (req,res) => {
        reviewCollections.find({})
        .toArray((err, documents) =>{
          res.send(documents);
        })
      })

      app.post("/addOrder", (req, res) =>{
        const order = req.body;
        orderCollections.insertOne(order)
        .then(result =>{
          // console.log('register successfully')
          res.send(result.insertedCount > 0);
        })
      })

      app.post("/addReview", (req, res) =>{
        const reviews = req.body;
        reviewCollections.insertOne(reviews)
        .then(result =>{
          // console.log('register successfully')
          res.send(result.insertedCount > 0);
        })
      })
})





app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})