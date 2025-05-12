const express = require('express');
const router = express.Router();
const { getStockCorrelation } = require('../services/stockService');

router.get('/', async (req, res) => {
    const { minutes, ticker } = req.query;

    if (!Array.isArray(ticker) || ticker.length !== 2) {
        return res.status(400).json({ error: 'Exactly two tickers must be provided' });
    }

    try {
        const data = await getStockCorrelation(ticker[0], ticker[1], minutes);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
