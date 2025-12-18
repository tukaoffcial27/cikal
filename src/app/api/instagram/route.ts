import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // --- KONEKSI KE API SNAP-VIDEO3 (Satu Pintu dengan YouTube/TikTok) ---
    const options = {
      method: 'POST',
      url: 'https://snap-video3.p.rapidapi.com/download',
      headers: {
        'x-rapidapi-key': '99a1ef12a8mshb19eeedbfeab2a2p118655jsn35cd073a59d2', // Key Global Anda
        'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({ url: url })
    };

    console.log("🔍 Instagram API Request:", url);

    const response = await axios.request(options);
    const data = response.data;

    // --- LOGIKA FILTER HASIL ---
    if (data && data.medias && data.medias.length > 0) {
        
        // Prioritas: Cari Video (MP4) dulu, kalau tidak ada baru Foto
        const videoItem = data.medias.find((m: any) => m.extension === 'mp4' && !m.video_only);
        const photoItem = data.medias.find((m: any) => m.extension === 'jpg' || m.extension === 'png');
        
        // Ambil hasil terbaik
        const finalItem = videoItem || photoItem || data.medias[0];
        const isVideo = !!videoItem; // Cek apakah ini video atau foto

        // Format Data untuk Frontend
        return NextResponse.json({
            message: 'Success',
            data: {
                type: isVideo ? 'Video' : 'Photo',
                title: data.title || (isVideo ? "Instagram Reel" : "Instagram Photo"),
                thumbnail: data.thumbnail || finalItem.url,
                downloadUrl: finalItem.url,
                author: data.author?.username || 'Instagram User'
            }
        }, { status: 200 });

    } else {
        return NextResponse.json({ 
            message: 'Content not found or Account is Private.' 
        }, { status: 404 });
    }

  } catch (error: any) {
    console.error('[Instagram API Error]:', error.response?.data || error.message);
    return NextResponse.json({ 
        message: 'Failed to fetch data from Instagram API.' 
    }, { status: 500 });
  }
}