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
    media: "https://miro.medium.com/v2/resize:fit:1200/0*coCNr5jfemOW1rq2.png",
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
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png?v=1753775517",
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
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
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
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
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
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/testimonials.png?v=1753775579",
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
  const handleModalOpen = (product) => {
    setModalContent(product);
    setShowModal(true);
  };

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
          paddingInline: "var(--p-space-400)",
          paddingBlock: "var(--p-space-300)",
        }}
      >
        <div
          style={{
            background: "var(--p-color-bg-surface)",
            paddingInline: "var(--p-space-400)",
            paddingBlock: "var(--p-space-300)",
            borderRadius: "var(--p-border-radius-400)",
            border: "1px solid var(--p-color-border)",
            boxShadow: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--p-space-300)",
            }}
          >
            {/* Search Input */}
            <div style={{ width: "80%" }}>
              <TextField
                value={query}
                onChange={setQuery}
                placeholder="Search for sections"
                autoComplete="off"
                prefix={<Icon source={SearchIcon} tone="subdued" />}
                borderless
                clearButton
              />
            </div>

            {/* Buttons aligned right */}
            <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>
              <div style={{ display: "flex", gap: "var(--p-space-200)" }}>
                <Button variant="tertiary" icon={FiArrowRight}>
                  Build Your Bundle
                </Button>
                <Button variant="primary" icon={FilterIcon}>
                  Categories
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          marginTop: "20px",
          paddingInline: "var(--p-space-400)",
          background: "transparent",
        }}
      >
        <button
          onClick={() => scroll("left")}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "transparent",
            border: "1px solid #d1d1d1",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#000",
          }}
        >
          <FiChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "transparent",
            border: "1px solid #d1d1d1",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#000",
          }}
        >
          <FiChevronRight />
        </button>

        <div
          ref={scrollRef}
          style={{
            overflowX: "auto",
            display: "flex",
            gap: "40px",
            padding: "16px 32px",
            background: "transparent",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="hide-scrollbar"
        >
          {iconItems.map((item, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                flex: "0 0 auto",
                color: "#292929ff",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              <div style={{ marginBottom: "4px" }}>{item.icon}</div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "32px var(--p-space-400)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Text variant="headingMd" fontWeight="semibold" as="h2">
          Trending Now
        </Text>

        {pageIndex > 0 && (
          <button
            onClick={() => setPageIndex((prev) => prev - 1)}
            style={scrollButtonStyle("left")}
          >
            <FiChevronLeft />
          </button>
        )}
        {pageIndex < maxPage - 1 && (
          <button
            onClick={() => setPageIndex((prev) => prev + 1)}
            style={scrollButtonStyle("right")}
          >
            <FiChevronRight />
          </button>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {chunkedProducts[pageIndex]?.map((item, index) => (
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
      {showModal && (
        <Modal
          open={showModal}
          onClose={handleModalClose}
          title="Section Preview"
          primaryAction={{
            content: "Close",
            onAction: handleModalClose,
          }}
          size="large" // You can use this if the modal provides it
          style={{ maxWidth: "80vw", width: "80%" }} // Custom width style to increase modal width
        >
          <Modal.Section>
            <div style={{ display: "flex" }}>
              {/* Left Side Card for Image and Details */}
              <div style={{ flex: 1, paddingRight: "20px" }}>
                {/* Image Card */}
                <Card sectioned>
                  <img
                    src={modalContent.media}
                    alt={modalContent.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Card>

                {/* Gap Between Image and Details */}
                <div style={{ marginBottom: "20px" }}></div>

                {/* Details Card */}
                <Card sectioned>
                  <Text variant="headingSm" fontWeight="bold">
                    Details:
                  </Text>
                  <Text
                    variant="bodyMd"
                    tone="subdued"
                    style={{ marginTop: "8px" }}
                  >
                    <strong>Content:</strong> {modalContent.details?.content}
                  </Text>
                  <Text variant="bodyMd" tone="subdued">
                    <strong>Positioning:</strong>{" "}
                    {modalContent.details?.positioning}
                  </Text>
                  <Text variant="bodyMd" tone="subdued">
                    <strong>Layout:</strong> {modalContent.details?.layout}
                  </Text>
                  <Text variant="bodyMd" tone="subdued">
                    <strong>Text:</strong> {modalContent.details?.text}
                  </Text>
                  <Text variant="bodyMd" tone="subdued">
                    <strong>Colors:</strong> {modalContent.details?.colors}
                  </Text>
                  <Text variant="bodyMd" tone="subdued">
                    <strong>Spacing:</strong> {modalContent.details?.spacing}
                  </Text>
                  <Text variant="bodyMd" tone="subdued">
                    <strong>Responsive Design:</strong>{" "}
                    {modalContent.details?.responsiveDesign}
                  </Text>
                  <Text variant="bodyMd" tone="subdued">
                    <strong>Custom Placement:</strong>{" "}
                    {modalContent.details?.customPlacement}
                  </Text>
                </Card>
              </div>

              {/* Right Side Card for Monthly Charges */}
              <div
                style={{
                  flex: 0.4,
                  paddingLeft: "20px",
                  minHeight: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  sectioned
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    variant="headingSm"
                    fontWeight="bold"
                    style={{ marginBottom: "8px" }}
                  >
                    Section Store
                  </Text>

                  {/* Text Content */}
                  <div style={{ marginBottom: "20px" }}>
                    <Text
                      variant="bodyMd"
                      tone="subdued"
                      style={{ marginTop: "8px", marginBottom: "12px" }}
                    >
                      You can use this app on a monthly subscription basis.
                      Click below to view instructions on how to use the app
                      blocks in your theme.
                    </Text>
                  </div>

                  {/* Button with added margin */}
                  <div>
                    <Button
                      onClick={openInstructionsModal}
                      style={{ marginTop: "20px" }}
                    >
                      View Instructions
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </Modal.Section>
        </Modal>
      )}

      {/* Instructions Modal */}
     {showInstructionsModal && (
  <Modal
    open={showInstructionsModal}
    onClose={handleInstructionsModalClose}
    title="Instructions"
    primaryAction={{
      content: "Close",
      onAction: handleInstructionsModalClose,
    }}
  >
    <Modal.Section>
      <Card sectioned>
        <Text variant="headingSm" fontWeight="bold">
          How to Use App Blocks in Your Theme
        </Text>
        <Text variant="bodyMd" tone="subdued" style={{ marginTop: "12px" }}>
          1. Go to your Shopify Admin.
          <br />
          2. Open the theme editor and find the section where you'd like to add the app block.
          <br />
          3. Click on 'Add block' and select the app block you want to add.
          <br />
          4. Customize the block content as needed and save your changes.
          <br />
          5. The app block will now render dynamically in the theme based on the settings you configured.
        </Text>
      </Card>

      {/* Button to open Theme Customizer */}
     <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
  <Button
    onClick={() => window.open('https://new-one-practice.myshopify.com/admin/themes/current/editor', '_blank')}
    variant="primary"
  >
    Demo
  </Button>
</div>

    </Modal.Section>
  </Modal>
)}

    </>
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
