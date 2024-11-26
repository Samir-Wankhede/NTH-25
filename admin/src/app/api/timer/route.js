import db from "@/lib/db";
import { endEvent, startTimer } from "@/lib/timer";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const timer = await new Promise((resolve, reject) => {
      db.get(
        `SELECT start_time, status FROM event_status WHERE id = 1`,
        [],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });

    if (!timer) {
      return NextResponse.json({ error: "No timer found" }, { status: 404 });
    }

    return NextResponse.json(
      { start_time: timer.start_time, status: timer.status },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching timer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const { start_time } = await request.json(); // Parse JSON body

    if (!start_time) {
      return NextResponse.json(
        { message: "start_time is required" },
        { status: 400 }
      );
    }
    console.log(start_time);
    const status = "inactive";
    const end_time = new Date(
      new Date(start_time).getTime() + 24 * 60 * 60 * 1000
    ).toISOString();

    const query = `
      INSERT INTO event_status (id, status, start_time, end_time)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        status = excluded.status,
        start_time = excluded.start_time,
        end_time = excluded.end_time
    `;
    await new Promise((resolve, reject) =>
      db.run(query, [1, status, start_time, end_time], (err) => {
        if (err) reject(err);
        else resolve();
      })
    );
    await startTimer(start_time);
    return NextResponse.json(
      { message: "Event status added/updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const timer = await new Promise((resolve, reject) => {
      db.get(
        `SELECT start_time, status, end_time FROM event_status WHERE id = 1`,
        [],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
    await endEvent(timer.start_time,timer.end_time);
    return NextResponse.json(
      { message: "All records in event_status table deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting records from event_status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
