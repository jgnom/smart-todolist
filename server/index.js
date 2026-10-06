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

// POST создать задачу
app.post('/api/tasks', (req, res) => {
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
  const id = req.params.id;
  const task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).json({ error: 'Задача не найдена' });

  if (req.body.text !== undefined) task.text = req.body.text;
  if (req.body.completed !== undefined) task.completed = req.body.completed;

  res.json(task);
});


// DELETE удалить задачу
app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex(t => t.id == id);
  if (index === -1) return res.status(404).json({ error: 'Задача не найдена' });

  tasks.splice(index, 1);
  res.status(204).send();
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});