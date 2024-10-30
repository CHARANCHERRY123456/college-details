const express = require('express');
const path = require('path'); // Import path module
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Define API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is sample data from the backend' });
});

app.post('/api/login', (req, res) => {
  // Perform login and respond
  const { email, password } = req.body;
  // Check credentials, respond with success or failure
  res.json({ success: true, token: 'exampleToken' });
});

// Serve the index.html file for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
