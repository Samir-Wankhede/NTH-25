import schedule from 'node-schedule'
import db from '../models/db.js';



const updateEventStatus = (status, start, end) => {
    const query = `UPDATE event_status SET status = ?, start_time = ?, end_time = ?`;
    
    db.run(query, [status, start, end], (err) => {
        if (err) {
            console.error("Error updating event status:", err.message);
        } else {
            console.log(`Event status updated to: ${status}`);
        }
    });
};

const incrementUserKeys = () => {
    const updateQuery = `UPDATE users SET curr_keys = curr_keys + 1 WHERE hidden = 0`;
    db.run(updateQuery, [], (err) => {
        if (err) {
            console.error("Error updating user keys:", err.message);
        } else {
            console.log("User keys incremented by 1");
        }
    });
};

export const startTimer = (startTime) => {
    db.get(`SELECT status FROM event_status`, [], (err, row) => {
        if (err) {
            console.error("Error fetching event status:", err.message);
            return;
        }

        if (row && row.status === 'active') {
            console.log("Event is already active. Timer will not be rescheduled.");
            return;
        }

        const job = schedule.scheduleJob(startTime, () => {
            console.log("Timer started!");

            const start = new Date(startTime);
            const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

            updateEventStatus('active', start.toISOString(), end.toISOString());

            const interval = setInterval(() => {
                incrementUserKeys();
            }, 2 * 60 * 60 * 1000);

            setTimeout(() => {
                clearInterval(interval); 
                endEvent(start, end); 
                console.log("Timer ended after 24 hours.");
            }, 24 * 60 * 60 * 1000);
        });

        console.log(`Timer scheduled to start at ${startTime}`);
    });
};

export const endEvent=(start, end)=>{
    console.log("Event ended!")
    updateEventStatus('inactive', start.toISOString(), end.toISOString());
}
