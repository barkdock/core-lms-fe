import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for trying out the platform and exploring basic content.',
    highlight: false,
    features: ['1 basic roadmap', 'Access to select free courses', 'Basic progress tracking'],
  },
  {
    name: 'Pro',
    price: '259k / month',
    description: 'For individuals serious about learning a profession or upgrading skills.',
    highlight: true,
    features: [
      'All available courses',
      'Goal-oriented suggested roadmaps',
      'Real-world projects with reviews',
      'Course completion certificates',
    ],
  },
  {
    name: 'Teams',
    price: 'Contact Us',
    description: 'Training solutions for teams, startups, and small businesses.',
    highlight: false,
    features: ['Student management dashboard', 'Custom roadmaps for businesses', 'Detailed progress reports'],
  },
]

function Pricing() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm shadow-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Flexible pricing, no contracts
          </p>
          <h1 className="mt-3 text-xl font-semibold text-slate-900 md:text-2xl">Choose the right plan for you</h1>
          <p className="mt-2 text-sm text-slate-500">
            Cancel anytime. Start for free, upgrade when you need more power.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.article
              key={tier.name}
              className={`flex flex-col justify-between rounded-2xl border p-4 text-sm shadow-sm shadow-slate-200/60 backdrop-blur-md md:p-5 ${
                tier.highlight
                  ? 'border-slate-900 bg-slate-900 text-slate-50'
                  : 'border-slate-100 bg-white/90 text-slate-800'
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <header className="mb-4 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold">{tier.name}</h2>
                  {tier.highlight && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                      Popular
                    </span>
                  )}
                </div>
                <p className={`text-sm ${tier.highlight ? 'text-slate-200' : 'text-slate-500'}`}>
                  {tier.description}
                </p>
                <p className="mt-2 text-base font-semibold">{tier.price}</p>
              </header>

              <ul className="mb-4 space-y-2 text-xs">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                        tier.highlight ? 'bg-emerald-400/20 text-emerald-300' : 'bg-emerald-50 text-emerald-500'
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span className={tier.highlight ? 'text-slate-100' : 'text-slate-600'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  tier.highlight
                    ? 'bg-slate-50 text-slate-900 hover:bg-white'
                    : 'bg-slate-900 text-slate-50 hover:bg-slate-800'
                }`}
              >
                {tier.highlight ? 'Get Started with Pro' : tier.name === 'Teams' ? 'Contact Sales' : 'Sign Up for Free'}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing

