'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Check, Download, ShieldCheck } from 'lucide-react'
import styles from './styles.module.css'

const logoUrl = 'https://learn.fundedproptraders.com/content/orgs/org_ee416042-6f77-4d96-a45c-84fb012dfea4/logos/259957e1-1e6b-48e3-8add-b4f8c376a87e_logo.jpg'

const lessons = [
  ['01', 'Challenge selection and preparation', 'Choose a starting point and prepare around the rules that matter.'],
  ['02', 'Risk limits across accounts', 'Build a framework that keeps combined exposure visible and controlled.'],
  ['03', 'Milestones for building funded capital', 'Map practical steps between a first challenge and a larger portfolio.'],
  ['04', 'A disciplined scaling and review process', 'Use performance evidence before deciding what comes next.'],
]

const chapters = [
  ['01', 'PROCESS / RULES / DISCIPLINE', 'Foundation', 'Build the process, rules awareness and risk discipline required before adding size.'],
  ['02', 'MILESTONES / CONSISTENCY / PROTECTION', 'Build', 'Progress through realistic funded milestones while protecting consistency across accounts.'],
  ['03', 'CAPITAL / EXPOSURE / REVIEW', 'Scale', 'Add capital deliberately, manage combined exposure and review performance before the next step.'],
]

const proofGallery = [
  { src: '/jason-payout-3320.jpeg', alt: 'Finotive Funding withdrawal certificate showing a $3,320.08 profit split', label: 'Withdrawal proof' },
  { src: '/jason-payout-4118.jpeg', alt: 'Finotive Funding withdrawal certificate showing a $4,118.20 profit split', label: 'Withdrawal proof' },
  { src: '/ftmo-reward.jpg', alt: 'FTMO reward certificate showing a $20,153.98 reward', label: 'Trader reward' },
  { src: '/funded-trader-certificate.jpeg', alt: 'My Funded FX funded trader certificate for a $100,000 account', label: 'Funded account' },
  { src: '/community-funded-account.jpeg', alt: 'Community message celebrating a passed prop firm challenge', label: 'Community milestone' },
  { src: '/community-message.png', alt: 'Community testimonial thanking Dan and the team for their support', label: 'Community feedback' },
  { src: '/sebastian-rewards.png', alt: 'FTMO reward dashboard showing two trader reward certificates', label: 'Trader rewards' },
] as const

function Logo() {
  return <div className={styles.logo}><img src={logoUrl} alt="Funded Prop Traders" /><span>Funded<br />Prop<br />Traders</span></div>
}

function LeadForm() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    setSending(true)
    const form = new FormData(event.currentTarget)
    const params = new URLSearchParams(window.location.search)
    const body = new URLSearchParams({
      firstName: String(form.get('firstName') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      page: window.location.href,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
    })
    try {
      await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
    } catch (error) {
      console.error('Lead capture failed', error)
    }
    setSent(true)
  }
  if (sent) return <div className={styles.success}>
    <p className={styles.successTitle}><Check /> <strong>You're in — your blueprint is ready.</strong></p>
    <a className={styles.downloadBtn} href="/1M-Funded-Blueprint-WChampFX.pdf" download="The $1M Funded Blueprint - WChampFX.pdf" target="_blank" rel="noopener">DOWNLOAD THE BLUEPRINT (PDF) <Download /></a>
  </div>
  return <form className={styles.form} onSubmit={submit}>
    <label>FIRST NAME<input name="firstName" required placeholder="Your first name" autoComplete="given-name" /></label>
    <label>EMAIL ADDRESS<input name="email" required type="email" placeholder="you@example.com" autoComplete="email" /></label>
    <label>PHONE NUMBER<input name="phone" required type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" /></label>
    <button type="submit" disabled={sending}>{sending ? 'SENDING…' : <>GET THE FREE BLUEPRINT <ArrowRight /></>}</button>
    <small>Free instant access. Educational purposes only.</small>
  </form>
}

export default function LeadMagnetPage() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <Logo />
        <p className={styles.eyebrow}>FREE BLUEPRINT</p>
        <h1>The $1 Million Prop Firm <em>Funding Blueprint</em></h1>
        <p className={styles.lede}>A practical 3-step roadmap to help you approach prop firm challenges, build funded milestones and scale with disciplined risk management.</p>
        <LeadForm />
        <p className={styles.trust}><ShieldCheck /> A roadmap for the process — never a promise of results.</p>
      </div>
      <div className={styles.guideWrap}>
        <div className={styles.orbit} />
        <article className={styles.guide}>
          <Image src="/blueprint-cover.jpg" alt="" fill sizes="(max-width: 520px) 78vw, 420px" className={styles.guideImg} priority />
          <div><span>FPT / 001</span><span>FIELD GUIDE</span></div>
          <strong>$1M</strong>
          <p>THE $1 MILLION FUNDING BLUEPRINT</p>
          <h2>Funding<br /><i>roadmap.</i></h2>
          <small>A disciplined roadmap for funded-account growth</small>
          <footer>FUNDED PROP TRADERS <span>2026 / EDITION 01</span></footer>
        </article>
        <p className={styles.scroll}>SCROLL TO EXPLORE <ArrowDown /></p>
      </div>
    </section>

    <section className={styles.problem}>
      <p className={styles.eyebrow}>THE ROADMAP</p>
      <h2>A big funding target needs a <em>structured process.</em></h2>
      <p>Pursuing multiple challenges without clear milestones can lead to rushed decisions, overlapping risk and avoidable breaches. The blueprint breaks the journey into practical stages.</p>
      <div className={styles.problemGrid}>{['No clear roadmap','Rushing account size','Overlapping exposure','Scaling without consistency'].map((item,i)=><article key={item}><span>0{i+1}</span><h3>{item}</h3><p>{['A large funding target needs practical milestones, not guesswork.','Adding size too quickly can turn progress into avoidable pressure.','Multiple accounts need one clear view of combined risk.','The next step should be supported by evidence, not urgency.'][i]}</p></article>)}</div>
    </section>

    <section className={styles.learn}>
      <p className={styles.eyebrow}>WHAT YOU&apos;LL LEARN</p>
      <h2>See the milestones between your first challenge and a larger <em>funded portfolio.</em></h2>
      <div className={styles.lessonGrid}>{lessons.map(([n,t,c])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>

    <section className={styles.dan}>
      <div className={styles.profile}><Image src="/dan-cheung-profile.jpg" alt="Dan Cheung speaking on a podcast" fill sizes="(max-width: 850px) 100vw, 42vw" /></div><div><p className={styles.eyebrow}>BUILT FROM EXPERIENCE</p><h2>Trade the plan.<br /><em>Not the pressure.</em></h2><p>Dan Cheung is a prop-firm trading educator who documents the realities of challenges, funded-account progress, setbacks, risk and discipline for a large trading audience.</p><strong>His public YouTube channel has over 100,000 subscribers — people who value the process behind the outcome.</strong></div>
    </section>

    <section className={styles.inside}>
      <p className={styles.eyebrow}>THREE CHAPTERS</p><h2>Build toward larger funded capital with a <em>disciplined process.</em></h2>
      <div className={styles.chapterGrid}>{chapters.map(([n,k,t,c])=><article key={n}><span>{n}</span><small>{k}</small><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>

    <section className={styles.proof}><p className={styles.eyebrow}>COMMUNITY NOTES</p><h2>Built for traders who value <em>process over hype.</em></h2><div className={styles.quotes}><blockquote>“Thanks to Dan, I just passed my first 50K prop firm account today.”<cite>— Hein Aung</cite></blockquote><blockquote>“Pattern A has given me confidence in my trading. Journaling has helped improve my accountability.”<cite>— Fidencio</cite></blockquote><blockquote>“Just got my certificate after passing yesterday.”<cite>— Chloe</cite></blockquote></div><div className={styles.proofGallery}>{proofGallery.map(({ src, alt, label }) => <figure key={src}><div><Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div><figcaption>{label}</figcaption></figure>)}</div><small>Shared community examples are presented for educational context. Individual results vary and are not typical or guaranteed.</small></section>

    <section className={styles.audience}><div><p className={styles.eyebrow}>IS THIS FOR YOU?</p><h2>Start with the right kind of <em>ambition.</em></h2></div><ul>{['Preparing for a first prop-firm challenge','Already funded and planning the next milestone','Rebuilding after a breach or payout setback','Wanting a structured path toward larger funded capital'].map(x=><li key={x}><Check />{x}</li>)}</ul></section>

    <section className={styles.final}><div><p className={styles.eyebrow}>FREE BLUEPRINT</p><h2>Build your funded journey <em>one milestone at a time.</em></h2><p>Get the free blueprint and see a clearer process for pursuing funded capital with discipline.</p></div><LeadForm /></section>

    <footer className={styles.footer}><Logo /><p>This material is for educational purposes only and is not financial advice. The $1 million figure is a planning target, not a guaranteed result. Trading leveraged products involves substantial risk. Individual results vary.</p><span>© {new Date().getFullYear()} Funded Prop Traders</span></footer>
  </main>
}
