import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  Collapsible,
  Badge,
  Frame,
  Loading
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useEffect } from "react";

export default function HelpCenter() {
  const [faqSections, setFaqSections] = useState([]);
  const [openCollapse, setOpenCollapse] = useState(null);

  const toggleCollapse = (id) => () => {
    setOpenCollapse(openCollapse === id ? null : id);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      const sampleFaqs = [
  {
    id: "1",
    title: "Can I try the section before adding it?",
    content:
      "Yes, we’ve added a preview feature. You can preview the section before adding it to your theme. Note that not all sections support live preview yet."
  },
  {
    id: "2",
    title: "Is this app compatible with all Shopify themes?",
    content:
      "Yes! Our app installs 2.0-compatible section files which work with any Shopify Online Store 2.0 theme."
  },
  {
    id: "3",
    title: "Do I need to write code to use this app?",
    content:
      "No coding is required. Once a section is added to your theme, you can add it visually using Shopify's drag-and-drop theme editor."
  },
  {
    id: "4",
    title: "Will adding sections from this app slow down my store?",
    content:
      "No. Our sections are optimized for performance and follow Shopify's best practices for theme speed and structure."
  },
{
  id: "5",
  title: "How do I remove a section I don’t want?",
  content:
    "You can remove the section from your store's front end using the Shopify theme editor. However, the section file will still remain inside your theme code. To fully remove it, you would need to manually delete the Liquid file from your theme's code editor."
},
{
  id: "6",
  title: "Can I get a refund?",
  content:
    "Once a section is added to your theme, the file becomes part of your theme’s code and cannot be removed through the app. Due to this, refunds are not possible after a section has been installed. Please preview and test carefully before adding."
},
  {
    id: "7",
    title: "Will the sections appear on all pages by default?",
    content:
      "No. After adding the section to your theme, you choose where to place it using the Shopify theme editor. Nothing is added automatically to live pages."
  }
];


      await new Promise((res) => setTimeout(res, 500)); 
      setFaqSections(sampleFaqs);
    };

    fetchFaqs();
  }, []);

  return (
    <Frame>
      <Loading/>
    <Page fullWidth>
      <TitleBar title="Help Center" />

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
              Frequently asked questions
            </Text>
            <Text tone="subdued">
              Still have questions? Reach out to us at{" "}
              <a href="mailto:help@section.store">help@section.store</a>
            </Text>
          </BlockStack>
          <Badge status="info" size="medium">
            Helpcenter articles
          </Badge>
        </div>

        <Layout>
          <Layout.Section>
            <Card padding="400">
              <div style={{ marginTop: "12px" }}>
                <div>
                  {faqSections.map((faq) => (
                    <div
                      key={faq.id}
                      style={{
                        borderBottom: "1px solid #E3E3E3",
                        padding: "16px 0",
                      }}
                    >
                      <button
                        onClick={toggleCollapse(faq.id)}
                        style={{
                          background: "none",
                          border: "none",
                          width: "100%",
                          textAlign: "left",
                          padding: "8px 0",
                          cursor: "pointer",
                        }}
                      >
                        <Text variant="headingSm" fontWeight="bold">
                          {faq.title}
                        </Text>
                      </button>
                      <Collapsible
                        open={openCollapse === faq.id}
                        id={faq.id}
                        transition={{ duration: "150ms", timingFunction: "ease-in-out" }}
                      >
                        <div style={{ padding: "8px 0" }}>
                          <Text tone="subdued">{faq.content}</Text>
                        </div>
                      </Collapsible>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
    </Frame>
  );
}
