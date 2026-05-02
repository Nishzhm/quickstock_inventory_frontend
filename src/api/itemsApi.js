const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong.');
    error.errors = data.errors || {};
    error.status = response.status;
    throw error;
  }

  return data;
}

export function getItems(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return request(`/items${query ? `?${query}` : ''}`);
}

export function getItem(id) {
  return request(`/items/${id}`);
}

export function createItem(payload) {
  return request('/items', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function updateItem(id, payload) {
  return request(`/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export function deleteItem(id) {
  return request(`/items/${id}`, {
    method: 'DELETE'
  });
}

export function getStats() {
  return request('/items/stats/summary');
}
