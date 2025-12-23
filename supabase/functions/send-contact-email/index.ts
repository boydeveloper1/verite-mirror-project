import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Input validation schema with length limits and format checks
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long").trim(),
  email: z.string().email("Invalid email format").max(255, "Email too long"),
  phone: z.string().max(20, "Phone too long").optional().nullable(),
  subject: z.string().max(200, "Subject too long").optional().nullable(),
  message: z.string().min(1, "Message is required").max(5000, "Message too long").trim(),
});

// HTML escape function to prevent XSS in email clients
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Simple in-memory rate limiting (per IP, 3 requests per 15 minutes)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

// Beautiful branded email template for support team
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
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F5F1E8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F1E8;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D5A3D 0%, #1B7F4D 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700; letter-spacing: 2px;">VERITÉ SCALP</h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 8px 0 0 0; letter-spacing: 1px;">SCALP CARE BEFORE HAIR CARE</p>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 30px 30px 0 30px;">
              <h2 style="color: #2D5A3D; font-size: 22px; margin: 0 0 20px 0; font-weight: 700;">📩 New Contact Form Submission</h2>
              <div style="height: 3px; width: 60px; background: linear-gradient(90deg, #1B7F4D, #2D5A3D); border-radius: 2px;"></div>
            </td>
          </tr>
          
          <!-- Contact Details Card -->
          <tr>
            <td style="padding: 25px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F1E8; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 25px;">
                    <!-- Name -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td style="width: 100px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 3px;">Name</td>
                        <td style="color: #2D5A3D; font-size: 15px; font-weight: 600;">${data.name}</td>
                      </tr>
                    </table>
                    
                    <!-- Email -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td style="width: 100px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 3px;">Email</td>
                        <td style="color: #1B7F4D; font-size: 15px;"><a href="mailto:${data.email}" style="color: #1B7F4D; text-decoration: none;">${data.email}</a></td>
                      </tr>
                    </table>
                    
                    ${data.phone ? `
                    <!-- Phone -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td style="width: 100px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 3px;">Phone</td>
                        <td style="color: #333; font-size: 15px;"><a href="tel:${data.phone}" style="color: #1B7F4D; text-decoration: none;">${data.phone}</a></td>
                      </tr>
                    </table>
                    ` : ""}
                    
                    ${data.subject ? `
                    <!-- Subject -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 100px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 3px;">Subject</td>
                        <td style="color: #333; font-size: 15px; font-weight: 500;">${data.subject}</td>
                      </tr>
                    </table>
                    ` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 0 30px 25px 30px;">
              <h3 style="color: #2D5A3D; font-size: 16px; margin: 0 0 15px 0; font-weight: 700;">💬 Message</h3>
              <div style="background-color: #ffffff; border: 2px solid #E8E4DC; border-radius: 12px; padding: 20px;">
                <p style="color: #444; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${data.message}</p>
              </div>
            </td>
          </tr>
          
          <!-- Quick Reply Button -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${data.email}?subject=Re: ${data.subject || "Your VERITÉ SCALP Inquiry"}" style="display: inline-block; background: linear-gradient(135deg, #1B7F4D 0%, #2D5A3D 100%); color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">Reply to ${data.name}</a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #2D5A3D; padding: 30px; text-align: center;">
              <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 0;">© 2024 VERITÉ SCALP. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Beautiful branded auto-reply email template for customers
function getCustomerEmailHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F5F1E8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F1E8;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D5A3D 0%, #1B7F4D 100%); padding: 50px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700; letter-spacing: 2px;">VERITÉ SCALP</h1>
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 8px 0 0 0; letter-spacing: 1px;">SCALP CARE BEFORE HAIR CARE</p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #2D5A3D; font-size: 26px; margin: 0 0 10px 0; font-weight: 700;">Thank You, ${name}! 💚</h2>
              <div style="height: 3px; width: 80px; background: linear-gradient(90deg, #1B7F4D, #2D5A3D); border-radius: 2px; margin-bottom: 25px;"></div>
              
              <p style="color: #444; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                We've received your message and are so grateful you reached out to us. Your hair health journey matters to us, and we're here to help every step of the way.
              </p>
              
              <p style="color: #444; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0;">
                Our dedicated team will review your message and get back to you within <strong style="color: #1B7F4D;">24-48 hours</strong>.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding: 15px 0;">
                    <a href="https://veritescalp.com/store" style="display: inline-block; background: linear-gradient(135deg, #1B7F4D 0%, #2D5A3D 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 700; font-size: 15px; letter-spacing: 0.5px;">Shop Our Products</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #2D5A3D; padding: 30px; text-align: center;">
              <p style="color: rgba(255,255,255,0.9); font-size: 13px; margin: 0 0 10px 0;">
                📧 support@veritescalp.com
              </p>
              <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 0;">© 2024 VERITÉ SCALP. All rights reserved.</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request:", req.method, req.url);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
      req.headers.get("cf-connecting-ip") || 
      "unknown";

    if (isRateLimited(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }), 
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate and parse input
    const rawData = await req.json();
    console.log("Received form data:", { name: rawData.name, email: rawData.email });
    
    const validationResult = ContactSchema.safeParse(rawData);

    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input", details: validationResult.error.errors }), 
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, subject, phone, message } = validationResult.data;

    // Escape all user inputs for safe HTML rendering
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = subject ? escapeHtml(subject) : null;
    const safePhone = phone ? escapeHtml(phone) : null;
    const safeMessage = escapeHtml(message);

    console.log("Validated contact form submission:", { name: safeName, email: safeEmail });

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Send email to support team using fetch
    console.log("Sending email to support team...");
    const supportRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VERITÉ SCALP <onboarding@resend.dev>",
        to: ["veritescalp@gmail.com"],
        subject: safeSubject ? `New Message from ${safeName}: ${safeSubject}` : `New Message from ${safeName}`,
        html: getSupportEmailHtml({
          name: safeName,
          email: safeEmail,
          phone: safePhone,
          subject: safeSubject,
          message: safeMessage,
        }),
      }),
    });

    const supportResult = await supportRes.json();
    console.log("Support email result:", supportResult);

    if (!supportRes.ok) {
      console.error("Failed to send support email:", supportResult);
      throw new Error("Failed to send email to support");
    }

    // Send confirmation email to customer
    console.log("Sending confirmation email to customer...");
    const confirmRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VERITÉ SCALP <onboarding@resend.dev>",
        to: [email],
        subject: "Thank You for Reaching Out! 💚 - VERITÉ SCALP",
        html: getCustomerEmailHtml(safeName),
      }),
    });

    const confirmResult = await confirmRes.json();
    console.log("Confirmation email result:", confirmResult);

    if (!confirmRes.ok) {
      console.warn("Failed to send confirmation email:", confirmResult);
      // Don't fail the request if confirmation email fails
    }

    console.log("Emails sent successfully");
    return new Response(
      JSON.stringify({ success: true }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request." }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
