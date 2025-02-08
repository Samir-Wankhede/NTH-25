// import db from "@/lib/db";
// import { NextResponse } from "next/server";

// // Helper function for database operations
// const runQuery = (query, params = []) => {
//     return new Promise((resolve, reject) => {
//         db.all(query, params, (err, rows) => {
//             if (err) reject(err);
//             else resolve(rows);
//         });
//     });
// };
// const DBrunQuery = (query, params = []) => {
//     return new Promise((resolve, reject) => {
//         db.run(query, params, (err, rows) => {
//             if (err) reject(err);
//             else resolve(rows);
//         });
//     });
// };

// // GET: Fetch all or specific questions based on query parameters
// export async function GET(request) {
//     const { searchParams } = new URL(request.url);
//     const params = searchParams.get("id");

//     try {
//         if (params === "all") {
//             const query = "SELECT * FROM questions ORDER BY level";
//             const questions = await runQuery(query);
//             return NextResponse.json({ data: questions }, { status: 200 });
//         } else if (params) {
//             const query = "SELECT * FROM questions WHERE id = ?";
//             const question = await runQuery(query, [params]);

//             if (!question || question.length === 0) {
//                 return NextResponse.json({ error: "Question not found" }, { status: 404 });
//             }
//             return NextResponse.json({ data: question[0] }, { status: 200 });
//         } else {
//             return NextResponse.json({ error: "Invalid query parameter" }, { status: 400 });
//         }
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: "Error fetching questions" }, { status: 500 });
//     }
// }

// // POST: Add a new question
// export async function POST(request) {
//     const {
//         img1,
//         img2,
//         img3,
//         img4,
//         hint,
//         paid_hint,
//         name,
//         close_answers,
//         tooltip,
//         level,
//         hint_cost,
//         answer,
//     } = await request.json();

//     if (!img1) {
//         return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
//     }

//     const res = await runQuery("SELECT * FROM questions WHERE level = ?",[level]);
//     // console.log(res);
//     if (res.length>0){
//         return NextResponse.json({ error: "Level already present." }, { status: 400 });
//     }

//     try {
//         const query = `
//             INSERT INTO questions (img1, img2, img3, img4, hint, paid_hint, name, close_answers, tooltip, level, hint_cost, answer)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;
//         await DBrunQuery(query,[
//             img1,
//             img2,
//             img3,
//             img4,
//             JSON.stringify(hint),
//             JSON.stringify(paid_hint),
//             name,
//             JSON.stringify(close_answers),
//             tooltip,
//             level,
//             hint_cost,
//             answer,
//         ]);
//         return NextResponse.json(
//             { message: "Question added successfully" },
//             { status: 201 }
//         );
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: "Error adding question" }, { status: 500 });
//     }
// }

// // PUT: Update a question
// export async function PUT(request) {
//     const {
//         img1,
//         img2,
//         img3,
//         img4,
//         hint,
//         paid_hint,
//         name,
//         close_answers,
//         tooltip,
//         hint_cost,
//         level,
//         answer,
//     } = await request.json();

//     try {
//         const query = `
//             UPDATE questions 
//             SET img1 = ?, img2 = ?, img3 = ?, img4 = ?, hint = ?, paid_hint = ?, name = ?, close_answers = ?, tooltip = ?, hint_cost = ?, answer = ?
//             WHERE level = ?
//         `;
//         await DBrunQuery(query,[
//             img1,
//             img2,
//             img3,
//             img4,
//             JSON.stringify(hint),
//             JSON.stringify(paid_hint),
//             name,
//             JSON.stringify(close_answers),
//             tooltip,
//             hint_cost,
//             answer,
//             level,
//         ]);
//         return NextResponse.json(
//             { message: "Question added successfully" },
//             { status: 201 }
//         );
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: "Error updating question" }, { status: 500 });
//     }
// }

// // DELETE: Delete a question
// export async function DELETE(request) {
//     const { searchParams } = new URL(request.url);
//     const level = searchParams.get("level");

//     if (!level) {
//         return NextResponse.json({ error: "Level is required" }, { status: 400 });
//     }

//     try {
//         const query = "DELETE FROM questions WHERE level = ?";
//         await DBrunQuery(query, [level]);
//         return NextResponse.json(
//             { message: "Question deleted successfully" },
//             { status: 200 }
//         );
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ error: err }, { status: 500 });
//     }
// }
import pool from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function for database operations
const runQuery = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// GET: Fetch all or specific questions based on query parameters
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const params = searchParams.get("id");

    try {
        if (params === "all") {
            const query = "SELECT * FROM questions ORDER BY level";
            const questions = await runQuery(query);
            return NextResponse.json({ data: questions }, { status: 200 });
        } else if (params) {
            const query = "SELECT * FROM questions WHERE id = $1";
            const question = await runQuery(query, [params]);

            if (!question || question.length === 0) {
                return NextResponse.json({ error: "Question not found" }, { status: 404 });
            }
            return NextResponse.json({ data: question[0] }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Invalid query parameter" }, { status: 400 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error fetching questions" }, { status: 500 });
    }
}

// POST: Add a new question
export async function POST(request) {
    const {
        img1,
        img2,
        img3,
        img4,
        hint,
        paid_hint,
        name,
        close_answers,
        tooltip,
        level,
        hint_cost,
        answer,
    } = await request.json();

    if (!img1) {
        return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    try {
        // Check if the level already exists
        const existingQuestion = await runQuery("SELECT * FROM questions WHERE level = $1", [level]);
        if (existingQuestion.length > 0) {
            return NextResponse.json({ error: "Level already present." }, { status: 400 });
        }

        const query = `
            INSERT INTO questions (img1, img2, img3, img4, hint, paid_hint, name, close_answers, tooltip, level, hint_cost, answer)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `;
        await runQuery(query, [
            img1,
            img2,
            img3,
            img4,
            JSON.stringify(hint),
            JSON.stringify(paid_hint),
            name,
            JSON.stringify(close_answers),
            tooltip,
            level,
            hint_cost,
            answer,
        ]);

        return NextResponse.json({ message: "Question added successfully" }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error adding question" }, { status: 500 });
    }
}

// PUT: Update a question
export async function PUT(request) {
    const {
        img1,
        img2,
        img3,
        img4,
        hint,
        paid_hint,
        name,
        close_answers,
        tooltip,
        hint_cost,
        level,
        answer,
    } = await request.json();

    try {
        const query = `
            UPDATE questions 
            SET img1 = $1, img2 = $2, img3 = $3, img4 = $4, hint = $5, paid_hint = $6, 
                name = $7, close_answers = $8, tooltip = $9, hint_cost = $10, answer = $11
            WHERE level = $12
        `;
        await runQuery(query, [
            img1,
            img2,
            img3,
            img4,
            JSON.stringify(hint),
            JSON.stringify(paid_hint),
            name,
            JSON.stringify(close_answers),
            tooltip,
            hint_cost,
            answer,
            level,
        ]);

        return NextResponse.json({ message: "Question updated successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error updating question" }, { status: 500 });
    }
}

// DELETE: Delete a question
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");

    if (!level) {
        return NextResponse.json({ error: "Level is required" }, { status: 400 });
    }

    try {
        const query = "DELETE FROM questions WHERE level = $1";
        await runQuery(query, [level]);
        return NextResponse.json({ message: "Question deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Error deleting question" }, { status: 500 });
    }
}
