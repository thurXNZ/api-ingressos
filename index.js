const express = require('express');
const app = express();
const ingressosRoutes = require('./routes/ingressos');

// Middlewares
app.use(express.json());

// Routes
app.use('/api/ingressos', ingressosRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});