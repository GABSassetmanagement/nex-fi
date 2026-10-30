import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  AppleLogo,
  Bank,
  CurrencyBtc,
  CaretLeft,
  CaretRight,
  Quotes,
  BellRinging,
  Lightning,
  ArrowDownLeft,
  ArrowsClockwise,
  CheckCircle,
} from '@phosphor-icons/react';

interface SectionProps {
  onOpenApply: (productName?: string) => void;
}

interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  tag: string;
  quote: string;
  avatar: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: '1',
    author: 'Esteban Fournier',
    role: 'Logistics Founder & Public Co-op Member',
    tag: 'Quick Liquidity',
    quote:
      'Super easy to use, great APY, seamless transactions. Finally a financial institution with authentic, verified public loan support and prompt customer care.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    author: 'Kantouz O.',
    role: 'Senior Software Architect',
    tag: 'High Yield Vaults',
    quote:
      'The fixed wealth deposit returns are unbelievable—over 3x what commercial banks offer across regular term savings. Interest accruals reflect daily without fail.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    author: 'Sgt. A. Mohammed',
    role: 'Federal Paramilitary Command Officer',
    tag: 'Suremoney Loan',
    quote:
      'Traditional lenders made me wait 4 weeks with hidden administrative charges. With Nexus, my Suremoney loan arrived in under 15 minutes directly into my account.',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    author: 'Dr. Ngozi Adeleke',
    role: 'Medical Director, Garki Clinic',
    tag: 'Car-for-Cash Facility',
    quote:
      'The Car-for-Cash facility allowed us to finance urgent surgical equipment within 3 hours. My car was securely held in their insured depot and returned in pristine condition.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    author: 'Engr. Babatunde Lawal',
    role: 'Federal Infrastructure Contractor',
    tag: 'Invoice Discounting',
    quote:
      'Invoice Discounting with Nexus turned our 90-day government receivables into liquid operational capital. It kept our site engineers fully mobilized.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    author: 'Hajia Aisha Bello',
    role: 'Managing Director, Horizon Wholesale',
    tag: 'Women Empowerment',
    quote:
      'The Women Empowerment facility delivered flexible funding and advisory support to double our wholesale inventory across the North Central region.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80',
  },
];

/* =========================================================================
   1. Yield Section: "Cash that grows at 15.5% APY. Paid in realtime."
   ========================================================================= */
export const YieldSection: React.FC<SectionProps> = ({ onOpenApply }) => {
  const [lifetimeYield, setLifetimeYield] = useState<number>(38427.328);
  const [thirtyDayYield, setThirtyDayYield] = useState<number>(4486.387);

  useEffect(() => {
    const interval = setInterval(() => {
      setLifetimeYield((prev) => prev + 0.000412);
      setThirtyDayYield((prev) => prev + 0.000206);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="yield" className="py-24 bg-canvas border-t border-rule relative io-reveal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Headline and Description */}
          <div className="lg:col-span-6 text-left">
            <h2 className="nx-section-title text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink mb-6 font-display text-balance leading-[1.08]">
              Cash that grows at <br />
              <span className="text-brand">15.5% APY.</span> <br />
              Paid in realtime.
            </h2>
            <p className="text-lg text-muted mb-8 max-w-md font-body leading-relaxed">
              Choose your interest strategy and earn up to 15.5% APY on your Naira and USD institutional balance with daily interest settlements.
            </p>
            <button
              onClick={() => onOpenApply('Institutional Fixed Deposit Vaults')}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-action hover:bg-action-hover active:scale-95 text-on-action font-semibold text-sm rounded-full transition-all shadow-sm cursor-pointer font-body"
            >
              Start now
            </button>
          </div>

          {/* Right: Phone displaying Real-time Earnings */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[340px] rounded-[42px] p-3 bg-subtle border-2 border-rule shadow-sm">
              <div className="rounded-[32px] bg-surface text-ink p-5 text-left relative min-h-[460px] flex flex-col justify-between font-body">
                <div>
                  {/* Status notch */}
                  <div className="flex justify-between items-center text-xs font-semibold text-ink mb-5">
                    <span>9:41</span>
                    <span className="text-[10px] bg-accent-soft text-success px-2 py-0.5 rounded-full font-sans font-semibold">
                      15.5% APY
                    </span>
                  </div>

                  <div className="text-xs text-muted">Cash balance</div>
                  <div className="text-3xl font-semibold font-display text-ink mb-6 tabular-nums">
                    ₦1,240,550.00
                  </div>

                  {/* Interest Earned Card */}
                  <div className="p-4 rounded-xl bg-subtle border border-rule mb-6">
                    <div className="text-xs font-semibold text-muted mb-2 font-sans">Interest earned</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-[10px] text-muted font-sans">Lifetime</div>
                        <div className="text-sm font-sans font-semibold text-success tabular-nums">
                          +₦{lifetimeYield.toFixed(3)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted font-sans">Last 30 days</div>
                        <div className="text-sm font-sans font-semibold text-success tabular-nums">
                          +₦{thirtyDayYield.toFixed(3)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interest Strategy selector */}
                  <div>
                    <div className="text-xs font-semibold text-muted mb-2 font-sans">Your interest strategy</div>
                    <div className="p-3 rounded-xl bg-subtle border border-rule flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-accent-soft text-success flex items-center justify-center font-semibold text-xs">
                          🏛
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ink font-sans">Nexus Sovereign Prime</div>
                          <div className="text-[10px] text-muted font-sans">₦1,240,550.00 allocated</div>
                        </div>
                      </div>
                      <span className="text-xs font-sans font-semibold text-success">15.5% APY</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-rule flex justify-between items-center text-xs">
                  <span className="text-muted font-sans">Compounding daily</span>
                  <span className="font-semibold text-success font-sans">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   2. Almighty Card Section: "The almighty card"
   ========================================================================= */
export const AlmightyCardSection: React.FC<SectionProps> = ({ onOpenApply }) => {
  return (
    <section id="card" className="nx-inverse py-24 bg-action text-on-action text-center relative overflow-hidden io-reveal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-ink mb-10 font-display">
          The almighty card
        </h2>

        {/* 3D Black Visa Card */}
        <div className="relative mx-auto w-full max-w-[420px] aspect-[1.586/1] rounded-xl p-7 bg-gradient-to-br from-surface via-surface to-black text-ink border border-rule flex flex-col justify-between text-left mb-10 transition-transform duration-500 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold font-display tracking-tighter text-brand">nexus</span>
            <span className="text-xl font-semibold font-display italic tracking-wider text-ink">VISA</span>
          </div>

          {/* Embossed Watermark */}
          <div className="my-auto opacity-10 font-semibold text-6xl tracking-widest text-center select-none font-display text-ink">
            NEXUS
          </div>

          <div className="flex items-end justify-between font-sans text-sm text-muted">
            <span className="tracking-widest">··· 2584</span>
            <span className="text-[11px] text-success font-medium">Works with Apple Pay &amp; Google Pay</span>
          </div>
        </div>

        <p className="text-base sm:text-lg text-ink font-medium max-w-2xl mx-auto mb-8 font-body leading-relaxed">
          Pay at more than 175 million merchants worldwide with Nexus Card. Daily limits can grow to ₦50,000,000 as you spend. Works with Apple Pay and Google Pay.
        </p>

        <button
          onClick={() => onOpenApply('The Almighty Nexus Card')}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-canvas hover:bg-subtle active:scale-95 text-ink font-semibold text-sm rounded-full transition-all shadow-sm cursor-pointer font-body"
        >
          Meet Nexus Card
        </button>
      </div>
    </section>
  );
};

/* =========================================================================
   3. 15-Minute Prompt Disbursement Section with Animated Phone Alert
   ========================================================================= */
export const MoveMoneySection: React.FC<SectionProps> = ({ onOpenApply }) => {
  const [alertReceived, setAlertReceived] = useState(false);
  const [balance, setBalance] = useState<number>(1240550);
  const [isVibrating, setIsVibrating] = useState(false);

  // Auto-play the incoming credit alert loop seamlessly
  useEffect(() => {
    let timer1: any;
    let timer2: any;
    let timer3: any;
    let timerReset: any;

    const runAlertCycle = () => {
      // Phase 1: Reset to baseline before incoming credit
      setAlertReceived(false);
      setIsVibrating(false);
      setBalance(1240550);

      // Phase 2: Alert arrives at 1.8s with haptic vibration & notification drop
      timer1 = setTimeout(() => {
        setIsVibrating(true);
        setAlertReceived(true);
      }, 1800);

      // Phase 3: Stop vibration shortly after
      timer2 = setTimeout(() => {
        setIsVibrating(false);
      }, 2300);

      // Phase 4: Balance counts up at 2.4s
      timer3 = setTimeout(() => {
        setBalance(2740550);
      }, 2400);

      // Phase 5: Loop cycle after 7.5s
      timerReset = setTimeout(runAlertCycle, 7500);
    };

    runAlertCycle();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerReset);
    };
  }, []);

  return (
    <section id="disbursal" className="py-24 bg-canvas text-ink relative io-reveal overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent-soft rounded-full blur-[160px] pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 15-Minute Turnaround Copy */}
          <div className="lg:col-span-6 text-left">
            <h2 className="nx-section-title text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink mb-6 font-display text-balance leading-[1.08]">
              Prompt liquidity. <br />
              Disbursed in <span className="text-brand">15 minutes flat.</span>
            </h2>

            <p className="text-lg text-muted mb-8 max-w-md font-sans leading-relaxed">
              No paperwork marathons. No days lost to commercial bank bureaucracy. From automated algorithmic credit underwriting to NIBSS instant settlement, approved funds land directly in your account in 15 minutes or less.
            </p>

            {/* SLA Proof Cards */}
            <div className="space-y-3.5 mb-8 font-sans">
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-colors">
                <span className="w-9 h-9 rounded-xl bg-accent-soft border border-brand/25 text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Lightning className="w-5 h-5" weight="regular" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">Algorithmic Decisioning in &lt;3 Minutes</div>
                  <div className="text-xs text-muted mt-0.5">Instant automated BVN, NIN, and Remita payroll validation without paper friction.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-colors">
                <span className="w-9 h-9 rounded-xl bg-accent-soft border border-brand/25 text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Bank className="w-5 h-5" weight="regular" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">Direct NIBSS Instant Interbank Rail</div>
                  <div className="text-xs text-muted mt-0.5">Immediate, zero-delay settlement to all commercial banks across Nigeria.</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-colors">
                <span className="w-9 h-9 rounded-xl bg-accent-soft border border-brand/25 text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <BellRinging className="w-5 h-5" weight="regular" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">Live In-App &amp; SMS Credit Confirmation</div>
                  <div className="text-xs text-muted mt-0.5">Simultaneous credit alert with transparent breakdown and official receipt docket.</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenApply('Suremoney Loan')}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-action hover:bg-action-hover active:scale-95 text-on-action font-semibold text-sm rounded-full transition-all shadow-sm cursor-pointer font-sans"
              >
                Apply for 15-Min Loan
              </button>
            </div>
          </div>

          {/* Right Column: Animated Smartphone receiving Nexus Credit Alert */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Ambient radar pulse glow behind phone */}
            <motion.div
              animate={{
                scale: alertReceived ? [1, 1.25, 1.1] : 1,
                opacity: alertReceived ? [0.2, 0.45, 0.2] : 0.15,
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[360px] h-[520px] rounded-[50px] bg-accent-soft blur-3xl pointer-events-none -z-0"
            />

            {/* Smartphone Container with floating and haptic vibration animation */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                x: isVibrating ? [0, -3, 3, -3, 3, -1, 1, 0] : 0,
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                x: { duration: 0.35, ease: 'linear' },
              }}
              className="w-full max-w-[350px] rounded-[44px] p-3 bg-subtle border-2 border-rule relative select-none z-10"
            >
              {/* Dynamic Island / Speaker notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-canvas rounded-full z-30 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-subtle" />
              </div>

              {/* Phone Display Canvas */}
              <div className="rounded-[34px] bg-surface text-ink p-5 text-left relative min-h-[500px] flex flex-col justify-between font-sans overflow-hidden">
                {/* INCOMING PUSH NOTIFICATION ALERT FROM NEXUS FINANCE */}
                <AnimatePresence>
                  {alertReceived && (
                    <motion.div
                      initial={{ y: -85, opacity: 0, scale: 0.88 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -85, opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 240 }}
                      className="absolute top-3 left-3 right-3 z-40 p-3.5 rounded-xl bg-canvas text-ink shadow-sm border-2 border-brand backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-lg bg-action text-on-action font-semibold text-[10px] flex items-center justify-center font-display">
                            N
                          </span>
                          <span className="text-[11px] font-semibold text-ink uppercase tracking-wider font-display">
                            Nexus Finance
                          </span>
                        </div>
                        <span className="text-[10px] text-brand font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-action" />
                          Just now
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-ink flex items-center gap-1.5 mb-0.5">
                        <BellRinging className="w-3.5 h-3.5 text-brand shrink-0" weight="regular" />
                        <span>Direct Credit Alert: ₦1,500,000.00</span>
                      </div>
                      <p className="text-[11px] text-muted leading-tight">
                        Disbursed in 14m 28s · Ref: NX-8921 · NIBSS Fast Settlement
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Phone Top Status */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-ink mb-5 pt-3">
                    <span>9:41</span>
                    <span className="text-[10px] bg-accent-soft text-success px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-action" />
                      NIBSS Connected
                    </span>
                  </div>

                  {/* Cash Balance Display with dynamic animation */}
                  <div className="text-xs text-muted font-sans">Total available balance</div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <motion.div
                      key={balance}
                      initial={{ scale: 1.02 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="nx-phone-balance text-3xl font-semibold font-display tracking-tight tabular-nums"
                    >
                      ₦{balance.toLocaleString('en-NG')}.00
                    </motion.div>
                    {alertReceived && (
                      <motion.span
                        initial={{ opacity: 0, x: -8, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="text-xs font-semibold text-success bg-accent-soft px-2 py-0.5 rounded-md"
                      >
                        +₦1.5M
                      </motion.span>
                    )}
                  </div>

                  {/* Mini summary badges */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-subtle rounded-xl mb-4 text-xs font-semibold font-sans">
                    <div className="bg-subtle text-ink p-2 rounded-lg text-center">
                      Cash: ₦{balance.toLocaleString('en-NG')}
                    </div>
                    <div className="p-2 text-muted text-center">
                      Vaults: ₦3,571,810
                    </div>
                  </div>

                  {/* Activity stream */}
                  <div className="flex items-center justify-between text-xs font-semibold text-muted uppercase tracking-wider mb-2 font-sans">
                    <span>Today's Activity</span>
                    <span className="text-[10px] text-success font-semibold lowercase">
                      {alertReceived ? '1 new alert' : 'up to date'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-sans">
                    {/* Live Disbursal Transaction (Animates when alert triggers) */}
                    <AnimatePresence>
                      {alertReceived && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-accent-soft border-2 border-brand shadow-sm overflow-hidden"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-action text-on-action flex items-center justify-center font-semibold">
                              <ArrowDownLeft className="w-4 h-4" weight="regular" />
                            </div>
                            <div>
                              <div className="font-semibold text-success text-xs">15-Min Loan Credit</div>
                              <div className="text-[10px] text-success">NIBSS Real-time · Just now</div>
                            </div>
                          </div>
                          <span className="font-semibold font-display text-success text-sm tabular-nums">
                            +₦1,500,000.00
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-subtle">
                      <span className="font-semibold text-ink">Direct Deposit</span>
                      <span className="font-semibold text-success tabular-nums">+₦500,000.00</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-subtle">
                      <span className="font-semibold text-ink">Fuel &amp; Fleet Logistics</span>
                      <span className="text-muted tabular-nums">-₦15,480.00</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-subtle">
                      <span className="font-semibold text-ink">Transfer Out</span>
                      <span className="text-muted tabular-nums">-₦25,000.00</span>
                    </div>
                  </div>
                </div>

                {/* Bottom settlement badge */}
                <div className="text-[11px] text-center text-muted pt-3 border-t border-rule flex items-center justify-center gap-1.5 font-sans">
                  <CheckCircle className="w-3.5 h-3.5 text-success" weight="regular" />
                  <span>Instant settlement verified in 14m 28s</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   4. Funding Channels Section: "From zero to funded in under 2 minutes"
   ========================================================================= */
export const FundingChannelsSection: React.FC = () => {
  return (
    <section className="py-24 bg-canvas text-ink text-center border-t border-rule relative io-reveal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="nx-section-title text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink mb-4 font-display">
          From zero to funded in <br className="hidden sm:inline" />
          under 2 minutes
        </h2>
        <p className="text-lg text-muted mb-14 max-w-xl mx-auto font-body">
          Your Nexus account handles any kind of money.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* 1. Paycheck */}
          <div className="p-6 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-subtle flex items-center justify-center text-brand mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 font-display">Bring your paycheck</h3>
              <p className="text-xs text-muted leading-relaxed font-body">
                Your dedicated account details for instant salary deposits and direct federal MDA payroll integration.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rule text-[11px] font-sans font-semibold text-brand">
              Direct IPPIS / NIBSS
            </div>
          </div>

          {/* 2. Apple Pay */}
          <div className="p-6 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-subtle flex items-center justify-center text-ink mb-6">
                <AppleLogo className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 font-display">Using Apple Pay</h3>
              <p className="text-xs text-muted leading-relaxed font-body">
                Top up in seconds from an existing debit or credit card with zero manual account entries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rule text-[11px] font-sans font-semibold text-brand">
              Instant Card Gateway
            </div>
          </div>

          {/* 3. Bank Pull */}
          <div className="p-6 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-subtle flex items-center justify-center text-brand mb-6">
                <Bank className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 font-display">Pull from the bank</h3>
              <p className="text-xs text-muted leading-relaxed font-body">
                Link an existing bank account and pull money into your high-yield Nexus account in a few taps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rule text-[11px] font-sans font-semibold text-brand">
              Zero-Fee Transfers
            </div>
          </div>

          {/* 4. Crypto & Stablecoins */}
          <div className="p-6 rounded-xl bg-subtle border border-rule hover:border-brand/25 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-subtle flex items-center justify-center text-brand mb-6">
                <CurrencyBtc className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 font-display">Crypto &amp; stablecoins</h3>
              <p className="text-xs text-muted leading-relaxed font-body">
                Deposit USDC / USDT straight into your balance and earn yield instantly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rule text-[11px] font-sans font-semibold text-brand">
              1:1 Settlement
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   5. Testimonials & Join Section: "Join 100k+ people with Nexus & Testimonial"
   ========================================================================= */
export const TestimonialsSliderSection: React.FC = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  // Scroll to specific card index smoothly
  const scrollToIndex = (index: number) => {
    if (!sliderTrackRef.current) return;
    const container = sliderTrackRef.current;
    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
      setSliderIndex(index);
    }
  };

  const handlePrevTestimonial = () => {
    const prevIdx = (sliderIndex - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
    scrollToIndex(prevIdx);
  };

  const handleNextTestimonial = () => {
    const nextIdx = (sliderIndex + 1) % TESTIMONIALS_DATA.length;
    scrollToIndex(nextIdx);
  };

  // Sync index on manual scroll / swipe
  const handleScroll = () => {
    if (!sliderTrackRef.current) return;
    const container = sliderTrackRef.current;
    const scrollPos = container.scrollLeft;
    const cardWidth = container.firstElementChild?.clientWidth || 380;
    const gap = 24; // gap-6 is 24px
    const newIdx = Math.round(scrollPos / (cardWidth + gap));
    if (newIdx >= 0 && newIdx < TESTIMONIALS_DATA.length && newIdx !== sliderIndex) {
      setSliderIndex(newIdx);
    }
  };

  // Auto advance horizontal slider
  useEffect(() => {
    if (isSliderPaused) return;
    const interval = setInterval(() => {
      setSliderIndex((prev) => {
        const next = (prev + 1) % TESTIMONIALS_DATA.length;
        if (sliderTrackRef.current) {
          const container = sliderTrackRef.current;
          const cards = container.children;
          if (cards[next]) {
            const card = cards[next] as HTMLElement;
            container.scrollTo({
              left: card.offsetLeft - container.offsetLeft,
              behavior: 'smooth',
            });
          }
        }
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isSliderPaused]);

  return (
    <section className="py-24 bg-surface text-ink text-center border-t border-rule relative io-reveal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="nx-section-title text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink mb-8 font-display">
          Join 100k+ people with Nexus
        </h2>

        {/* App store downloads: EXACT SAME LENGTH / WIDTH */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button className="w-48 sm:w-52 h-14 px-5 rounded-xl bg-subtle hover:bg-subtle border border-rule hover:border-rule flex items-center justify-center gap-3 text-xs font-semibold transition-all cursor-pointer">
            <AppleLogo className="w-6 h-6 text-ink shrink-0" weight="fill" />
            <div className="text-left leading-tight">
              <div className="text-[10px] text-muted uppercase font-sans">Download on the</div>
              <div className="text-sm font-semibold font-sans">App Store</div>
            </div>
          </button>

          <button className="w-48 sm:w-52 h-14 px-5 rounded-xl bg-subtle hover:bg-subtle border border-rule hover:border-rule flex items-center justify-center gap-3 text-xs font-semibold transition-all cursor-pointer">
            <svg className="w-5 h-5 text-ink shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.793 12 3.61 22.186c-.378-.387-.61-.926-.61-1.526V3.34c0-.6.232-1.14.61-1.526zM15.207 13.414l2.766 2.766-12.015 6.94 9.249-9.706zm0-2.828L5.958.88l12.015 6.94-2.766 2.766zm1.414 1.414l3.771-2.18c.945-.546.945-1.436 0-1.982l-3.771-2.18-1.414 1.414 1.414 4.928z"/>
            </svg>
            <div className="text-left leading-tight">
              <div className="text-[10px] text-muted uppercase font-sans">Get it on</div>
              <div className="text-sm font-semibold font-sans">Google Play</div>
            </div>
          </button>
        </div>

        {/* Interactive Horizontal Testimonials Slider */}
        <div
          className="relative text-left"
          onMouseEnter={() => setIsSliderPaused(true)}
          onMouseLeave={() => setIsSliderPaused(false)}
        >
          {/* Slider navigation header controls */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-brand font-sans font-semibold">
                Member Experiences
              </span>
              <p className="text-muted text-sm font-sans mt-0.5">
                Real feedback from civil servants, entrepreneurs, and contractors across Nigeria
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-muted hidden sm:inline-block">
                <span className="text-brand font-semibold">{sliderIndex + 1}</span> / {TESTIMONIALS_DATA.length}
              </span>
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-subtle hover:bg-subtle border border-rule flex items-center justify-center text-ink transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <CaretLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-subtle hover:bg-subtle border border-rule flex items-center justify-center text-ink transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <CaretRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Slider Track */}
          <div
            ref={sliderTrackRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {TESTIMONIALS_DATA.map((item, idx) => {
              const isActive = sliderIndex === idx;
              return (
                <div
                  key={item.id}
                  className={`w-[85vw] sm:w-[380px] lg:w-[420px] shrink-0 snap-start p-7 sm:p-8 rounded-xl bg-subtle border transition-all duration-300 flex flex-col justify-between shadow-sm group ${
                    isActive
                      ? 'border-brand/25 bg-gradient-to-b from-subtle via-subtle to-surface'
                      : 'border-rule hover:border-brand/25'
                  }`}
                >
                  <div>
                    {/* Top tag & quote icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs uppercase tracking-wider text-brand font-sans font-semibold bg-accent-soft px-3 py-1 rounded-full border border-brand/25">
                        {item.tag}
                      </span>
                      <Quotes className="w-6 h-6 text-muted group-hover:text-brand transition-colors" />
                    </div>

                    {/* Quote text (no stars) */}
                    <p className="text-sm sm:text-base text-ink leading-relaxed italic mb-8 font-sans">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author with circular face photo */}
                  <div className="pt-4 border-t border-rule flex items-center gap-3.5">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-brand/40 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-semibold text-ink text-sm font-sans">{item.author}</div>
                      <div className="text-muted text-xs font-sans mt-0.5">{item.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Horizontal Slider Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {TESTIMONIALS_DATA.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  sliderIndex === dotIdx ? 'w-8 bg-action' : 'w-2 bg-subtle hover:bg-subtle'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   6. Live Ticking Yield Section: "Since your first visit..."
   ========================================================================= */
export const LiveTickingYieldSection: React.FC<SectionProps> = ({ onOpenApply }) => {
  const [visitCounter, setVisitCounter] = useState<number>(10005.242509);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitCounter((prev) => prev + 0.000155);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="nx-savings nx-inverse py-28 text-center relative overflow-hidden select-none io-reveal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs sm:text-sm font-semibold tracking-wide text-ink uppercase mb-4 font-sans">
          An illustration of how your savings could grow
        </div>

        {/* Huge live incrementing number */}
        <div className="nx-balance font-semibold font-display tracking-tight text-ink mb-6 tabular-nums">
          ₦{visitCounter.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>

        <p className="text-base sm:text-xl font-medium text-ink max-w-xl mx-auto mb-10 font-body">
          An illustrative balance on a ₦10,000 deposit. Explore the rates and terms available to you.
        </p>

        <button
          onClick={() => onOpenApply()}
          className="inline-flex items-center justify-center px-10 py-4 bg-canvas hover:bg-subtle active:scale-95 text-ink font-semibold text-base rounded-full transition-all shadow-sm cursor-pointer font-body"
        >
          Get Nexus
        </button>
      </div>
    </section>
  );
};

/* Wrapper if needed for backward compatibility */
export const TuyoShowcaseSections: React.FC<SectionProps> = ({ onOpenApply }) => {
  return (
    <>
      <YieldSection onOpenApply={onOpenApply} />
      <AlmightyCardSection onOpenApply={onOpenApply} />
      <MoveMoneySection onOpenApply={onOpenApply} />
      <FundingChannelsSection />
      <TestimonialsSliderSection />
      <LiveTickingYieldSection onOpenApply={onOpenApply} />
    </>
  );
};
