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
      subject: "Your Scalp is Healthy! Here's How to Keep It That Way 🌿",
      headline: "Great News! Your Scalp is Healthy",
      intro: "Your quiz results show that your scalp is in excellent condition. But maintaining scalp health is an ongoing journey.",
      recommendation: "Our Scalp Soothing Mist is perfect for maintaining your healthy scalp and protecting against environmental stressors.",
      discount: "HEALTHY10",
      discountAmount: "10%",
      urgency: "low",
      color: "#22c55e",
    },
    early_warning: {
      subject: "We've Spotted Early Signs - Let's Fix This Now ⚡",
      headline: "Early Warning Signs Detected",
      intro: "Your quiz reveals early signs of scalp stress. The good news? Taking action now can prevent these issues from progressing.",
      recommendation: "Our Scalp Soothing Mist helps calm early-stage inflammation. Pair it with our filtered shower head for best results.",
      discount: "EARLY15",
      discountAmount: "15%",
      urgency: "medium",
      color: "#eab308",
    },
    needs_attention: {
      subject: "Your Personalized Scalp Recovery Plan 📋",
      headline: "Your Scalp Needs Attention",
      intro: "Your responses indicate noticeable scalp inflammation, which can affect hair growth and cause increased shedding. But don't worry - we have a solution.",
      recommendation: "We recommend our Scalp Soothing Mist for daily use. Our complete system has helped thousands of women restore their scalp health.",
      discount: "RECOVER20",
      discountAmount: "20%",
      urgency: "high",
      color: "#f97316",
    },
    priority: {
      subject: "URGENT: Your Scalp Needs Immediate Care 🚨",
      headline: "Priority Care Required",
      intro: "Your quiz results show significant scalp inflammation. Addressing this NOW is crucial for your hair health. Many women in your situation have seen remarkable improvements with our system.",
      recommendation: "Our complete scalp care system targets inflammation at multiple points. Start your recovery journey today with our most effective bundle.",
      discount: "PRIORITY25",
      discountAmount: "25%",
      urgency: "critical",
      color: "#ef4444",
    },
  };

  const config = configs[resultType as keyof typeof configs] || configs.needs_attention;

  return {
    ...config,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8f5f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f5f0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3d3424 0%, #5c4a36 100%); padding: 32px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 600;">VERITÉ SCALP</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Your Personalized Scalp Health Report</p>
            </td>
          </tr>
          
          <!-- Score Badge -->
          <tr>
            <td style="padding: 32px 40px 0; text-align: center;">
              <div style="display: inline-block; background-color: ${config.color}15; border: 2px solid ${config.color}; border-radius: 50px; padding: 8px 24px;">
                <span style="color: ${config.color}; font-weight: 600; font-size: 14px;">Score: ${score}/15</span>
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 24px 40px;">
              <h2 style="color: #3d3424; font-size: 24px; margin: 0 0 16px; text-align: center;">${config.headline}</h2>
              <p style="color: #5c4a36; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">${config.intro}</p>
              
              <!-- Recommendation Box -->
              <div style="background-color: #f8f5f0; border-left: 4px solid ${config.color}; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <p style="color: #3d3424; font-size: 15px; line-height: 1.6; margin: 0;">
                  <strong>Our Recommendation:</strong><br>
                  ${config.recommendation}
                </p>
              </div>

              <!-- Discount Offer -->
              <div style="background: linear-gradient(135deg, #b8860b 0%, #d4a742 100%); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                <p style="color: #ffffff; font-size: 14px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Exclusive Offer for You</p>
                <p style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px;">${config.discountAmount} OFF</p>
                <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 16px;">Use code: <strong>${config.discount}</strong></p>
                <a href="https://veritescalp.com/store" style="display: inline-block; background-color: #ffffff; color: #3d3424; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 16px;">Shop Now</a>
              </div>

              <!-- Trust Elements -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="33%" style="text-align: center; padding: 16px;">
                    <p style="color: #b8860b; font-size: 24px; font-weight: 700; margin: 0;">4-8</p>
                    <p style="color: #5c4a36; font-size: 12px; margin: 4px 0 0;">Weeks to Results</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 16px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5;">
                    <p style="color: #b8860b; font-size: 24px; font-weight: 700; margin: 0;">10K+</p>
                    <p style="color: #5c4a36; font-size: 12px; margin: 4px 0 0;">Happy Customers</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 16px;">
                    <p style="color: #b8860b; font-size: 24px; font-weight: 700; margin: 0;">60-Day</p>
                    <p style="color: #5c4a36; font-size: 12px; margin: 4px 0 0;">Money Back</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #3d3424; padding: 24px 40px; text-align: center;">
              <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0;">
                © 2025 VERITÉ SCALP. All rights reserved.<br>
                <a href="https://veritescalp.com/privacy-policy" style="color: #b8860b; text-decoration: none;">Privacy Policy</a> | 
                <a href="https://veritescalp.com/terms-of-service" style="color: #b8860b; text-decoration: none;">Terms of Service</a>
              </p>
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

    // Send email using verified domain
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
<html>
<head>
  <meta charset="utf-8">
  <title>New Quiz Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8f5f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f5f0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3d3424 0%, #5c4a36 100%); padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600;">New Quiz Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px 40px;">
              <h2 style="color: #3d3424; font-size: 20px; margin: 0 0 24px;">Customer Information</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #5c4a36;">Email:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
                    <a href="mailto:${email}" style="color: #b8860b; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #5c4a36;">Quiz Score:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
                    <span style="color: ${emailContent.color}; font-weight: 600;">${score}/15</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #5c4a36;">Result Type:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
                    <span style="background-color: ${emailContent.color}20; color: ${emailContent.color}; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">${resultType.replace('_', ' ').toUpperCase()}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                    <strong style="color: #5c4a36;">Discount Sent:</strong>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
                    <span style="color: #3d3424; font-weight: 600;">${emailContent.discount} (${emailContent.discountAmount} off)</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #5c4a36;">Quiz Answers:</strong>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <span style="color: #5c4a36;">${answers.join(', ')}</span>
                  </td>
                </tr>
              </table>

              <!-- Recommendation Sent -->
              <div style="background-color: #f8f5f0; border-left: 4px solid ${emailContent.color}; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <p style="color: #5c4a36; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Recommendation Sent to Customer:</p>
                <p style="color: #3d3424; font-size: 14px; line-height: 1.5; margin: 0;">${emailContent.recommendation}</p>
              </div>

              <!-- Timestamp -->
              <p style="color: #888; font-size: 12px; margin: 0; text-align: center;">
                Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #3d3424; padding: 16px 40px; text-align: center;">
              <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0;">This is an automated notification from VERITÉ SCALP Quiz</p>
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
      JSON.stringify({ success: true, discount: emailContent.discount }),
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
