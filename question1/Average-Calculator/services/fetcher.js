const axios = require('axios');

const m = { p: 'primes', f: 'fibo', e: 'even', r: 'rand' };

module.exports = async function get(t) {
  const u = `http://20.244.56.144/evaluation-service/${m[t]}`;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDU3MDcwLCJpYXQiOjE3NDcwNTY3NzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjViMTNiMjIxLTRhOGQtNGE5Zi05ZTcwLWUxODFhNTAwZjU0OCIsInN1YiI6ImJsLmVuLnU0Y3NlMjIyMThAYmwuc3R1ZGVudHMuYW1yaXRhLmVkdSJ9.LTPhIAt-5lz4GoehS9_HhTbzA0nbU1tt30u02RjfXyw';

  try {
    const res = await axios.get(u, {
      timeout: 50000,
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data.numbers;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};
