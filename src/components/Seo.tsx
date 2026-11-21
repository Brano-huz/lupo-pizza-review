import Head from "next/head";
import { siteUrl } from "../lib/siteUrl";

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
}

export default function Seo({ title, description, canonical, image, jsonLd }: SeoProps) {
  const ogImage = image ?? siteUrl("/images/hero-pizza.jpg");

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="noindex, nofollow" />

      <meta property="og:site_name" content="LUPO Pizza" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="sk_SK" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Čerstvá pizza z pizzerie LUPO" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </Head>
  );
}
