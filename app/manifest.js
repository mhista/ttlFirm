export default function manifest() {
  return {
    name: 'The Turuchi Law Firm, LLC',
    short_name: 'Turuchi Law Firm',
    description: "New Jersey personal injury and workers' compensation representation. Free consultation.",
    start_url: '/',
    display: 'standalone',
    background_color: '#0A2340',
    theme_color: '#D97706',
    icons: [
      {
        src: '/assets/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
