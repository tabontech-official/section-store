import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";
import { getSubscriptionStatus } from "./Subscription.server";
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];


export const loader = async ({ request }) => {
  const { admin, billing, session } = await authenticate.admin(request);
  const { shop } = session;
  
  const subscriptions = await getSubscriptionStatus(admin.graphql);
  const activeSubscriptions = subscriptions.data.app.installation.activeSubscriptions;
  
  if (!activeSubscriptions || activeSubscriptions.length < 1) {
    await billing.require({
      plans: [MONTHLY_PLAN],
      isTest: true,
      onFailure: async () => {
        return billing.request({
          plan: MONTHLY_PLAN,
          isTest: true
        });
      },
      returnUrl: `https://${shop}/admin/apps/section-store-18`
    });
  }

  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
                <Link to="/app/guide">Guide</Link>

        <Link to="/app/help/center">Helpcenter</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
