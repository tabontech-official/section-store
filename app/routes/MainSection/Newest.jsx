import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Modal,
  Button,
  Icon,
  Page,
  Toast,
  Frame,
  Loading,
} from "@shopify/polaris";
import { FiEye } from "react-icons/fi";
import { CreditCardIcon, LockIcon, ViewIcon } from "@shopify/polaris-icons";
import { useNavigate } from "@remix-run/react";

const newestProducts = [
  {
    title: "New Arrival 1",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$3.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 2",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 3",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "video",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 4",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 5",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 6",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 7",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$3.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 8",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 9",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "video",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 10",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 11",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
  {
    title: "New Arrival 12",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "$4.99",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
];

export default function NewestSlider() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [addedTitles, setAddedTitles] = useState([]);
  useEffect(() => {
    fetch("/api/fetchaddedSection")
      .then((res) => res.json())
      .then((data) => {
        const titles = data.map((section) => section.sectionHandle);
        console.log(titles);
        setAddedTitles(titles);
      });
  }, []);
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const openPreview = (item) => {
    setModalContent({
      title: item.title,
      price: item.price,
      mediaList: [item.media],
      details: item.details,
    });
    setActiveImageIndex(0);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalContent({});
    setActiveImageIndex(0);
  };
const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const res = await fetch("/api/activeSection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: modalContent?.title,
          imageUrl: modalContent?.mediaList?.[0],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setToastMessage(" Section saved successfully!");
        setShowToast(true);
        setShowModal(false);
        setAddedTitles((prev) => [...prev, modalContent?.title]);
          navigate("/app/my-section");
      } else {
        setToastMessage(data.error || " Something went wrong");
        setShowToast(true);
      }
    } catch (err) {
      console.error("Save failed", err);
      setToastMessage(" Failed to save section.");
      setShowToast(true);
    }
  };


  return (
    <Frame>
      <Page>
      <Loading />

        <div
          style={{ padding: "32px var(--p-space-400)", position: "relative" }}
        >
          <Text variant="headingSm" as="h3" fontWeight="semibold">
            Animated Sections
          </Text>
          <style>
            {`
    .hover-card-media {
      position: relative;
      height: 180px;
      overflow: hidden;
      border-radius: 0;
    }

    .hover-card-media img,
    .hover-card-media video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      display: block;
    }

    .hover-card-media .hover-overlay-button {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 2;
    }

    .hover-card-media:hover .hover-overlay-button {
      opacity: 1;
    }

    .hover-card-media:hover img {
      transform: scale(1.05);
    }
  `}
          </style>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginTop: "24px",
            }}
          >
            {newestProducts.map((item, idx) => (
              <Card
                key={idx}
                padding="0"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#fff",
                  border: "1px solid #ddd",
                  height: "260px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "transform 0.3s ease",
                }}
              >
                <div
                  className="card-click-wrapper"
                  onClick={() => openPreview(item)}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="hover-card-media">
                    {item.type === "image" ? (
                      <img src={item.media} alt={item.title} />
                    ) : (
                      <video src={item.media} muted autoPlay loop playsInline />
                    )}
                    <div className="hover-overlay-button">
                      <Button
                        icon={ViewIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          openPreview(item);
                        }}
                      >
                        View details
                      </Button>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "12px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Text variant="bodySm" fontWeight="medium">
                      {item.title}
                    </Text>
                    <Text
                      variant="bodySm"
                      fontWeight="medium"
                      color="interactive"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPreview(item);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      View
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {showModal && (
            <Modal
              open={showModal}
              onClose={handleModalClose}
              title="Section Preview"
              primaryAction={{ content: "Close", onAction: handleModalClose }}
              size="large"
            >
              <Modal.Section>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  <div style={{ flex: 1, minWidth: "300px" }}>
                    <Card sectioned>
                      <img
                        src={modalContent.mediaList?.[activeImageIndex]}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxHeight: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Card>

                    <Card sectioned style={{ marginTop: "20px" }}>
                      <Text variant="headingSm" fontWeight="bold">
                        Details:
                      </Text>
                      {Object.entries(modalContent.details || {}).map(
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
                          {modalContent?.title}
                        </Text>

                        <Button
                          fullWidth
                          variant="primary"
                          icon={CreditCardIcon}
                          disabled={addedTitles.includes(modalContent?.title)}
                          onClick={handleSave}
                        >
                          {addedTitles.includes(modalContent?.title)
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
                          <Icon source={LockIcon} tone="base" />
                          <Text variant="bodySm" tone="subdued">
                            Secure payment through Shopify
                          </Text>
                        </div>

                        <div
                          style={{
                            borderTop: "1px solid #eee",
                            margin: "6px 0",
                          }}
                        />
                        <Text variant="bodySm">No recurring fees</Text>
                        <Text variant="bodySm">
                          Lifetime access & free updates
                        </Text>
                        <Text variant="bodySm">
                          Works with any Shopify theme
                        </Text>
                      </div>
                    </Card>
                  </div>
                </div>
              </Modal.Section>
            </Modal>
          )}
          {showToast && (
            <Toast
              content={toastMessage}
              onDismiss={() => setShowToast(false)}
            />
          )}
        </div>
      </Page>
    </Frame>
  );
}
