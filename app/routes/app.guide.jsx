import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  Badge,
  Collapsible,
  Icon
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import {
  FiMail,
  FiYoutube,
  FiGift,
  FiMessageCircle,
  FiLifeBuoy,
  FiShuffle
} from "react-icons/fi";

export default function GuideLine() {
  const [openCollapse, setOpenCollapse] = useState(false);

  const toggleCollapse = () => setOpenCollapse(!openCollapse);

  return (
    <Page fullWidth>
      <TitleBar title="Guide" />
      
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
       <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  }}
>
  <BlockStack gap="100">
    <Text variant="headingLg" fontWeight="bold">
      Guide Line
    </Text>
    <Text tone="subdued">
      See how to use app blocks, add sections, and get the most out of Section Store. For more help, contact us at{" "}
      <a href="mailto:help@section.store">help@section.store</a>
    </Text>
  </BlockStack>
  <Badge status="info" size="medium">
    Setup Guide
  </Badge>
</div>


      {/* Guideline (Divider) */}
   

    
        <Layout>

          {/* Quick Guide Section */}
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <BlockStack gap="100" style={{ padding: "16px" }}>
                  <Text variant="headingMd" fontWeight="bold">
                    Quick Guide
                  </Text>
                  <Text tone="subdued">See how Section Store works like magic</Text>
                </BlockStack>

                <div style={{ padding: "0 16px" }}>
                  <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
                    <iframe
                      width="100%"
                      height="240"
                      src="https://www.youtube.com/embed/exampleVideoId"
                      title="How to Add Section?"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>

                    <div style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      flexDirection: "column",
                      padding: "16px",
                      color: "white"
                    }}>
                      <Badge status="info">Video Guide</Badge>
                      <Text variant="headingMd" fontWeight="bold">
                        How to Add Section?
                      </Text>
                      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span
                          style={{
                            backgroundColor: "#000",
                            color: "#fff",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            fontSize: "14px"
                          }}
                        >
                          ▶ 2:07
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #E3E3E3" }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      width: "100%",
                      textAlign: "left",
                      padding: "16px",
                      cursor: "pointer"
                    }}
                    onClick={toggleCollapse}
                  >
                    <Text variant="bodyMd" fontWeight="medium">
                      Steps: How to Add Section?
                    </Text>
                  </button>
                  <Collapsible open={openCollapse}>
                    <BlockStack gap="100" style={{ padding: "0 16px 16px 16px" }}>
                      <Text tone="subdued">
                        1. Open the Shopify Theme Editor from your Online Store.<br />
                        2. Navigate to the template you want to edit.<br />
                        3. Click "Add Section" or "Add Block", choose the section from our app.<br />
                        4. Customize and Save your changes.
                      </Text>
                    </BlockStack>
                  </Collapsible>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Support Section */}
     <Layout.Section>
      <Card>
        <div style={{ padding: "16px" }}>
          {/* Heading */}
          <div style={{ marginBottom: "16px" }}>
            <Text variant="headingMd" fontWeight="bold">
              Need help?
            </Text>
          </div>

          {/* Email + Contact Form */}
          <div style={{ marginBottom: "12px" }}>
            <Text tone="subdued">
              Email <a href="mailto:help@section.store">help@section.store</a> or use{" "}
              <a href="/contact" target="_blank" rel="noopener noreferrer">our contact form</a>
            </Text>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <Text tone="subdued" size="small">
              We are a small but dedicated team doing our best so please expect slightly longer reply times &lt;3
            </Text>
          </div>

          <InlineStack gap="200" wrap>
            <Button size="slim" icon={<FiYoutube size={14} />}>
              Youtube Tutorials
            </Button>
         
            <Button size="slim" icon={<FiMessageCircle size={14} />}>
              Request Section
            </Button>
            <Button size="slim" icon={<FiMail size={14} />}>
              Get Support
            </Button>
           
            <Button size="slim" icon={<FiLifeBuoy size={14} />}>
              FAQ
            </Button>
          </InlineStack>
        </div>
      </Card>
    </Layout.Section>

        </Layout>
      </div>
    </Page>
  );
}
