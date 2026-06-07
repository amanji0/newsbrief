const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

// Require agent to start the background cron job
require('./agent');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API Endpoint to get the 'For You' feed with exam context
app.get('/api/foryou', async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Trigger the agent manually (for testing purposes)
app.post('/api/agent/trigger', async (req, res) => {
  try {
    // We will import agent.js run function here if needed
    // For now just return a success message
    res.json({ message: 'Agent triggered' });
  } catch (error) {
    res.status(500).json({ error: 'Error triggering agent' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
