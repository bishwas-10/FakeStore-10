import { NextRequest, NextResponse } from 'next/server';


export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
 
 
const storage = localStorage.getItem('persist:users');
console.log(storage);
const token = null;
  if (!token) {
    return NextResponse.redirect(new URL(`/signpage?callbackUrl=${path}`, req.url));
  }
return NextResponse.next();
}

export const config = {
  matcher: ['/((?!signpage|api|_next/static|_next/image|.*\\.png$).*)'],
}

