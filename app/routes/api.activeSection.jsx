import { json } from "@remix-run/node";
import db from "../db.server";
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const body = await request.json();
  const { title, imageUrl } = body;

  if (!title || !imageUrl) {
    return json({ error: "Missing title or imageUrl" }, { status: 400 });
  }

  await db.sectionStatus.upsert({
    where: { sectionHandle: title },
    update: {
      status: "added",
      imageUrl,
    },
    create: {
      sectionHandle: title,
      status: "added",
      imageUrl,
    },
  });

  return json({ success: true });
};



