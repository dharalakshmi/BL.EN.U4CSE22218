const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

async function fetchStockHistory(ticker, minutes) {
    const url = `${BASE_URL}/${ticker}?minutes=${minutes}`;
    const response = await axios.get(url);
    return response.data;
}

function calculateAverage(prices) {
    const total = prices.reduce((acc, p) => acc + p.price, 0);
    return prices.length > 0 ? total / prices.length : 0;
}

function computeCorrelation(xPrices, yPrices) {
    const n = Math.min(xPrices.length, yPrices.length);
    const x = xPrices.slice(0, n).map(p => p.price);
    const y = yPrices.slice(0, n).map(p => p.price);

    const xAvg = calculateAverage(xPrices.slice(0, n).map(p => ({ price: p.price })));
    const yAvg = calculateAverage(yPrices.slice(0, n).map(p => ({ price: p.price })));

    const covariance = x.reduce((sum, xi, i) => sum + (xi - xAvg) * (y[i] - yAvg), 0) / (n - 1);

    const stdDev = (arr, mean) => Math.sqrt(arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1));
    const stdX = stdDev(x, xAvg);
    const stdY = stdDev(y, yAvg);

    return stdX && stdY ? covariance / (stdX * stdY) : 0;
}

async function getStockAverage(ticker, minutes) {
    const prices = await fetchStockHistory(ticker, minutes);
    const average = calculateAverage(prices);
    return {
        averageStockPrice: average,
        priceHistory: prices
    };
}

async function getStockCorrelation(ticker1, ticker2, minutes) {
    const [data1, data2] = await Promise.all([
        fetchStockHistory(ticker1, minutes),
        fetchStockHistory(ticker2, minutes)
    ]);

    const correlation = computeCorrelation(data1, data2);

    return {
        correlation,
        stocks: {
            [ticker1]: {
                averagePrice: calculateAverage(data1),
                priceHistory: data1
            },
            [ticker2]: {
                averagePrice: calculateAverage(data2),
                priceHistory: data2
            }
        }
    };
}

module.exports = {
    getStockAverage,
    getStockCorrelation
};
