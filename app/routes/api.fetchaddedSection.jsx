import { json } from "@remix-run/node";
import db from "../db.server";

export const loader = async () => {
  const addedSections = await db.sectionStatus.findMany({
    where: { status: "added" },
    orderBy: { createdAt: "desc" },
  });

  return json(addedSections);
};
