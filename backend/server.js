require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { MongoClient } = require('mongodb');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Route to get all tickets
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

// Connect to MongoDB and start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Connected to db & listening on port', port);
});
