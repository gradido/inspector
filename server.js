const express = require('express');
const path = require('path');
const serveIndex = require('serve-index');

const app = express();
const PORT = 3100;

// Static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/dist', serveIndex(path.join(__dirname, 'dist')));

// Start server
app.listen(PORT, () => {
  console.log(`Server läuft unter http://localhost:${PORT}`);
});
