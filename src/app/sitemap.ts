import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL website kamu
  const baseUrl = 'https://guidify.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1, // Prioritas tertinggi untuk halaman utama
    },
    // Jika nanti kamu punya halaman lain (misal /about), tinggal tambahkan di sini
  ];
}