import PageHeader from "@components/pages/header";
import Section1 from "@components/common/section1";
import LegalShell from "@components/pages/legal/legalShell";
import LegalBody from "@components/pages/legal/legalBody";

/**
 * Renders a legal document authored in Sanity.
 *
 * The three legal routes each ship a hard-coded fallback (the approved
 * wording as delivered). Once a matching `legalPage` document exists in the
 * Studio, this takes over — so the firm can revise the policies without a
 * deploy, and nothing goes blank if the document is deleted.
 */
const CmsLegalPage = ({ doc, fallbackImage = "/assets/images/laws.jpg", breadcrumbLabel }) => {
  const header = doc?.pageHeader || {};

  const railSections = (doc?.sections || [])
    .filter((s) => s?.heading)
    .map((s, i) => ({
      id: s.anchor || `section-${i + 1}`,
      label: s.heading,
    }));

  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow || "Legal"}
        text={header.heading || doc?.title}
        text2={header.headingHighlight}
        description={header.description}
        image={header.backgroundImage?.asset?.url || fallbackImage}
        breadcrumbs={[{ label: breadcrumbLabel || doc?.title }]}
      />

      <Section1>
        <LegalShell
          sections={railSections}
          effectiveDate={doc?.effectiveDate}
          lastUpdated={doc?.lastUpdated}
          related={doc?.relatedLinks || []}
          showContactCard={doc?.showContactCard !== false}
          contactCardHeading={doc?.contactCardHeading || "Questions about this policy?"}
        >
          <LegalBody intro={doc?.intro} callout={doc?.callout} sections={doc?.sections || []} />
        </LegalShell>
      </Section1>
    </>
  );
};

export default CmsLegalPage;
