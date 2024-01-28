import { NextRequest, NextResponse } from 'next/server';


export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log(path);
  console.log(req.url)
  if (path == '/signpage') {
    return NextResponse.next();
  }
const token = null;
  if (!token) {
    return NextResponse.redirect(new URL(`/signpage?callbackUrl=${path}`, encodeURIComponent(req.url)));
  }
return NextResponse.next();
}

