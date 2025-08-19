// GET /api/themes  -> uses Admin GraphQL query you provided
import { authenticate } from "../shopify.server";

const THEMES_GQL = `
  query Themes($first: Int!) {
    themes(first: $first) {
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

function gidToNumericId(gid) {
  return gid?.split("/").pop();
}

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const resp = await admin.graphql(THEMES_GQL, { variables: { first: 50 } });
  const json = await resp.json();

  const edges = json?.data?.themes?.edges || [];
  const themes = edges.map(({node}) => ({
    gid: node.id,              
    numericId: gidToNumericId(node.id), 
    id: gidToNumericId(node.id), 
    name: node.name,
    role: node.role,            
  }));

  return new Response(JSON.stringify({ themes }), {
    headers: { "Content-Type": "application/json" },
  });
};
