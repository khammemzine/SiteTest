const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function checkAuth() {
  const res = await fetch(`${BASE}/auth/check`, { credentials: 'include' });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include'
  });
  return res.json();
}

export async function logout() {
  const res = await fetch(`${BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
  return res.json();
}

export async function listBooks() {
  const res = await fetch(`${BASE}/library/`, { credentials: 'include' });
  return res.json();
}

export async function downloadBook(name) {
  const res = await fetch(`${BASE}/library/file/${encodeURIComponent(name)}`, { credentials: 'include' });
  return res;
}

export async function listDrawings() {
  const res = await fetch(`${BASE}/drawings/`, { credentials: 'include' });
  return res.json();
}

export async function downloadDrawing(name) {
  const res = await fetch(`${BASE}/drawings/file/${encodeURIComponent(name)}`, { credentials: 'include' });
  return res;
}