export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.ezzypackagingsolutions.com/sitemap.xml',
    host: 'https://www.ezzypackagingsolutions.com',
  }
}


