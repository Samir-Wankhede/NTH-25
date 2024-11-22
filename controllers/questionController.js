import db from "../models/db.js";

export const getAllQuestions = (req, res)=>{
     const query = 'SELECT * from questions';
     db.all(query, [], (err, rows)=>{
        if (err){
            return res.status(500).json({error: "error fetching questions"});
        }
        res.json(rows)
     })
}

export const getCurrentQuestion = (req, res)=>{
    const {level} = req.user.curr_level;
    const query = 'select img1, img2, img3, hint, hint_cost, tooltip from questions where level = ?'
    db.get(query, [level], (err, row)=>{
        if (err){
            return res.status(500).json({error : "Error fetching question"});
        }
        if (!row){
            return res.status(404).json({error : "Question not found"});
        }
        res.json(row)
    })
}

export const addQuestion = (req, res)=>{
    const { img1, img2, img3, img4, hints, paid_hints, close_answers , tooltip, level, hint_cost} = req.body;
    if (!img1){
        return res.status(400).json({error: "Atleast one image is required"})
    }

    const query = `INSERT INTO questions (img1, img2,img3,img4,hints,paid_hints,close_answers, tooltip, level, hint_cost) values (?,?,?,?,?,?,?,?,?,?)`
    db.run(query, [img1, img2, img3, img4, hints, paid_hints, JSON.stringify(close_answers), tooltip, level, hint_cost], function(err){
        if (err){
            return res.status(500).json({error: "Errorn adding question"});
        }
        res.status(201).json({message: "Question added successfully"})
    })
}

