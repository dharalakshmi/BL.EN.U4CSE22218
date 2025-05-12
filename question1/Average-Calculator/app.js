const ex = require('express');
const app = ex();

const numRoute = require('./routes/numbers');

app.use(ex.json());
app.use('/numbers', numRoute);

const port = 9876;
app.listen(port, () => {
  console.log(`✅ running on ${port}`);
});
