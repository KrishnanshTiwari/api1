require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importing routes
const organizationRoutes = require('./routes/organizationRoutes');
const designRoutes = require('./routes/designRoutes');
const eventRoutes = require('./routes/eventRoutes');
const credentialRoutes = require('./routes/credentialRoutes');
const supportRoutes = require('./routes/supportRoutes');

// Registering routes
app.use('/', organizationRoutes);
app.use('/', designRoutes);
app.use('/', eventRoutes);
app.use('/', credentialRoutes);
app.use('/', supportRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Starting the server
const port = process.env.PORT || 8080; // Use the environment-defined port or default to 8080
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



