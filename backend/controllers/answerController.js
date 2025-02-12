import pool from "../models/db.js"
import Fuse from "fuse.js"
// //SQLITE
// export const submit=(req,res)=>{
//     const {answer} = req.body
//     const {id} = req.user
//     console.log(answer,id)

//     const query = `SELECT curr_level, username FROM users where id = ?`
//     db.get(query, [id], (err, user)=>{
//         if (err){
//             return res.status(500).json({error : "Unable to get user level"})
//         }
//         if (!user){
//             return res.status(404).json({error : "No such user exists"})
//         }
//         const {curr_level, username} = user;

//         const getAnswerHistoryQuery = `SELECT answers FROM answer_histories WHERE username = ? AND level = ?`;
//         db.get(getAnswerHistoryQuery, [username, curr_level], (err, history) => {
//             if (err) {
//                 return res.status(500).json({ error: "Unable to fetch answer history" });
//             }

//             let updatedAnswers;
//             const currentTimestamp = new Date().toLocaleString();

//             if (history) {
//                 updatedAnswers = `${history.answers} | ${currentTimestamp}: ${answer}`;
//             } else {
//                 updatedAnswers = `${currentTimestamp}: ${answer}`;
//             }

//             const insertOrUpdateHistoryQuery = `
//                 INSERT INTO answer_histories (username, level, answers)
//                 VALUES (?, ?, ?)
//                 ON CONFLICT(username, level) 
//                 DO UPDATE SET answers = excluded.answers, timestamp = CURRENT_TIMESTAMP`;

//             db.run(insertOrUpdateHistoryQuery, [username, curr_level, updatedAnswers], (err) => {
//                 if (err) {
//                     return res.status(500).json({ error: "Unable to record answer attempt" });
//                 }
//             });

//         const questionQuery = `SELECT answer, close_answers FROM questions WHERE level = ?`
//         db.get(questionQuery, [curr_level], (err, question)=>{
//             if (err){
//                 return res.status(500).json({error : "Unable to get question"})
//             }
//             if (!question){
//                 return res.status(404).json({error : "No such question exists"})
//             }
//             const correctAnswer = question.answer
//             let closeAnswers = [];
//                 try {
//                     closeAnswers = JSON.parse(question.close_answers);
//                 } catch (err) {
//                     console.error("Error parsing close_answers:", err);
//                 }

//             closeAnswers.push(correctAnswer);
//             console.log(closeAnswers)

//             if (answer===correctAnswer){
//                 const now = new Date();
//                 const updateUser = `UPDATE users SET curr_level = curr_level + 1 , curr_keys = curr_keys + ?, hint_taken = 0, ans_time = ? where id = ?`
//                 db.run(updateUser, [curr_level, now,id], (err)=>{
//                     if (err){
//                         return res.status(500).json({error : "Error updating user status"});
//                     }
//                     return res.status(200).json({message : "Correct Answer"})
//                 })
//             }else{
//                 const fuseOptions = {
//                     includeScore : true,
//                     threshold : 0.2,
//                     keys: ["answer"]
//                 }

//                 const fuse = new Fuse(closeAnswers, fuseOptions)
//                 const result = fuse.search(answer)
//                 const closeMessages = ["You are close!", "Try again!", "Almost there!", "Give it another shot!", "You can do it!", "Keep trying!", "Don't give up!", "You're almost there!", "You're getting warmer!", "You're so close!", "You're almost there!"];
//                 const randomMessage = closeMessages[Math.floor(Math.random() * closeMessages.length)];
//                 if (result.length>0 && result[0].score<=0.2){
//                     return res.status(205).json({message : randomMessage});
//                 }else{
//                     return res.status(400).json({message: "Wrong Answer"})
//                 }
//             }
//         })
//     })
// })
// }
export const submit = async (req, res) => {
    try {
        const { answer } = req.body;
        const { id } = req.user;
        // console.log(answer, id);

        // Fetch user data
        const userQuery = `SELECT curr_level, username FROM users WHERE id = $1`;
        const userResult = await pool.query(userQuery, [id]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "No such user exists" });
        }

        const { curr_level, username } = userResult.rows[0];

        // Fetch answer history
        const historyQuery = `SELECT answers FROM answer_histories WHERE username = $1 AND level = $2`;
        const historyResult = await pool.query(historyQuery, [username, curr_level]);

        let updatedAnswers;
        const currentTimestamp = new Date().toLocaleString();

        if (historyResult.rows.length > 0) {
            updatedAnswers = `${historyResult.rows[0].answers} | ${currentTimestamp}: ${answer}`;
        } else {
            updatedAnswers = `${currentTimestamp}: ${answer}`;
        }

        // Insert or update answer history
        const insertOrUpdateHistoryQuery = `
            INSERT INTO answer_histories (username, level, answers, timestamp)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
            ON CONFLICT (username, level) 
            DO UPDATE SET answers = EXCLUDED.answers, timestamp = CURRENT_TIMESTAMP
        `;

        await pool.query(insertOrUpdateHistoryQuery, [username, curr_level, updatedAnswers]);

        // Fetch question data
        const questionQuery = `SELECT answer, close_answers FROM questions WHERE level = $1`;
        const questionResult = await pool.query(questionQuery, [curr_level]);

        if (questionResult.rows.length === 0) {
            return res.status(404).json({ error: "No such question exists" });
        }

        const { answer: correctAnswer, close_answers } = questionResult.rows[0];
        let closeAnswers = [];

        try {
            closeAnswers = JSON.parse(close_answers) || [];
        } catch (err) {
            console.error("Error parsing close_answers:", err);
        }

        closeAnswers.push(correctAnswer);
        // console.log(closeAnswers);

        // Check if the answer is correct
        if (answer === correctAnswer) {
            const now = new Date();
            const updateUserQuery = `
                UPDATE users 
                SET curr_level = curr_level + 1, curr_keys = curr_keys + $1, hint_taken = FALSE, ans_time = $2 
                WHERE id = $3
            `;
            await pool.query(updateUserQuery, [curr_level, now, id]);
            return res.status(200).json({ message: "Correct Answer" });
        } else {
            // Check for close answers
            const fuseOptions = {
                includeScore: true,
                threshold: 0.2,
                keys: ["answer"]
            };

            const fuse = new Fuse(closeAnswers, fuseOptions);
            const result = fuse.search(answer);

            const closeMessages = [
                "You are close!", "Try again!", "Almost there!", "Give it another shot!",
                "You can do it!", "Keep trying!", "Don't give up!", "You're almost there!",
                "You're getting warmer!", "You're so close!", "You're almost there!"
            ];
            const randomMessage = closeMessages[Math.floor(Math.random() * closeMessages.length)];

            if (result.length > 0 && result[0].score <= 0.2) {
                return res.status(205).json({ message: randomMessage });
            } else {
                return res.status(400).json({ message: "Wrong Answer" });
            }
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
