import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // Menggunakan API Key dan Host yang sama dengan Instagram/TikTok
    const options = {
      method: 'POST',
      url: 'https://snap-video3.p.rapidapi.com/download',
      headers: {
        'x-rapidapi-key': '99a1ef12a8mshb19eeedbfeab2a2p118655jsn35cd073a59d2',
        'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({ url: url })
    };

    console.log("🔍 Menganalisa YouTube:", url);

    const response = await axios.request(options);
    const data = response.data;

    // --- PERBAIKAN LOGIKA FILTER ---
    if (data && data.medias && data.medias.length > 0) {
        
        // 1. Cari video MP4 terbaik (Apapun kualitasnya)
        const videoItem = data.medias.find((m: any) => m.extension === 'mp4' && !m.video_only) 
                       || data.medias.find((m: any) => m.extension === 'mp4')
                       || data.medias[0]; // Ambil apa saja sebagai fallback
        
        // 2. Cari Audio
        const audioItem = data.medias.find((m: any) => m.extension === 'mp3' || m.extension === 'm4a');
        
        console.log("✅ Video Ditemukan:", videoItem ? "Yes" : "No");

        return NextResponse.json({
            message: 'Success',
            data: {
                title: data.title || "YouTube Video",
                thumbnail: data.thumbnail,
                // Pastikan URL ada, jika tidak, kirim null
                videoUrl: videoItem ? videoItem.url : null,
                audioUrl: audioItem ? audioItem.url : null,
                quality: videoItem ? (videoItem.quality || 'HD') : 'Standard'
            }
        }, { status: 200 });

    } else {
        console.log("❌ Video tidak ditemukan di respon API");
        return NextResponse.json({ 
            message: 'Maaf, server tidak dapat mengambil link video ini. Coba video lain.' 
        }, { status: 404 });
    }

  } catch (error: any) {
    console.error('[YouTube Error]:', error.response?.data || error.message);
    return NextResponse.json({ 
        message: 'Terjadi kesalahan koneksi ke server.' 
    }, { status: 500 });
  }
}