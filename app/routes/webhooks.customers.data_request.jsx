// import crypto from "crypto";
// import db from "../db.server";

// export const action = async ({ request }) => {
//   console.log(" [Webhook] customers/data_request triggered");

//   try {
//     const rawBody = await request.text(); 
//     const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");

//     const generatedHash = crypto
//       .createHmac("sha256", process.env.SHOPIFY_API_SECRET) 
//       .update(rawBody, "utf8")
//       .digest("base64");

//     if (generatedHash !== hmacHeader) {
//       console.error(" Invalid HMAC signature. Unauthorized request.");
//       return new Response("Unauthorized", { status: 401 });
//     }

//     console.log(" HMAC Verified Successfully");

//     const body = JSON.parse(rawBody);
//     console.log(" Parsed Request Body:", body);

//     const { shop_id, shop_domain, orders_requested, customer, data_request } = body;

//     if (!shop_id || !shop_domain || !customer || !data_request) {
//       console.error(" Validation Failed: Missing required fields", {
//         shop_id,
//         shop_domain,
//         customer,
//         data_request,
//       });
//       return new Response("Missing required fields", { status: 400 });
//     }

//     console.log(`🔎 Shop ID: ${shop_id}, Shop Domain: ${shop_domain}`);
//     console.log("👤 Customer:", customer);
//     console.log("📄 Data Request:", data_request);
//     console.log("🛒 Orders Requested:", orders_requested);

//     const dataRequestDoc = {
//       shop_id,
//       shop_domain,
//       topic: "customers/data_request",
//       orders_requested,
//       customerId: customer.id,
//       customerEmail: customer.email,
//       customerPhone: customer.phone,
//       dataRequestId: data_request.id,
//       createdAt: new Date(),
//     };

//     console.log("📝 Prepared Data Request Doc:", dataRequestDoc);

//     console.log("💾 Saving data request to DB...");
//     const customerDataRequest = await db.customerDataRequest.create({
//       data: dataRequestDoc,
//     });

//     console.log("Customer data request stored successfully:", customerDataRequest);

//     return new Response("Customer data request processed and stored", { status: 200 });
//   } catch (error) {
//     console.error("💥 Error processing customers/data_request:", error);
//     return new Response("Error processing request", { status: 500 });
//   } finally {
//     console.log("🏁 [Webhook] customers/data_request handler finished");
//   }
// };
import crypto from "crypto";

export const action = async ({ request }) => {

  try {
    const rawBody = await request.text();
    const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");

    const generatedHash = crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET || "")
      .update(rawBody, "utf8")
      .digest("base64");

    if (generatedHash !== hmacHeader) {
      console.error("Invalid HMAC signature. Unauthorized request.");
      return new Response("Unauthorized", { status: 401 });
    }


    try {
      const body = JSON.parse(rawBody);
      console.log(" Request Body:", body);
    } catch {
      console.log(" Could not parse JSON body, but continuing...");
    }

    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("Error in customers/data_request webhook:", error);
    return new Response("OK", { status: 200 });
  } finally {
    console.log("🏁 [Webhook] customers/data_request finished");
  }
};
