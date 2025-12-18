import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // --- TEMPEL API KEY RAPIDAPI ANDA DISINI ---
    // Pastikan ini key yang sama dengan yang dipakai di Instagram
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'MASUKKAN_KEY_RAPIDAPI_ANDA_DISINI'; 
    const API_HOST = 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'; 

    // Panggil RapidAPI dari Server (Aman)
    const response = await fetch(`https://${API_HOST}/vid/index?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch from provider' }, { status: 500 });
    }

    // Format Data agar Rapi untuk Frontend
    const formattedData = {
        title: data.description || "TikTok Video",
        thumbnail: data.cover,
        author: data.author?.nickname || "User",
        downloadUrl: data.video[0] // Link Video No Watermark
    };

    return NextResponse.json({ data: formattedData });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}