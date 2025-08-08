import db from "../db.server";

export const action = async ({ request }) => {
  try {
    // Parse incoming Shopify Shop Redact webhook payload
    const body = await request.json();
    console.log("Incoming Shop Redact Webhook Body:", body);

    const { shop } = body; // Shopify sends domain in 'shop'

    // Validate required field
    if (!shop) {
      return new Response("Missing required 'shop' field", { status: 400 });
    }

    console.log("Attempting to delete shop with domain:", shop);

    // Check if shop exists
    const shopExists = await db.shop.findUnique({
      where: {
        shop: shop,
      },
    });

    if (!shopExists) {
      console.log(`Shop with domain ${shop} not found`);
      return new Response(`Shop with domain ${shop} not found`, { status: 404 });
    }

    // Delete shop data
    const deletedShop = await db.shop.delete({
      where: {
        shop: shop,
      },
    });

    console.log(`Shop data redacted for ${shop}:`, deletedShop);

    return new Response("Shop data redacted successfully", { status: 200 });

  } catch (error) {
    console.error("Error processing shop redact webhook:", error);
    return new Response("Error processing request", { status: 500 });
  }
};
