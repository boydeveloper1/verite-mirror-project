// EDGE FUNCTION VERSION: 4.0.0 - With XHR polyfill
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// HTML escape function
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Support email template
function getSupportEmailHtml(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F5F1E8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F1E8;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #2D5A3D 0%, #1B7F4D 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700; letter-spacing: 2px;">VERITÉ SCALP</h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 8px 0 0 0; letter-spacing: 1px;">SCALP CARE BEFORE HAIR CARE</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #2D5A3D; font-size: 22px; margin: 0 0 20px 0;">New Contact Form Submission</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F1E8; border-radius: 12px;">
                <tr><td style="padding: 20px;">
                  <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${data.name}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                  ${data.phone ? `<p style="margin: 0 0 10px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ""}
                  ${data.subject ? `<p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${data.subject}</p>` : ""}
                </td></tr>
              </table>
              <h3 style="color: #2D5A3D; margin: 20px 0 10px 0;">Message:</h3>
              <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
                <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>
              <p style="margin-top: 20px; text-align: center;">
                <a href="mailto:${data.email}" style="display: inline-block; background: #2D5A3D; color: #fff; padding: 12px 30px; border-radius: 6px; text-decoration: none;">Reply to ${data.name}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Customer confirmation email
function getCustomerEmailHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F5F1E8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F1E8;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #2D5A3D 0%, #1B7F4D 100%); padding: 50px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700; letter-spacing: 2px;">VERITÉ SCALP</h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 8px 0 0 0; letter-spacing: 1px;">SCALP CARE BEFORE HAIR CARE</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #2D5A3D; font-size: 26px; margin: 0 0 20px 0;">Thank You, ${name}!</h2>
              <p style="color: #444; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                We've received your message and are grateful you reached out. Your hair health journey matters to us.
              </p>
              <p style="color: #444; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0;">
                Our team will get back to you within <strong style="color: #1B7F4D;">24-48 hours</strong>.
              </p>
              <p style="text-align: center;">
                <a href="https://veritescalp.com/store" style="display: inline-block; background: #2D5A3D; color: #fff; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: 700;">Shop Our Products</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #2D5A3D; padding: 30px; text-align: center;">
              <p style="color: rgba(255,255,255,0.9); font-size: 13px; margin: 0 0 10px 0;">support@veritescalp.com</p>
              <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 0;">© 2024 VERITÉ SCALP. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(async (req: Request): Promise<Response> => {
  console.log("=== send-contact-email invoked ===");
  console.log("Method:", req.method);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight");
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Request body received:", JSON.stringify(body));

    const { name, email, subject, phone, message } = body;

    if (!name || !email || !message) {
      console.log("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = subject ? escapeHtml(subject) : null;
    const safePhone = phone ? escapeHtml(phone) : null;
    const safeMessage = escapeHtml(message);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send to support
    console.log("Sending support email to veritescalp@gmail.com...");
    const supportRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VERITÉ SCALP <onboarding@resend.dev>",
        to: ["veritescalp@gmail.com"],
        subject: safeSubject ? `New Message: ${safeSubject}` : `New Message from ${safeName}`,
        html: getSupportEmailHtml({ name: safeName, email: safeEmail, phone: safePhone, subject: safeSubject, message: safeMessage }),
      }),
    });

    const supportData = await supportRes.json();
    console.log("Resend API response:", supportRes.status, JSON.stringify(supportData));

    if (!supportRes.ok) {
      console.error("Resend API error:", JSON.stringify(supportData));
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: supportData }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send confirmation to customer
    console.log("Sending confirmation email to:", email);
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VERITÉ SCALP <onboarding@resend.dev>",
        to: [email],
        subject: "Thank You for Reaching Out! - VERITÉ SCALP",
        html: getCustomerEmailHtml(safeName),
      }),
    });

    console.log("=== Emails sent successfully ===");
    return new Response(
      JSON.stringify({ success: true, id: supportData.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Function error:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
