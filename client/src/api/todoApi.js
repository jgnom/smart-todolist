
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api/tasks').replace(/\/$/, '');
const API_KEY = import.meta.env.VITE_API_KEY || '';

if (!API_KEY && import.meta.env.DEV) {
  console.warn('[todoApi] VITE_API_KEY не задан в client/.env — сервер вернёт 401');
}

const baseHeaders = {
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY,
};


async function request(path, options, fallbackMessage) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers: baseHeaders });
  } catch {
    throw new Error('Сервер недоступен. Проверьте подключение и повторите попытку.');
  }

  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      res.status === 401
        ? 'Неверный ключ API (проверьте VITE_API_KEY в client/.env)'
        : (data && data.error) || fallbackMessage;
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return data;
}

export function fetchTasks() {
  return request('', { method: 'GET' }, 'Не удалось загрузить список задач');
}

export function createTask(text) {
  return request('', {
    method: 'POST',
    body: JSON.stringify({ text }),
  }, 'Не удалось создать задачу');
}

export function updateTask(id, updates) {
  return request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }, 'Не удалось обновить задачу');
}

export function deleteTask(id) {
  return request(`/${id}`, { method: 'DELETE' }, 'Не удалось удалить задачу');
}