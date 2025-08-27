import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  try {
    console.log('Webhook request received:', request);

    const { shop, session, topic } = await authenticate.webhook(request);

    if (session) {
      await db.session.deleteMany({ where: { shop } });

      return new Response('App uninstalled', { status: 200 });
    } else {
      console.error('No session found for shop:', shop);
      return new Response('No valid session', { status: 400 });
    }
  } catch (error) {
    console.error('Error handling app uninstall webhook:', error);
    return new Response("Error processing webhook", { status: 500 });
  }
};

