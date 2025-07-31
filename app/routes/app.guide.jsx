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
  Icon,
  MediaCard,
  VideoThumbnail
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

import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

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

       <Layout.Section>
    <MediaCard
      title="How to Add Section?"
      primaryAction={{
        content: 'Watch now',
        onAction: () => window.open('https://www.youtube.com/watch?v=exampleVideoId', '_blank'),
      }}
      description="See how Section Store works like magic. Learn how to add sections, blocks, and customize your Shopify theme easily."
      popoverActions={[
        { content: 'Dismiss', onAction: () => {} }
      ]}
    >
      <VideoThumbnail
        videoLength={127}
        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        onClick={() => window.open('https://www.youtube.com/watch?v=exampleVideoId', '_blank')}
      />
    </MediaCard>

    {/* Collapsible Steps */}
   <div style={{ borderTop: "1px solid #E3E3E3" }}>
  <button
    style={{
      background: "none",
      border: "none",
      width: "100%",
      textAlign: "left",
      padding: "16px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
    onClick={toggleCollapse}
  >
    <Text variant="bodyMd" fontWeight="medium">
      Steps: How to Add Section?
    </Text>

    <span style={{ fontSize: "16px" }}>
      {openCollapse ? <RiArrowDropUpLine />
 : <RiArrowDropDownLine />

}
    </span>
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
