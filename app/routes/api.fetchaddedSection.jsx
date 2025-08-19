// app/routes/api/fetchaddedSection.js
import { json } from "@remix-run/node";
import db from "../db.server";
import { sectionsCatalog as rawCatalog } from "./sections/sections";

function slugify(str = "") {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export const loader = async () => {
  const added = await db.sectionStatus.findMany({
    where: { status: "added" },
    orderBy: { createdAt: "desc" },
  });

  const catalog = Array.isArray(rawCatalog) ? rawCatalog : [];

  const merged = added.map((row) => {
    const rowTitle = (row.title || row.sectionHandle || "").trim();
    const rowHandleSlug = slugify(row.sectionHandle || rowTitle);
    const rowTitleLc = rowTitle.toLowerCase();

    const match = catalog.find((s) => {
      const sHandleSlug = slugify(s.sectionHandle || s.title || "");
      const sTitleLc = (s.title || "").toLowerCase();
      return sHandleSlug === rowHandleSlug || (sTitleLc && sTitleLc === rowTitleLc);
    });

    return {
      ...row,
      sectionHandle: rowHandleSlug,                        
      title: row.title || match?.title || rowTitle,           
      imageUrl: row.imageUrl ?? match?.imageUrl ?? "",
      code: match?.code ?? "",                               
    };
  });

  return json(merged);
};
