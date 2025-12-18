import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // --- KONEKSI KE API SNAP-VIDEO3 (SAMA DENGAN YOUTUBE/IG) ---
    // Menggunakan Endpoint Download yang sama persis dengan file YouTube Anda
    const options = {
      method: 'POST',
      url: 'https://snap-video3.p.rapidapi.com/download',
      headers: {
        'x-rapidapi-key': '99a1ef12a8mshb19eeedbfeab2a2p118655jsn35cd073a59d2', // Key Asli Anda dari file YouTube
        'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({ url: url })
    };

    console.log("🔍 TikTok API Request:", url);

    const response = await axios.request(options);
    const data = response.data;

    // --- LOGIKA FILTER HASIL ---
    if (data && data.medias && data.medias.length > 0) {
        
        // Cari Video No Watermark
        // (SnapTik biasanya menaruh video terbaik/no-watermark di urutan awal atau yang extensionnya mp4)
        const videoItem = data.medias.find((m: any) => m.extension === 'mp4' && !m.video_only) 
                       || data.medias[0];

        // Format Data untuk Frontend TikTok
        // Kita sesuaikan field-nya dengan apa yang Frontend TikTok harapkan
        const formattedData = {
            title: data.title || "TikTok Video",
            thumbnail: data.thumbnail,
            author: data.source || "TikTok User", 
            downloadUrl: videoItem.url 
        };

        return NextResponse.json({ data: formattedData });

    } else {
        return NextResponse.json({ 
            error: 'Video tidak ditemukan atau Link Private.' 
        }, { status: 404 });
    }

  } catch (error: any) {
    console.error('[TikTok API Error]:', error.response?.data || error.message);
    return NextResponse.json({ 
        error: 'Gagal menghubungi server penyedia.' 
    }, { status: 500 });
  }
}