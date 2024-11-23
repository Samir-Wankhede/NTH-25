

export const getLeaderBoard=(req,res)=>{
    const query = `SELECT username, curr_level from users ORDER BY curr_level DESC LIMIT 50`

    db.all(query, [], (err, rows)=>{
        if(err){
            return res.status(500).json({error: "Errorn fetching leaderboard"})
        }
        return res.status(200).json(rows)
    })
}