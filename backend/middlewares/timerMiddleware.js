
const checkEventStatus = (req, res, next) => {
    const query = `SELECT status, start_time, end_time FROM event_status LIMIT 1`;

    db.get(query, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching event status" });
        }

        const now = new Date();
        
        if (!row) {
            return res.status(404).json({ error: "Event status not found" });
        }

        const { status, start_time, end_time } = row;

        const startTime = new Date(start_time);
        const endTime = new Date(end_time);

        if (now < startTime) {
            return res.status(403).json({ error: "Event has not yet started", start_time });
        }

        if (now > endTime) {
            return res.status(403).json({ error: "Event has ended", end_time });
        }

        if (status !== 'active') {
            return res.status(403).json({ error: "Event is not active" });
        }

        next();
    });
};

export default checkEventStatus;