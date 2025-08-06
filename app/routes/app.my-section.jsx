import { useEffect, useState } from "react";
import {
  Page,
  Text,
  Button,
  Icon,
  MediaCard,
  VideoThumbnail,
  Frame,
  Layout,
  Card,
  InlineStack,
  Toast,
} from "@shopify/polaris";
import {
  EmailIcon,
  LiveIcon,
  LogoYoutubeIcon,
  SendIcon,
  ViewIcon,
} from "@shopify/polaris-icons";

export default function SectionDashboard() {
  const [addedSections, setAddedSections] = useState([]);
  const [plan, setPlan] = useState("Starter");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetch("/api/fetchaddedSection")
      .then((res) => res.json())
      .then((data) => setAddedSections(data || []));

    fetch("/api/section-access")
      .then((res) => res.json())
      .then((data) => setPlan(data.plan || "Starter"));
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleAddToTheme = async (section) => {
    const res = await fetch("/api/add-to-theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sectionTitle: section.sectionHandle,
        imageUrl: section.imageUrl,
      }),
    });

    const data = await res.json();

    if (res.status === 403) {
      setToastMessage(" Limit reached: Upgrade your plan in Pricing.");
      setShowToast(true);
    } else if (res.status === 409) {
      setToastMessage(" This section is already added.");
      setShowToast(true);
    } else if (data.success) {
      setToastMessage(" Section added to theme successfully!");
      setShowToast(true);
    } else {
      setToastMessage(" Failed to add section.");
      setShowToast(true);
    }
  };

  return (
    <Frame>
      <Page>
        <div
          style={{
            maxWidth: "940px",
            margin: "40px auto 24px auto",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#f1f1f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </div>
            <div>
              <Text variant="bodyMd" fontWeight="medium">
                Theme editor
              </Text>
              <Text variant="bodySm" tone="subdued">
                You can add & edit sections on any theme in your store.
              </Text>
            </div>
          </div>

          <div>
            <Button disclosure>Customize in</Button>
          </div>
        </div>

        <div style={{ marginTop: 30 }}>
          <Text as="h2" variant="headingMd" fontWeight="medium">
            The sections you own will show here
          </Text>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: 20,
          }}
        >
          {addedSections.map((section, i) => (
            <div
              key={i}
              style={{
                width: 220,
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <div style={{ width: "100%", height: 120, overflow: "hidden" }}>
                <img
                  src={section.imageUrl}
                  alt={section.sectionHandle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text fontWeight="medium" variant="bodySm">
                  {section.sectionHandle.replace(/-/g, " ")}
                </Text>
                <Icon source={ViewIcon} color="subdued" />
              </div>
              <div style={{ padding: "0 12px 12px 12px" }}>
                <Button
                  fullWidth
                  variant="primary"
                  size="slim"
                  onClick={() => handleAddToTheme(section)}
                >
                  Add to theme
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <Text variant="headingMd" fontWeight="medium">
            Quick Guide
          </Text>
          <Text tone="subdued">See how Section Store works like magic</Text>

          <div style={{ marginTop: 20 }}>
            <MediaCard
              title="How to Add a Section to Your Theme"
              primaryAction={{
                content: "Watch video",
                onAction: () => {
                  window.open(
                    "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/how-to-video-cover.jpg",
                    "_blank",
                  );
                },
              }}
              description="Learn how to add and edit Shopify sections in seconds using our visual section store."
              popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
            >
              <VideoThumbnail
                videoLength={127}
                thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                onClick={() =>
                  window.open(
                    "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/how-to-video-cover.jpg",
                    "_blank",
                  )
                }
              />
            </MediaCard>
          </div>

          <div style={{ marginTop: 12 }}>
            <Text variant="bodyMd" fontWeight="semibold"></Text>
          </div>
          <Layout>
            <Layout.Section>
              <Card>
                <div style={{ padding: "16px" }}>
                  <div style={{ marginBottom: "16px" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Need help?
                    </Text>
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <Text tone="subdued">
                      Email{" "}
                      <a href="mailto:help@section.store">help@section.store</a>{" "}
                      or use{" "}
                      <a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        our contact form
                      </a>
                    </Text>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <Text tone="subdued" size="small">
                      We are a small but dedicated team doing our best so please
                      expect slightly longer reply times &lt;3
                    </Text>
                  </div>

                  <InlineStack gap="200" wrap>
                    <Button size="slim" icon={LogoYoutubeIcon}>
                      Youtube Tutorials
                    </Button>

                    <Button size="slim" icon={SendIcon}>
                      Request Section
                    </Button>
                    <Button size="slim" icon={EmailIcon}>
                      Get Support
                    </Button>

                    <Button size="slim" icon={LiveIcon}>
                      FAQ
                    </Button>
                  </InlineStack>
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </div>

        {showToast && (
          <Toast content={toastMessage} onDismiss={() => setShowToast(false)} />
        )}
      </Page>
    </Frame>
  );
}
