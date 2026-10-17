# /bootcamp2.0 — copy notes

Live page: `app/bootcamp2.0/page.tsx`. Placeholders to fill before running ads are in the `bootcamp` object at the top of that file (price, start date, seats, refund policy).

## Hero headline tests

**Variant A — problem-aware (live on the page)**
- Headline: Most evaluations are lost on rules, not strategy.
- Subheadline: Watch the free training to see the rules-first process Dan teaches inside the Bootcamp. Then book a free strategy call to map your next step.

**Variant B — process / roadmap**
- Headline: A clear process for passing prop firm evaluations.
- Subheadline: Rules, risk, review. See the step-by-step method taught inside the Funded Prop Traders Bootcamp — free.

**Variant C — community / proof**
- Headline: The process behind a 536K-strong trading community.
- Subheadline: Watch the free training Dan built for traders working through prop firm evaluations. Then book a free strategy call.

**Recommended for cold traffic: A** — it names a situation the reader recognises without promising a result or attacking them.

## CTA options

| Button | Microcopy |
|---|---|
| Watch the Free Training → | Free. No card needed. |
| Show Me the Process → | Free training. Watch at your own pace. |
| Get Free Access → | Free. Educational content, not financial advice. |

Secondary (after the form): **Book My Free Strategy Call** — "30 minutes. Free. Pick a time that suits you."

## Compliance check

- [x] No guaranteed income, profits, funding or results (FAQ "Will this get me funded?" says so directly)
- [x] No earnings figures in the headline or hero
- [x] No personal-attribute phrasing — pain points describe situations ("Good week. One rule. Account gone.")
- [x] No fake urgency or scarcity — dates and seats are `[ADD: …]` placeholders only
- [x] $1M appears only in the footer, as "a long-term roadmap target, not a promise"
- [x] Testimonial section ends with "Individual results vary and are not typical."
- [x] Risk disclosure and "educational content, not financial advice" in the hero microcopy and footer
- [x] Page promise = free training + free strategy call, matching the ad

## Tracking

- Typeform `fTCjjlnG` (https://bit.ly/fptbootcampa) is embedded inline and passes UTMs + fbclid through.
- On a completed Typeform submission the page fires
  `fbq('trackCustom', 'LeadBootcamp', { content_name: 'Bootcamp 2.0 Typeform', form_id: 'fTCjjlnG' }, { eventID: responseId })`.
- The pixel base code loads from the `NEXT_PUBLIC_META_PIXEL_ID` env var (skipped if a pixel is already on the page).
