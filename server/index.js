const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, text: 'Изучить React', completed: true },
  { id: 2, text: 'Написать сервер', completed: false },
];
let nextId = 3;



function apiKeyMiddleware(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Неверный API-ключ' });
  }
  next();
}

app.use('/api/tasks', apiKeyMiddleware);


function validateTask(req, res, next) {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Текст задачи обязателен' });
  }
  if (text.trim().length > 200) {
    return res.status(400).json({ error: 'Максимум 200 символов' });
  }
  next();
}

// GET все задачи
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST создать задачу
app.post('/api/tasks', validateTask, (req, res) => {
  const task = {
    id: nextId++,
    text: req.body.text,
    completed: false,
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT обновить задачу
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Задача не найдена' });

  if (req.body.text !== undefined) task.text = req.body.text;
  if (req.body.completed !== undefined) task.completed = req.body.completed;

  res.json(task);
});


// DELETE удалить задачу
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Задача не найдена' });

  tasks.splice(index, 1);
  res.status(204).send();
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});