'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  FileText,
  Headphones,
  Menu,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react'

const learnItems = [
  ['01', 'How the funded trading model works', 'Understand the evaluation process, account structures, and the habits that support a sustainable approach.'],
  ['02', 'How to build consistency', 'Learn a repeatable framework for decisions, risk, review, and execution across different market conditions.'],
  ['03', 'How to scale funded accounts responsibly', 'See how disciplined traders think about exposure, milestones, and protecting progress as they grow.'],
  ['04', 'How the $1M roadmap is structured', 'Break a big target into practical stages so you always know the next skill and account milestone to pursue.'],
]

const milestones = [
  ['Skill', 'Build the process, risk awareness, and consistency required before scaling.'],
  ['$100K', 'Use a first funded milestone to test your process under clear rules.'],
  ['$200K', 'Layer in repeatable execution and measured account growth.'],
  ['$500K', 'Protect consistency while expanding capacity and responsibility.'],
  ['$1M', 'A long-term roadmap target—not a promised result or outcome.'],
]

const audience = ['Traders wanting a structured plan', 'Traders trying to pass evaluations', 'Funded traders looking to scale', 'Traders who want guidance and accountability']
const features = [
  [BarChart3, 'Trading education', 'Clear lessons focused on process over prediction.'],
  [Target, 'Scaling framework', 'A practical way to think about the next account milestone.'],
  [ShieldCheck, 'Prop firm strategy', 'Navigate rules and evaluations with more intention.'],
  [Users, 'Community access', 'Learn alongside traders pursuing disciplined progress.'],
  [Headphones, 'Support', 'Get perspective when you need to pressure-test your plan.'],
  [FileText, 'Training resources', 'Templates and walkthroughs you can return to as you grow.'],
]
const faqs = [
  ['Do I need trading experience?', 'No. The training is designed to meet you where you are, whether you are learning the basics or working toward your next funded milestone.'],
  ['How long is the strategy call?', 'The complimentary strategy call is 30 minutes.'],
  ['Is the call really free?', 'Yes. There is no charge to book the initial strategy call.'],
  ['Do I get course access?', 'Training access depends on the program selected after your conversation. The free webinar is available to everyone.'],
  ['Is community access included?', 'Community access depends on the selected program and will be explained clearly before any decision.'],
  ['What happens after I book?', 'You will see your selected details confirmed. A member of the team will follow up with the next steps and call information.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('18')
  const [selectedTime, setSelectedTime] = useState('10:30 AM')
  const [confirmed, setConfirmed] = useState(false)
  const [consent, setConsent] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Funded Prop Traders home"><span>FPT</span><small>FUNDED PROP TRADERS</small></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <button onClick={() => scrollTo('training')}>Training</button><button onClick={() => scrollTo('roadmap')}>Roadmap</button><button onClick={() => scrollTo('faq')}>FAQ</button>
          <button className="nav-cta" onClick={() => scrollTo('booking')}>Book a Free Call <ArrowRight aria-hidden="true" /></button>
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow"><span /> FREE WEBINAR <i>•</i> FUNDED TRADING ROADMAP</p>
          <h1>The Roadmap to <em>$1M</em> in Funded Capital</h1>
          <p className="lede">Learn the step-by-step framework for building trading consistency, navigating prop firm evaluations, and scaling funded accounts with discipline.</p>
          <div className="button-row"><button className="button button-dark" onClick={() => scrollTo('training')}>Watch the Free Training <Play data-icon="inline-end" /></button><button className="button button-light" onClick={() => scrollTo('booking')}>Build My Roadmap <ArrowRight data-icon="inline-end" /></button></div>
          <p className="trust"><Check /> Education-first <span>•</span> Practical framework <span>•</span> No income guarantees</p>
        </div>
        <div className="roadmap-visual" aria-label="Roadmap stages from skill to one million dollars">
          <div className="visual-top"><span>THE PATH TO SCALE</span><span>01 — 05</span></div>
          <div className="visual-line" />
          {milestones.map(([title], i) => <div className="visual-node" key={title} style={{ '--i': i } as React.CSSProperties}><span className="node-dot">{i === 0 ? <Compass /> : i + 1}</span><strong>{title}</strong><small>{i === 0 ? 'Foundation' : 'Milestone'}</small></div>)}
          <div className="visual-footer"><span>PROCESS OVER PROMISES</span><Sparkles /></div>
        </div>
      </section>

      <section id="training" className="video-section section-pad"><div className="section-intro"><p className="eyebrow">01 / FREE TRAINING</p><h2>Start With the Free Training</h2><p>A practical walkthrough of the skill, risk and scaling milestones behind the roadmap.</p></div><div className="video-wrap"><iframe src="https://drive.google.com/file/d/1czdexW7xgThH8auvX1oSwXud0InMuvQg/preview" title="The Roadmap to $1M in Funded Capital free training" allow="autoplay" allowFullScreen /></div><button className="text-cta" onClick={() => scrollTo('booking')}>Book Your Strategy Call <ArrowRight /></button></section>

      <section className="soft-section section-pad"><div className="section-intro split-intro"><div><p className="eyebrow">02 / THE FRAMEWORK</p><h2>What You&apos;ll Learn</h2></div><p>Clarity comes from knowing what to work on next. This training turns a distant target into a sequence of practical priorities.</p></div><div className="learn-grid">{learnItems.map(([num, title, copy]) => <article className="learn-card" key={num}><span className="card-number">{num}</span><h3>{title}</h3><p>{copy}</p><ArrowRight /></article>)}</div></section>

      <section id="roadmap" className="roadmap-section section-pad"><div className="section-intro"><p className="eyebrow">03 / THE $1M ROADMAP</p><h2>One milestone at a time.</h2><p>The destination is a target for planning—not a promised result. The work is in the process between each stage.</p></div><div className="milestone-path">{milestones.map(([title, copy], i) => <article className="milestone" key={title}><div className="milestone-marker"><span>0{i + 1}</span></div><p className="milestone-kicker">{i === 0 ? 'Foundation' : `Stage 0${i}`}</p><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="section-pad audience-section"><div className="audience-copy"><p className="eyebrow">04 / WHO THIS IS FOR</p><h2>Structure creates<br /><em>better decisions.</em></h2><p>Whether you are taking your first evaluation or ready to make your funded journey more intentional, the roadmap starts with your current stage.</p><p className="not-for"><strong>This may not be for you</strong><br />If you are looking for guaranteed profits, shortcuts, or overnight results.</p></div><div className="audience-list">{audience.map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p><ArrowRight /></div>)}</div></section>

      <section className="soft-section section-pad"><div className="section-intro"><p className="eyebrow">05 / YOUR ADVANTAGE</p><h2>What You Get</h2></div><div className="feature-grid">{features.map(([Icon, title, copy]) => <article className="feature-card" key={title as string}><Icon /><h3>{title as string}</h3><p>{copy as string}</p></article>)}</div></section>

      <section className="proof-section section-pad"><div className="section-intro split-intro"><div><p className="eyebrow">06 / SOCIAL PROOF</p><h2>Real Traders.<br /><em>Real Progress.</em></h2></div><div><p>Explore selected community wins, funded-account milestones, and case studies shared by members.</p><a className="underlined" href="https://drive.google.com/drive/folders/1A5Zc1Cz71Vl0CaPwh7MIeJsMgOb9NIlj" target="_blank" rel="noreferrer">View verified result library <ArrowRight /></a></div></div><div className="proof-grid">{['Community result', 'Funded milestone', 'Process snapshot', 'Community result', 'Evaluation progress', 'Member case study'].map((label, i) => <div className="proof-card" key={`${label}-${i}`}><div className="proof-screenshot"><span className="proof-window"><i /><i /><i /></span><div className="proof-bars"><b style={{ height: `${35 + i * 7}%` }} /><b style={{ height: `${58 - i * 3}%` }} /><b style={{ height: `${45 + i * 4}%` }} /><b style={{ height: `${70 - i * 5}%` }} /></div><span className="proof-label">{label}</span></div><p>Shared by a member of the FPT community</p></div>)}</div><p className="disclosure">Individual results vary. Examples are not typical and do not guarantee future performance.</p></section>

      <section className="dark-call section-pad"><div><p className="eyebrow gold">07 / THE NEXT STEP</p><h2>Build Your Personal<br /><em>$1M Roadmap</em></h2><p>During this complimentary strategy call, we&apos;ll review your current experience, identify the biggest gap in your trading process, and map practical next steps for your funded-account journey.</p></div><div className="call-details"><p><Check /> Current-stage review</p><p><Check /> Evaluation and risk-plan audit</p><p><Check /> Personal next-step roadmap</p><button className="button button-gold" onClick={() => scrollTo('booking')}>Schedule Your 1-to-1 Call <ArrowRight data-icon="inline-end" /></button></div></section>

      <section id="booking" className="booking-section section-pad"><div className="section-intro"><p className="eyebrow">08 / RESERVE YOUR SPOT</p><h2>Book Your Strategy Call</h2><p>Choose a time that works for you. This is a demo booking interface—no calendar invite is sent without a scheduling integration.</p></div><div className="booking-card">{confirmed ? <div className="confirmation"><span className="success-icon"><Check /></span><p className="eyebrow">BOOKING REQUEST READY</p><h3>You&apos;re on the roadmap.</h3><p>Your complimentary strategy call is set for {selectedDate} September at {selectedTime}. A team member will confirm the details with you.</p><button className="button button-dark" onClick={() => setConfirmed(false)}>Edit booking</button></div> : <><div className="steps">{['Date', 'Time', 'Contact Details', 'Confirm Booking'].map((name, i) => <div className={step === i + 1 ? 'step active' : step > i + 1 ? 'step done' : 'step'} key={name}><span>{step > i + 1 ? <Check /> : i + 1}</span>{name}</div>)}</div>{step === 1 && <div className="booking-pane"><div className="calendar-head"><div><p className="eyebrow">SELECT A DATE</p><h3>September 2026</h3></div><CalendarDays /></div><div className="weekdays">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={`${d}-${i}`}>{d}</span>)}</div><div className="date-grid">{['31', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '1', '2', '3', '4'].map((d, i) => <button key={`${d}-${i}`} disabled={i === 0 || i > 30} className={selectedDate === d && i < 31 ? 'date selected' : 'date'} onClick={() => setSelectedDate(d)}>{d}</button>)}</div><button className="button button-dark full" onClick={() => setStep(2)}>Continue to times <ArrowRight /></button></div>}{step === 2 && <div className="booking-pane"><p className="eyebrow">SELECT A TIME</p><h3>Available times for September {selectedDate}</h3><div className="time-grid">{['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'].map(t => <button className={selectedTime === t ? 'time selected' : 'time'} key={t} onClick={() => setSelectedTime(t)}><Clock3 />{t}</button>)}</div><div className="booking-actions"><button className="button button-light" onClick={() => setStep(1)}>Back</button><button className="button button-dark" onClick={() => setStep(3)}>Continue <ArrowRight /></button></div></div>}{step === 3 && <div className="booking-pane"><p className="eyebrow">YOUR DETAILS</p><h3>Where should we send confirmation?</h3><label>Full name<input type="text" placeholder="Your name" /></label><label>Email address<input type="email" placeholder="you@example.com" /></label><label>Phone number <span>(optional)</span><input type="tel" placeholder="+1 (555) 000-0000" /></label><label className="consent"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /> I agree to be contacted about my strategy call.</label><div className="booking-actions"><button className="button button-light" onClick={() => setStep(2)}>Back</button><button className="button button-dark" disabled={!consent} onClick={() => setStep(4)}>Review details <ArrowRight /></button></div></div>}{step === 4 && <div className="booking-pane review"><p className="eyebrow">CONFIRM BOOKING</p><h3>Review your strategy call</h3><div className="review-row"><span>Date</span><strong>September {selectedDate}, 2026</strong></div><div className="review-row"><span>Time</span><strong>{selectedTime} (ET)</strong></div><div className="review-row"><span>Format</span><strong>Complimentary 30-minute call</strong></div><div className="booking-actions"><button className="button button-light" onClick={() => setStep(3)}>Back</button><button className="button button-gold" onClick={() => setConfirmed(true)}>Confirm Free Strategy Call <Check /></button></div></div>}</>}</div></section>

      <section id="faq" className="faq-section section-pad"><div className="section-intro"><p className="eyebrow">09 / FAQ</p><h2>Questions, answered.</h2></div><div className="faq-list">{faqs.map(([q, a], i) => <div className="faq-item" key={q}><button aria-expanded={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}><span>{q}</span><ChevronDown className={faqOpen === i ? 'rotate' : ''} /></button>{faqOpen === i && <p>{a}</p>}</div>)}</div></section>

      <section className="final-cta section-pad"><p className="eyebrow gold">START WITH CLARITY</p><h2>Ready to Build Your<br /><em>Funded Trading Roadmap?</em></h2><p>Get clarity on your next milestone and the process required to pursue it with discipline.</p><button className="button button-gold" onClick={() => scrollTo('booking')}>Book Your Free Strategy Call <ArrowRight data-icon="inline-end" /></button></section>

      <footer className="footer"><div className="footer-top"><a className="brand" href="#top"><span>FPT</span><small>FUNDED PROP TRADERS</small></a><p>Education for traders who value process, discipline, and long-term progress.</p><div className="footer-links"><a href="#training">Training</a><a href="#roadmap">Roadmap</a><a href="#faq">FAQ</a><a href="#booking">Book a call</a></div></div><div className="footer-bottom"><span>© 2026 Funded Prop Traders</span><div><a href="#top">Privacy Policy</a><a href="#top">Terms of Service</a><a href="#top">Risk Disclosure</a><a href="#top">Earnings Disclaimer</a><a href="#top">Refund Policy</a></div></div><p className="legal">Trading futures, forex and other leveraged products involves substantial risk and is not suitable for every investor. Educational content is not financial advice. Simulated or past performance is not indicative of future results. No representation is made that any account will achieve profits or reach $1M in funding. Funded Prop Traders is not affiliated with or endorsed by Meta Platforms, Inc.</p></footer>
    </main>
  )
}
