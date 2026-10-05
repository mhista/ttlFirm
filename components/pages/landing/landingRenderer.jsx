"use client";
import { SECTION_COMPONENTS } from "@components/pages/landing/landingSections";

/**
 * Walks the section list a landing page was built from in Sanity and renders
 * each block. An unknown `_type` is skipped rather than throwing, so adding a
 * new section type to the schema can never take a live campaign page down.
 */
const LandingRenderer = ({ sections = [], phone, contact }) => (
  <>
    {sections.map((section, index) => {
      const Component = SECTION_COMPONENTS[section?._type];
      if (!Component) return null;
      return (
        <Component key={section._key || index} data={section} phone={phone} contact={contact} />
      );
    })}
  </>
);

export default LandingRenderer;
