export default function manifest() {
  return {
    name: 'Turuchi Law Firm',
    short_name: 'Turuchi Law',
    description: 'Expert legal representation in NJ for Personal Injury, Immigration, Workers Comp & Municipal Court matters',
    start_url: '/',
    display: 'standalone',
    background_color: '#1c314e',
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
