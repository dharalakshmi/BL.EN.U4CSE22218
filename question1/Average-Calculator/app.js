const express = require('express');
const app = express();
const numRoute = require('./routes/numbers');

app.use(express.json());
app.use('/numbers', numRoute);

const port = 9876;
app.listen(port, () => console.log(`✅ Server on port ${port}`));

app.on('error', (err) => console.error('Server error:', err));
