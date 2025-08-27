import { useState } from "react";
import PromoBanner from "./MainSection/Header";
import FreeSection from "./MainSection/FreeSection";
import NewestSlider from "./MainSection/Newest";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <PromoBanner onCategorySelect={setSelectedCategory} />
      <FreeSection selectedCategory={selectedCategory} />
      <NewestSlider selectedCategory={selectedCategory} />
    </>
  );
}
