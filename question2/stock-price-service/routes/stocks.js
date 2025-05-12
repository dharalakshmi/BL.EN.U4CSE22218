const express = require('express');
const router = express.Router();
const { getStockAverage } = require('../services/stockService');

router.get('/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;

    console.log('Query Params:', req.query); 
    if (!aggregation || aggregation.trim().toLowerCase() !== 'average') {
    return res.status(400).json({ error: 'Only average aggregation supported' });
}

    

    try {
        const data = await getStockAverage(ticker, minutes);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
