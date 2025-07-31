import {
  Card,
  BlockStack,
  Text,
  Button,
  InlineGrid,
  TextField,
  Icon,
  Modal,
} from "@shopify/polaris";
import { SearchIcon, FilterIcon, ViewIcon } from "@shopify/polaris-icons";
import { useState, useRef, useEffect } from "react";
import { MdTab } from "react-icons/md";

import {
  AiFillStar,
  AiOutlineFire,
  AiOutlineGift,
  AiFillPlayCircle,
} from "react-icons/ai";
import { BsDiamondFill } from "react-icons/bs";
import {
  BiMessageRoundedDetail,
  BiCodeBlock,
  BiTime,
  BiSolidImageAdd,
  BiSlideshow,
} from "react-icons/bi";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";
import {
  MdImageSearch,
  MdOutlineTextFields,
  MdOutlineImage,
  MdCollectionsBookmark,
  MdOutlineQuestionAnswer,
} from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

const cardsPerPage = 4;
const trendingProducts = [
  {
    title: "Trust box",
    mediaList: [
      "https://miro.medium.com/v2/resize:fit:1200/0*coCNr5jfemOW1rq2.png",
      "https://miro.medium.com/v2/resize:fit:1200/0*coCNr5jfemOW1rq2.png",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    ],
    type: "image",
    sectionHandle: "trending_slider",
    details: {
      content:
        "Add/edit payment icons using SVG code, uploaded images, or use your store's default payment icons.",
      positioning:
        "Choose where to display icons (e.g., above/below buy button)",
      layout: "Adjust icon size, spacing, and alignment",
      text: "Customize title text, font size, and color",
      colors: "Set background and text colors for the section",
      spacing: "Modify margins and padding around the icons",
      responsiveDesign: "Set different icon sizes for desktop and mobile",
      customPlacement: "Use provided code snippet for precise positioning",
    },
  },
  {
    title: "Payment icons",

    mediaList: [
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png?v=1753775517",
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png?v=1753775517",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    ],
    type: "image",
    sectionHandle: "payment_icons",
    description: "This section displays your payment options to customers.",
    details: {
      content:
        "Add/edit payment icons using SVG code, uploaded images, or use your store's default payment icons.",
      positioning:
        "Choose where to display icons (e.g., above/below buy button)",
      layout: "Adjust icon size, spacing, and alignment",
      text: "Customize title text, font size, and color",
      colors: "Set background and text colors for the section",
      spacing: "Modify margins and padding around the icons",
      responsiveDesign: "Set different icon sizes for desktop and mobile",
      customPlacement: "Use provided code snippet for precise positioning",
    },
  },
  {
    title: "Testimonial #8",
    mediaList: [
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
      "https://miro.medium.com/v2/resize:fit:1200/0*coCNr5jfemOW1rq2.png",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    ],
    type: "image",
    sectionHandle: "testimonial_8",
    description: "Display customer testimonials to build trust.",
    details: {
      content: "Display customer testimonials to build trust.",
      positioning:
        "Place testimonials in sections like homepage or product pages",
      layout: "Customize the layout for displaying customer reviews",
      text: "Customize the title and text of the testimonials",
      colors: "Choose background and text colors",
      spacing: "Control margins, padding, and spacing between reviews",
      responsiveDesign: "Adjust the testimonial section for desktop and mobile",
      customPlacement: "Place testimonials using the code snippet provided",
    },
  },
  {
    title: "Product video",

    mediaList: [
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/video.png?v=1753775614",
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png?v=1753775517",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    ],
    type: "video",
    sectionHandle: "product_video",
    description: "Showcase a product demo or introduction video.",
    details: {
      content: "Embed a product video from platforms like YouTube or Vimeo.",
      positioning: "Position video above or below product details",
      layout: "Adjust the size and alignment of the video",
      text: "Add custom text or title above the video",
      colors: "Set background colors for the video section",
      spacing: "Adjust padding around the video",
      responsiveDesign: "Optimize video for desktop and mobile view",
      customPlacement:
        "Place video anywhere in your store using the code snippet",
    },
  },
  {
    title: "Trust Badge",

    mediaList: [
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/video.png?v=1753775614",
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    ],
    type: "image",
    sectionHandle: "trust_badge",
    description: "This section shows trust badges for your store.",
    details: {
      content: "Add trust badges to your store for better customer trust.",
      positioning: "Place badges near checkout or product pages",
      layout: "Customize the layout and size of the badges",
      text: "Add text next to badges like 'Trusted Store' or 'Certified'",
      colors: "Choose color schemes for badges and text",
      spacing: "Adjust margins and padding for badge placement",
      responsiveDesign: "Ensure badges are responsive across devices",
      customPlacement: "Use provided code for custom badge placement",
    },
  },
  {
    title: "Shipping bar",
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    mediaList: [
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/video.png?v=1753775614",
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",

      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
    ],
    type: "image",
    sectionHandle: "shipping_bar",
    details: {
      content: "Add a shipping bar to display shipping offers or alerts.",
      positioning: "Position the bar at the top or bottom of the store",
      layout: "Customize the text, size, and layout of the shipping bar",
      text: "Add messages like 'Free Shipping' or 'Limited Time Offer'",
      colors: "Choose background and text colors for the shipping bar",
      spacing: "Control the padding and margins around the bar",
      responsiveDesign: "Ensure the shipping bar is responsive on mobile",
      customPlacement:
        "Use the code snippet to place the shipping bar anywhere",
    },
  },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const cardRefs = useRef([]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleModalClose = () => setShowModal(false);

  const handleSelect = (index) => {
    setActiveIndex(index);

    const card = cardRefs.current[index];
    if (card && scrollRef.current) {
      const container = scrollRef.current;
      const cardLeft = card.offsetLeft;
      const containerWidth = container.offsetWidth;
      const cardWidth = card.offsetWidth;
      const scrollTo = cardLeft - (containerWidth - cardWidth) / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const iconItems = [
    { label: "Popular", icon: <AiFillStar size={22} /> },
    { label: "Trending", icon: <AiOutlineFire size={22} /> },
    { label: "Newest", icon: <HiOutlineNewspaper size={22} /> },
    { label: "Free", icon: <AiOutlineGift size={22} /> },
    { label: "Features", icon: <BsDiamondFill size={20} /> },
    { label: "Testimonial", icon: <BiMessageRoundedDetail size={22} /> },
    { label: "Scrolling", icon: <FiArrowRight size={22} /> },
    { label: "Hero", icon: <MdImageSearch size={22} /> },
    { label: "Video", icon: <AiFillPlayCircle size={22} /> },
    { label: "Text", icon: <MdOutlineTextFields size={22} /> },
    { label: "Images", icon: <MdOutlineImage size={22} /> },
    { label: "Snippet", icon: <BiCodeBlock size={22} /> },
    { label: "Countdown Timer", icon: <BiTime size={22} /> },
    { label: "FAQ", icon: <MdOutlineQuestionAnswer size={22} /> },
    { label: "Image with Text", icon: <BiSolidImageAdd size={22} /> },
    { label: "Slider", icon: <BiSlideshow size={22} /> },
    { label: "Collection", icon: <MdCollectionsBookmark size={22} /> },
    { label: "Upsell", icon: <PiShoppingCartSimpleBold size={22} /> },
    { label: "Tabs", icon: <MdTab size={22} /> },
  ];

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const handleInstructionsModalClose = () => setShowInstructionsModal(false);
  const openInstructionsModal = () => {
    setShowInstructionsModal(true);
    setShowModal(false); // Close the current modal when instructions open
  };
  const [pageIndex, setPageIndex] = useState(0);
  const [isActive, setIsActive] = useState({});
  const maxPage = Math.ceil(trendingProducts.length / cardsPerPage);

  const scrollToPage = (direction) => {
    if (direction === "right" && pageIndex < maxPage - 1) {
      setPageIndex((prev) => prev + 1);
    } else if (direction === "left" && pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await fetch("/api/activeSection");
        const result = await res.json();
        if (res.ok) {
          const statusMap = {};
          result.sections.forEach((item) => {
            statusMap[item.sectionHandle] = item.status === "active";
          });
          setIsActive(statusMap);
        }
      } catch (err) {
        console.error("Failed to fetch section statuses:", err);
      }
    };

    fetchStatuses();
  }, []);
  const handleModalOpen = (product) => {
    setModalContent(product);
    setActiveImageIndex(0); // reset to first image
    setShowModal(true);
  };
  const toggleSectionStatus = async (sectionHandle) => {
    const selectedSection = trendingProducts.find(
      (p) => p.sectionHandle === sectionHandle,
    );
    const newStatus = !isActive[sectionHandle];

    setIsActive((prev) => ({
      ...prev,
      [sectionHandle]: newStatus,
    }));

    try {
      const res = await fetch("/api/activeSection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionHandle: selectedSection.sectionHandle,
          status: newStatus ? "active" : "inactive",
          imageUrl: selectedSection.media,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error("Metafield error:", result.error || result.errors);
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  const chunkedProducts = [];
  for (let i = 0; i < trendingProducts.length; i += cardsPerPage) {
    chunkedProducts.push(trendingProducts.slice(i, i + cardsPerPage));
  }
  return (
    <>
      <div style={{ padding: "var(--p-space-400)" }}>
        <Card
          padding="2"
          background="bg-surface"
          style={{
            borderRadius: 0,
            border: "1px solid #ddd",
          }}
        >
          <InlineGrid
            columns={{ xs: "1fr", md: "2fr 3fr" }}
            gap="0"
            alignItems="center"
          >
            <div style={{ padding: "var(--p-space-500)" }}>
              <BlockStack gap="300">
                <Text variant="headingMd" fontWeight="bold">
                  New — Get full access with one monthly subscription!
                </Text>
                <Text variant="bodyMd">
                  Subscribe once and unlock all sections instantly — no need to
                  buy individually. Perfect for developers, agencies, and
                  growing stores.
                </Text>
              </BlockStack>
            </div>

            <div
              style={{
                width: "100%",
                height: "130px",
                overflow: "hidden",
                padding: 0,
              }}
            >
              <img
                src="https://shopify-seo-pages-files.spocket.co/images/4db93bbe-7bb6-408e-8358-23b1f833b025"
                alt="Sections preview"
                style={{
                  width: "100%",
                  height: "130px",
                  objectFit: "cover",
                  objectPosition: "right",
                  display: "block",
                }}
              />
            </div>
          </InlineGrid>
        </Card>
      </div>

      <div
        style={{
          padding: "32px var(--p-space-400)",
        }}
      >
        <Text variant="headingMd" fontWeight="semibold" as="h2">
          Sections
        </Text>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {trendingProducts.map((item, index) => (
            <Card
              key={index}
              padding="0"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
                border: "1px solid #ddd",
              }}
            >
              <div
                style={{ width: "100%", height: "180px", overflow: "hidden" }}
              >
                {item.type === "image" ? (
                  <img
                    src={item.mediaList?.[0] || item.media}
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
                    src={item.mediaList?.[0] || item.media}
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
                  icon={<ViewIcon size={14} />}
                  onClick={() => handleModalOpen(item)}
                >
                  Preview
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px" }}>
        {showModal && (
          <Modal
            open={showModal}
            onClose={handleModalClose}
            title="Section Preview"
            primaryAction={{
              content: "Close",
              onAction: handleModalClose,
            }}
            size="large"
          >
            <Modal.Section>
              <div style={{ display: "flex", gap: "20px" }}>
                {/* Left: Media + Details */}
                <div style={{ flex: 1 }}>
                  <Card sectioned>
                    {modalContent.mediaList &&
                      modalContent.mediaList.length > 0 && (
                        <div
                          style={{ position: "relative", textAlign: "center" }}
                        >
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

                          {/* Prev Button */}
                          {activeImageIndex > 0 && (
                            <button
                              onClick={() =>
                                setActiveImageIndex((prev) => prev - 1)
                              }
                              style={sliderButtonStyle("left")}
                            >
                              ‹
                            </button>
                          )}

                          {/* Next Button */}
                          {activeImageIndex <
                            modalContent.mediaList.length - 1 && (
                            <button
                              onClick={() =>
                                setActiveImageIndex((prev) => prev + 1)
                              }
                              style={sliderButtonStyle("right")}
                            >
                              ›
                            </button>
                          )}
                        </div>
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
                            <strong>
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </strong>{" "}
                            {val}
                          </Text>
                        ),
                      )}
                    </Card>
                  </div>
                </div>

                {/* Right: Instructions */}
                <div style={{ flex: 0.5 }}>
                  <Card sectioned>
                    <Text variant="headingSm" fontWeight="bold">
                      How to Use This Section
                    </Text>
                    <Text
                      variant="bodyMd"
                      tone="subdued"
                      style={{ marginTop: "12px", lineHeight: 1.6 }}
                    >
                      1. Go to your Shopify Admin.
                      <br />
                      2. Open the theme editor and find the section where you'd
                      like to add the app block.
                      <br />
                      3. Click on 'Add block' and select the block you want.
                      <br />
                      4. Customize the block as needed.
                      <br />
                      5. Save changes. Done!
                    </Text>

                    <div style={{ marginTop: "20px" }}>
                      <Button
                        variant="primary"
                        onClick={() =>
                          window.open(
                            "https://new-one-practice.myshopify.com/admin/themes/current/editor",
                            "_blank",
                          )
                        }
                      >
                        Open Theme Editor
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </Modal.Section>
          </Modal>
        )}
      </div>
    </>
  );
}

const sliderButtonStyle = (position) => ({
  position: "absolute",
  top: "50%",
  [position]: "10px",
  transform: "translateY(-50%)",
  fontSize: "24px",
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 1,
});
