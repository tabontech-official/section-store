
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Card,
  TextContainer,
  Text,
  Button,
  Badge,
  Frame,
  Loading,
} from "@shopify/polaris";
import db from "../db.server";

export const loader = async ({ request }) => {
  const { authenticate, BASIC_PLAN, UNLIMITED_PLAN } = await import("../shopify.server");
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const shopData = await db.shop.findUnique({ where: { shop } });
  const currentPlan = shopData?.planName || "Starter";

  return json({
    currentPlan,
    basicPlanKey: BASIC_PLAN,
    unlimitedPlanKey: UNLIMITED_PLAN,
  });
};

export default function PricingPage() {
  const { currentPlan, basicPlanKey, unlimitedPlanKey } = useLoaderData();
  const navigate = useNavigate();

  const handleSubscribe = async (planKey) => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });

      const data = await res.json();
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      } else {
        alert("Something went wrong while starting subscription.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Failed to subscribe.");
    }
  };

  const plans = [
    {
      displayName: "Silver", 
      planKey: null,
      backendKey: "Starter",
      price: "$0/month",
      details: [
        "Access to 3 basic sections",
        "No animations or advanced styles",
        "Limited support",
        "Free forever – no credit card required",
      ],
      isCurrent: currentPlan === "Starter",
      action: () => navigate("/app"),
    },
    {
      displayName: "Golden",
      planKey: basicPlanKey,
      backendKey: basicPlanKey,
      price: "$5/month",
      details: [
        "Access to 10 sections",
        "Includes banners, testimonials, and sliders",
        "Email support",
        "Can preview all premium sections",
      ],
      isCurrent: currentPlan === basicPlanKey,
      action: () => handleSubscribe(basicPlanKey),
    },
    {
      displayName: "Platinum",
      planKey: unlimitedPlanKey,
      backendKey: unlimitedPlanKey,
      price: "$15/month",
      details: [
        "Full access to all 30+ premium sections",
        "Includes 3D, parallax, and animation layouts",
        "Priority support (email + WhatsApp)",
        "Unlimited updates + new releases",
      ],
      isCurrent: currentPlan === unlimitedPlanKey,
      action: () => handleSubscribe(unlimitedPlanKey),
    },
  ];

  return (
    <Frame>
      <Loading/>
    <Page title="Choose Your Plan">
      <Text variant="headingMd">
        Current Plan:{" "}
        <Badge>
          {
            plans.find((p) => p.backendKey === currentPlan || (currentPlan === "Starter" && p.planKey === null))
              ?.displayName || currentPlan
          }
        </Badge>
      </Text>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.displayName}
            style={{
              flex: "1 1 30%",
              minWidth: "250px",
            }}
          >
            <Card sectioned>
              <TextContainer spacing="tight">
                <Text variant="headingSm" fontWeight="bold">
                  {plan.displayName}
                </Text>
                <Text>{plan.price}</Text>

                <div style={{ marginBottom: "12px" }}>
                  {plan.details.map((feature, idx) => (
                    <Text tone="subdued" variant="bodySm" key={idx}>
                      • {feature}
                    </Text>
                  ))}
                </div>

                <Button
                  fullWidth
                  onClick={plan.action}
                  disabled={plan.isCurrent}
                  variant={plan.isCurrent ? "secondary" : "primary"}
                >
                  {plan.isCurrent
                    ? "Current Plan"
                    : `Subscribe to ${plan.displayName}`}
                </Button>
              </TextContainer>
            </Card>
          </div>
        ))}
      </div>
    </Page>
    </Frame>
  );
}
