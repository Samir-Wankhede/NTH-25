// import sqlite3 from "sqlite3";
// import path from "path";

// const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "/data", "nth-db.sqlite");
// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) console.error("Database Error:", err.message);
//   else console.log("DB Connected");
// });

// export default db;

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected DB Error:", err.message);
});

console.log("DB Connected");

export default pool;

