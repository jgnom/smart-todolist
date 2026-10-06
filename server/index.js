const express = require('express');

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Сервер Smart TodoList работает');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});