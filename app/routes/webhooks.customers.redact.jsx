// import crypto from "crypto";
// import db from "../db.server";

// export const action = async ({ request }) => {
//   console.log("🚀 [Webhook] customers/redact triggered");

//   try {
//     // ---- 1. Verify HMAC (Shopify Security Requirement) ----
//     const rawBody = await request.text();
//     const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");

//     const generatedHash = crypto
//       .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
//       .update(rawBody, "utf8")
//       .digest("base64");

//     if (generatedHash !== hmacHeader) {
//       console.error("❌ Invalid HMAC signature. Unauthorized request.");
//       return new Response("Unauthorized", { status: 401 });
//     }

//     console.log("🔐 HMAC Verified Successfully");

//     // ---- 2. Parse Body ----
//     const body = JSON.parse(rawBody);
//     console.log("✅ Parsed Request Body:", body);

//     const { shop_id, shop_domain, customer, data_request } = body;

//     // ---- 3. Validation ----
//     if (!shop_id || !shop_domain || !customer || !data_request) {
//       console.error("❌ Validation Error: Missing required fields", {
//         shop_id,
//         shop_domain,
//         customer,
//         data_request,
//       });
//       return new Response("Missing required fields", { status: 400 });
//     }

//     console.log(`🔎 Processing redact request for shop: ${shop_domain} (${shop_id})`);
//     console.log("👤 Customer Object:", customer);
//     console.log("📄 Data Request Object:", data_request);

//     const customerId = customer.id;
//     console.log(`👉 Extracted Customer ID: ${customerId}`);

//     // ---- 4. Check DB for record ----
//     console.log("🔎 Searching for existing CustomerDataRequest record...");
//     const customerDataRequest = await db.customerDataRequest.findFirst({
//       where: { shop_id, customerId },
//     });

//     if (!customerDataRequest) {
//       console.warn(
//         `⚠️ No customer data request found for shop ${shop_domain}, customerId ${customerId}`
//       );
//       return new Response("Customer data request not found", { status: 404 });
//     }

//     console.log("✅ Found matching record in DB:", customerDataRequest);

//     // ---- 5. Redact customer data ----
//     console.log("📝 Redacting customer data in DB...");
//     const updatedCustomer = await db.customerDataRequest.update({
//       where: { id: customerDataRequest.id },
//       data: {
//         customerEmail: "REDACTED",
//         customerPhone: "REDACTED",
//         customerId: "REDACTED",
//       },
//     });

//     console.log("✅ Customer data redacted successfully:", updatedCustomer);

//     // ---- 6. Response ----
//     return new Response("Customer data redacted successfully", { status: 200 });
//   } catch (error) {
//     console.error("💥 Error processing customers/redact:", error);
//     return new Response("Error processing request", { status: 500 });
//   } finally {
//     console.log("🏁 [Webhook] customers/redact handler finished");
//   }
// };
import crypto from "crypto";

export const action = async ({ request }) => {
  console.log("🚀 [Webhook] customers/redact triggered");

  try {
    const rawBody = await request.text();
    const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");

    // 🔐 Verify HMAC
    const generatedHash = crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET || "")
      .update(rawBody, "utf8")
      .digest("base64");

    if (generatedHash !== hmacHeader) {
      console.error("❌ Invalid HMAC signature. Unauthorized request.");
      // Shopify expects 401 only if HMAC is wrong
      return new Response("Unauthorized", { status: 401 });
    }


    try {
      const body = JSON.parse(rawBody);
      console.log(" Request Body:", body);
    } catch {
      console.log(" Could not parse JSON body, but continuing...");
    }

    console.log(" No customer data stored in app → nothing to redact.");
    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("💥 Error in customers/redact webhook:", error);
    return new Response("OK", { status: 200 });
  } finally {
    console.log("🏁 [Webhook] customers/redact finished");
  }
};
