const API_URL = 'http://localhost:3001/api/tasks';
const API_KEY = 'my-secret-key-2026';

const headers = {
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY,
};

export async function fetchTasks() {
  const res = await fetch(API_URL, { headers });
  if (!res.ok) throw new Error('Ошибка загрузки');
  return res.json();
}

export async function createTask(text) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Ошибка создания');
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Ошибка обновления');
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!res.ok) throw new Error('Ошибка удаления');
}