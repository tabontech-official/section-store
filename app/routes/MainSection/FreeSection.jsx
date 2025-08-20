import { useEffect, useState } from "react";
import { Card, Text, Modal, Button, Icon, Link, Page } from "@shopify/polaris";
import { FiChevronRight, FiChevronLeft, FiEye } from "react-icons/fi";
import {
  CreditCardIcon,
  StoreIcon,
  ReplayIcon,
  WandIcon,
  LockIcon,
  DiscountIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
const cardsPerPage = 4;

import { newestProducts } from "../sections/sections";
export default function FreeSection() {
  const [pageIndex, setPageIndex] = useState(0);
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

  const slugify = (str = "") =>
    String(str)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  const freeProducts = newestProducts.filter((item) => item.price === "Free");

  const chunkedProducts = [];
  for (let i = 0; i < freeProducts.length; i += cardsPerPage) {
    chunkedProducts.push(freeProducts.slice(i, i + cardsPerPage));
  }

  const scrollToPage = (dir) => {
    const maxPage = Math.ceil(freeProducts.length / cardsPerPage);
    if (dir === "right" && pageIndex < maxPage - 1) setPageIndex((p) => p + 1);
    if (dir === "left" && pageIndex > 0) setPageIndex((p) => p - 1);
  };
  const openPreview = (item) => {
    setModalContent({
      id: item.id,
      title: item.title,
      price: item.price,
      mediaList: [item.media],
      details: item.details,
      references: item.references,
      launchedDate: item.launchedDate,
      lastModified: item.lastModified,
    });
    setActiveImageIndex(0);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalContent({});
    setActiveImageIndex(0);
  };
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
        // setAddedTitles((prev) => [...prev, modalContent?.title]);
        setAddedTitles((prev) => [...prev, slugify(modalContent?.title)]);

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
  const handleSaveSection = async (section) => {
    try {
      const res = await fetch("/api/activeSection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: section.title,
          imageUrl: section.media,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setToastMessage("Section saved successfully!");
        setShowToast(true);
        setAddedTitles((prev) => [...prev, slugify(section.title)]);
      } else {
        setToastMessage(data.error || "Something went wrong");
        setShowToast(true);
      }
    } catch (err) {
      console.error("Save failed", err);
      setToastMessage("Failed to save section.");
      setShowToast(true);
    }
  };

  return (
    <Page>
      <div style={{ padding: "32px var(--p-space-400)", position: "relative" }}>
        <style jsx>{`
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
        `}</style>

        <Text
          variant="headingMd"
          fontWeight="semibold"
          as="h2"
          alignment="start"
        >
          Free Sections
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
                          <video
                            src={item.media}
                            muted
                            autoPlay
                            loop
                            playsInline
                          />
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
                          borderTop: "1px solid #e1e3e5", // subtle divider for professionalism
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <Text variant="bodySm" color="subdued">
                         
                            {item.title}
                          </Text>
                        </div>

                        <Text
                          variant="bodyMd"
                          fontWeight="bold"
                          color="interactive"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPreview(item);
                          }}
                          style={{
                            cursor: "pointer",
                            padding: "4px 10px",
                            border: "1px solid #d0d6dd",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                          }}
                        >
                          #{item.id}
                        </Text>
                      </div>
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
                  <div style={{ marginTop: "20px" }}>
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
                            style={{ display: "block", marginTop: 6 }}
                          >
                            <strong>{key}:</strong> {val}
                          </Text>
                        ),
                      )}
                    </Card>
                  </div>
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
                        disabled={addedTitles.includes(
                          slugify(modalContent?.title),
                        )}
                        onClick={handleSave}
                      >
                        {addedTitles.includes(slugify(modalContent?.title))
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
                      <Text variant="bodySm">Works with any Shopify theme</Text>
                      <Text >
                        <span style={{ fontWeight: "700", font: "bold" }}>
                          launched:
                        </span>{" "}
                        {modalContent.launchedDate}
                       
                      </Text>
                      <Text variant="bodySm">
                         <span style={{ fontWeight: "700", font: "bold" }}>
                          last Modified:
                        </span>{" "}
                        {modalContent.lastModified}
                      </Text>
                    </div>
                  </Card>
                </div>
              </div>

              {modalContent.references?.length > 0 && (
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
                      .filter((p) => modalContent.references.includes(p.id))
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
                              {refItem.title}
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
                                onClick={() =>
                                  navigate(`/app/section/${refItem.id}`)
                                }
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
      </div>
    </Page>
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
