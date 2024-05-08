require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { MongoClient } = require('mongodb');


const app = express();


app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.get('/ticket', async (req, res) => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(process.env.DB_NAME || 'HelpDesk');
    const tickets = await db.collection('Ticket').find().toArray();
    res.json(tickets);
    client.close();
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Connected to db & listening on port', port);
});
