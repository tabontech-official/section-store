import { json } from "@remix-run/node";
import db from "../db.server.js";
import { authenticate } from "../shopify.server.js";

export const loader = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    const shop = session.shop;

    const sections = await db.themeSection.findMany({
      where: { shop },
      select: {
        id: true,
        sectionTitle: true,
        imageUrl: true,
        addedAt: true,
      },
      orderBy: { addedAt: "desc" },
    });

    return json(sections);
  } catch (err) {
    console.error("Fetch theme sections error:", err);
    return json({ error: "Failed to load theme sections" }, { status: 500 });
  }
};
