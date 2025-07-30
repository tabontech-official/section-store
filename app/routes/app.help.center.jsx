import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  Collapsible,
  Badge
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
      // Sample FAQs - replace with real API later
      const sampleFaqs = [
        {
          id: "1",
          title: "Can I try the section first?",
          content:
            "Yes, we have recently developed a feature for this. Navigate to the section you want and click ‘Try section’. Not all sections support this yet. Settings made during testing won’t carry over."
        },
        {
          id: "2",
          title: "Can I use this app with any Shopify theme?",
          content:
            "Yes! Our app blocks are compatible with all Shopify 2.0 themes. You can insert them anywhere using the theme editor."
        },
        {
          id: "3",
          title: "Do I need to know how to code?",
          content:
            "Not at all. Everything is drag-and-drop via Shopify's theme editor and our UI."
        },
        {
          id: "4",
          title: "Does this app slow down my store?",
          content:
            "No, our blocks are performance-optimized and lightweight."
        },
        {
          id: "5",
          title: "What if I don’t like a section I added?",
          content:
            "You can remove any app block from the theme editor anytime without affecting your store."
        },
        {
          id: "6",
          title: "Can I get a refund?",
          content:
            "Our app offers a 7-day free trial. If you experience issues, contact our support team to discuss your situation."
        },
        {
          id: "7",
          title: "Do app blocks show on all pages?",
          content:
            "No, you can control where each block shows using the Shopify theme editor. You have full flexibility."
        }
      ];

      await new Promise((res) => setTimeout(res, 500)); // simulate loading
      setFaqSections(sampleFaqs);
    };

    fetchFaqs();
  }, []);

  return (
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
  );
}
