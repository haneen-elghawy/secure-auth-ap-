import { Low, JSONFile } from 'lowdb';

const db = new Low(new JSONFile('db.json'));

// Set up default data if it doesn't exist
db.data ||= { users: [], posts: [] };

// Function to initialize the db and read data
const initializeDB = async () => {
  await db.read();
};

initializeDB();

export default db;
