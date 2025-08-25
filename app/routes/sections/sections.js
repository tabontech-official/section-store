import { code as rehanSection } from "./section/rehan-section-001";
import { code as Backpack } from "./section/back-packs";
import {code as featuredSection} from "./section/featured-section"
import {code as circleSection} from './section/circle-banner'
import {code as collectionGrid} from "./section/collection-grid"
import {code as counterSection} from "./section/counter"

import {
  code as newArrival1,
  newArrival1Javascript,
  newArrival1Css,
  newArrival1Schema,
} from "./section/new-arrival-1";

function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const newestProducts = [
  {
    id: "001",
    title: "new Backpack 101",
    category: "Slider",
    keywords: ["slider", "layout", "new", "arrival","Backpack"],
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
    code: Backpack,
    js: newArrival1Javascript,
    css: newArrival1Css,
    schema: newArrival1Schema,
    references: ["002"],
    launchedDate: "2025-01-20",
    lastModified: "2025-02-18",
  },
  {
    id: "002",
    title: "Featured Section 102",
    category: "Popular",
    keywords: ["rehan", "custom", "testimonial", "review","featured"],
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png",
    type: "image",
    price: "Premium",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: featuredSection,
    js: newArrival1Javascript,
    css: newArrival1Css,
    schema: newArrival1Schema,

    references: ["001"],
    launchedDate: "2025-01-15",
    lastModified: "2025-02-10",
  },
  {
    id: "003",
    title: "Circle Banner 103",
    category: "Popular",
    keywords: ["rehan", "custom", "testimonial", "review","circle banner"],
    media:
      "https://cdn.shopify.com/s/files/1/0654/1210/4348/files/buy_it_now.png",
    type: "image",
    price: "Premium",
    details: {
      "Slider Layout": "Adjust number of visible slides, spacing, and width",
      Colors: "Change background, text, button, and navigation colors",
      Button: 'Modify text, link, size, and style of the "View All" button',
      Typography: "Select custom fonts and adjust sizes for all text elements",
      Spacing: "Fine-tune padding and margins for the entire section",
    },
    code: circleSection,
    js: newArrival1Javascript,
    css: newArrival1Css,
    schema: newArrival1Schema,

    references: ["002"],
    launchedDate: "2025-01-15",
    lastModified: "2025-02-10",
  },
  {
    id: "004",
    title: "Collection Grid 104",
    category: "Popular",
    keywords: ["rehan", "custom", "testimonial", "review","collection"],
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
    code: collectionGrid,
    js: newArrival1Javascript,
    css: newArrival1Css,
    schema: newArrival1Schema,

    references: ["003", "002", "001"],
    launchedDate: "2025-01-15",
    lastModified: "2025-02-10",
  },
  {
    id: "005",
    title: "Flip Counter 105",
    category: "Popular",
    keywords: ["rehan", "custom", "testimonial", "review","counter"],
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
    code: counterSection,
    js: newArrival1Javascript,
    css: newArrival1Css,
    schema: newArrival1Schema,

    references: ["004"],
    launchedDate: "2025-01-15",
    lastModified: "2025-02-10",
  },
    {
    id: "006",
    title: "Flip Counter 106",
    category: "Popular",
    keywords: ["rehan", "custom", "testimonial", "review","counter"],
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
    code: counterSection,
    js: newArrival1Javascript,
    css: newArrival1Css,
    schema: newArrival1Schema,

    references: ["004"],
    launchedDate: "2025-01-15",
    lastModified: "2025-02-10",
  },

];

export const sectionsCatalog = newestProducts.map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  keywords: item.keywords,
  imageUrl: item.media,
  sectionHandle: slugify(item.title),
  code: item.code,
  js: item.js,
  css: item.css,
  schema:item.schema,
  price: item.price,
  references: item.references,
  launchedDate: item.launchedDate,
  lastModified: item.lastModified,
}));
