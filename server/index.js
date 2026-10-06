const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, text: 'Изучить React', completed: true },
  { id: 2, text: 'Написать сервер', completed: false },
];
let nextId = 3;

// GET все задачи
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});