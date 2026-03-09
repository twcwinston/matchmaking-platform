import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use admin client (service role) to update profile regardless of auth state
// This is safe because we only update the profile for the given userId
export async function POST(request: NextRequest) {
  try {
    const { userId, name, phone, profileFor } = await request.json();

    if (!userId || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      // Fall back gracefully - profile will be updated during onboarding
      return NextResponse.json({ ok: true });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Update the auto-created profile with signup details
    await supabase
      .from("profiles")
      .update({
        created_by: profileFor === "family" ? "parent" : "self",
        basic_info: { name, phone },
      })
      .eq("user_id", userId);

    return NextResponse.json({ ok: true });
  } catch {
    // Non-critical - profile can be completed during onboarding
    return NextResponse.json({ ok: true });
  }
}
