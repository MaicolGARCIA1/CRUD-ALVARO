// app.js
const express = require('express');
const app = express();
const productsRouter = require('./src/products');

app.use(express.json());
app.use('/productos', productsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
