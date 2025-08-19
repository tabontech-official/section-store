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

export async function FileUpssert(graphql, { themeId, filename, content }) {
  const gid = String(themeId).startsWith("gid://")
    ? themeId
    : `gid://shopify/Theme/${themeId}`;

  const request = await graphql(`
    mutation themeFilesUpsert(
      $files: [OnlineStoreThemeFilesUpsertFileInput!]!,
      $themeId: ID!
    ) {
      themeFilesUpsert(files: $files, themeId: $themeId) {
        upsertedThemeFiles { filename }
        userErrors { field message }
      }
    }
  `, {
    variables: {
      themeId: gid, // ✅ always GID
      files: [{ filename, body: { type: "TEXT", value: content } }],
    },
  });

  return await request.json();
}
