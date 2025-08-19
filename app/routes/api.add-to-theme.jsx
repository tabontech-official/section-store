import { json } from "@remix-run/node";
import db from "../db.server.js";
import { authenticate } from "../shopify.server.js";
import { FileUpssert } from "./query.jsx";

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const action = async ({ request }) => {
  try {
    // Authenticate admin
    const { session, admin } = await authenticate.admin(request);
    const shop = session.shop;

    // Parse request body once
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { sectionTitle, imageUrl, themeId, title, content } = body || {};

    // Validate required fields for section DB
    if (!sectionTitle || !imageUrl) {
      return json({ error: "Missing sectionTitle or imageUrl" }, { status: 400 });
    }

    // ---- Check plan limits ----
    const shopData = await db.shop.findUnique({ where: { shop } });
    const rawPlan = shopData?.planName || "Starter";
    const plan = rawPlan.replace(" Plan", "");

    const existingSections = await db.themeSection.findMany({
      where: { shop },
      select: { sectionTitle: true },
    });

    const existingTitles = new Set(existingSections.map((s) => s.sectionTitle));

    if (existingTitles.has(sectionTitle)) {
      return json({ error: "Section already added" }, { status: 409 });
    }

    const limits = { Starter: 3, Basic: 10, Unlimited: Infinity };
    const maxAllowed = limits[plan] ?? 3;

    if (existingTitles.size >= maxAllowed) {
      return json(
        { error: `Section limit reached for ${plan} plan` },
        { status: 403 },
      );
    }

    // Save section record in DB
    await db.themeSection.create({
      data: { shop, sectionTitle, imageUrl },
    });

    // ---- Upload section to theme ----
    if (!themeId || !title || !content) {
      return json(
        { error: "themeId, title, content are required for FileUpssert" },
        { status: 400 }
      );
    }

    const themeGid = String(themeId).startsWith("gid://")
      ? themeId
      : `gid://shopify/Theme/${themeId}`;

    const sectionName = slugify(title);
    const filename = `sections/${sectionName}.liquid`;

    const response = await FileUpssert(admin.graphql, {
      themeId: themeGid,
      filename,
      content,
    });

    const upserted = response?.data?.themeFilesUpsert?.upsertedThemeFiles?.[0];
    const userError = response?.data?.themeFilesUpsert?.userErrors?.[0];
    if (userError) {
      return json({ error: userError.message }, { status: 400 });
    }

    return json({ success: true, file: upserted });
  } catch (err) {
    console.error("Save section to theme error:", err);
    return json({ error: "Failed to save section" }, { status: 500 });
  }
};
