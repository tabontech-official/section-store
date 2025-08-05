import {
  Card,
  BlockStack,
  Text,
  Button,
  InlineGrid,
  TextField,
  Icon,
  Page
} from "@shopify/polaris";
import { SearchIcon, FilterIcon } from "@shopify/polaris-icons";
import { useState, useRef } from "react";
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
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  MdImageSearch,
  MdOutlineTextFields,
  MdOutlineImage,
  MdCollectionsBookmark,
  MdOutlineQuestionAnswer,
} from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

export default function PromoBanner() {
  const [query, setQuery] = useState("");
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);
  const cardRefs = useRef([]);
  const handleSelect = (index) => {
    setActiveIndex(index);

    const card = cardRefs.current[index];
    if (card && scrollRef.current) {
      const container = scrollRef.current;
      const cardLeft = card.offsetLeft;
      const containerWidth = container.offsetWidth;
      const cardWidth = card.offsetWidth;
      const scrollTo = cardLeft - (containerWidth - cardWidth) / 2;
      const trendingScrollRef = useRef(null);

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

  const trendingProducts = [
    {
      title: "Trust box",
      media:
        "https://miro.medium.com/v2/resize:fit:1200/0*coCNr5jfemOW1rq2.png",
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

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };
const trendingScrollRef = useRef(null);

  return (
    <Page>

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
                  New — Build your own bundle & save up to 25%!
                </Text>
                <Text variant="bodyMd">
                  Bonus feature: Buy sections for another store — great for
                  working with dev stores.
                </Text>
                {/* <div>
                  <Button tone="success" variant="primary">
                    Build your bundle now
                  </Button>
                </div> */}
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
            <div style={{ width: "70%" }}>
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

 

    </Page>
  );
}
