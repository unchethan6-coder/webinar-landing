import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Training: Funded Prop Traders Bootcamp | Funded Prop Traders',
  description: 'Free training on the rules-first process for prop firm evaluations, plus a free strategy call. Educational content, not financial advice.',
}

export default function BootcampLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
