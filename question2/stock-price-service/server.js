const express = require('express');
const app = express();
const stocksRoute = require('./routes/stocks');
const correlationRoute = require('./routes/stockCorrelation');

app.use(express.json());
app.use('/stocks', stocksRoute);
app.use('/stockcorrelation', correlationRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
