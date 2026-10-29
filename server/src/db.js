import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'inspector.db');

let db = null;
let useSqlite = false;

try {
  const { DatabaseSync } = await import('node:sqlite');
  db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      dob TEXT,
      auth_provider TEXT DEFAULT 'local',
      google_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe non-destructive column migrations
  try {
    db.exec(`ALTER TABLE users ADD COLUMN auth_provider TEXT DEFAULT 'local'`);
  } catch {
    // Column already exists
  }
  try {
    db.exec(`ALTER TABLE users ADD COLUMN google_id TEXT`);
  } catch {
    // Column already exists
  }

  useSqlite = true;
  console.log('[Database] SQLite database initialized at', dbPath);
} catch (err) {
  console.warn('[Database] node:sqlite unavailable, using persistent JSON storage fallback:', err.message);
  useSqlite = false;
}

// Fallback JSON store file path
const jsonPath = path.join(dataDir, 'users.json');
function loadJsonUsers() {
  if (!fs.existsSync(jsonPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch {
    return [];
  }
}

function saveJsonUsers(users) {
  fs.writeFileSync(jsonPath, JSON.stringify(users, null, 2), 'utf8');
}

export function findUserByEmail(email) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (useSqlite && db) {
    const stmt = db.prepare('SELECT * FROM users WHERE LOWER(email) = ?');
    return stmt.get(cleanEmail) || null;
  } else {
    const users = loadJsonUsers();
    return users.find((u) => u.email.toLowerCase() === cleanEmail) || null;
  }
}

export function createUser({ firstName, lastName, email, passwordHash, dob, authProvider = 'local', googleId = null }) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanFirst = (firstName || '').trim();
  const cleanLast = (lastName || '').trim();
  const cleanDob = (dob || '').trim();

  if (useSqlite && db) {
    const insert = db.prepare(`
      INSERT INTO users (first_name, last_name, email, password_hash, dob, auth_provider, google_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = insert.run(cleanFirst, cleanLast, cleanEmail, passwordHash, cleanDob, authProvider, googleId);
    return {
      id: Number(result.lastInsertRowid),
      first_name: cleanFirst,
      last_name: cleanLast,
      email: cleanEmail,
      dob: cleanDob,
      auth_provider: authProvider
    };
  } else {
    const users = loadJsonUsers();
    const newUser = {
      id: Date.now(),
      first_name: cleanFirst,
      last_name: cleanLast,
      email: cleanEmail,
      password_hash: passwordHash,
      dob: cleanDob,
      auth_provider: authProvider,
      google_id: googleId,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    saveJsonUsers(users);
    return {
      id: newUser.id,
      first_name: cleanFirst,
      last_name: cleanLast,
      email: cleanEmail,
      dob: cleanDob,
      auth_provider: authProvider
    };
  }
}

export function findOrCreateGoogleUser({ firstName, lastName, email, googleId }) {
  const existingUser = findUserByEmail(email);

  if (existingUser) {
    // If user already registered with this email, link google_id if not linked
    const isHybrid = existingUser.password_hash && existingUser.password_hash !== 'GOOGLE_OAUTH';
    const resolvedProvider = isHybrid ? 'hybrid' : (existingUser.auth_provider || 'google');

    if (!existingUser.google_id && useSqlite && db) {
      try {
        const update = db.prepare('UPDATE users SET google_id = ?, auth_provider = ? WHERE id = ?');
        update.run(googleId, resolvedProvider, existingUser.id);
      } catch (err) {
        console.error('[DB update error]', err);
      }
    } else if (!existingUser.google_id) {
      const users = loadJsonUsers();
      const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
      if (idx !== -1) {
        users[idx].google_id = googleId;
        users[idx].auth_provider = resolvedProvider;
        saveJsonUsers(users);
      }
    }
    return {
      id: existingUser.id,
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
      email: existingUser.email,
      dob: existingUser.dob || '',
      auth_provider: resolvedProvider
    };
  }

  // If new user, create their record
  return createUser({
    firstName: firstName || 'Google',
    lastName: lastName || 'User',
    email,
    passwordHash: 'GOOGLE_OAUTH',
    dob: '',
    authProvider: 'google',
    googleId
  });
}

export function updateUserPasswordAndProfile({ id, passwordHash, dob, firstName, lastName, authProvider = 'hybrid' }) {
  const cleanFirst = (firstName || '').trim();
  const cleanLast = (lastName || '').trim();
  const cleanDob = (dob || '').trim();

  if (useSqlite && db) {
    const update = db.prepare(`
      UPDATE users 
      SET password_hash = ?, dob = ?, first_name = ?, last_name = ?, auth_provider = ?
      WHERE id = ?
    `);
    update.run(passwordHash, cleanDob, cleanFirst, cleanLast, authProvider, id);
    const stmt = db.prepare('SELECT id, first_name, last_name, email, dob, auth_provider, created_at FROM users WHERE id = ?');
    return stmt.get(id);
  } else {
    const users = loadJsonUsers();
    const idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      users[idx].password_hash = passwordHash;
      users[idx].dob = cleanDob;
      users[idx].first_name = cleanFirst;
      users[idx].last_name = cleanLast;
      users[idx].auth_provider = authProvider;
      saveJsonUsers(users);
      return {
        id: users[idx].id,
        first_name: users[idx].first_name,
        last_name: users[idx].last_name,
        email: users[idx].email,
        dob: users[idx].dob,
        auth_provider: users[idx].auth_provider
      };
    }
    return null;
  }
}

export function getAllUsers() {
  if (useSqlite && db) {
    return db.prepare('SELECT id, first_name, last_name, email, dob, auth_provider, created_at FROM users').all();
  }
  return loadJsonUsers().map(({ password_hash, ...rest }) => rest);
}
