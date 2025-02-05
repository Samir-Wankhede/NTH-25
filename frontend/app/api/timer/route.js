import API from "@/utils/backendapi"; // Import your existing API instance

export async function GET() {
  try {
    const response = await API.get("/timer/time"); // Call backend through API instance

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.response?.data || "Internal Server Error" }),
      { status: error.response?.status || 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
