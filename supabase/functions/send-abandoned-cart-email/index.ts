import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CartItem {
  product: {
    node: {
      title: string;
      handle: string;
      images: {
        edges: Array<{
          node: {
            url: string;
          };
        }>;
      };
    };
  };
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
}

interface AbandonedCart {
  id: string;
  email: string;
  cart_items: CartItem[];
  total_value: number;
  currency: string;
}

const generateCartItemsHtml = (items: CartItem[]): string => {
  return items
    .map(
      (item) => `
    <tr>
      <td style="padding: 16px; border-bottom: 1px solid #e5e5e5;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="width: 80px;">
              <img src="${item.product.node.images.edges[0]?.node?.url || ''}" alt="${item.product.node.title}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;">
            </td>
            <td style="padding-left: 16px;">
              <p style="margin: 0; font-weight: 600; color: #3d3424;">${item.product.node.title}</p>
              <p style="margin: 4px 0 0; color: #5c4a36; font-size: 14px;">Qty: ${item.quantity}</p>
            </td>
            <td style="text-align: right; padding-left: 16px;">
              <p style="margin: 0; font-weight: 600; color: #3d3424;">$${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join("");
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting abandoned cart email processing...");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Find abandoned carts that:
    // 1. Have an email
    // 2. Were created more than 1 hour ago
    // 3. Haven't had a recovery email sent
    // 4. Haven't completed checkout
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: abandonedCarts, error: fetchError } = await supabaseClient
      .from("abandoned_carts")
      .select("*")
      .not("email", "is", null)
      .lt("created_at", oneHourAgo)
      .is("recovery_email_sent_at", null)
      .eq("checkout_completed", false)
      .limit(50);

    if (fetchError) {
      console.error("Error fetching abandoned carts:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${abandonedCarts?.length || 0} abandoned carts to process`);

    const results = [];

    for (const cart of (abandonedCarts || []) as AbandonedCart[]) {
      try {
        const cartItemsHtml = generateCartItemsHtml(cart.cart_items);

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Cart is Waiting!</title>
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
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #3d3424; font-size: 24px; margin: 0 0 8px; text-align: center;">Did You Forget Something?</h2>
              <p style="color: #5c4a36; font-size: 16px; line-height: 1.6; margin: 0 0 24px; text-align: center;">
                Your cart is waiting for you! These items are selling fast - complete your order before they're gone.
              </p>

              <!-- Cart Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #f8f5f0; border-radius: 12px;">
                ${cartItemsHtml}
                <tr>
                  <td style="padding: 16px;">
                    <table width="100%">
                      <tr>
                        <td><strong style="color: #3d3424;">Subtotal</strong></td>
                        <td style="text-align: right;"><strong style="color: #3d3424;">$${cart.total_value.toFixed(2)}</strong></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Discount Offer -->
              <div style="background: linear-gradient(135deg, #b8860b 0%, #d4a742 100%); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                <p style="color: #ffffff; font-size: 14px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Complete Your Order & Save</p>
                <p style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px;">15% OFF</p>
                <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 16px;">Use code: <strong>COMEBACK15</strong></p>
                <a href="https://veritescalp.com/store" style="display: inline-block; background-color: #ffffff; color: #3d3424; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 16px;">Complete My Order</a>
              </div>

              <!-- Urgency Message -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <p style="color: #92400e; font-size: 14px; margin: 0;">
                  ⚡ <strong>Limited Time:</strong> This 15% discount expires in 24 hours!
                </p>
              </div>

              <!-- Trust Elements -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="33%" style="text-align: center; padding: 16px;">
                    <p style="color: #3d3424; font-size: 14px; margin: 0;">🚚 Free Shipping</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 16px;">
                    <p style="color: #3d3424; font-size: 14px; margin: 0;">💰 60-Day Guarantee</p>
                  </td>
                  <td width="33%" style="text-align: center; padding: 16px;">
                    <p style="color: #3d3424; font-size: 14px; margin: 0;">⭐ 10K+ Reviews</p>
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
        `;

        const emailResponse = await resend.emails.send({
          from: "VERITÉ SCALP <onboarding@resend.dev>",
          to: [cart.email],
          subject: "Did you forget something? Your cart is waiting! 🛒",
          html: emailHtml,
        });

        console.log(`Email sent to ${cart.email}:`, emailResponse);

        // Mark as sent
        await supabaseClient
          .from("abandoned_carts")
          .update({ recovery_email_sent_at: new Date().toISOString() })
          .eq("id", cart.id);

        results.push({ email: cart.email, success: true });
      } catch (emailError) {
        console.error(`Failed to send email to ${cart.email}:`, emailError);
        results.push({ email: cart.email, success: false, error: emailError });
      }
    }

    return new Response(
      JSON.stringify({ processed: results.length, results }),
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
    console.error("Error in send-abandoned-cart-email function:", errorMessage);
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
