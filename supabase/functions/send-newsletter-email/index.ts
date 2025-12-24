import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const getSubscriberEmailHtml = () => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to VERITÉ SCALP</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f6f3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f6f3; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1B7F4D 0%, #156B3F 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">VERITÉ SCALP</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 8px 0 0 0; letter-spacing: 1px;">SCALP CARE BEFORE HAIR CARE</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="display: inline-block; background-color: #E8F5EE; color: #1B7F4D; font-size: 12px; font-weight: 600; padding: 6px 16px; border-radius: 20px; letter-spacing: 1px;">🎉 WELCOME TO THE FAMILY</span>
              </div>
              
              <h2 style="color: #1a1a1a; font-size: 24px; text-align: center; margin: 0 0 20px 0;">Thank You for Subscribing!</h2>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; text-align: center; margin: 0 0 25px 0;">
                You're now part of an exclusive community of women committed to scalp health and natural hair growth. Get ready for:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="color: #1B7F4D; font-weight: 600;">✨</span>
                    <span style="color: #333; margin-left: 10px;">Exclusive discounts & early access to sales</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="color: #1B7F4D; font-weight: 600;">💡</span>
                    <span style="color: #333; margin-left: 10px;">Expert scalp care tips & tutorials</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="color: #1B7F4D; font-weight: 600;">🆕</span>
                    <span style="color: #333; margin-left: 10px;">First look at new product launches</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #1B7F4D; font-weight: 600;">🎁</span>
                    <span style="color: #333; margin-left: 10px;">Special subscriber-only offers</span>
                  </td>
                </tr>
              </table>
              
              <div style="background: linear-gradient(135deg, #E8F5EE 0%, #D4EDE0 100%); border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
                <p style="color: #1B7F4D; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">YOUR EXCLUSIVE DISCOUNT CODE</p>
                <p style="color: #1B7F4D; font-size: 32px; font-weight: 700; margin: 0; letter-spacing: 2px;">WELCOME15</p>
                <p style="color: #666; font-size: 14px; margin: 8px 0 0 0;">Use at checkout for 15% off your first order!</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://veritescalp.com/store" style="display: inline-block; background: linear-gradient(135deg, #1B7F4D 0%, #156B3F 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px;">Shop Now & Save 15%</a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center;">
              <p style="color: #888888; font-size: 12px; margin: 0 0 10px 0;">
                © ${new Date().getFullYear()} VERITÉ SCALP. All rights reserved.
              </p>
              <p style="color: #666666; font-size: 11px; margin: 0;">
                You received this email because you subscribed to our newsletter.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const getAdminEmailHtml = (email: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Newsletter Subscriber</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f8f6f3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="500" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #1B7F4D; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 20px; margin: 0;">New Newsletter Subscriber 📧</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333; font-size: 16px; margin: 0 0 15px 0;"><strong>Email:</strong> ${email}</p>
              <p style="color: #333; font-size: 16px; margin: 0 0 15px 0;"><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
              <p style="color: #333; font-size: 16px; margin: 0;"><strong>Source:</strong> Website Newsletter Popup/Footer</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing newsletter subscription for:", email);

    // Send welcome email to subscriber
    const subscriberRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VERITÉ SCALP <noreply@veritescalp.com>",
        to: [email],
        subject: "Welcome to VERITÉ SCALP! 🎉 Here's Your 15% Discount",
        html: getSubscriberEmailHtml(),
      }),
    });

    if (!subscriberRes.ok) {
      const error = await subscriberRes.text();
      console.error("Failed to send subscriber email:", error);
      throw new Error("Failed to send welcome email");
    }

    console.log("Subscriber welcome email sent successfully");

    // Send notification email to admin
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VERITÉ SCALP <noreply@veritescalp.com>",
        to: ["veritescalp@gmail.com"],
        subject: `New Newsletter Subscriber: ${email}`,
        html: getAdminEmailHtml(email),
      }),
    });

    if (!adminRes.ok) {
      console.error("Failed to send admin notification:", await adminRes.text());
      // Don't throw here - subscriber email was sent successfully
    } else {
      console.log("Admin notification email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Successfully subscribed!" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-newsletter-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
