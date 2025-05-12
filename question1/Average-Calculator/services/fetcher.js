const axios = require('axios');

const m = { p: 'primes', f: 'fibo', e: 'even', r: 'rand' };

module.exports = async function get(t) {
  const u = `http://20.244.56.144/evaluation-service/${m[t]}`;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDU3ODkxLCJpYXQiOjE3NDcwNTc1OTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjViMTNiMjIxLTRhOGQtNGE5Zi05ZTcwLWUxODFhNTAwZjU0OCIsInN1YiI6ImJsLmVuLnU0Y3NlMjIyMThAYmwuc3R1ZGVudHMuYW1yaXRhLmVkdSJ9LCJlbWFpbCI6ImJsLmVuLnU0Y3NlMjIyMThAYmwuc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJkaGFyYSBsYWtzaG1pIGt1c3VtYW5jaGkiLCJyb2xsTm8iOiJibC5lbi51NGNzZTIyMjE4IiwiYWNjZXNzQ29kZSI6IlN3dXVLRSIsImNsaWVudElEIjoiNWIxM2IyMjEtNGE4ZC00YTlmLTllNzAtZTE4MWE1MDBmNTQ4IiwiY2xpZW50U2VjcmV0IjoiQmNqUEVNWWpLQlNjSlJZbiJ9.OPDllbFkXmVkoi7CHnm_yFTrjtA5dvOle5ojnsYWRNo';

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
