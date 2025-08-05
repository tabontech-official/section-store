import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  try {
    const body = await request.json();
    const { name, returnUrl, price } = body;

    console.log("🔍 Body received:", body);

    if (!name || !returnUrl || !price?.amount || !price?.currencyCode) {
      return json({ error: "Missing required billing fields" }, { status: 400 });
    }

    const mutation = `
      mutation AppPurchaseOneTimeCreate($name: String!, $price: MoneyInput!, $returnUrl: URL!) {
        appPurchaseOneTimeCreate(name: $name, price: $price, returnUrl: $returnUrl) {
          appPurchaseOneTime {
            id
            createdAt
          }
          confirmationUrl
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      name,
      returnUrl,
      price,
    };

    const response = await admin.graphql(mutation, { variables });
    const data = await response.json();


    if (data.errors?.length > 0) {
      return json({ error: data.errors[0].message }, { status: 400 });
    }

    const result = data.data?.appPurchaseOneTimeCreate;

    if (result?.confirmationUrl) {
      return json({ confirmationUrl: result.confirmationUrl });
    }

    const errorMessage = result?.userErrors?.[0]?.message || "Failed to create charge";
    return json({ error: errorMessage }, { status: 400 });

  } catch (err) {
    console.error("🔥 Unexpected error:", err);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
}
