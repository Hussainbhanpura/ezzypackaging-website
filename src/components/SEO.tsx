"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/site.config";

type SEOProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
};

export function SEO({
  title = SITE_NAME,
  description = SITE_DESCRIPTION,
  canonicalPath,
  noIndex = false,
}: SEOProps) {
  const pathname = usePathname() || "/";
  const canonical = `${SITE_URL}${canonicalPath ?? pathname}`;

  const metaTitle = title;
  const metaDescription = description;

  return (
    <Head>
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <meta name="description" content={metaDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Head>
  );
}


