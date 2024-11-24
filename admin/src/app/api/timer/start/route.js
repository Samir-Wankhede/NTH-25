import schedule from "node-schedule";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const { start_time } = await request.json();

    if (!start_time) {
      return new Response(
        JSON.stringify({ message: "start_time is required" }),
        { status: 400 }
      );
    }

    const inputStartTime = new Date(start_time).toISOString();

    const existingEvent = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM event_status WHERE id = 1`, [], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    // if (existingEvent?.status === "active" && existingEvent.start_time === inputStartTime) {
    //   rescheduleJob(inputStartTime);
    //   return new Response(
    //     JSON.stringify({ message: "Timer already active and rescheduled." }),
    //     { status: 205 }
    //   );
    // }

    // if (existingEvent?.status === "active") {
    //   console.log("Overwriting existing active timer...");
    // } else {
    //   console.log("No active timer found. Scheduling a new timer...");
    // }

    // schedule.scheduleJob(start_time, () => {
    //   console.log("Timer started!");
    //   const end_time = new Date(
    //     new Date(start_time).getTime() + 24 * 60 * 60 * 1000
    //   ).toISOString();

    //   updateEventStatus("active", start_time, end_time);

    //   const interval = setInterval(() => {
    //     incrementUserKeys();
    //   }, 2 * 60 * 60 * 1000);

    //   setTimeout(() => {
    //     clearInterval(interval);
    //     endEvent(new Date(start_time), new Date(end_time));
    //   }, 24 * 60 * 60 * 1000);
    // });

    // updateEventStatus("inactive", start_time, null);

    return new Response(
      JSON.stringify({ message: `Timer scheduled to start at ${start_time}` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in startTimer:", error);
    return new Response(
      JSON.stringify({ error: "Failed to start timer" }),
      { status: 500 }
    );
  }
}

// Utility Functions
const incrementUserKeys = async() => {
    const updateQuery = `UPDATE users SET curr_keys = curr_keys + 1 WHERE hidden = 0`;
    await new Promise((resolve,reject)=>{
        db.run(updateQuery, [], (err) => {
            if (err) {
                console.error("Error updating user keys:", err.message);
                reject(err);
            } else {
                console.log("User keys incremented by 1");
                resolve();
            }
        });
    })
};

const updateEventStatus = async(status, start, end) => {
    const query = `UPDATE event_status SET status = ?, start_time = ?, end_time = ?`;
    await new Promise((resolve,reject)=>{
        db.run(query, [status, start, end], (err) => {
            if (err) {
                console.error("Error updating event status:", err.message);
                reject(err);
            } else {
                console.log(`Event status updated to: ${status}`);
                resolve();
            }
        });
    })
};

const endEvent = async(start, end) => {
    console.log("Event ended!");
    await updateEventStatus('inactive', start.toISOString(), end.toISOString());
}
