import sqlite3 from "sqlite3";
import path from "path";

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "/data", "nth-db.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Database Error:", err.message);
  else console.log("DB Connected");
});

export default db;
