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

export const getCurrentQuestion = (req, res) => {
    const { id } = req.user;
    console.log(req.user)

    const userQuery = 'SELECT curr_level, hint_taken, curr_keys FROM users WHERE id = ?';

    db.get(userQuery, [id], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching user level' });
        }
        if (!user) {
            
            return res.status(404).json({ error: 'User not found' });
        }
        const { curr_level, hint_taken, curr_keys } = user;
        console.log(hint_taken)
        console.log(curr_level)
        let questionQuery;
        if (hint_taken){
            questionQuery = 'SELECT img1, img2, img3, img4, hint, paid_hint, tooltip, hint_cost, level FROM questions WHERE level = ?';

        }else{
            questionQuery = 'SELECT img1, img2, img3, img4, hint, tooltip, hint_cost, level FROM questions WHERE level = ?';
        }
        db.get(questionQuery, [curr_level], (err, question) => {
            if (err) {
                console.log(err.message)
                return res.status(500).json({ error: 'Error fetching question' });
            }
            if (!question) {
                return res.status(404).json({ error: 'Question not found for this level' });
            }
          
            return res.status(200).json({question, keys: curr_keys}); 
        });
    });
};

export const takeHint = (req, res) => {
    const { id } = req.user; 
    const { level } = req.body;
    const needed_keys = parseInt(level) + 1; 
    console.log(id, level)
    const query = `SELECT curr_keys FROM users WHERE id = ?`;
    db.get(query, [id], (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching user data" });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.curr_keys >= needed_keys) {
            const updateKeysQuery = `UPDATE users SET curr_keys = curr_keys - ?,hint_taken = 1  WHERE id = ?`;
            db.run(updateKeysQuery, [needed_keys, id], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error updating user keys" });
                }

                const hintQuery = `SELECT paid_hint FROM questions WHERE level = ?`;
                db.get(hintQuery, [level], (err, question) => {
                    if (err) {
                        return res.status(500).json({ error: "Error fetching question hint" });
                    }

                    if (!question) {
                        return res.status(404).json({ error: "Hint not found for this level" });
                    }

                    return res.status(200).json({
                        paid_hint: question.paid_hint,
                    });
                });
            });
        } else {
            return res.status(400).json({ error: "Insufficient Keys" });
        }
    });
};


export const addQuestion = (req, res)=>{
    const { img1, img2, img3, img4, hints, paid_hints, close_answers , tooltip, level, hint_cost, answer} = req.body;
    if (!img1){
        return res.status(400).json({error: "Atleast one image is required"})
    }

    const query = `INSERT INTO questions (img1, img2,img3,img4,hint,paid_hint,close_answers, tooltip, level, hint_cost, answer) values (?,?,?,?,?,?,?,?,?,?, ?)`
    db.run(query, [img1, img2, img3, img4, hints, paid_hints, JSON.stringify(close_answers), tooltip, level, hint_cost, answer], function(err){
        if (err){
            console.log(err)
            return res.status(500).json({error: "Error adding question"});
        }
        res.status(201).json({message: "Question added successfully"})
    })
}

export const updateQuestion = (req, res)=>{
    
    const { img1, img2, img3, img4, hints, paid_hints, close_answers , tooltip, hint_cost, level} = req.body;

    const query = `UPDATE questions SET img1 = ?, img2 = ?, img3 = ?, img4 = ?, hint = ?, paid_hint = ?, close_answers = ?, tooltip = ?, hint_cost = ? where level = ?`
    db.run(query, [img1, img2, img3, img4, hints, paid_hints,JSON.stringify(close_answers), tooltip, hint_cost, level ], function(err){
   
        if (err){
            return res.status(500).json({error : "Error updating question"});
        }
        if (this.changes ===0){
            return res.status(404).json({error: "Question not found"})
        }
        return res.status(201).json({message : "Successfully updated"})
    })

}

export const deleteQuestion = (req, res) => {
    const { level } = req.params;

    const query = 'DELETE FROM questions WHERE level = ?';
    db.run(query, [level], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Error deleting question' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.json({ message: 'Question deleted successfully' });
    });
};

