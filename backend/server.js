const express = require('express');
const path = require('path'); // Import path module
const app = express();
const cors = require('cors');
require("./db.js");
const search = require("./routes/analytics/search.js")
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/analytics" ,search);

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Define API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is sample data from the backend' });
});

app.post('/post', (req, res) => {
  // Perform login and respond
  const { input } = req.body;
  console.log(input +"is the input");
  // Check credentials, respond with success or failure
  res.json({ success: true, output: input + " is the name  " });
});
// app.get('/suggestions', (req, res) => {
//   const searchQuery = req.query.q || "";
//   const allSuggestions = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace"];
  
//   // Filter suggestions based on the search query
//   const filteredSuggestions = allSuggestions.filter(name =>
//       name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   res.json(filteredSuggestions);
// });




// Serve the index.html file for any other requests
app.get('*', (req, res) => {
  console.log("path is not given properly");
  res.json({success : false})
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
