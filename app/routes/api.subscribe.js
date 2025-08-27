import { json } from "@remix-run/node";
import { authenticate, BASIC_PLAN, UNLIMITED_PLAN } from "../shopify.server";
import db from "../db.server";
export const action = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const { plan } = await request.json();


  if (![BASIC_PLAN, UNLIMITED_PLAN].includes(plan)) {
    return json({ error: "Invalid plan selected" }, { status: 400 });
  }

  const shopRecord = await db.shop.upsert({
    where: { shop: session.shop },
    update: { planName: plan },
    create: {
      shop: session.shop,
      accessToken: session.accessToken,
      planName: plan,
    },
  });


  const response = await billing.request({
    plan,
    isTest: true,
    returnUrl: `https://${session.shop}/admin/oauth/redirect_from_cli?client_id=${process.env.SHOPIFY_API_KEY}`,
  });

  return json(response);
};
