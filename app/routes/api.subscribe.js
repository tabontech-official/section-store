// // routes/api/subscribe.ts
// import { json } from "@remix-run/node";
// import { authenticate, BASIC_PLAN, UNLIMITED_PLAN } from "../shopify.server";

// export const action = async ({ request }) => {
//   const { billing, session } = await authenticate.admin(request);
//   const { plan } = await request.json();

//   if (![BASIC_PLAN, UNLIMITED_PLAN].includes(plan)) {
//     return json({ error: "Invalid plan selected" }, { status: 400 });
//   }

//   const response = await billing.request({
//     plan,
//     isTest: true,
    // returnUrl: `https://${session.shop}/admin/oauth/redirect_from_cli?client_id=${process.env.SHOPIFY_API_KEY}`,

//   });

//   return json(response);
// };
// routes/api/subscribe.ts
import { json } from "@remix-run/node";
import { authenticate, BASIC_PLAN, UNLIMITED_PLAN } from "../shopify.server";
import db from "../db.server";
export const action = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const { plan } = await request.json();

  console.log("➡️ Incoming subscribe request", { shop: session?.shop, plan });

  if (![BASIC_PLAN, UNLIMITED_PLAN].includes(plan)) {
    return json({ error: "Invalid plan selected" }, { status: 400 });
  }

  // Step 1: Save or update shop + plan in DB
  const shopRecord = await db.shop.upsert({
    where: { shop: session.shop },
    update: { planName: plan },
    create: {
      shop: session.shop,
      accessToken: session.accessToken,
      planName: plan,
    },
  });

  console.log("✅ Saved to DB:", shopRecord);

  // Step 2: Request billing
  const response = await billing.request({
    plan,
    isTest: true,
    returnUrl: `https://${session.shop}/admin/oauth/redirect_from_cli?client_id=${process.env.SHOPIFY_API_KEY}`,
  });

  return json(response);
};
