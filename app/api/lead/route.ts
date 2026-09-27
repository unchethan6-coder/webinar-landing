import { NextRequest, NextResponse } from 'next/server'

// Google Sheet lead capture (Apps Script web app)
const LEAD_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwavwpb40XozO72UEjTNgK5efULd_23k9--c8ks6ev05nh9Cm_zlLXydMZmdZ08D3L_/exec'

function decode(value: string | null) {
  if (!value) return ''
  try { return decodeURIComponent(value) } catch { return value }
}

function countryName(code: string) {
  if (!code) return ''
  try { return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code } catch { return code }
}

export async function POST(request: NextRequest) {
  const input = new URLSearchParams(await request.text())
  const h = request.headers

  // Vercel adds these geo headers automatically based on the visitor's IP
  const ip = (h.get('x-forwarded-for') || h.get('x-real-ip') || '').split(',')[0].trim()
  const code = h.get('x-vercel-ip-country') || ''
  const country = code ? countryName(code) + ' (' + code + ')' : ''
  const region = decode(h.get('x-vercel-ip-country-region'))
  const city = decode(h.get('x-vercel-ip-city'))

  const body = new URLSearchParams({
    firstName: input.get('firstName') || '',
    email: input.get('email') || '',
    phone: input.get('phone') || '',
    page: input.get('page') || '',
    utm_source: input.get('utm_source') || '',
    utm_medium: input.get('utm_medium') || '',
    utm_campaign: input.get('utm_campaign') || '',
    country,
    region,
    city,
    ip,
  })

  try {
    const res = await fetch(LEAD_SHEET_URL, { method: 'POST', body, redirect: 'follow' })
    return NextResponse.json({ ok: res.ok })
  } catch (error) {
    console.error('Lead capture failed', error)
    return NextResponse.json({ ok: false }, { status: 502 })
  }
}
