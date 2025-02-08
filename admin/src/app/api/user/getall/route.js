// import db from "@/lib/db";
// import { NextResponse } from "next/server";
// import { Parser } from "json2csv";

// export async function GET(request) {
//     try {
//         // Wrap the database query in a Promise
//         const users = await new Promise((resolve, reject) => {
//             db.all("SELECT * FROM users", (err, rows) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(rows);
//                 }
//             });
//         });

//         return NextResponse.json({ data: users }, { status: 200 });
//     } catch (err) {
//         console.error("Error fetching users:", err);
//         return NextResponse.json({ message: "Fetching Failed" }, { status: 500 });
//     }
// }

// export async function POST(request) {
//     try {
//       const userData = await request.json();
  
//       if (!Array.isArray(userData) || userData.length === 0) {
//         return NextResponse.json({ message: "Invalid or empty user data" }, { status: 400 });
//       }
  
//       const fields = Object.keys(userData[0]);
//       const json2csvParser = new Parser({ fields });
//       const csv = json2csvParser.parse(userData);
  
//       // Return the CSV content as a downloadable file
//       return new NextResponse(csv, {
//         headers: {
//           "Content-Type": "text/csv",
//           "Content-Disposition": "attachment; filename=users.csv",
//         },
//       });
//     } catch (error) {
//       console.error("Error generating CSV:", error);
//       return NextResponse.json({ message: "CSV generation failed" }, { status: 500 });
//     }
// }

// export async function DELETE(request) {
//   try {
//     const body = await request.json();

//     // Validate the input is an array of IDs
//     if (!Array.isArray(body) || body.length === 0) {
//       return NextResponse.json(
//         { message: "Invalid request: no IDs provided" },
//         { status: 400 }
//       );
//     }

//     // Convert the array of IDs into a format SQLite can process
//     const placeholders = body.map(() => "?").join(","); // Creates a string like "?, ?, ?"
//     const query = `DELETE FROM users WHERE id IN (${placeholders})`;

//     await new Promise((resolve, reject) => {
//       db.run(query, body, (err) => {
//         if (err) reject(err);
//         else resolve();
//       });
//     });

//     return NextResponse.json({ message: "Users deleted successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting users:", error);
//     return NextResponse.json({ message: "Deletion Failed" }, { status: 500 });
//   }
// }
import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { Parser } from "json2csv";

export async function GET() {
    try {
        // Fetch all users
        const result = await pool.query("SELECT * FROM users");
        return NextResponse.json({ data: result.rows }, { status: 200 });
    } catch (err) {
        console.error("Error fetching users:", err);
        return NextResponse.json({ message: "Fetching Failed" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const userData = await request.json();

        if (!Array.isArray(userData) || userData.length === 0) {
            return NextResponse.json({ message: "Invalid or empty user data" }, { status: 400 });
        }

        const fields = Object.keys(userData[0]);
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(userData);

        // Return the CSV content as a downloadable file
        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": "attachment; filename=users.csv",
            },
        });
    } catch (error) {
        console.error("Error generating CSV:", error);
        return NextResponse.json({ message: "CSV generation failed" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();

        // Validate the input is an array of IDs
        if (!Array.isArray(body) || body.length === 0) {
            return NextResponse.json(
                { message: "Invalid request: no IDs provided" },
                { status: 400 }
            );
        }

        // Convert array of IDs into PostgreSQL's `ANY($1)`
        const query = `DELETE FROM users WHERE id = ANY($1)`;
        await pool.query(query, [body]);

        return NextResponse.json({ message: "Users deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting users:", error);
        return NextResponse.json({ message: "Deletion Failed" }, { status: 500 });
    }
}
