import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuizEmailRequest {
  email: string;
  score: number;
  resultType: string;
  answers: number[];
}

const getEmailContent = (score: number, resultType: string) => {
  const configs = {
    healthy: {
      subject: "Your Scalp Health Results Are In! 🌿",
      headline: "Great News! Your Scalp is Healthy",
      intro: "Your quiz results show that your scalp is in excellent condition. Maintaining scalp health is an ongoing journey, and you're doing great!",
      recommendation: "Our Scalp Soothing Mist is perfect for maintaining your healthy scalp and protecting against environmental stressors.",
      urgency: "low",
      color: "#1B7F4D",
    },
    early_warning: {
      subject: "Your Personalized Scalp Health Results ⚡",
      headline: "Early Warning Signs Detected",
      intro: "Your quiz reveals early signs of scalp stress. The good news? Taking action now can prevent these issues from progressing.",
      recommendation: "Our Scalp Soothing Mist helps calm early-stage inflammation. Pair it with our filtered shower head for best results.",
      urgency: "medium",
      color: "#eab308",
    },
    needs_attention: {
      subject: "Your Personalized Scalp Recovery Plan 📋",
      headline: "Your Scalp Needs Attention",
      intro: "Your responses indicate noticeable scalp inflammation, which can affect hair growth and cause increased shedding. But don't worry - we have a solution.",
      recommendation: "We recommend our Scalp Soothing Mist for daily use. Our complete system has helped thousands of women restore their scalp health.",
      urgency: "high",
      color: "#f97316",
    },
    priority: {
      subject: "Your Scalp Health Report - Action Required 🚨",
      headline: "Priority Care Recommended",
      intro: "Your quiz results show significant scalp inflammation. Addressing this is crucial for your hair health. Many women in your situation have seen remarkable improvements with our system.",
      recommendation: "Our complete scalp care system targets inflammation at multiple points. Start your recovery journey today with our most effective bundle.",
      urgency: "critical",
      color: "#ef4444",
    },
  };

  const config = configs[resultType as keyof typeof configs] || configs.needs_attention;

  return {
    ...config,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.subject}</title>
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
          
          <!-- Score Badge -->
          <tr>
            <td style="padding: 30px 30px 0 30px; text-align: center;">
              <div style="display: inline-block; background-color: ${config.color}15; border: 2px solid ${config.color}; border-radius: 50px; padding: 10px 28px;">
                <span style="color: ${config.color}; font-weight: 600; font-size: 15px;">Your Score: ${score}/15</span>
              </div>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 30px 30px 0 30px;">
              <h2 style="color: #2D5A3D; font-size: 24px; margin: 0 0 10px 0; font-weight: 700; text-align: center;">${config.headline}</h2>
              <div style="height: 3px; width: 80px; background: linear-gradient(90deg, #1B7F4D, #2D5A3D); border-radius: 2px; margin: 0 auto 25px auto;"></div>
              
              <p style="color: #444; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0;">
                ${config.intro}
              </p>
              
              <!-- Recommendation Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #F5F1E8 0%, #EDE9E0 100%); border-radius: 12px; border-left: 4px solid #1B7F4D; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px 25px;">
                    <p style="color: #2D5A3D; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">💡 Our Recommendation</p>
                    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0;">
                      ${config.recommendation}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Trust Elements -->
          <tr>
            <td style="padding: 0 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px; background-color: #F5F1E8; border-radius: 12px;">
                <tr>
                  <td width="33%" style="text-align: center; padding: 20px 10px;">
                    <p style="color: #1B7F4D; font-size: 22px; font-weight: 700; margin: 0;">4-8</p>
                    <p style="color: #5c4a36; font-size: 11px; margin: 5px 0 0 0;">Weeks to Results</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 20px 10px; border-left: 1px solid #E8E4DC; border-right: 1px solid #E8E4DC;">
                    <p style="color: #1B7F4D; font-size: 22px; font-weight: 700; margin: 0;">10K+</p>
                    <p style="color: #5c4a36; font-size: 11px; margin: 5px 0 0 0;">Happy Customers</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 20px 10px;">
                    <p style="color: #1B7F4D; font-size: 22px; font-weight: 700; margin: 0;">60-Day</p>
                    <p style="color: #5c4a36; font-size: 11px; margin: 5px 0 0 0;">Money Back</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Buttons -->
          <tr>
            <td style="padding: 0 30px 35px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 15px;">
                    <a href="https://veritescalp.com/store" style="display: inline-block; background: linear-gradient(135deg, #1B7F4D 0%, #2D5A3D 100%); color: #ffffff; text-decoration: none; padding: 16px 45px; border-radius: 8px; font-weight: 700; font-size: 15px; letter-spacing: 0.5px;">Shop Our Products</a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center;">
                    <a href="https://veritescalp.com/blog" style="display: inline-block; background-color: transparent; color: #1B7F4D; text-decoration: none; padding: 14px 35px; border-radius: 8px; font-weight: 600; font-size: 14px; border: 2px solid #1B7F4D;">Learn About Scalp Health</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Signature -->
          <tr>
            <td style="padding: 0 30px 30px 30px; border-top: 1px solid #E8E4DC;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-top: 25px;">
                    <p style="color: #444; font-size: 15px; line-height: 1.6; margin: 0;">
                      With love,<br>
                      <strong style="color: #2D5A3D;">The VERITÉ SCALP Team</strong>
                    </p>
                    <p style="color: #888; font-size: 13px; margin: 15px 0 0 0; font-style: italic;">
                      "Fix your scalp environment. Watch your edges grow back naturally."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #2D5A3D; padding: 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 20px;">
                    <a href="https://veritescalp.com/store" style="color: #ffffff; text-decoration: none; font-size: 13px; margin: 0 12px; font-weight: 500;">Shop</a>
                    <a href="https://veritescalp.com/about" style="color: #ffffff; text-decoration: none; font-size: 13px; margin: 0 12px; font-weight: 500;">About</a>
                    <a href="https://veritescalp.com/blog" style="color: #ffffff; text-decoration: none; font-size: 13px; margin: 0 12px; font-weight: 500;">Blog</a>
                    <a href="https://veritescalp.com/contact" style="color: #ffffff; text-decoration: none; font-size: 13px; margin: 0 12px; font-weight: 500;">Contact</a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-bottom: 15px;">
                    <p style="color: rgba(255,255,255,0.9); font-size: 13px; margin: 0;">
                      📧 hello@veritescalp.com
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px; text-align: center;">
                    <p style="color: rgba(255,255,255,0.7); font-size: 11px; margin: 0 0 10px 0;">
                      <a href="https://veritescalp.com/privacy-policy" style="color: rgba(255,255,255,0.7); text-decoration: none;">Privacy Policy</a> &nbsp;|&nbsp; 
                      <a href="https://veritescalp.com/terms-of-service" style="color: rgba(255,255,255,0.7); text-decoration: none;">Terms of Service</a> &nbsp;|&nbsp;
                      <a href="https://veritescalp.com/refund-policy" style="color: rgba(255,255,255,0.7); text-decoration: none;">Refund Policy</a>
                    </p>
                    <p style="color: rgba(255,255,255,0.5); font-size: 11px; margin: 0;">© 2025 VERITÉ SCALP. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, score, resultType, answers }: QuizEmailRequest = await req.json();

    console.log("Sending quiz results email to:", email, "Score:", score, "Type:", resultType);

    // Save subscriber to database
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabaseClient
      .from("subscribers")
      .upsert({
        email,
        source: "quiz",
        quiz_score: score,
        quiz_result_type: resultType,
        quiz_answers: answers,
      }, { onConflict: 'email' });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    // Get email content based on result type
    const emailContent = getEmailContent(score, resultType);

    // Send email with proper headers to reduce spam likelihood
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VERITÉ SCALP <hello@veritescalp.com>",
        to: [email],
        subject: emailContent.subject,
        html: emailContent.html,
        reply_to: "hello@veritescalp.com",
        headers: {
          "X-Entity-Ref-ID": `quiz-${Date.now()}`,
          "List-Unsubscribe": "<mailto:unsubscribe@veritescalp.com>",
        },
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Failed to send quiz results email:", emailResult);
      throw new Error(emailResult.message || "Failed to send email");
    }

    console.log("Quiz results email sent successfully:", emailResult);

    // Send admin notification email
    const adminEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quiz Submission</title>
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
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 8px 0 0 0; letter-spacing: 1px;">NEW QUIZ SUBMISSION</p>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 30px 30px 0 30px;">
              <h2 style="color: #2D5A3D; font-size: 22px; margin: 0 0 20px 0; font-weight: 700;">📊 New Quiz Results</h2>
              <div style="height: 3px; width: 60px; background: linear-gradient(90deg, #1B7F4D, #2D5A3D); border-radius: 2px;"></div>
            </td>
          </tr>
          
          <!-- Customer Details Card -->
          <tr>
            <td style="padding: 25px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F1E8; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 25px;">
                    <!-- Email -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td style="width: 120px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 3px;">Email</td>
                        <td style="color: #1B7F4D; font-size: 15px;"><a href="mailto:${email}" style="color: #1B7F4D; text-decoration: none;">${email}</a></td>
                      </tr>
                    </table>
                    
                    <!-- Score -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td style="width: 120px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 3px;">Quiz Score</td>
                        <td style="font-size: 15px;"><span style="color: ${emailContent.color}; font-weight: 700;">${score}/15</span></td>
                      </tr>
                    </table>
                    
                    <!-- Result Type -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td style="width: 120px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 3px;">Result Type</td>
                        <td style="font-size: 15px;"><span style="background-color: ${emailContent.color}20; color: ${emailContent.color}; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">${resultType.replace('_', ' ').toUpperCase()}</span></td>
                      </tr>
                    </table>
                    
                    <!-- Answers -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 120px; color: #666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 3px;">Quiz Answers</td>
                        <td style="color: #333; font-size: 15px;">${answers.join(', ')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Recommendation Sent -->
          <tr>
            <td style="padding: 0 30px 25px 30px;">
              <h3 style="color: #2D5A3D; font-size: 16px; margin: 0 0 15px 0; font-weight: 700;">💬 Recommendation Sent to Customer</h3>
              <div style="background-color: #ffffff; border: 2px solid #E8E4DC; border-radius: 12px; padding: 20px;">
                <p style="color: #444; font-size: 15px; line-height: 1.7; margin: 0;">${emailContent.recommendation}</p>
              </div>
            </td>
          </tr>
          
          <!-- Timestamp -->
          <tr>
            <td style="padding: 0 30px 25px 30px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>
          
          <!-- Quick Reply Button -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${email}?subject=Your VERITÉ SCALP Quiz Results" style="display: inline-block; background: linear-gradient(135deg, #1B7F4D 0%, #2D5A3D 100%); color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">Reply to Customer</a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #2D5A3D; padding: 20px 30px; text-align: center;">
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0;">This is an automated notification from VERITÉ SCALP Quiz System</p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VERITÉ SCALP <hello@veritescalp.com>",
        to: ["support@veritescalp.com"],
        subject: `New Quiz: ${email} - Score ${score}/15 (${resultType.replace('_', ' ')})`,
        html: adminEmailHtml,
        reply_to: email,
      }),
    });

    if (!adminEmailResponse.ok) {
      const adminError = await adminEmailResponse.json();
      console.error("Failed to send admin notification:", adminError);
      // Don't throw - customer email was sent successfully
    } else {
      console.log("Admin notification email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-quiz-results-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
