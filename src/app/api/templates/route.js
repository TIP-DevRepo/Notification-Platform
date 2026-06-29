import { supabase } from "@/lib/supabase";

// GET — fetch all templates
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const app_id = searchParams.get("app_id");

    let query = supabase
      .from("templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (app_id) {
      query = query.eq("app_id", app_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return Response.json({ data });
  } catch (error) {
    console.error("Templates GET error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

// POST — create a new template
export async function POST(request) {
  try {
    const body = await request.json();
    const { app_id, name, type, subject, body: templateBody } = body;

    if (!name || !type || !templateBody) {
      return Response.json(
        { error: "Missing required fields: name, type, body" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("templates")
      .insert([{ app_id, name, type, subject, body: templateBody }])
      .select()
      .single();

    if (error) throw error;

    return Response.json({ data });
  } catch (error) {
    console.error("Templates POST error:", error);
    return Response.json(
      { error: error.message || "Failed to create template" },
      { status: 500 }
    );
  }
}