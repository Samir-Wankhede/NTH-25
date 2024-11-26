export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const db = (await import("@/lib/db")).default;
      const { startTimer } = (await import("@/lib/timer"));
      const startTime = await new Promise((resolve, reject) => {
        const query = `SELECT start_time FROM event_status WHERE id = 1`;
        db.get(query, [], (err, row) => {
          if (err) {
            console.error("Error fetching start_time:", err.message);
            reject(err);
          } else if (!row) {
            console.warn("No start_time found in the database.");
            resolve(null);
          } else {
            resolve(row.start_time);
          }
        });
      });
  
      if (startTime) {
        await startTimer(startTime);
      } else {
        console.log("No Start Time available in the database.");
      }
    } catch (error) {
      console.error("Error during instrumentation register:", error);
    }
  }
}

