import { supabase } from "@/lib/supabase";

// PUT — update a template
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, type, subject, body: templateBody } = body;

    if (!name || !type || !templateBody) {
      return Response.json(
        { error: "Missing required fields: name, type, body" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("templates")
      .update({ name, type, subject, body: templateBody })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return Response.json({ data });
  } catch (error) {
    console.error("Templates PUT error:", error);
    return Response.json(
      { error: error.message || "Failed to update template" },
      { status: 500 }
    );
  }
}

// DELETE — delete a template
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const { error } = await supabase
      .from("templates")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Templates DELETE error:", error);
    return Response.json(
      { error: error.message || "Failed to delete template" },
      { status: 500 }
    );
  }
}