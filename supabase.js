/* =====================================================================
   supabase.js — the ONLY file that talks to Supabase.
   Fill in the two values below (Supabase > Project Settings > API Keys).

   SAFE to paste here : Project URL + the "anon" / "publishable" key.
                        (It is public by design; RLS in schema.sql protects the data.)
   NEVER paste here   : the "service_role" / "secret" key. It bypasses RLS.
   ===================================================================== */
(function () {
  const SUPABASE_URL = "https://ifznubdelcsmpioghooa.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_IWbZpE7pelkHoDFkRmuziA_CFirLYXX";

  const isConfigured = !SUPABASE_URL.includes("YOUR-PROJECT-REF") && !SUPABASE_ANON_KEY.includes("YOUR-ANON");

  // NOTE: the SDK creates a global called "supabase", so ours is named supabaseClient.
  const supabaseClient =
    isConfigured && window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

  /** Saves one enquiry row. Always resolves to { ok: true } or { ok: false, error }. */
  async function submitEnquiry(data) {
    if (!supabaseClient) {
      console.error("Supabase is not configured. Add your URL and anon key in supabase.js");
      return { ok: false, error: "not_configured" };
    }
    // insert only (no .select()) because RLS lets visitors write but never read.
    const { error } = await supabaseClient.from("enquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      service: data.service || null,
      message: data.message,
    });
    if (error) {
      console.error("Supabase insert failed:", error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  }

  window.TecexDB = { submitEnquiry };
})();
