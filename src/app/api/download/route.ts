import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // --- MENGGUNAKAN SNAP VIDEO (All-in-One) ---
    // Hemat Biaya: Satu API untuk TikTok, IG, dan YouTube
    const options = {
      method: 'POST',
      url: 'https://snap-video3.p.rapidapi.com/download',
      headers: {
        'x-rapidapi-key': '99a1ef12a8mshb19eeedbfeab2a2p118655jsn35cd073a59d2', // Kunci Sakti Anda
        'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({ url: url })
    };

    console.log("Processing TikTok via SnapVideo:", url);

    const response = await axios.request(options);
    const data = response.data;

    // --- LOGIKA MAPPING DATA SNAP VIDEO UNTUK TIKTOK ---
    if (data && data.medias && data.medias.length > 0) {
        
        // 1. Cari Video HD (No Watermark)
        // SnapVideo biasanya menandai video HD tanpa watermark dengan extension mp4
        const videoItem = data.medias.find((m: any) => m.extension === 'mp4' && !m.video_only && m.quality !== 'watermark') 
                       || data.medias.find((m: any) => m.extension === 'mp4');

        // 2. Cari Audio
        const audioItem = data.medias.find((m: any) => m.extension === 'mp3');

        return NextResponse.json({
            message: 'Success',
            data: {
                title: data.title || "TikTok Video",
                thumbnail: data.thumbnail,
                // Pastikan link video terambil
                noWatermark: videoItem ? videoItem.url : null,
                // Pastikan link audio terambil
                audio: audioItem ? audioItem.url : null
            }
        }, { status: 200 });

    } else {
        return NextResponse.json({ 
            message: 'Video tidak ditemukan. Pastikan akun tidak diprivate.' 
        }, { status: 404 });
    }

  } catch (error: any) {
    console.error('[SnapVideo Error]:', error.response?.data || error.message);
    return NextResponse.json({ 
        message: 'Gagal menghubungi server API.' 
    }, { status: 500 });
  }
}