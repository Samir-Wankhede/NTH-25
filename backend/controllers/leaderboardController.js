import pool from "../models/db.js"
//SQLITE
// export const getLeaderBoard=(req,res)=>{
//     const query = `SELECT id,username, curr_level from users WHERE hidden = 0 ORDER BY curr_level DESC, ans_time ASC LIMIT 50`

//     db.all(query, [], (err, rows)=>{
//         if(err){
//             console.log(err.message)
//             return res.status(500).json({error: "Errorn fetching leaderboard"})
//         }
//         console.log(rows)
//         return res.status(200).json(rows)
//     })
// }

export const getLeaderBoard = async (req, res) => {
    try {
        const query = `SELECT id, username, curr_level FROM users WHERE hidden = FALSE ORDER BY curr_level DESC, ans_time ASC LIMIT 50`;
        const { rows } = await pool.query(query);

        // console.log(rows);
        return res.status(200).json(rows);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Error fetching leaderboard" });
    }
};
