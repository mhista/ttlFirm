export default function robots() {
  const baseUrl = "https://turuchilawfirm.com"; // Replace with your actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/sanity/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
