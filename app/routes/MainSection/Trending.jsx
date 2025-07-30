import { useState } from "react";
import { Card, Text, Button } from "@shopify/polaris";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const cardsPerPage = 4;
const trendingProducts = [
  { title: "Trust box", media: "https://miro.medium.com/v2/resize:fit:1200/0*coCNr5jfemOW1rq2.png", type: "image" },
  { title: "Payment icons", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png?v=1753775517", type: "image" },
  { title: "Testimonial #8", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579", type: "image" },
  { title: "Product video", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579", type: "video" },
  { title: "Trust Badge", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579", type: "image" },
  { title: "Shipping bar", media: "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579", type: "image" },
];

export default function TrendingSlider() {
  const [pageIndex, setPageIndex] = useState(0);
  const [activeStates, setActiveStates] = useState(trendingProducts.map(() => true)); // Default: all active

  const maxPage = Math.ceil(trendingProducts.length / cardsPerPage);

  const scrollToPage = (direction) => {
    if (direction === "right" && pageIndex < maxPage - 1) {
      setPageIndex((prev) => prev + 1);
    } else if (direction === "left" && pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const toggleStatus = (index) => {
    const updated = [...activeStates];
    updated[index] = !updated[index];
    setActiveStates(updated);
  };

  // Split into chunks of 4 cards
  const chunkedProducts = [];
  for (let i = 0; i < trendingProducts.length; i += cardsPerPage) {
    chunkedProducts.push(trendingProducts.slice(i, i + cardsPerPage));
  }

  return (
    <div style={{ padding: "32px var(--p-space-400)", position: "relative", overflow: "hidden" }}>
      <Text variant="headingMd" fontWeight="semibold" as="h2" alignment="start">
        Trending Now
      </Text>

      {pageIndex > 0 && (
        <button onClick={() => scrollToPage("left")} style={scrollButtonStyle("left")}>
          <FiChevronLeft />
        </button>
      )}
      {pageIndex < chunkedProducts.length - 1 && (
        <button onClick={() => scrollToPage("right")} style={scrollButtonStyle("right")}>
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
              {chunk.map((item, indexInChunk) => {
                const globalIndex = chunkIndex * cardsPerPage + indexInChunk;
                return (
                  <Card
                    key={globalIndex}
                    padding="0"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#fff",
                      border: "1px solid #ddd",
                      height: "260px",
                    }}
                  >
                    <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
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
                      <Button
                        size="slim"
                        onClick={() => toggleStatus(globalIndex)}
                        tone={activeStates[globalIndex] ? "success" : "critical"}
                      >
                        {activeStates[globalIndex] ? "Active" : "Inactive"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ))}
        </div>
      </div>
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
