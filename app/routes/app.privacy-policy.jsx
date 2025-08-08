import React from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Link,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function PrivacyPolicy() {
  const lastUpdated = "August 8, 2025";

  return (
    <Page fullWidth>
      <TitleBar title="Privacy Policy" />
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: 20 }}>
              <BlockStack gap="200">
                <Text variant="headingLg" fontWeight="bold">
                  Sectify AI Theme Builder – Privacy Policy
                </Text>
                <Text tone="subdued">Last Updated: {lastUpdated}</Text>

                {/* 1. Introduction */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    1. Introduction
                  </Text>
                  <Text>
                    Sectify AI Theme Builder (“we,” “our,” or “us”) helps you
                    add and customize Shopify theme sections, including sections
                    generated with AI. By installing or using our app, you agree
                    to this Privacy Policy.
                  </Text>
                </section>

                {/* 2. Information We Collect */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    2. Information We Collect
                  </Text>
                  <BlockStack as="ul" gap="150">
                    <li>
                      <Text>
                        <strong>Shopify Store Data (via Shopify API):</strong>{" "}
                        Store name/URL, contact email, theme & customization
                        settings, installed app sections and configuration data.
                      </Text>
                    </li>
                    <li>
                      <Text>
                        <strong>App Usage Data:</strong> Actions performed in
                        the app (e.g., add section, generate AI section, save
                        settings), aggregated feature usage metrics (non-PII).
                      </Text>
                    </li>
                    <li>
                      <Text>
                        <strong>AI Input Data:</strong> Text/image prompts or
                        customization requests you submit for content/section
                        generation.
                      </Text>
                    </li>
                    <li>
                      <Text>
                        <strong>Support Communications:</strong> Emails or
                        messages you send to our support team.
                      </Text>
                    </li>
                  </BlockStack>
                </section>

                {/* 3. How We Use Information */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    3. How We Use Your Information
                  </Text>
                  <BlockStack as="ul" gap="150">
                    <li>
                      <Text>Provide, maintain, and improve app features.</Text>
                    </li>
                    <li>
                      <Text>
                        Generate custom sections using AI providers at your
                        request.
                      </Text>
                    </li>
                    <li>
                      <Text>
                        Save & apply your section settings to your Shopify theme.
                      </Text>
                    </li>
                    <li>
                      <Text>Troubleshoot issues and provide support.</Text>
                    </li>
                    <li>
                      <Text>
                        Analyze anonymized usage to improve performance and UX.
                      </Text>
                    </li>
                  </BlockStack>
                  <Text>
                    <strong>We do not sell</strong> your personal or store data
                    to third parties.
                  </Text>
                </section>

                {/* 4. Data Sharing */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    4. Data Sharing & Third-Party Services
                  </Text>
                  <BlockStack as="ul" gap="150">
                    <li>
                      <Text>
                        <strong>Shopify:</strong> Required to operate the app
                        per Shopify’s API terms.
                      </Text>
                    </li>
                    <li>
                      <Text>
                        <strong>AI Service Providers:</strong> Only the input
                        (prompts/assets) you submit for generation is processed.
                      </Text>
                    </li>
                    <li>
                      <Text>
                        <strong>Analytics:</strong> Aggregated, non-identifiable
                        stats to improve the product.
                      </Text>
                    </li>
                  </BlockStack>
                  <Text>
                    All vendors must adhere to applicable privacy laws (e.g.,
                    GDPR/CCPA). Vendor list available upon request.
                  </Text>
                </section>

                {/* 5. Data Retention */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    5. Data Retention
                  </Text>
                  <BlockStack as="ul" gap="150">
                    <li>
                      <Text>
                        Store configuration & section settings are retained
                        while the app is installed.
                      </Text>
                    </li>
                    <li>
                      <Text>
                        Upon uninstall, app-side stored data is deleted within{" "}
                        <strong>30 days</strong>. Theme files/sections already
                        added to your theme remain in your control.
                      </Text>
                    </li>
                  </BlockStack>
                </section>

                {/* 6. Your Rights */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    6. Your Rights
                  </Text>
                  <Text>
                    Depending on your location, you may request access,
                    correction, deletion, data portability, or withdraw consent.
                    Contact us at{" "}
                    <Link url="mailto:help@section.store">
                      help@section.store
                    </Link>
                    .
                  </Text>
                </section>

                {/* 7. Security */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    7. Security
                  </Text>
                  <Text>
                    We use HTTPS, encryption, and Shopify’s secure APIs. No
                    method is 100% secure, but we continuously improve our
                    safeguards.
                  </Text>
                </section>

                {/* 8. Children */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    8. Children’s Privacy
                  </Text>
                  <Text>
                    Our app is not intended for children under 13, and we do not
                    knowingly collect data from them.
                  </Text>
                </section>

                {/* 9. Changes */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    9. Changes to This Policy
                  </Text>
                  <Text>
                    We may update this policy from time to time. Updates will be
                    posted here with the “Last Updated” date.
                  </Text>
                </section>

                {/* 10. Contact */}
                <section>
                  <Text variant="headingMd" fontWeight="semibold">
                    10. Contact Us
                  </Text>
                  <BlockStack gap="150">
                    <Text>
                      Email:{" "}
                      <Link url="mailto:help@section.store">
                        help@section.store
                      </Link>
                    </Text>
                    <InlineStack gap="200">
                      <Text>
                        Website:{" "}
                        <Link url="https://section.store" target="_blank">
                          https://section.store
                        </Link>
                      </Text>
                    </InlineStack>
                  </BlockStack>
                </section>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
