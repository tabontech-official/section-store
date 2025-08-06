// import {
//   Page,
//   Layout,
//   Card,
//   TextField,
//   Button,
//   Text,
//   Scrollable,
//   Thumbnail,
//   Modal,
// } from "@shopify/polaris";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { newestProducts, testimonialSections } from "./sections/sections";

// export default function ChatGPTPolaris() {
//   const [messages, setMessages] = useState([
//     { text: "Hello! Ask me to generate a Shopify section.", sender: "bot" },
//   ]);
//   const [userInput, setUserInput] = useState("");
//   const [matchedSections, setMatchedSections] = useState([]);
//   const [pageSections, setPageSections] = useState([]);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewData, setPreviewData] = useState(null);
//   const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
//   const chatEndRef = useRef(null);

//   const fetchChatGPTResponse = async (prompt) => {
//     const res = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama-3.3-70b-versatile",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are a Shopify section generator. 
// If the user asks for a single section (like "create testimonial section" or "add product slider"), return only one relevant section.

// If the user asks to "build a complete page", "make a landing page", or "design a homepage", then return multiple sections relevant to the request.

// Don't explain anything — just return keywords like 'testimonial', 'slider', or 'new arrival' in a sentence so we can match them.
// `,
//           },

//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         temperature: 0.3,
//       },
//       {
//         headers: {
//           Authorization: `Bearer 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`,
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     return res.data.choices[0].message.content;
//   };

//   const getRelevantSections = (response) => {
//     const lowerRes = response.toLowerCase();
//     const sections = [...newestProducts, ...testimonialSections];

//     const keywords = [
//       { keyword: "testimonial", source: testimonialSections },
//       { keyword: "review", source: testimonialSections },
//       { keyword: "new arrival", source: newestProducts },
//       { keyword: "product slider", source: newestProducts },
//     ];

//     const matched = new Set();

//     keywords.forEach(({ keyword, source }) => {
//       if (lowerRes.includes(keyword)) {
//         source.forEach((section) => matched.add(section));
//       }
//     });

//     sections.forEach((section) => {
//       if (lowerRes.includes(section.title.toLowerCase())) {
//         matched.add(section);
//       }
//     });

//     return Array.from(matched);
//   };
//   const [isFullPageMode, setIsFullPageMode] = useState(false);

//   const handleUserInput = async () => {
//     if (!userInput.trim()) return;

//     const newMessages = [...messages, { text: userInput, sender: "user" }];
//     setMessages(newMessages);
//     setUserInput("");
//     const isPageIntent = /page|homepage|landing|full/i.test(userInput);
//     setIsFullPageMode(isPageIntent);
//     const gptReply = await fetchChatGPTResponse(userInput);
//     const matched = getRelevantSections(gptReply);

//     setMessages((prev) => [...prev, { text: gptReply, sender: "bot" }]);
//     setMatchedSections(matched);

//     setPageSections((prev) => {
//       const existing = new Set(prev.map((sec) => sec.title));
//       const newUnique = matched
//         .filter((sec) => !existing.has(sec.title))
//         .map((sec) => ({ ...sec, customCss: "" }));
//       return [...prev, ...newUnique];
//     });
//   };

//   const openPreview = (item) => {
//     setPreviewData(item);
//     setPreviewOpen(true);
//   };

//   const exportPage = (sections) => {
//     const combined = sections
//       .map(
//         (sec, idx) =>
//           `<!-- Section ${idx + 1}: ${sec.title} -->\n{% section '${sec.title
//             .toLowerCase()
//             .replace(/\s+/g, "_")}' %}`,
//       )
//       .join("\n\n");

//     navigator.clipboard.writeText(combined);
//     alert("Liquid page copied to clipboard!");
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <Page title="Shopify AI Assistant">
//       <Layout>
//         <Layout.Section>
//           <Card padding="0">
//             <Scrollable
//               style={{ height: "400px", padding: "20px 24px" }}
//               shadow
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "12px",
//                 }}
//               >
//                 {messages.map((msg, idx) => (
//                   <div
//                     key={idx}
//                     style={{
//                       alignSelf:
//                         msg.sender === "user" ? "flex-end" : "flex-start",
//                       maxWidth: "75%",
//                       backgroundColor:
//                         msg.sender === "user" ? "#e0f7da" : "#ffffff",
//                       border: "1px solid #dcdcdc",
//                       borderRadius: "16px",
//                       padding: "12px 16px",
//                       wordBreak: "break-word",
//                     }}
//                   >
//                     <Text variant="bodyMd" as="p">
//                       <strong>
//                         {msg.sender === "user" ? "You:" : "AI Assistant:"}
//                       </strong>{" "}
//                       {msg.text}
//                     </Text>
//                   </div>
//                 ))}
//               </div>

//               {matchedSections.length > 0 && (
//                 <div style={{ marginTop: "28px" }}>
//                   <Text
//                     variant="headingSm"
//                     as="h3"
//                     style={{ marginBottom: "16px" }}
//                   >
//                     Suggested Sections
//                   </Text>

//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "16px",
//                     }}
//                   >
//                     {matchedSections.map((item, idx) => (
//                       <Card key={idx} padding="400" sectioned>
//                         <div
//                           style={{
//                             display: "flex",
//                             gap: "16px",
//                             flexWrap: "wrap",
//                           }}
//                         >
//                           <div style={{ flexShrink: 0 }}>
//                             <Thumbnail
//                               source={item.media}
//                               size="large"
//                               alt={item.title}
//                             />
//                           </div>

//                           <div style={{ flex: 1 }}>
//                             <div
//                               style={{ fontWeight: "600", fontSize: "16px" }}
//                             >
//                               {item.title}
//                             </div>
//                             <ul
//                               style={{ marginTop: "6px", paddingLeft: "18px" }}
//                             >
//                               {Object.entries(item.details).map(
//                                 ([key, value]) => (
//                                   <li key={key}>
//                                     <Text variant="bodySm" as="span">
//                                       <strong>{key}:</strong> {value}
//                                     </Text>
//                                   </li>
//                                 ),
//                               )}
//                             </ul>
//                             <div style={{ marginTop: "12px" }}>
//                               <Button onClick={() => openPreview(item)}>
//                                 Preview
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {pageSections.length > 0 && isFullPageMode && (
//                 <div style={{ marginTop: "40px" }}>
//                   <Text
//                     variant="headingSm"
//                     as="h3"
//                     style={{ marginBottom: "12px" }}
//                   >
//                     Full Page Preview
//                   </Text>
//                   <div style={{ marginTop: "16px" }}>
//                     <Button primary onClick={() => setFullPreviewOpen(true)}>
//                       View Full Page
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               <div ref={chatEndRef} />
//             </Scrollable>

//             {/* Chat Input */}
//             <div
//               style={{
//                 padding: "16px",
//                 borderTop: "1px solid #e1e3e5",
//                 backgroundColor: "#fafafa",
//                 display: "flex",
//                 gap: "12px",
//                 alignItems: "flex-end",
//               }}
//             >
//               <div style={{ flex: 1 }}>
//                 <TextField
//                   value={userInput}
//                   onChange={(val) => setUserInput(val)}
//                   onEnterPressed={handleUserInput}
//                   placeholder="Describe your desired section..."
//                   autoComplete="off"
//                 />
//               </div>
//               <Button primary onClick={handleUserInput}>
//                 Send
//               </Button>
//             </div>
//           </Card>
//         </Layout.Section>
//       </Layout>

//       {previewData && (
//         <Modal
//           open={previewOpen}
//           onClose={() => setPreviewOpen(false)}
//           title={previewData.title}
//           large
//           primaryAction={{
//             content: "Close",
//             onAction: () => setPreviewOpen(false),
//           }}
//         >
//           <Modal.Section>
//             <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//               <Thumbnail
//                 source={previewData.media}
//                 size="large"
//                 alt={previewData.title}
//               />
//               <div>
//                 <ul style={{ paddingLeft: 18 }}>
//                   {Object.entries(previewData.details).map(([key, value]) => (
//                     <li key={key}>
//                       <Text variant="bodySm" as="span">
//                         <strong>{key}:</strong> {value}
//                       </Text>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </Modal.Section>
//         </Modal>
//       )}

//       <div className="custom-wide-modal-wrapper">
//         <style>
//           {`
//       .Polaris-Modal-Dialog__Modal {
//         max-width: 96vw !important;
//         width: 96vw !important;
//       }
//       .Polaris-Modal__ModalWrapper {
//         padding-left: 0 !important;
//         padding-right: 0 !important;
//       }
//     `}
//         </style>

//         {fullPreviewOpen && (
//           <Modal
//             open={fullPreviewOpen}
//             onClose={() => setFullPreviewOpen(false)}
//             title="Full Page Builder"
//             large
//             primaryAction={{
//               content: "Close",
//               onAction: () => setFullPreviewOpen(false),
//             }}
//           >
//             <Modal.Section>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "24px",
//                   width: "100%",
//                   maxWidth: "100%",
//                 }}
//               >
//                 <div
//                   style={{
//                     flex: 1,
//                     maxHeight: "70vh",
//                     overflowY: "auto",
//                     paddingRight: 8,
//                   }}
//                 >
//                   {pageSections.map((section, idx) => (
//                     <Card key={idx} sectioned>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                       >
//                         <TextField
//                           label="Section Title"
//                           value={section.title}
//                           onChange={(val) => {
//                             const updated = [...pageSections];
//                             updated[idx].title = val;
//                             setPageSections(updated);
//                           }}
//                         />
//                         <Button
//                           destructive
//                           onClick={() => {
//                             const updated = [...pageSections];
//                             updated.splice(idx, 1);
//                             setPageSections(updated);
//                           }}
//                         >
//                           Delete
//                         </Button>
//                       </div>

//                       <div style={{ marginTop: "12px" }}>
//                         <Thumbnail
//                           source={section.media}
//                           alt={section.title}
//                           size="large"
//                         />
//                       </div>

//                       <TextField
//                         label="Custom CSS"
//                         multiline={4}
//                         value={section.customCss || ""}
//                         onChange={(val) => {
//                           const updated = [...pageSections];
//                           updated[idx].customCss = val;
//                           setPageSections(updated);
//                         }}
//                         autoComplete="off"
//                       />
//                     </Card>
//                   ))}
//                 </div>

//                 <div
//                   style={{
//                     flex: 1,
//                     border: "1px solid #ddd",
//                     borderRadius: "8px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "16px",
//                     maxHeight: "70vh",
//                     overflowY: "auto",
//                   }}
//                 >
//                   <Text
//                     variant="headingSm"
//                     as="h3"
//                     style={{ marginBottom: "12px" }}
//                   >
//                     Live Preview
//                   </Text>

//                   {pageSections.map((section, idx) => {
//                     const className = `section-preview-${idx}`;
//                     return (
//                       <div
//                         key={idx}
//                         className={className}
//                         style={{
//                           marginBottom: "24px",
//                           padding: "16px",
//                           border: "1px dashed #ccc",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         <style>{`
//         .${className} {
//           all: initial;
//         }
//         .${className} * {
//           all: revert;
//         }
//         .${className} ${section.customCss}
//       `}</style>

//                         <h3>{section.title}</h3>
//                         <img
//                           src={section.media}
//                           alt={section.title}
//                           style={{
//                             width: "100%",
//                             borderRadius: "4px",
//                             marginTop: "8px",
//                           }}
//                         />
//                         <p
//                           style={{
//                             marginTop: "8px",
//                             fontStyle: "italic",
//                             fontSize: "14px",
//                           }}
//                         >
//                           This block is styled with your custom CSS above.
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </Modal.Section>
//           </Modal>
//         )}
//       </div>
//     </Page>
//   );
// }
import { LegacyCard, TextContainer, Banner, Link,Page, Frame, Loading } from '@shopify/polaris';
import React from 'react';

function AIAgentBanner() {
  return (
    <Frame>
      <Loading/>
    <Page>
    <LegacyCard title="AI Assistant Update" sectioned>
      <TextContainer>
        <Banner status="info" title="Coming Soon" >
          <p>
            Our smart AI agent is launching in the next update with enhanced section-building and dynamic preview features.{" "}
            {/* <Link url="https://yourproductupdatesite.com" external>
              Learn more
            </Link> */}
          </p>
        </Banner>

        <p>You’ll be able to generate full pages and editable sections directly via AI.</p>
      </TextContainer>
    </LegacyCard>
    </Page>
    </Frame>
  );
}

export default AIAgentBanner;
