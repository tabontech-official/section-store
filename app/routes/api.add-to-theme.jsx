import db from "../db.server.js";
import { authenticate } from "../shopify.server.js";
import { FileUpssert } from "./query.jsx";
import { json } from "@remix-run/react";

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const action = async ({ request }) => {
  try {
    const { session, admin } = await authenticate.admin(request);
    const shop = session.shop;

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { sectionTitle, imageUrl, themeId, title, content } = body || {};

    if (!sectionTitle || !imageUrl) {
      return json(
        { error: "Missing sectionTitle or imageUrl" },
        { status: 400 }
      );
    }

    const sectionMeta = await db.sectionStatus.findUnique({
      where: { sectionHandle: title },
      select: { price: true },
    });

    if (!sectionMeta) {
      return json({ error: "Section not found in SectionStatus" }, { status: 404 });
    }

    const sectionPrice = sectionMeta.price?.toLowerCase(); 

    const shopData = await db.shop.findUnique({ where: { shop } });
    const rawPlan = shopData?.planName || "Starter";
    const plan = rawPlan.replace(" Plan", "");
    console.log("🛒 Shop Plan:", plan);

    const existingSections = await db.themeSection.findMany({
      where: { shop },
      select: { sectionTitle: true },
    });

    const existingWithPrice = await Promise.all(
      existingSections.map(async (s) => {
        const meta = await db.sectionStatus.findUnique({
          where: { sectionHandle: s.sectionTitle },
          select: { price: true },
        });
        return { ...s, price: meta?.price?.toLowerCase() || "free" };
      })
    );

    const existingTitles = new Set(existingWithPrice.map((s) => s.sectionTitle));
    if (existingTitles.has(sectionTitle)) {
      return json({ error: "Section already added" }, { status: 409 });
    }

    if (plan === "Starter") {
      if (sectionPrice !== "free") {
        return json(
          { error: "Starter plan allows only free sections" },
          { status: 403 }
        );
      }
      const freeSections = existingWithPrice.filter((s) => s.price === "free");
      if (freeSections.length >= 3) {
        return json(
          { error: "Starter plan allows only 3 free sections" },
          { status: 403 }
        );
      }
    } else if (plan === "Basic") {
      if (existingWithPrice.length >= 10) {
        return json(
          { error: "Basic plan allows maximum 10 sections (free+premium combined)" },
          { status: 403 }
        );
      }
    } else if (plan === "Unlimited") {
    } else {
      return json({ error: "Invalid plan" }, { status: 400 });
    }

    await db.themeSection.create({
      data: {
        shop,
        sectionTitle,
        imageUrl,
        themeId,
        title,
      },
    });

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
