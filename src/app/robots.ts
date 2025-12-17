import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Bolehkan semua robot (Google, Bing, dll)
      allow: '/',     // Boleh akses semua halaman
      disallow: '/private/', // (Opsional) Melarang akses ke folder private jika ada
    },
    sitemap: 'https://guidify.app/sitemap.xml', // Memberitahu robot lokasi sitemap
  };
}