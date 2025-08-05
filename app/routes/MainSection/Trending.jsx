// import { useState } from "react";
// import { Card, Text, Button } from "@shopify/polaris";
// import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// const cardsPerPage = 4;
// const trendingProducts = [
//   { title: "Trust box", media: "https://miro.medium.com/v2/resize:fit:1200/0*coCNr5jfemOW1rq2.png", type: "image" },
//   { title: "Payment icons", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png?v=1753775517", type: "image" },
//   { title: "Testimonial #8", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579", type: "image" },
//   { title: "Product video", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579", type: "video" },
//   { title: "Trust Badge", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579", type: "image" },
//   { title: "Shipping bar", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579", type: "image" },
// ];

// export default function TrendingSlider() {
//   const [pageIndex, setPageIndex] = useState(0);
//   const [activeStates, setActiveStates] = useState(trendingProducts.map(() => true)); // Default: all active

//   const maxPage = Math.ceil(trendingProducts.length / cardsPerPage);

//   const scrollToPage = (direction) => {
//     if (direction === "right" && pageIndex < maxPage - 1) {
//       setPageIndex((prev) => prev + 1);
//     } else if (direction === "left" && pageIndex > 0) {
//       setPageIndex((prev) => prev - 1);
//     }
//   };

//   const toggleStatus = (index) => {
//     const updated = [...activeStates];
//     updated[index] = !updated[index];
//     setActiveStates(updated);
//   };

//   // Split into chunks of 4 cards
//   const chunkedProducts = [];
//   for (let i = 0; i < trendingProducts.length; i += cardsPerPage) {
//     chunkedProducts.push(trendingProducts.slice(i, i + cardsPerPage));
//   }

//   return (
//     <div style={{ padding: "32px var(--p-space-400)", position: "relative", overflow: "hidden" }}>
//       <Text variant="headingMd" fontWeight="semibold" as="h2" alignment="start">
//         Trending Now
//       </Text>

//       {pageIndex > 0 && (
//         <button onClick={() => scrollToPage("left")} style={scrollButtonStyle("left")}>
//           <FiChevronLeft />
//         </button>
//       )}
//       {pageIndex < chunkedProducts.length - 1 && (
//         <button onClick={() => scrollToPage("right")} style={scrollButtonStyle("right")}>
//           <FiChevronRight />
//         </button>
//       )}

//       <div style={{ overflow: "hidden", width: "100%" }}>
//         <div
//           style={{
//             display: "flex",
//             width: `${100 * chunkedProducts.length}%`,
//             transform: `translateX(-${pageIndex * (100 / chunkedProducts.length)}%)`,
//             transition: "transform 0.7s ease-in-out",
//           }}
//         >
//           {chunkedProducts.map((chunk, chunkIndex) => (
//             <div
//               key={chunkIndex}
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(4, 1fr)",
//                 gap: "20px",
//                 width: "100%",
//                 padding: "10px",
//               }}
//             >
//               {chunk.map((item, indexInChunk) => {
//                 const globalIndex = chunkIndex * cardsPerPage + indexInChunk;
//                 return (
//                   <Card
//                     key={globalIndex}
//                     padding="0"
//                     style={{
//                       borderRadius: "12px",
//                       overflow: "hidden",
//                       background: "#fff",
//                       border: "1px solid #ddd",
//                       height: "260px",
//                     }}
//                   >
//                     <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
//                       {item.type === "image" ? (
//                         <img
//                           src={item.media}
//                           alt={item.title}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             display: "block",
//                           }}
//                         />
//                       ) : (
//                         <video
//                           src={item.media}
//                           muted
//                           autoPlay
//                           loop
//                           playsInline
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             display: "block",
//                           }}
//                         />
//                       )}
//                     </div>
//                     <div
//                       style={{
//                         padding: "16px",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Text variant="bodySm" fontWeight="medium">
//                         {item.title}
//                       </Text>
//                       <Button
//                         size="slim"
//                         onClick={() => toggleStatus(globalIndex)}
//                         tone={activeStates[globalIndex] ? "success" : "critical"}
//                       >
//                         {activeStates[globalIndex] ? "Active" : "Inactive"}
//                       </Button>
//                     </div>
//                   </Card>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const scrollButtonStyle = (position) => ({
//   position: "absolute",
//   [position]: "0",
//   top: "50%",
//   transform: "translateY(-50%)",
//   backgroundColor: "#fff",
//   border: "1px solid #e0e0e0",
//   borderRadius: "50%",
//   width: "36px",
//   height: "36px",
//   boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   cursor: "pointer",
//   zIndex: 10,
// });
import { useState, useEffect } from "react";
import { Card, Text, Button, Modal, Icon } from "@shopify/polaris";
import { FiChevronRight, FiChevronLeft, FiEye } from "react-icons/fi";
import { LockIcon } from "@shopify/polaris-icons";
import { Toast } from "@shopify/polaris";
import { useCallback } from "react";
const cardsPerPage = 4;

const trendingProducts = [
  {
    title: "Trust box",
    media: "https://miro.medium.com/v2/resize:fit:1200/0*coCNr5jfemOW1rq2.png",
    type: "image",
  },
  {
    title: "Payment icons",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png?v=1753775517",
    type: "image",
  },
  {
    title: "Testimonial #8",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    type: "image",
  },
  {
    title: "Product video",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    type: "video",
  },
  {
    title: "Trust Badge",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    type: "image",
  },
  {
    title: "Shipping bar",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    type: "image",
  },
];

export default function TrendingSlider() {
  const [pageIndex, setPageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [hasAccess, setHasAccess] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    fetch("/api/section-access?section=trending-slider")
      .then((res) => {
        setHasAccess(res.ok);
        setAccessChecked(true);
      })
      .catch(() => {
        setHasAccess(false);
        setAccessChecked(true);
      });
  }, []);

  const chunkedProducts = [];
  for (let i = 0; i < trendingProducts.length; i += cardsPerPage) {
    chunkedProducts.push(trendingProducts.slice(i, i + cardsPerPage));
  }

  const scrollToPage = (direction) => {
    const maxPage = Math.ceil(trendingProducts.length / cardsPerPage);
    if (direction === "right" && pageIndex < maxPage - 1)
      setPageIndex((prev) => prev + 1);
    else if (direction === "left" && pageIndex > 0)
      setPageIndex((prev) => prev - 1);
  };

  const openPreview = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setModalContent({});
    setShowModal(false);
  };

  if (!accessChecked) return null;

  return (
    <div style={{ padding: "32px", position: "relative", overflow: "hidden" }}>
      <Text variant="headingMd" fontWeight="semibold">
        Trending Now
      </Text>

      <style>
        {`
          .hover-wrapper {
            position: relative;
            cursor: pointer;
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
        `}
      </style>

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
                  }}
                  onClick={() =>
                    hasAccess
                      ? openPreview(item)
                      : (window.location.href = "/pricing")
                  }
                >
                  <div className="hover-wrapper" style={{ height: 180 }}>
                    {item.type === "image" ? (
                      <img
                        src={item.media}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
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
                        }}
                      />
                    )}
                    <div
                      className="hover-eye"
                      onClick={(e) => {
                        e.stopPropagation();
                        hasAccess
                          ? openPreview(item)
                          : (window.location.href = "/pricing");
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
                      alignItems: "center",
                    }}
                  >
                    <Text variant="bodySm" fontWeight="medium">
                      {item.title}
                    </Text>
                    {!hasAccess && (
                      <span
                        style={{
                          color: "#bf0711",
                          fontWeight: 600,
                          fontSize: "14px",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setToastMessage(
                            "Please visit the pricing section and subscribe to the Basic plan to use this section.",
                          );
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }}
                      >
                        Basic Plan
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#111827",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            fontSize: "14px",
            maxWidth: "320px",
          }}
        >
          {toastMessage}
        </div>
      )}
      {showModal && (
        <Modal
          open={showModal}
          onClose={handleModalClose}
          title={modalContent.title}
          primaryAction={{ content: "Close", onAction: handleModalClose }}
        >
          <Modal.Section>
            <Card sectioned>
              {modalContent.type === "image" ? (
                <img
                  src={modalContent.media}
                  alt={modalContent.title}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              ) : (
                <video
                  src={modalContent.media}
                  autoPlay
                  loop
                  muted
                  controls
                  style={{ width: "100%" }}
                />
              )}
              <div style={{ marginTop: "12px" }}>
                <Text variant="bodySm">
                  This is a preview of <strong>{modalContent.title}</strong>
                </Text>
              </div>
            </Card>

            {!hasAccess && (
              <div style={{ marginTop: "12px" }}>
                <Button
                  fullWidth
                  tone="primary"
                  onClick={() => (window.location.href = "/pricing")}
                >
                  Get Basic Plan
                </Button>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Icon source={LockIcon} tone="base" />
                  <Text variant="bodySm" tone="subdued">
                    Secure checkout with Shopify
                  </Text>
                </div>
              </div>
            )}
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
