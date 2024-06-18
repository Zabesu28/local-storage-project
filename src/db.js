import { openDB } from 'idb';

const DB_NAME = 'taskDatabase';
const STORE_NAME = 'tasks';
const VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('username', 'username', { unique: false });
      }
    },
  });
};

export const getAllTasks = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addTask = async (task) => {
  const db = await initDB();
  return db.add(STORE_NAME, task);
};

export const updateTask = async (task) => {
  const db = await initDB();
  return db.put(STORE_NAME, task);
};

export const deleteTask = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};

export const deleteTasksByUsername = async (username) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const index = store.index('username');
  const cursor = await index.openCursor(IDBKeyRange.only(username));

  const deletePromises = [];

  cursor?.forEach(item => {
    deletePromises.push(store.delete(item.key));
  });

  await Promise.all(deletePromises);

  console.log(`All tasks for username '${username}' deleted successfully`);
  await tx.done;
};