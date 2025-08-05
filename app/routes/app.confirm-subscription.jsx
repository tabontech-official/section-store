// app/routes/app/confirm-subscription.jsx
import { json, redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";

export const loader = async ({ request }) => {
  const { billing, session } = await authenticate.admin(request);

  const confirmation = await billing.confirm({ request });

  if (confirmation?.plan) {
    await db.shop.update({
      where: { shop: session.shop },
      data: {
        planName: confirmation.plan.name,
        subscriptionId: confirmation.subscriptionId || null,
      },
    });

    return redirect("/app");
  }

  return json({ error: "Billing confirmation failed" }, { status: 400 });
};

export default function ConfirmSubscription() {
  return null; // just redirects
}
