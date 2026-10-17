import { NextRequest, NextResponse } from 'next/server'

// Visitor country from Vercel's geo header, used to decide whether to show the cookie banner
export function GET(request: NextRequest) {
  return NextResponse.json({ country: request.headers.get('x-vercel-ip-country') || '' }, { headers: { 'Cache-Control': 'private, no-store' } })
}
