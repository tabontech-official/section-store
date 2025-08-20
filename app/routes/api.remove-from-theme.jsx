import { json } from "@remix-run/node";
import db from "../db.server.js";
import { authenticate } from "../shopify.server.js";
import { themeFilesDelete } from "./query.jsx";

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const action = async ({ request }) => {
  try {

    const { session, admin } = await authenticate.admin(request);
    const shop = session?.shop;

    const body = await request.json();

    const { sectionTitle } = body;

    if (!sectionTitle) {
      return json({ error: "Missing sectionTitle" }, { status: 400 });
    }

    const section = await db.themeSection.findFirst({
      where: { shop, sectionTitle },
    });

    if (!section) {
      return json({ error: "Section not found in DB" }, { status: 404 });
    }

    if (!section.themeId) {
      return json(
        { error: "No themeId stored for this section" },
        { status: 400 },
      );
    }

    const sectionName = slugify(sectionTitle);
    const filename = `sections/${sectionName}.liquid`;

    const themeGid = section.themeId;

    const data = await themeFilesDelete(admin.graphql, {
      themeId: themeGid,
      filename,
    });

    const userError = data?.data?.themeFilesDelete?.userErrors?.[0];
    if (userError) {
      return json({ error: userError.message }, { status: 400 });
    }

    const deletedFile = data?.data?.themeFilesDelete?.deletedThemeFiles?.[0];

    const dbDelete = await db.themeSection.delete({
      where: { id: section.id },
    });

    return json({ success: true, deletedFile: deletedFile || null });
  } catch (err) {
    return json({ error: "Failed to delete section" }, { status: 500 });
  }
};
