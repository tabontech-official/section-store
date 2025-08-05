import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const chargeId = url.searchParams.get("charge_id");

  const { admin, session } = await authenticate.admin(request);
  const shop = session.shop;

  if (chargeId) {
    const response = await admin.graphql(`{
      currentAppInstallation {
        activeSubscriptions {
          id
          name
          lineItems {
            plan {
              pricingDetails {
                __typename
                ... on AppRecurringPricing {
                  interval
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }`);

    const result = await response.json();
    const subscriptions = result?.data?.currentAppInstallation?.activeSubscriptions;

    if (!subscriptions || subscriptions.length === 0) {
      return new Response("No active subscriptions found.", { status: 404 });
    }

    const matchingSub = subscriptions.find((sub) =>
      sub.id.includes(chargeId)
    );

    if (!matchingSub) {
      return new Response("Charge ID not found in subscriptions.", { status: 404 });
    }

    await db.shop.upsert({
      where: { shop },
      update: { planName: matchingSub.name },
      create: {
        shop,
        accessToken: session.accessToken,
        planName: matchingSub.name,
      },
    });

    return json({
      apiKey: process.env.SHOPIFY_API_KEY,
      redirectTo: "/apps/section-store-18",
    });
  }

  return json({ apiKey: process.env.SHOPIFY_API_KEY });
};

export default function App() {
  const { apiKey, redirectTo } = useLoaderData();
  const app = useAppBridge();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectTo && typeof window !== "undefined" && app) {
      import("@shopify/app-bridge/actions").then(({ Redirect }) => {
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.ADMIN_PATH, {
          path: redirectTo,
        });
      });
    }
  }, [redirectTo, app]);

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">Home</Link>
        <Link to="/app/my-section" >My Section</Link>
        <Link to="/app/guide">Guide</Link>
        <Link to="/app/help/center">Helpcenter</Link>
        <Link to="/app/pricing">Pricing</Link>
                <Link to="/app/ai-agent">Aiagent</Link>

      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
