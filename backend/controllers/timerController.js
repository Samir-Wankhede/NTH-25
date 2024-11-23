import schedule from 'node-schedule'
import db from '../models/db.js';

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
    const job = schedule.scheduleJob(startTime, () => {
        console.log("Timer started!");

        const interval = setInterval(() => {
            incrementUserKeys();
        }, 2 * 60 * 60 * 1000); 

        setTimeout(() => {
            clearInterval(interval);
            console.log("Timer ended after 24 hours.");
        }, 24 * 60 * 60 * 1000);
    });

    console.log(`Timer scheduled to start at ${startTime}`);
};
