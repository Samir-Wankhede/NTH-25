import db from "../models/db.js"

export const submit=(req,res)=>{
    const {answer} = req.body
    const {id} = req.user

    const query = `SELECT curr_level FROM users where id = ?`
    db.get(query, [id], (err, user)=>{
        if (err){
            return res.status(500).json({error : "Unable to get user level"})
        }
        if (!user){
            return res.status(404).json({error : "No such user exists"})
        }
        const {curr_level} = user;
        const questionQuery = `SELECT answer FROM questions WHERE level = ?`
        db.get(questionQuery, [curr_level], (err, question)=>{
            if (err){
                return res.status(500).json({error : "Unable to get question"})
            }
            if (!question){
                return res.status(404).json({error : "No such question exists"})
            }
            const correctAnswer = question.answer

            if (answer===correctAnswer){
                const updateUser = `UPDATE users SET curr_level = curr_level + 1 where id = ?`
                db.run(updateUser, [id], (err)=>{
                    if (err){
                        return res.status(500).json({error : "Error updating user status"});
                    }
                    return res.status(200).json({message : "Correct Answer"})
                })
            }else{
                return res.status(400).json({message: "Wrong Answer"})
            }
        })
    })
}