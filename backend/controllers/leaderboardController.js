import db from "../models/db.js"

export const getLeaderBoard=(req,res)=>{
    const query = `SELECT id,username, curr_level from users WHERE hidden = 0 ORDER BY curr_level DESC LIMIT 50`

    db.all(query, [], (err, rows)=>{
        if(err){
            console.log(err.message)
            return res.status(500).json({error: "Errorn fetching leaderboard"})
        }
        console.log(rows)
        return res.status(200).json(rows)
    })
}