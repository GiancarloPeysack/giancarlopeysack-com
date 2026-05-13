/**
 * POST /api/notify
 *
 * Forwards a form submission to Giancarlo's inbox via Resend. The original
 * data is also stored in Firestore (handled separately by the form pages),
 * so this endpoint is best-effort — if it fails, the form still succeeded.
 *
 * Setup (one-time):
 *   1. Sign up at https://resend.com (Google sign-in works)
 *   2. Copy the API key from "API Keys" in the Resend dashboard
 *   3. In Vercel: Project Settings -> Environment Variables -> add
 *      RESEND_API_KEY for Production + Preview
 *   4. Redeploy
 *
 * Body shape: { type: 'pilot'|'sponsor'|'linkedin'|'video', data: object }
 */
export const dynamic = "force-dynamic";
export const runtime = "edge";

const SUBJECTS: Record<string, string> = {
  pilot: "MarketOpsIQ pilot request",
  sponsor: "Video sponsorship request",
  linkedin: "Waitlist signup: AI LinkedIn tool",
  video: "Waitlist signup: AI video tool",
};

const FROM = "Giancarlo Site <onboarding@resend.dev>";
const TO = "gc.peysack@gmail.com";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ ok: false, reason: "resend_not_configured" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }

  let payload: { type?: string; data?: Record<string, unknown> } = {};
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, reason: "bad_json" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const type = payload.type ?? "submission";
  const data = payload.data ?? {};
  const subject = SUBJECTS[type] ?? "New form submission";

  // Plain-text body — predictable, easy to scan in Gmail
  const lines = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${String(v)}`);
  const text = lines.length ? lines.join("\n") : "(no fields)";

  // Simple HTML version for nicer inbox preview
  const html = `<div style="font-family: -apple-system, system-ui, sans-serif; font-size: 14px; line-height: 1.5;">
    <p style="margin:0 0 12px 0;"><strong>New ${type} submission</strong></p>
    <table style="border-collapse:collapse;">
      ${Object.entries(data)
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0; color:#666;">${k}</td><td style="padding:4px 0;">${String(
              v
            )}</td></tr>`
        )
        .join("")}
    </table>
    <p style="margin:16px 0 0 0; color:#999; font-size:12px;">Sent from giancarlopeysack.com — stored in Firestore.</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        subject,
        text,
        html,
        reply_to:
          typeof data.email === "string" ? (data.email as string) : undefined,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      return new Response(
        JSON.stringify({ ok: false, reason: "resend_error", detail }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, reason: "fetch_failed", detail: String(err) }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }
}
