const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ak6zw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

client.connect(err => {
    const serviceCollections = client.db("creativeAgency").collection("services");

    app.get('/services', (req, res) => {
        serviceCollections.find({})
        .toArray((err, documents) => {
            res.send(documents);
            // console.log(documents);
        })
    })
})





app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})