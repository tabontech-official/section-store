import { useEffect, useMemo, useState } from "react";
import {
  Page,
  Text,
  Button,
  Icon,
  MediaCard,
  VideoThumbnail,
  Frame,
  Layout,
  Card,
  InlineStack,
  Toast,
  Loading,
  Banner,
  Link,
  Popover,
  ActionList,
  Badge,
} from "@shopify/polaris";
import {
  EmailIcon,
  LiveIcon,
  LogoYoutubeIcon,
  SendIcon,
  ViewIcon,
} from "@shopify/polaris-icons";

export default function SectionDashboard() {
  const [addedSections, setAddedSections] = useState([]);
  const [plan, setPlan] = useState("Starter");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [cardPopoverActiveIndex, setCardPopoverActiveIndex] = useState(null);

  const [themes, setThemes] = useState([]);
  const [themesLoading, setThemesLoading] = useState(false);
  const [themesLoaded, setThemesLoaded] = useState(false);
  const [addedToThemeIds, setAddedToThemeIds] = useState([]);
  const [headerPopoverActive, setHeaderPopoverActive] = useState(false);
  const [shopHandle, setShopHandle] = useState("");

  useEffect(() => {
    fetch("/api/fetchaddedSection")
      .then((res) => res.json())
      .then((data) => {
        setAddedSections(data || []);
        // setAddedToThemeIds(data.map((s) => s.sectionHandle)); // mark already-added
      });

    fetch("/api/section-access")
      .then((res) => res.json())
      .then((data) => {
        setShopHandle(data.shop || "");
        setPlan(data.plan || "Starter");
      });
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const fetchThemes = async () => {
    if (themesLoaded || themesLoading) return;
    try {
      setThemesLoading(true);
      const res = await fetch("/api/themes");
      const data = await res.json();
      setThemes(data?.themes || []);
      setThemesLoaded(true);
    } finally {
      setThemesLoading(false);
    }
  };

  const openCardPopover = async (i) => {
    await fetchThemes();
    setCardPopoverActiveIndex(i);
  };

  const closeAllPopovers = () => {
    setCardPopoverActiveIndex(null);
  };

  const themeBadgeTone = (role) => {
    switch (role) {
      case "main":
        return "success";
      case "development":
        return "attention";
      case "unpublished":
      default:
        return "info";
    }
  };

  const handleAddToTheme = async (section, theme) => {
    const res = await fetch("/api/add-to-theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sectionTitle: section.sectionHandle,
        imageUrl: section.imageUrl,
        themeId: `gid://shopify/OnlineStoreTheme/${theme?.id}`,
        title: section.title || section.sectionHandle,
        content: section.code,
      }),
    });

    const data = await res.json();

    if (res.status === 403) {
      setBannerMessage(
        "You’ve reached your section limit. Please upgrade your plan.",
      );
      setBannerLink("/app/pricing");
      setShowBanner(true);
    } else if (res.status === 409) {
      setBannerMessage("This section is already added to your theme.");
      setBannerLink("");
      setShowBanner(true);
    } else if (data.success) {
      setToastMessage("Section added to theme successfully!");
      setShowToast(true);
      setAddedToThemeIds((prev) => [
        ...new Set([...prev, section.sectionHandle]),
      ]);
    } else {
      setToastMessage("Failed to add section.");
      setShowToast(true);
    }

    closeAllPopovers();
  };

  const themeItemsForSection = (section) =>
    (themes || []).map((t) => ({
      content: (
        <InlineStack align="space-between" blockAlign="center">
          <span>{t.name}</span>
          <Badge tone={themeBadgeTone(t.role)}>{t.role}</Badge>
        </InlineStack>
      ),
      onAction: () => handleAddToTheme(section, t),
    }));
  const headerThemeItems = useMemo(
    () =>
      (themes || []).map((t) => {
        const storeHandle = shopHandle.replace(".myshopify.com", "");

        return {
          content: (
            <InlineStack align="space-between" blockAlign="center">
              <span>{t.name}</span>
              <Badge tone={themeBadgeTone(t.role)}>{t.role}</Badge>
            </InlineStack>
          ),
          onAction: () => {
            const url = `https://admin.shopify.com/store/${storeHandle}/themes/${t.id}/editor`;
            window.open(url, "_blank");
            closeAllPopovers();
          },
        };
      }),
    [themes, shopHandle],
  );

  const openHeaderPopover = async () => {
    await fetchThemes();
    setHeaderPopoverActive(true);
  };


const handleRemoveFromTheme = async (section) => {
  try {
    const res = await fetch("/api/remove-from-theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sectionTitle: section.sectionHandle }), // 👈 sectionHandle bhej rahe hain
    });

    const data = await res.json();

    if (data.success) {
      setToastMessage("Section removed from theme!");
      setShowToast(true);

      // ✅ DB se bhi nikal do (frontend state update)
      setAddedToThemeIds((prev) =>
        prev.filter((id) => id !== section.sectionHandle)
      );

      // ✅ "addedSections" se bhi delete karna hai (optional)
      setAddedSections((prev) =>
        prev.filter((s) => s.sectionHandle !== section.sectionHandle)
      );
    } else {
      setToastMessage(data.error || "Failed to remove section.");
      setShowToast(true);
    }
  } catch (err) {
    console.error(err);
    setToastMessage("Server error while removing.");
    setShowToast(true);
  }
};

useEffect(() => {
  fetch("/api/deletebutton") 
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setAddedToThemeIds(data.map((s) => s.sectionTitle));
      }
    });
}, []);

  return (
    <Frame>
      {themesLoading && <Loading />}

      <Page>
        {showBanner && (
          <Banner
            title="Section Notice"
            status="warning"
            onDismiss={() => {
              setShowBanner(false);
              setBannerMessage("");
              setBannerLink("");
            }}
          >
            <p>
              {bannerMessage}
              {bannerLink && (
                <>
                  {" "}
                  <Link url={bannerLink}>Upgrade your plan</Link>
                </>
              )}
            </p>
          </Banner>
        )}
        <div
          style={{
            maxWidth: "940px",
            margin: "40px auto 24px auto",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#f1f1f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </div>
            <div>
              <Text variant="bodyMd" fontWeight="medium">
                Theme editor
              </Text>
              <Text variant="bodySm" tone="subdued">
                You can add & edit sections on any theme in your store.
              </Text>
            </div>
          </div>

          <Popover
            active={headerPopoverActive}
            autofocusTarget="none"
            preferredAlignment="right"
            sectioned={false}
            onClose={closeAllPopovers}
            activator={
              <Button
                disclosure
                onClick={openHeaderPopover}
                loading={themesLoading}
              >
                Customize in
              </Button>
            }
          >
            <div style={{ minWidth: "160px", maxWidth: "220px" }}>
              <ActionList
                items={
                  themesLoading
                    ? [{ content: "Loading themes..." }]
                    : headerThemeItems.length
                      ? headerThemeItems
                      : [{ content: "No themes found" }]
                }
              />
            </div>
          </Popover>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: 20,
          }}
        >
          {addedSections.map((section, i) => {
            const popoverActive = cardPopoverActiveIndex === i;
            return (
              <div
                key={i}
                style={{
                  width: 220,
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <div style={{ width: "100%", height: 120, overflow: "hidden" }}>
                  <img
                    src={section.imageUrl}
                    alt={section.sectionHandle}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "10px 12px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text fontWeight="medium" variant="bodySm">
                    {section.sectionHandle.replace(/-/g, " ")}
                  </Text>
                  <Icon source={ViewIcon} color="subdued" />
                </div>

                {/* <div style={{ padding: "0 12px 12px" }}>
                  <Popover
                    active={popoverActive}
                    onClose={closeAllPopovers}
                    preferredAlignment="left"
                    sectioned={false}
                    activator={
                      <Button
                        fullWidth
                        variant="primary"
                        size="slim"
                        disabled={addedToThemeIds.includes(
                          section.sectionHandle,
                        )}
                        onClick={() => openCardPopover(i)}
                        loading={themesLoading && popoverActive}
                      >
                        {addedToThemeIds.includes(section.sectionHandle)
                          ? "Already Added"
                          : "Add to theme"}
                      </Button>
                    }
                  >
                    <div style={{ minWidth: "160px", maxWidth: "220px" }}>
                      <ActionList
                        items={
                          themesLoading
                            ? [{ content: "Loading themes..." }]
                            : themes?.length
                              ? themeItemsForSection(section)
                              : [{ content: "No themes found" }]
                        }
                      />
                    </div>
                  </Popover>
                </div> */}
                <div style={{ padding: "0 12px 12px" }}>
  {addedToThemeIds.includes(section.sectionHandle) ? (
    <Button
      fullWidth
      tone="critical"
      size="slim"
      onClick={() => handleRemoveFromTheme(section)}
    >
      Delete from theme
    </Button>
  ) : (
    // ✅ Agar abhi add nahi hua hai
    <Popover
      active={popoverActive}
      onClose={closeAllPopovers}
      preferredAlignment="left"
      sectioned={false}
      activator={
        <Button
          fullWidth
          variant="primary"
          size="slim"
          onClick={() => openCardPopover(i)}
          loading={themesLoading && popoverActive}
        >
          Add to theme
        </Button>
      }
    >
      <div style={{ minWidth: "160px", maxWidth: "220px" }}>
        <ActionList
          items={
            themesLoading
              ? [{ content: "Loading themes..." }]
              : themes?.length
              ? themeItemsForSection(section)
              : [{ content: "No themes found" }]
          }
        />
      </div>
    </Popover>
  )}
</div>

              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 40 }}>
          <Text variant="headingMd" fontWeight="medium">
            Quick Guide
          </Text>
          <Text tone="subdued">See how Section Store works like magic</Text>

          <div style={{ marginTop: 20 }}>
            <MediaCard
              title="How to Add a Section to Your Theme"
              primaryAction={{
                content: "Watch video",
                onAction: () => {
                  window.open(
                    "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/how-to-video-cover.jpg",
                    "_blank",
                  );
                },
              }}
              description="Learn how to add and edit Shopify sections in seconds using our visual section store."
              popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
            >
              <VideoThumbnail
                videoLength={127}
                thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                onClick={() =>
                  window.open(
                    "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/how-to-video-cover.jpg",
                    "_blank",
                  )
                }
              />
            </MediaCard>
          </div>
        </div>
        {showToast && (
          <Toast content={toastMessage} onDismiss={() => setShowToast(false)} />
        )}
      </Page>
    </Frame>
  );
}
