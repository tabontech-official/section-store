// routes/api/subscribe.ts
import { json } from "@remix-run/node";
import { authenticate, BASIC_PLAN, UNLIMITED_PLAN } from "../shopify.server";

export const action = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);
  const { plan } = await request.json();

  if (![BASIC_PLAN, UNLIMITED_PLAN].includes(plan)) {
    return json({ error: "Invalid plan selected" }, { status: 400 });
  }

  const response = await billing.request({
    plan,
    isTest: true,
    returnUrl: `https://${session.shop}/admin/apps/section-store-18`,

  });

  return json(response);
};
