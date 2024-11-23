import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Wrap the database query in a Promise
        const users = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM users", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        return NextResponse.json({ data: users }, { status: 200 });
    } catch (err) {
        console.error("Error fetching users:", err);
        return NextResponse.json({ message: "Fetching Failed" }, { status: 500 });
    }
}
