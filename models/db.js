import { Low, JSONFile } from 'lowdb';

const db = new Low(new JSONFile('db.json'));


db.data ||= { users: [], posts: [] };


const initializeDB = async () => {
  await db.read();
};

initializeDB();

export default db;
