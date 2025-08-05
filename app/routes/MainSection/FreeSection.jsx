import { useState } from "react";
import { Card, Text, Modal, Button, Icon, Link } from "@shopify/polaris";
import { FiChevronRight, FiChevronLeft, FiEye } from "react-icons/fi";
import {
  CreditCardIcon,
  StoreIcon,
  ReplayIcon,
  WandIcon,
  LockIcon,
  DiscountIcon,
} from "@shopify/polaris-icons";
const cardsPerPage = 4;

const newestProducts = [
  {
    title: "New Arrival 1",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png",
    type: "image",
    price: "Free",
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
    price: "Free",
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
    price: "Free",
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
    price: "Free",
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
    price: "Free",
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
    price: "Free",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
  },
];

export default function FreeSection() {
  const [pageIndex, setPageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const chunkedProducts = [];
  for (let i = 0; i < newestProducts.length; i += cardsPerPage) {
    chunkedProducts.push(newestProducts.slice(i, i + cardsPerPage));
  }

  const scrollToPage = (dir) => {
    const maxPage = Math.ceil(newestProducts.length / cardsPerPage);
    if (dir === "right" && pageIndex < maxPage - 1) setPageIndex((p) => p + 1);
    if (dir === "left" && pageIndex > 0) setPageIndex((p) => p - 1);
  };

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

  return (
    <div style={{ padding: "32px var(--p-space-400)", position: "relative" }}>
      <style jsx>{`
        .hover-wrapper {
          position: relative;
          cursor: pointer;
          height: 180px;
        }

        .hover-eye {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.6);
          padding: 8px;
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .hover-wrapper:hover .hover-eye {
          opacity: 1;
        }
      `}</style>

      <Text variant="headingMd" fontWeight="semibold" as="h2" alignment="start">
        Free
      </Text>

      {pageIndex > 0 && (
        <button
          onClick={() => scrollToPage("left")}
          style={scrollButtonStyle("left")}
        >
          <FiChevronLeft />
        </button>
      )}
      {pageIndex < chunkedProducts.length - 1 && (
        <button
          onClick={() => scrollToPage("right")}
          style={scrollButtonStyle("right")}
        >
          <FiChevronRight />
        </button>
      )}

      <div style={{ overflow: "hidden", width: "100%" }}>
        <div
          style={{
            display: "flex",
            width: `${100 * chunkedProducts.length}%`,
            transform: `translateX(-${pageIndex * (100 / chunkedProducts.length)}%)`,
            transition: "transform 0.7s ease-in-out",
          }}
        >
          {chunkedProducts.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                width: "100%",
                padding: "10px",
              }}
            >
              {chunk.map((item, idx) => (
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
                  onClick={() => openPreview(item)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div className="hover-wrapper">
                    {item.type === "image" ? (
                      <img
                        src={item.media}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <video
                        src={item.media}
                        muted
                        autoPlay
                        loop
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    )}
                    <div
                      className="hover-eye"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPreview(item);
                      }}
                    >
                      <FiEye size={20} />
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text variant="bodySm" fontWeight="medium">
                      {item.title}
                    </Text>
                    <Text variant="bodySm" fontWeight="semibold">
                      {item.price}
                    </Text>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
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
              {/* Left */}
              <div style={{ flex: 1, minWidth: "300px" }}>
                <Card sectioned>
                  {modalContent.mediaList &&
                    modalContent.mediaList.length > 0 && (
                      <img
                        src={modalContent.mediaList[activeImageIndex]}
                        alt={`Slide ${activeImageIndex + 1}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                </Card>

                <div style={{ marginTop: "16px" }}>
                  <Card sectioned>
                    <Text variant="headingSm" fontWeight="bold">
                      Details:
                    </Text>
                    {Object.entries(modalContent.details || {}).map(
                      ([key, val], idx) => (
                        <Text
                          key={idx}
                          variant="bodyMd"
                          tone="subdued"
                          style={{ marginTop: "6px" }}
                        >
                          <strong>{key}:</strong> {val}
                        </Text>
                      ),
                    )}
                  </Card>
                </div>
              </div>

              {/* Right */}
              <div style={{ flex: 0.5, minWidth: "300px" }}>
                <Card>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Text variant="headingSm" fontWeight="semibold">
                      {modalContent?.title}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      <strong>{modalContent?.price}</strong>{" "}
                      <span style={{ color: "#888", fontSize: "13px" }}></span>
                    </Text>

                    <Button
                      fullWidth
                      variant="primary"
                      icon={CreditCardIcon}
                      onClick={async () => {
                        try {
                          const res = await fetch("/api/createSection", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              chargeId: "free-section",
                              title: modalContent.title,
                              content: `<div>Your section code for ${modalContent.title}</div>`,
                            }),
                          });

                          const result = await res.json();

                          if (result.success) {
                            alert("Section installed successfully!");
                            setShowModal(false);
                          } else {
                            alert(
                              "Failed to install section: " +
                                (result.error || result.status),
                            );
                          }
                        } catch (err) {
                          alert("Unexpected error occurred.");
                        }
                      }}
                    >
                      Get Free Subscription
                    </Button>

                    <div>
                      <Text>Secure payment through Shopify</Text>
                    </div>

                    <div
                      style={{ borderTop: "1px solid #eee", margin: "6px 0" }}
                    />

                    <Text variant="bodySm">No recurring fees</Text>
                    <Text variant="bodySm">Lifetime access & free updates</Text>
                    <Text variant="bodySm">Works with any Shopify theme</Text>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button fullWidth icon={StoreIcon}>
                        Demo Store
                      </Button>
                      <Button fullWidth icon={WandIcon} variant="secondary">
                        Try section
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Modal.Section>
        </Modal>
      )}
    </div>
  );
}

const scrollButtonStyle = (position) => ({
  position: "absolute",
  [position]: "0",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 10,
});
