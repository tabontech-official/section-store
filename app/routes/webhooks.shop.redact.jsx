import crypto from "crypto";
import db from "../db.server";

export const action = async ({ request }) => {
  console.log("🚀 [Webhook] shop/redact triggered");

  try {
    const rawBody = await request.text();
    const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");

    const generatedHash = crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
      .update(rawBody, "utf8")
      .digest("base64");

    if (generatedHash !== hmacHeader) {
      console.error(" Invalid HMAC signature. Unauthorized request.");
      return new Response("Unauthorized", { status: 401 });
    }

    console.log(" HMAC Verified Successfully");

    const body = JSON.parse(rawBody);
    console.log(" Parsed Request Body:", body);

    const { shop_id, shop_domain } = body;

    if (!shop_id || !shop_domain) {
      console.error(" Validation Error: Missing shop_id or shop_domain", body);
      return new Response("Missing required fields", { status: 400 });
    }

    console.log(` Checking if shop exists in DB: ${shop_domain} (${shop_id})`);

    const shopExists = await db.shop.findUnique({
      where: { shop: shop_domain },
    });

    if (!shopExists) {
      console.warn(` Shop ${shop_domain} not found in DB`);
      return new Response(`Shop ${shop_domain} not found`, { status: 404 });
    }

    console.log(` Deleting shop record for: ${shop_domain}`);

    const deletedShop = await db.shop.delete({
      where: { shop: shop_domain },
    });

    console.log(` Shop data redacted for ${shop_domain}:`, deletedShop);

    return new Response("Shop data redacted successfully", { status: 200 });
  } catch (error) {
    console.error(" Error processing shop/redact:", error);
    return new Response("Error processing request", { status: 500 });
  } finally {
    console.log(" [Webhook] shop/redact handler finished");
  }
};
