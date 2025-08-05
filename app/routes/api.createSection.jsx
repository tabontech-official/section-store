import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { getThemes } from "./query";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  console.log("Admin session:", admin?.session?.shop); 

  const { chargeId, title, content } = await request.json();

  

  const themeRes = await getThemes(admin.graphql)
const themes = themeRes.data?.themes?.edges || [];

console.log("Themes response:", JSON.stringify(themes, null, 2));

const mainTheme = themes.find((t) => t.node.role.toLowerCase() === "main");

console.log("Main theme found:", mainTheme);

const themeId = mainTheme?.node?.id;

if (!themeId) {
  return json({ error: "Main theme not found" }, { status: 404 });
}

  const sectionName = title.replace(/\s+/g, "-").toLowerCase();
  const filename = `sections/${sectionName}.liquid`;

  const themeFilesMutation = `
    mutation themeFilesUpsert($files: [OnlineStoreThemeFilesUpsertFileInput!]!, $themeId: ID!) {
      themeFilesUpsert(files: $files, themeId: $themeId) {
        upsertedThemeFiles {
          filename
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

const variables = {
  themeId,
  files: [
    {
      filename,
      content, 
    },
  ],
};

console.log("variables",variables)
  const response = await admin.graphql(themeFilesMutation, variables);
  const result = await response.json();

  const userError = result?.data?.themeFilesUpsert?.userErrors?.[0];
  if (userError) {
    return json({ error: userError.message }, { status: 400 });
  }

  return json({ success: true, status: "ACTIVE" });
}
