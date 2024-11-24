import schedule from 'node-schedule'
import db from '../models/db.js';

export const addOrUpdateEventStatus = async (req, res) => {
    const {start_time } = req.body;
  
    if (!start_time) {
      return res.status(400).json({ message: "start_time are required" });
    }
  
    try {
      const status = "inactive"; 
      const end_time = (new Date(new Date(start_time).getTime() + 24 * 60 * 60 * 1000)).toISOString(); 
  
      const query = `
        INSERT INTO event_status (id,status, start_time, end_time)
        VALUES ($1, $2, $3,$4)
        ON CONFLICT
        DO UPDATE SET
          status = EXCLUDED.status,
          start_time = EXCLUDED.start_time,
          end_time = EXCLUDED.end_time
      `;
  
      db.run(query, [1,status, start_time, end_time],(err)=>{
        if(err){
            console.log(err.message)
        }
      });
  
      res.status(200).json({ message: "Event status added/updated successfully" });
    } catch (error) {
      console.error("Error updating event status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const getTimer=(req,res)=>{
    const query = `select start_time from event_status where id=1`;
    db.get(query,[],(err, timer)=>{
        if (err){
            console.log(err.message)
            return res.status(500).json({error: "Internal error occurred"})
        
        }else if(!timer){
            return res.status(500).json({error : "No timer found"})
        }
        else{
            return res.status(200).json({start_time : timer.start_time})
        }
    })
}
  

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
const rescheduleJob = async () => {
    db.get(`SELECT status, start_time FROM event_status WHERE status = 'active'`, [], (err, row) => {
        if (err) {
            console.error("Error checking event status:", err.message);
            return;
        }

        if (row) {
            const now = new Date();
            const start_time = new Date(row.start_time);
            const remainingTime = 24 * 60 * 60 * 1000 - (now - start_time);

            if (remainingTime > 0) {
                console.log("Rescheduling active event...");
                schedule.scheduleJob(now, () => {
                    console.log("Timer resumed!");
                    const interval = setInterval(() => {
                        incrementUserKeys();
                    }, 2 * 60 * 60 * 1000);

                    setTimeout(() => {
                        clearInterval(interval); 
                        endEvent(start_time, new Date(start_time.getTime() + 24 * 60 * 60 * 1000));
                        console.log("Event ended after 24 hours.");
                    }, remainingTime);
                });
            } else {
                console.log("Active event has already expired.");
                updateEventStatus('inactive', null, null);
            }
        } else {
            console.log("No active event to reschedule.");
        }
    });
};


export const startTimer = (req, res) => {
    const {start_time} = req.body
    db.get(`SELECT status FROM event_status`, [], (err, row) => {
        if (err) {
            console.error("Error fetching event status:", err.message);
            return;
        }

        if (row && row.status === 'active') {
            console.log("Event is already active. Timer will not be rescheduled.");
            rescheduleJob();
            return res.status(205).json({message: "Timer Already in place"});
        }

        const job = schedule.scheduleJob(start_time, () => {
            console.log("Timer started!");

            const start = new Date(start_time);
            const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

            updateEventStatus('active', start.toISOString(), end.toISOString());

            const interval = setInterval(() => {
                console.log("incremented keys")
                incrementUserKeys();
            }, 2 * 60 * 60 * 1000);

            setTimeout(() => {
                clearInterval(interval); 
                endEvent(start, end); 
                console.log("Timer ended after 24 hours.");
            }, 24 * 60 * 60 * 1000);
        });

        console.log(`Timer scheduled to start at ${start_time}`);
        return res.status(200).json({message: `Timer scheduled to start at ${start_time}`})
    });
};

export const endEvent=(start, end)=>{
    console.log("Event ended!")
    updateEventStatus('inactive', start.toISOString(), end.toISOString());
}
