const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;
const MAX_TEXT_LENGTH = 200;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, text: 'Изучить React', completed: true },
  { id: 2, text: 'Написать сервер', completed: false },
];
let nextId = 3;


function apiKeyMiddleware(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!API_KEY || key !== API_KEY) {
    return res.status(401).json({ error: 'Неверный API-ключ' });
  }
  next();
}

app.use('/api/tasks', apiKeyMiddleware);


function requireBody(req, res, next) {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length === 0) {
    return res.status(400).json({ error: 'Тело запроса отсутствует или пустое' });
  }
  next();
}

function validateText(text) {
  if (typeof text !== 'string') return 'Поле text должно быть строкой';
  if (text.trim().length === 0) return 'Текст задачи обязателен';
  if (text.trim().length > MAX_TEXT_LENGTH) return `Максимум ${MAX_TEXT_LENGTH} символов`;
  return null;
}

function validateTask(req, res, next) {
  const error = validateText(req.body.text);
  if (error) return res.status(400).json({ error });
  next();
}

function validateTaskUpdate(req, res, next) {
  const allowed = ['text', 'completed'];
  const unknown = Object.keys(req.body).filter((k) => !allowed.includes(k));
  if (unknown.length > 0) {
    return res.status(400).json({ error: `Недопустимые поля: ${unknown.join(', ')}` });
  }

  if (req.body.text !== undefined) {
    const error = validateText(req.body.text);
    if (error) return res.status(400).json({ error });
  }

  if (req.body.completed !== undefined && typeof req.body.completed !== 'boolean') {
    return res.status(400).json({ error: 'Поле completed должно быть true или false' });
  }

  next();
}

function parseId(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Некорректный id задачи' });
    return null;
  }
  return id;
}


// GET /api/tasks — все задачи
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id — одна задача
app.get('/api/tasks/:id', (req, res) => {
  const id = parseId(req, res);
  if (id === null) return;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'Задача не найдена' });
  res.json(task);
});

// POST /api/tasks — создать
app.post('/api/tasks', requireBody, validateTask, (req, res) => {
  const task = { id: nextId++, text: req.body.text.trim(), completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /api/tasks/:id — обновить (частично)
app.put('/api/tasks/:id', requireBody, validateTaskUpdate, (req, res) => {
  const id = parseId(req, res);
  if (id === null) return;

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: 'Задача не найдена' });

  if (req.body.text !== undefined) task.text = req.body.text.trim();
  if (req.body.completed !== undefined) task.completed = req.body.completed;

  res.json(task);
});


app.delete('/api/tasks/:id', (req, res) => {
  const id = parseId(req, res);
  if (id === null) return;

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Задача не найдена' });

  tasks.splice(index, 1);
  res.status(204).send();
});


app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});


app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Некорректный JSON в теле запроса' });
  }
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

module.exports = app;