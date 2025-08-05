import { SECTION_ACCESS } from "./plans";

export function isSectionAllowed(plan, section) {
  return SECTION_ACCESS[plan]?.includes(section) || false;
}