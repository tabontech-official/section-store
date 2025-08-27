import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  Text,
  Scrollable,
  Thumbnail,
  Modal,
} from "@shopify/polaris";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { newestProducts } from "./sections/sections";
export default function ChatGPTPolaris() {
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me to generate a Shopify section.", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [matchedSections, setMatchedSections] = useState([]);
  const [pageSections, setPageSections] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
  const chatEndRef = useRef(null);
  const [addedTitles, setAddedTitles] = useState([]);
  const slugify = (str = "") =>
    String(str)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    fetch("/api/fetchaddedSection")
      .then((res) => res.json())
      .then((data) => {
        const titles = data.map((section) => section.sectionHandle);
        setAddedTitles(titles);
      });
  }, []);

  const handleSave = async () => {
    const res = await fetch("/api/activeSection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: previewData?.title,
        imageUrl: previewData?.media,
        price: previewData?.price,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setAddedTitles((prev) => [...prev, slugify(previewData?.title)]);
      setPreviewOpen(false);
    }
  };

  const handleSaveSection = async (section) => {
    const res = await fetch("/api/activeSection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: section.title,
        imageUrl: section.media,
        price: section.price,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setAddedTitles((prev) => [...prev, slugify(section.title)]);
    }
  };

  const fetchChatGPTResponse = async (prompt) => {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
You are a Shopify section generator. 
If the user asks for a single section (like "create testimonial section" or "add product slider"), return only one relevant section.

If the user asks to "build a complete page", "make a landing page", or "design a homepage", then return multiple sections relevant to the request.

Don't explain anything — just return keywords like 'testimonial', 'slider', or 'new arrival' in a sentence so we can match them.
`,
          },

          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data.choices[0].message.content;
  };

  const getRelevantSections = (response) => {
    const lowerRes = response.toLowerCase();
    const matched = new Set();

    newestProducts.forEach((section) => {
      if (
        section.keywords.some((kw) => lowerRes.includes(kw.toLowerCase())) ||
        lowerRes.includes(section.title.toLowerCase())
      ) {
        matched.add(section);
      }
    });

    return Array.from(matched);
  };

  const [isFullPageMode, setIsFullPageMode] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");

    if (awaitingConfirmation && pendingSection) {
      if (/yes|ok|sure|ofcourse|okey|okay/i.test(userInput)) {
        setMessages((prev) => [
          ...prev,
          {
            text: `Perfect  I’ll create the ${pendingSection.category} section for you.`,
            sender: "bot",
          },
          {
            text: `Tip: Many merchants also add *Testimonials* or a *Featured Collection* section along with ${pendingSection.category}. Would you like me to suggest those too?`,
            sender: "bot",
          },
        ]);

        setMatchedSections([pendingSection]);
        setAwaitingConfirmation(false);
        setPendingSection(null);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "Got it No problem. What kind of section would you like instead?",
            sender: "bot",
          },
        ]);
        setAwaitingConfirmation(false);
        setPendingSection(null);
      }
      return;
    }

    const gptReply = await fetchChatGPTResponse(userInput);
    const matched = getRelevantSections(gptReply);

    if (matched.length === 1) {
      setPendingSection(matched[0]);
      setAwaitingConfirmation(true);
      setMessages((prev) => [
        ...prev,
        {
          text: `Got it. You’re asking for a **${matched[0].category}** section. Do you want me to generate this for you now?`,
          sender: "bot",
        },
      ]);
    } else if (matched.length > 1) {
      setMessages((prev) => [
        ...prev,
        {
          text: "I found multiple section types that might fit your request  Which one would you like me to generate?",
          sender: "bot",
        },
      ]);
      setMatchedSections(matched);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: "Hmm  I couldn’t find a matching section. Can you describe it in another way?",
          sender: "bot",
        },
      ]);
    }
  };

  const openPreview = (item) => {
    setPreviewData(item);
    setPreviewOpen(true);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Page title="Shopify AI Assistant">
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <Scrollable
              style={{ height: "400px", padding: "20px 24px" }}
              shadow
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf:
                        msg.sender === "user" ? "flex-end" : "flex-start",
                      maxWidth: "75%",
                      backgroundColor:
                        msg.sender === "user" ? "#e0f7da" : "#ffffff",
                      border: "1px solid #dcdcdc",
                      borderRadius: "16px",
                      padding: "12px 16px",
                      wordBreak: "break-word",
                    }}
                  >
                    <Text variant="bodyMd" as="p">
                      <strong>
                        {msg.sender === "user" ? "You:" : "AI Assistant:"}
                      </strong>{" "}
                      {msg.text}
                    </Text>
                  </div>
                ))}
              </div>

              {matchedSections.length > 0 && (
                <div style={{ marginTop: "28px" }}>
                  <Text
                    variant="headingSm"
                    as="h3"
                    style={{ marginBottom: "16px" }}
                  >
                    Suggested Sections
                  </Text>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {matchedSections.map((item, idx) => (
                      <Card key={idx} padding="400" sectioned>
                        <div
                          style={{
                            display: "flex",
                            gap: "16px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div style={{ flexShrink: 0 }}>
                            <Thumbnail
                              source={item.media}
                              size="large"
                              alt={item.title}
                            />
                          </div>

                          <div style={{ flex: 1 }}>
                            <div
                              style={{ fontWeight: "600", fontSize: "16px" }}
                            >
                              {item.title}
                            </div>
                            <ul
                              style={{ marginTop: "6px", paddingLeft: "18px" }}
                            >
                              {Object.entries(item.details).map(
                                ([key, value]) => (
                                  <li key={key}>
                                    <Text variant="bodySm" as="span">
                                      <strong>{key}:</strong> {value}
                                    </Text>
                                  </li>
                                ),
                              )}
                            </ul>
                            <div style={{ marginTop: "12px" }}>
                              <Button onClick={() => openPreview(item)}>
                                Preview
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {pageSections.length > 0 && isFullPageMode && (
                <div style={{ marginTop: "40px" }}>
                  <Text
                    variant="headingSm"
                    as="h3"
                    style={{ marginBottom: "12px" }}
                  >
                    Full Page Preview
                  </Text>
                  <div style={{ marginTop: "16px" }}>
                    <Button primary onClick={() => setFullPreviewOpen(true)}>
                      View Full Page
                    </Button>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </Scrollable>
            ={" "}
            <div
              style={{
                padding: "16px",
                borderTop: "1px solid #e1e3e5",
                backgroundColor: "#fafafa",
                display: "flex",
                gap: "12px",
                alignItems: "flex-end",
              }}
            >
              <div style={{ flex: 1 }}>
                <TextField
                  value={userInput}
                  onChange={(val) => setUserInput(val)}
                  onEnterPressed={handleUserInput}
                  placeholder="Describe your desired section..."
                  autoComplete="off"
                />
              </div>
              <Button primary onClick={handleUserInput}>
                Send
              </Button>
            </div>
          </Card>
        </Layout.Section>
      </Layout>

      {previewData && (
        <Modal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          title="Section Preview"
          primaryAction={{
            content: "Close",
            onAction: () => setPreviewOpen(false),
          }}
          size="large"
        >
          <Modal.Section>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {/* Left side: Preview image + details */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <Card sectioned>
                  <img
                    src={previewData.media}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Card>
                <div style={{ marginTop: "20px" }}>
                  <Card sectioned>
                    <Text variant="headingSm" fontWeight="bold">
                      Details:
                    </Text>
                    {Object.entries(previewData.details || {}).map(
                      ([key, val], idx) => (
                        <Text
                          key={idx}
                          variant="bodyMd"
                          tone="subdued"
                          style={{ display: "block", marginTop: 6 }}
                        >
                          <strong>{key}:</strong> {val}
                        </Text>
                      ),
                    )}
                  </Card>
                </div>
              </div>
              ={" "}
              <div style={{ flex: 0.5, minWidth: "300px" }}>
                <Card>
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <Text variant="headingSm" fontWeight="semibold">
                      {previewData?.title}
                    </Text>
                    ={" "}
                    <Button
                      fullWidth
                      variant="primary"
                      disabled={addedTitles.includes(
                        slugify(previewData?.title),
                      )}
                      onClick={handleSave}
                    >
                      {addedTitles.includes(slugify(previewData?.title))
                        ? "Added"
                        : "Add Section"}
                    </Button>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <Text variant="bodySm" tone="subdued">
                        Secure payment through Shopify
                      </Text>
                    </div>
                    <div
                      style={{ borderTop: "1px solid #eee", margin: "6px 0" }}
                    />
                    <Text variant="bodySm">No recurring fees</Text>
                    <Text variant="bodySm">Lifetime access & free updates</Text>
                    <Text variant="bodySm">Works with any Shopify theme</Text>
                    <Text>
                      <strong>Launched:</strong> {previewData.launchedDate}
                    </Text>
                    <Text>
                      <strong>Last Modified:</strong> {previewData.lastModified}
                    </Text>
                  </div>
                </Card>
              </div>
            </div>

            {previewData.references?.length > 0 && (
              <div style={{ marginTop: "30px" }}>
                <Text variant="headingSm" fontWeight="bold">
                  Related Sections
                </Text>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "16px",
                    marginTop: "16px",
                  }}
                >
                  {newestProducts
                    .filter((p) => previewData.references.includes(p.id))
                    .map((refItem) => (
                      <Card
                        key={refItem.id}
                        padding="0"
                        style={{
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid #ddd",
                        }}
                      >
                        <div style={{ height: "140px", overflow: "hidden" }}>
                          {refItem.type === "image" ? (
                            <img
                              src={refItem.media}
                              alt={refItem.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <video
                              src={refItem.media}
                              muted
                              autoPlay
                              loop
                              playsInline
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                        <div style={{ padding: "12px" }}>
                          <Text variant="bodySm" fontWeight="medium">
                            #{refItem.id} - {refItem.title}
                          </Text>
                          <div
                            style={{
                              marginTop: "8px",
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "6px",
                            }}
                          >
                            <Button
                              size="slim"
                              onClick={() => openPreview(refItem)}
                            >
                              Preview
                            </Button>
                            <Button
                              size="slim"
                              variant="primary"
                              disabled={addedTitles.includes(
                                slugify(refItem.title),
                              )}
                              onClick={() => handleSaveSection(refItem)}
                            >
                              {addedTitles.includes(slugify(refItem.title))
                                ? "Added"
                                : "Add"}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </Modal.Section>
        </Modal>
      )}

      <div className="custom-wide-modal-wrapper">
        <style>
          {`
      .Polaris-Modal-Dialog__Modal {
        max-width: 96vw !important;
        width: 96vw !important;
      }
      .Polaris-Modal__ModalWrapper {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
    `}
        </style>

        {fullPreviewOpen && (
          <Modal
            open={fullPreviewOpen}
            onClose={() => setFullPreviewOpen(false)}
            title="Full Page Builder"
            large
            primaryAction={{
              content: "Close",
              onAction: () => setFullPreviewOpen(false),
            }}
          >
            <Modal.Section>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    maxHeight: "70vh",
                    overflowY: "auto",
                    paddingRight: 8,
                  }}
                >
                  {pageSections.map((section, idx) => (
                    <Card key={idx} sectioned>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          label="Section Title"
                          value={section.title}
                          onChange={(val) => {
                            const updated = [...pageSections];
                            updated[idx].title = val;
                            setPageSections(updated);
                          }}
                        />
                        <Button
                          destructive
                          onClick={() => {
                            const updated = [...pageSections];
                            updated.splice(idx, 1);
                            setPageSections(updated);
                          }}
                        >
                          Delete
                        </Button>
                      </div>

                      <div style={{ marginTop: "12px" }}>
                        <Thumbnail
                          source={section.media}
                          alt={section.title}
                          size="large"
                        />
                      </div>

                      <TextField
                        label="Custom CSS"
                        multiline={4}
                        value={section.customCss || ""}
                        onChange={(val) => {
                          const updated = [...pageSections];
                          updated[idx].customCss = val;
                          setPageSections(updated);
                        }}
                        autoComplete="off"
                      />
                    </Card>
                  ))}
                </div>

                <div
                  style={{
                    flex: 1,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    padding: "16px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                >
                  <Text
                    variant="headingSm"
                    as="h3"
                    style={{ marginBottom: "12px" }}
                  >
                    Live Preview
                  </Text>

                  {pageSections.map((section, idx) => {
                    const className = `section-preview-${idx}`;
                    return (
                      <div
                        key={idx}
                        className={className}
                        style={{
                          marginBottom: "24px",
                          padding: "16px",
                          border: "1px dashed #ccc",
                          borderRadius: "6px",
                        }}
                      >
                        <style>{`
        .${className} {
          all: initial;
        }
        .${className} * {
          all: revert;
        }
        .${className} ${section.customCss}
      `}</style>

                        <h3>{section.title}</h3>
                        <img
                          src={section.media}
                          alt={section.title}
                          style={{
                            width: "100%",
                            borderRadius: "4px",
                            marginTop: "8px",
                          }}
                        />
                        <p
                          style={{
                            marginTop: "8px",
                            fontStyle: "italic",
                            fontSize: "14px",
                          }}
                        >
                          This block is styled with your custom CSS above.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Modal.Section>
          </Modal>
        )}
      </div>
    </Page>
  );
}
