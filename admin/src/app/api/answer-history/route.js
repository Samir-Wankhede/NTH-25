import db from "@/lib/db";
import { NextResponse } from "next/server";


const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const params = searchParams.get("id");
      let data = null;
      if (params==="all") {
        // Fetch specific record by ID
        data = await runQuery("SELECT * FROM answer_histories ORDER BY timestamp DESC");
        
      } else if (params){
        // Fetch all records
        data = await runQuery("SELECT * FROM answer_histories WHERE id = ?", [params]);
  
        if (!data) {
          return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }
      }else{
        return NextResponse.json({ error: "give proper params" }, { status: 400 });
      }
      return NextResponse.json({ data }, { status: 200 });

    } catch (error) {

      console.error("Error fetching data:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      
    }
  }