import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // 1. Ambil Subdomain
  const currentHost = process.env.NODE_ENV === 'production'
    ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : hostname.replace(`.localhost:3000`, '');

  // 2. DAFTAR HALAMAN UMUM (Whitelist)
  // Halaman ini tidak boleh kena Rewrite ke subdomain folder
  const publicPages = ['/privacy', '/terms', '/contact'];
  
  // Jika user mengakses halaman umum, biarkan lolos (jangan di-rewrite ke folder tiktok/insta/yt)
  if (publicPages.some(page => url.pathname.startsWith(page))) {
    return NextResponse.next();
  }

  // 3. Cek file statis/api
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/_next') || url.pathname.includes('.')) {
    return NextResponse.next();
  }

  // --- LOGIKA ROUTING MULTI-TENANT ---

  // KASUS A: TikTok
  if (currentHost === 'tiktok') {
    url.pathname = `/tiktok${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // KASUS B: Instagram
  if (currentHost === 'instagram' || currentHost === 'insta') {
    url.pathname = `/insta${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // KASUS C: YouTube
  if (currentHost === 'youtube' || currentHost === 'yt') {
    url.pathname = `/youtube${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};