import { json } from "@remix-run/node";
import db from "../db.server.js";
import { authenticate } from "../shopify.server.js";

export const action = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    const shop = session.shop;
    const { sectionTitle, imageUrl } = await request.json();

    if (!sectionTitle || !imageUrl) {
      return json({ error: "Missing title or imageUrl" }, { status: 400 });
    }

    const shopData = await db.shop.findUnique({ where: { shop } });
    const rawPlan = shopData?.planName || "Starter";
    const plan = rawPlan.replace(" Plan", "");
    const existingSections = await db.themeSection.findMany({
      where: { shop },
      select: { sectionTitle: true },
    });

    const existingTitles = new Set(existingSections.map((s) => s.sectionTitle));
    const alreadyExists = existingTitles.has(sectionTitle);

    const limits = {
      Starter: 3,
      Basic: 10,
      Unlimited: Infinity,
    };

    const maxAllowed = limits[plan] ?? 3;

    if (alreadyExists) {
      return json({ error: "Section already added" }, { status: 409 });
    }

    if (existingTitles.size >= maxAllowed) {
      return json(
        { error: `Section limit reached for ${plan} plan` },
        { status: 403 },
      );
    }

    await db.themeSection.create({
      data: {
        shop,
        sectionTitle,
        imageUrl,
      },
    });

    return json({ success: true });
  } catch (err) {
    console.error("Save section to theme error:", err);
    return json({ error: "Failed to save section" }, { status: 500 });
  }
};
