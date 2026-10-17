'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Menu, Play, ShieldCheck, X } from 'lucide-react'
import styles from './styles.module.css'

const officialLogoUrl = 'https://learn.fundedproptraders.com/content/orgs/org_ee416042-6f77-4d96-a45c-84fb012dfea4/logos/259957e1-1e6b-48e3-8add-b4f8c376a87e_logo.jpg'

// VSL: https://youtu.be/Ppm9XYEBDIw
const VSL_YOUTUBE_ID = 'Ppm9XYEBDIw'
// Typeform behind https://bit.ly/fptbootcampa
const TYPEFORM_ID = 'fTCjjlnG'
// Meta Pixel shared with the other landing pages; this page fires the custom LeadBootcamp event
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1063820109592095'
// Calendar link for the thank-you step. Leave empty to hide the button.
const BOOKING_URL = ''

// Fill these in before running traffic
const bootcamp = {
  price: '[ADD: price]',
  start: '[ADD: start date]',
  duration: '4 days',
  seats: '[ADD: seats]',
  refund: '[ADD: refund policy]',
}

const trust = ['~536K followers across 6 platforms', 'Coached by Dan', 'Forex & futures', 'Process over hype']

const problems = [
  ['Good week. One rule. Account gone.', 'The strategy was working. Then a daily loss limit or drawdown rule ended the evaluation.'],
  ['The same challenge, again.', 'Another reset fee. The same pattern. No clear reason why it keeps happening.'],
  ['Funded, but no plan to grow.', 'The account is live. Scaling it without risking it is the part nobody mapped out.'],
]

const modules = [
  ['01', 'Prop firm rules, decoded', 'Read drawdown, daily loss and consistency rules before they cost you an account.'],
  ['02', 'A risk plan you can repeat', 'Set position size and daily limits that fit each evaluation you take.'],
  ['03', 'A clear trading process', 'Prep, entries and trade management in one simple checklist.'],
  ['04', 'Journaling and review', 'Turn each week of trades into data you can learn from.'],
  ['05', 'Psychology under rules', 'Handle drawdown, streaks and pressure with a plan, not a feeling.'],
  ['06', 'Scaling step by step', 'Grow account size only when your numbers support it.'],
]

const steps = [
  ['Watch the free training', 'See the rules-first process Dan teaches inside the Bootcamp.'],
  ['Book a free strategy call', 'A 30-minute call to look at where you are and what is holding you back.'],
  ['Decide if the Bootcamp fits', 'Get the full details. If it is not the right fit, we will tell you.'],
]

const testimonials = [
  { image: '/testimonial-hein.webp', width: 1200, height: 500, alt: 'Community message celebrating a first $50K funded prop firm account', result: 'First $50K funded account', quote: '“Thanks to Dan, I just passed my first 50K prop firm account today.”', name: 'Hein Aung', className: 'featured' },
  { image: '/testimonial-jason-payouts.webp', width: 591, height: 1280, alt: 'Dashboard showing Jason’s total payouts of $57,038.91', result: 'Documented payouts', quote: 'A payout dashboard shared by a community member.', name: 'Jason', className: 'tall' },
  { image: '/testimonial-confidence.webp', width: 481, height: 298, alt: 'Community feedback about improved trading confidence and accountability', result: 'Confidence through process', quote: '“Pattern A has given me confidence in my trading. Journaling has helped improve my accountability.”', name: 'Fidencio', className: 'wide' },
  { image: '/testimonial-ftmo-reward.webp', width: 1080, height: 1080, alt: 'FTMO reward certificate', result: 'Reward certificate', quote: 'A reward certificate shared from a funded-trading account.', name: 'Community member', className: 'square' },
  { image: '/testimonial-chloe-funded.webp', width: 1008, height: 1116, alt: 'Community message celebrating Chloe passing an evaluation', result: 'Evaluation passed', quote: '“Just got my certificate after passing yesterday.”', name: 'Chloe', className: 'tall' },
  { image: '/testimonial-piotr-payout.webp', width: 1200, height: 848, alt: 'Payout certificate shared by Piotr', result: 'Payout certificate', quote: 'A payout certificate shared by a community member.', name: 'Piotr', className: 'wide' },
]

const forYou = ['You trade forex or futures and want to pass a prop firm evaluation', 'You have failed a challenge and want to know why', 'You are funded and want a plan to scale with control', 'You want structure, review and accountability']
const notForYou = ['You want guaranteed profits or a “sure thing”', 'You are not willing to follow risk rules', 'You are looking for signals to copy']

const faqs = [
  ['Is the training really free?', 'Yes. The training and the strategy call are both free. No card is needed.'],
  ['Do I need trading experience?', 'Some basics help. The training suits traders preparing for a first evaluation, traders who have failed one, and funded traders.'],
  ['What happens on the strategy call?', 'It is a 30-minute call. We look at your current results, the rules you trade under and your goals. Then we tell you honestly if the Bootcamp is a good fit.'],
  ['How much is the Bootcamp and when does it start?', `The Bootcamp is ${bootcamp.price}. The next intake starts ${bootcamp.start} and runs over ${bootcamp.duration}. Refund policy: ${bootcamp.refund}.`],
  ['Will this get me funded?', 'No one can promise that. Trading involves risk and results vary. The Bootcamp teaches a process for rules, risk and review — the outcome depends on you and the market.'],
  ['Which markets does it cover?', 'The process is built for prop firm evaluations in forex and futures. The risk and review principles apply to both.'],
]

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    fptBootcampSubmit?: (event: { responseId?: string }) => void
  }
}

const CALL_NOTE = 'Free · 30 minutes · No card needed'

function Cta({ label, note, onClick, light }: { label: string; note?: string; onClick: () => void; light?: boolean }) {
  return <div className={styles.ctaBlock}><button className={styles.cta} onClick={onClick}><span>{label}</span><i><ArrowRight aria-hidden="true" /></i></button>{note && <p className={light ? `${styles.ctaNote} ${styles.ctaNoteLight}` : styles.ctaNote}>{note}</p>}</div>
}

export default function BootcampPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [formReady, setFormReady] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [showSticky, setShowSticky] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  // The Typeform embed resolves its submit callback by name, so define it before loading the embed script
  useEffect(() => {
    window.fptBootcampSubmit = (event) => {
      window.fbq?.('trackCustom', 'LeadBootcamp', { content_name: 'Bootcamp 2.0 Typeform', form_id: TYPEFORM_ID }, { eventID: event?.responseId })
      setSubmitted(true)
      setTimeout(() => document.getElementById('thank-you')?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
    setFormReady(true)
    return () => { delete window.fptBootcampSubmit }
  }, [])

  // Mobile sticky CTA: visible once the hero is scrolled past, hidden while the form is on screen
  useEffect(() => {
    const hero = document.getElementById('hero')
    const apply = document.getElementById('apply')
    if (!hero || !apply) return
    const seen = { hero: true, apply: false }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { seen[entry.target.id as 'hero' | 'apply'] = entry.isIntersecting })
      setShowSticky(!seen.hero && !seen.apply)
    }, { threshold: 0.05 })
    observer.observe(hero)
    observer.observe(apply)
    return () => observer.disconnect()
  }, [])

  return (
    <main className="site-shell" id="top">
      {META_PIXEL_ID && <Script id="meta-pixel" strategy="afterInteractive">{`if(!window.fbq){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');}`}</Script>}

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Funded Prop Traders home"><img src={officialLogoUrl} alt="Funded Prop Traders" onError={(event) => { event.currentTarget.hidden = true }} /><span>FPT</span><small>FUNDED PROP TRADERS</small></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <button onClick={() => scrollTo('training')}>Training</button><button onClick={() => scrollTo('modules')}>Bootcamp</button><button onClick={() => scrollTo('faq')}>FAQ</button>
          <button className="nav-cta" onClick={() => scrollTo('apply')}>Book a Free Call <ArrowRight aria-hidden="true" /></button>
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="hero" className={`${styles.hero} section-pad`}>
        <p className="eyebrow"><span />FREE TRAINING<i>/</i>FUNDED PROP TRADERS BOOTCAMP</p>
        <h1>Most evaluations are lost on rules, <em>not strategy.</em></h1>
        <p className={styles.lede}>Watch the free training to see the rules-first process Dan teaches inside the Bootcamp. Then book a free strategy call to map your next step.</p>
        <Cta label="Watch the Free Training" note="Free · Watch now · No card needed" onClick={() => { setPlaying(true); scrollTo('training') }} />
        <p className={styles.micro}>Educational content, not financial advice.</p>
        <ul className={styles.trustStrip}>{trust.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
      </section>

      <section id="training" className="video-section section-pad"><div className="section-intro"><p className="eyebrow">01 / FREE TRAINING</p><h2>Watch the <em>Free Training</em></h2><p>How traders lose evaluations on rules — and the process for rules, risk and review that the Bootcamp is built on.</p></div><div className="video-wrap">{!playing ? <button className={styles.videoCover} onClick={() => setPlaying(true)} aria-label="Play the free training"><img src="/fpt-vsl-poster.webp" alt="" /><span><Play aria-hidden="true" /></span></button> : <iframe src={`https://www.youtube-nocookie.com/embed/${VSL_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`} title="Funded Prop Traders Bootcamp free training" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}</div><Cta label="Book My Free Strategy Call" note={CALL_NOTE} onClick={() => scrollTo('apply')} /></section>

      <section id="apply" className="booking-section section-pad">
        <div className="section-intro"><p className="eyebrow">02 / FREE STRATEGY CALL</p><h2>Book Your Free <em>Strategy Call</em></h2><p>Answer a few short questions. It takes about two minutes and helps us prepare for your call.</p></div>
        {submitted ? (
          <div id="thank-you" className={styles.thankYou}>
            <div className="success-icon"><Check /></div>
            <p className="eyebrow">YOU&apos;RE IN</p>
            <h3>Thanks — your answers are in.</h3>
            <p>Next step: pick a time for your free 30-minute strategy call. We will look at your current results, the rules you trade under and what to work on next.</p>
            {BOOKING_URL && <a className="button button-gold" href={BOOKING_URL} target="_blank" rel="noopener">Book My Free Strategy Call <ArrowRight /></a>}
            <small>Check your inbox (and spam folder) for the training link and call details.</small>
          </div>
        ) : (
          <div className="typeform-card"><div data-tf-widget={TYPEFORM_ID} data-tf-on-submit="fptBootcampSubmit" data-tf-transitive-search-params="utm_source,utm_medium,utm_campaign,utm_term,utm_content,fbclid" data-tf-inline-on-mobile data-tf-medium="snippet" /></div>
        )}
        {formReady && <Script id="typeform-embed" src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />}
      </section>

      <section className="soft-section section-pad"><div className="section-intro"><p className="eyebrow">03 / SOUND FAMILIAR?</p><h2>The strategy isn&apos;t <em>always the problem.</em></h2></div><div className={styles.problemGrid}>{problems.map(([title, copy], i) => <article className="learn-card" key={title}><span className="card-number">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><Cta label="Book My Free Strategy Call" note={CALL_NOTE} onClick={() => scrollTo('apply')} /></section>

      <section id="modules" className="section-pad"><div className="section-intro split-intro"><div><p className="eyebrow">04 / INSIDE THE BOOTCAMP</p><h2>What You&apos;ll <em>Learn</em></h2></div><p>Six parts. One goal: a process you can repeat under prop firm rules.</p></div><div className={styles.moduleGrid}>{modules.map(([num, title, copy]) => <article className="learn-card" key={num}><span className="card-number">{num}</span><h3>{title}</h3><p>{copy}</p><ArrowRight /></article>)}</div>
        <dl className={styles.details}><div><dt>Investment</dt><dd>{bootcamp.price}</dd></div><div><dt>Next intake</dt><dd>{bootcamp.start}</dd></div><div><dt>Duration</dt><dd>{bootcamp.duration}</dd></div><div><dt>Seats</dt><dd>{bootcamp.seats}</dd></div></dl>
        <Cta label="See If the Bootcamp Fits" note={CALL_NOTE} onClick={() => scrollTo('apply')} />
      </section>

      <section className="roadmap-section section-pad"><div className="section-intro"><p className="eyebrow">05 / HOW IT WORKS</p><h2>Three simple <em>steps.</em></h2></div><div className={styles.steps}>{steps.map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><Cta label="Book My Free Strategy Call" note={CALL_NOTE} onClick={() => scrollTo('apply')} /></section>

      <section className="proof-section section-pad"><div className="section-intro split-intro"><div><p className="eyebrow">06 / COMMUNITY</p><h2>Real traders.<br /><em>Real process.</em></h2></div><div><p>Milestones and feedback shared by members of the community as they build skill and work through evaluations.</p><span className="proof-count">06 selected stories</span></div></div><div className="proof-gallery">{testimonials.map((item) => <figure className={`proof-story ${item.className}`} key={item.image}><div className="proof-media"><img src={item.image} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" /></div><figcaption><span>{item.result}</span><blockquote>{item.quote}</blockquote><strong>{item.name}</strong></figcaption></figure>)}</div><p className="disclosure">Individual results vary and are not typical.</p><Cta label="Book My Free Strategy Call" note={CALL_NOTE} onClick={() => scrollTo('apply')} /></section>

      <section className={`${styles.coach} section-pad`}><div className={styles.coachPhoto}><img src="/dan-cheung-profile.jpg" alt="Dan Cheung, coach of the Funded Prop Traders Bootcamp" loading="lazy" /></div><div><p className="eyebrow">07 / YOUR COACH</p><h2>Meet <em>Dan.</em></h2><p>Dan Cheung is a prop firm trading educator. He shares the real side of evaluations — the passes, the breaches and the review that follows — with a community of around 536K followers.</p><p>His approach is simple: rules first, risk second, setups third. The Bootcamp is that process, taught step by step, with review and accountability built in.</p></div></section>

      <section className="section-pad audience-section"><div className="audience-copy"><p className="eyebrow">08 / WHO THIS IS FOR</p><h2>Built for traders who <em>want structure.</em></h2><p className="not-for"><strong>This is not for you if</strong><br />{notForYou.join('. ')}.</p></div><div className="audience-list">{forYou.map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p><ArrowRight /></div>)}</div></section>

      <section id="faq" className="faq-section section-pad"><div className="section-intro"><p className="eyebrow">09 / FAQ</p><h2>Questions, answered.</h2></div><div className="faq-list">{faqs.map(([q, a], i) => <div className="faq-item" key={q}><button aria-expanded={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}><span>{q}</span><ChevronDown className={faqOpen === i ? 'rotate' : ''} /></button>{faqOpen === i && <p>{a}</p>}</div>)}</div></section>

      <section className="final-cta section-pad"><p className="eyebrow gold">START WITH THE FREE TRAINING</p><h2>Fix the rules.<br /><em>Then trade the plan.</em></h2><p>Watch the free training, then book a free strategy call to see if the Bootcamp fits where you are now.</p><Cta label="Book My Free Strategy Call" note={CALL_NOTE} onClick={() => scrollTo('apply')} light /><p className={styles.finalMicro}><ShieldCheck aria-hidden="true" /> Educational content. No promises of results.</p></section>

      <div className={showSticky && !submitted ? `${styles.sticky} ${styles.stickyOn}` : styles.sticky} aria-hidden={!showSticky || submitted}><button onClick={() => scrollTo('apply')} tabIndex={showSticky && !submitted ? 0 : -1}><span>Book My Free Strategy Call</span><small>{CALL_NOTE}</small></button></div>

      <footer className="footer"><div className="footer-top"><a className="brand" href="#top"><img src={officialLogoUrl} alt="Funded Prop Traders" onError={(event) => { event.currentTarget.hidden = true }} /><span>FPT</span><small>FUNDED PROP TRADERS</small></a><p>Education for traders who value process, discipline and long-term progress.</p><div className="footer-links"><a href="#training">Training</a><a href="#modules">Bootcamp</a><a href="#faq">FAQ</a><a href="#apply">Book a call</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Funded Prop Traders</span><div><a href="#top">Privacy Policy</a><a href="#top">Terms of Service</a><a href="#top">Risk Disclosure</a><a href="#top">Earnings Disclaimer</a><a href="#top">Refund Policy</a></div></div><p className="legal">Risk disclosure: trading forex, futures and other leveraged products involves substantial risk of loss and is not suitable for everyone. All content is educational and is not financial advice. Earnings disclaimer: we make no guarantee of income, profits, funding or results. Any figures shown are individual examples; individual results vary and are not typical. Past or simulated performance does not indicate future results. Any $1M figure is a long-term roadmap target, not a promise. Funded Prop Traders is not affiliated with or endorsed by Meta Platforms, Inc.</p></footer>
    </main>
  )
}
