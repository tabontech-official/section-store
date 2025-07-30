import { json } from "@remix-run/node"; // or use express' res.json() if using Express
import { authenticate } from "../shopify.server"; // update based on your app auth setup

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const query = `
    query {
      themes(first: 5) {
        edges {
          node {
            id
            name
            role
          }
        }
      }
    }
  `;

  try {
    const response = await admin.graphql(query);
    const result = await response.json();

    return json({
      success: true,
      themes: result.data.themes.edges.map(edge => edge.node),
    });
  } catch (error) {
    console.error("Theme fetch error:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
