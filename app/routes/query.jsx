export async function getThemes(graphql) {
  const request = await graphql(
    `
      #graphql
      query {
    themes(first: 10) {
      edges {
        node {
          id
          role
        }
      }
    }
  }
    `,
    { variables: {} },
  );
  const response = await request.json();
  return response;
}
