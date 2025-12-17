import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // Konfigurasi sesuai file script.js lampiran Anda
    const options = {
      method: 'POST',
      url: 'https://snap-video3.p.rapidapi.com/download',
      headers: {
        'x-rapidapi-key': '99a1ef12a8mshb19eeedbfeab2a2p118655jsn35cd073a59d2', // Key dari script.js
        'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({ url: url })
    };

    console.log("Processing Instagram URL:", url);

    const response = await axios.request(options);
    const data = response.data;

    // Logika Pemilahan Data (Sesuai script.js)
    if (data && data.medias && data.medias.length > 0) {
        
        // Cari Video dulu, kalau tidak ada baru ambil Foto (logic script.js)
        const videoItem = data.medias.find((m: any) => m.extension === 'mp4');
        const photoItem = data.medias.find((m: any) => m.extension === 'jpg' || m.extension === 'png');
        const finalItem = videoItem || photoItem || data.medias[0];

        // Tentukan Thumbnail (kadang ada di root, kadang di item)
        const thumbnail = data.thumbnail || finalItem.url;

        return NextResponse.json({
            message: 'Success',
            data: {
                type: videoItem ? 'Video' : 'Photo',
                thumbnail: thumbnail,
                downloadUrl: finalItem.url,
                username: data.author?.username || 'Instagram User'
            }
        }, { status: 200 });

    } else {
        return NextResponse.json({ 
            message: 'Content not found. Account might be private.' 
        }, { status: 404 });
    }

  } catch (error: any) {
    console.error('[Instagram API Error]:', error.response?.data || error.message);
    return NextResponse.json({ 
        message: 'Failed to fetch data from Instagram API.' 
    }, { status: 500 });
  }
}