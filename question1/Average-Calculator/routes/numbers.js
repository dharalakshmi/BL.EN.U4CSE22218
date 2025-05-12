const express = require('express');
const router = express.Router();
const get = require('../services/fetcher');
const { updateWindow } = require('../utils/windowManager');

const win = [];

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const vIds = ['p', 'f', 'e', 'r'];

  if (!vIds.includes(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const prev = [...win];

  try {
    const nums = await get(id);

    if (!nums) {
      return res.status(500).json({ error: 'API error' });
    }

    updateWindow(win, nums, 10);
    const avg = (win.reduce((a, b) => a + b, 0) / win.length).toFixed(2);

    res.json({
      prev,
      curr: [...win],
      nums,
      avg: parseFloat(avg)
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
