import db from "@/lib/db";
import schedule from "node-schedule";

export async function startTimer(start_time){
    try{
        const inputStartTime = new Date(start_time).toISOString();
        const existingEvent = await new Promise((resolve, reject) => {
            db.get(`SELECT * FROM event_status WHERE id = 1`, [], (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
        });
        const { status, start_time: dbStartTime } = existingEvent;
        console.log(start_time, inputStartTime, dbStartTime);
        if (status === "active" && dbStartTime === inputStartTime) {
            console.log("Timer is already active with the same start time. Rescheduling...");
            rescheduleJob(inputStartTime);
            return;
        }

        if (status === "active" && dbStartTime !== inputStartTime) {
            console.log("Active timer exists with a different start time. Overwriting...");
        } else {
            console.log("Timer is inactive. Scheduling a new timer...");
        }

        const jobs = schedule.scheduledJobs;
        for (const jobName in jobs) {
            if (Object.hasOwnProperty.call(jobs, jobName)) {
                jobs[jobName].cancel();
            }
        }

        const now = new Date();
        const StartTime = new Date(start_time);
        const nowTime = now.toISOString();
        console.log(now>=StartTime);
        
        schedule.scheduleJob( (now >= StartTime ? nowTime : start_time) , async() => {
          console.log("Timer started!");
          const end_time = new Date(
            new Date(start_time).getTime() + 24 * 60 * 60 * 1000
          ).toISOString();

          await updateEventStatus("active", start_time, end_time);

          const interval = setInterval(() => {
            incrementUserKeys();
          }, 2 * 60 * 60 * 1000);

          setTimeout(() => {
            clearInterval(interval);
            endEvent(new Date(start_time), new Date(end_time));
          }, 24 * 60 * 60 * 1000);
        });
        console.log(`Timer scheduled to start at ${start_time}`);
        if(now < StartTime)
        await updateEventStatus("inactive", start_time, null); // Update DB to reflect the new schedule

    }catch(error){
        console.error(error);
    }
}

const rescheduleJob = async(start_time) => {
    const jobs = schedule.scheduledJobs;
    for (const jobName in jobs) {
        if (Object.hasOwnProperty.call(jobs, jobName)) {
            jobs[jobName].cancel();
        }
    }
    const existingEvent = await new Promise((resolve, reject) => {
        db.get(`SELECT * FROM event_status WHERE id = 1`, [], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
    });
    if (existingEvent) {
        const now = new Date();
        const start_time = new Date(existingEvent.start_time);
        const remainingTime = 24 * 60 * 60 * 1000 - (now - start_time);

        if (remainingTime > 0) {
            console.log("Rescheduling active event...");
            schedule.scheduleJob(now.toISOString(), async() => {
                console.log("Timer resumed!");
                await updateEventStatus("active", existingEvent.start_time, existingEvent.end_time);
                const interval = setInterval(() => {
                    incrementUserKeys();

                    //2*60*60*1000
                }, 2*1000);

                setTimeout(() => {
                    clearInterval(interval); 
                    endEvent(start_time, new Date(start_time.getTime() + 24 * 60 * 60 * 1000));
                    console.log("Event ended after 24 hours.");
                }, 60000);
            });
        } else {
            console.log("Active event has already expired.");
            updateEventStatus('inactive', null, null);
        }
    } else {
        console.log("No active event to reschedule.");
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
