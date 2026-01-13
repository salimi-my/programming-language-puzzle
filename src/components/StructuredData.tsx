export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Programming Language Puzzle Solver",
    description:
      "Interactive logic puzzle solver demonstrating formal Rules of Inference from discrete mathematics. Solve the programming language challenge using constraint satisfaction and step-by-step logical deduction.",
    url: "https://puzzle.salimi.my",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Discrete Structures Group 1",
      member: [
        { "@type": "Person", name: "Azmeer" },
        { "@type": "Person", name: "Ikram" },
        { "@type": "Person", name: "Syah" },
        { "@type": "Person", name: "Hafiy" },
        { "@type": "Person", name: "Salimi" },
      ],
    },
    provider: {
      "@type": "EducationalOrganization",
      name: "Universiti Teknologi MARA",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    educationalLevel: "Undergraduate",
    learningResourceType: "Interactive Tool",
    isAccessibleForFree: true,
    featureList: [
      "Automated logic puzzle solver",
      "Manual solving mode",
      "Step-by-step visualization",
      "Formal Rules of Inference",
      "Constraint Satisfaction Problem solving",
      "Real-time validation",
      "Proof tree visualization",
    ],
    keywords:
      "logic puzzle, discrete structures, rules of inference, constraint satisfaction, CSP solver, formal logic, programming languages, educational tool",
    inLanguage: "en-US",
    datePublished: "2026-01-13",
    dateModified: "2026-01-13",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
