'use client';

import { motion } from 'framer-motion';
import FadeUp from '@/components/animations/FadeUp';
import SectionLabel from '@/components/ui/SectionLabel';
import { socials } from '@/lib/data';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        backgroundColor: 'var(--bg-dark)',
        borderTop: '1px solid var(--border)',
      }}
      aria-label="Contact section"
    >
      {/* Subtle grid overlay — dark version */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Label */}
        <FadeUp>
          <div className="mb-12 opacity-40">
            <SectionLabel index="05" label="Contact" />
          </div>
        </FadeUp>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-end">

          {/* LEFT */}
          <div>
            <FadeUp delay={0.05}>
              <h2
                className="leading-[1.0] mb-6 font-extrabold text-[#fdfbf7]"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  letterSpacing: '-0.03em',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Let&apos;s build
                <br />
                something
                <br />
                <span className="serif-italic text-[#ffbd59] font-normal font-serif">intelligent.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p
                className="max-w-md text-sm leading-relaxed mb-10"
                style={{ color: 'rgba(243,239,230,0.75)', fontSize: '0.9rem' }}
              >
                Open to AI engineering roles, founding engineer positions, and
                technical consulting. If you&apos;re building AI-powered products
                that matter — let&apos;s talk.
              </p>
            </FadeUp>

            {/* Email */}
            <FadeUp delay={0.18}>
              <motion.a
                href="mailto:jojoalbin21@gmail.com"
                className="group inline-flex items-center gap-3"
                whileHover={{ gap: '1rem' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    color: '#f3efe6',
                    letterSpacing: '-0.01em',
                    borderBottom: '1px solid rgba(243,239,230,0.4)',
                    paddingBottom: '2px',
                    transition: 'border-color 0.2s',
                  }}
                  className="group-hover:border-[#E87325]"
                >
                  jojoalbin21@gmail.com
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#E87325"
                  strokeWidth="2"
                >
                  <path d="M3 13L13 3M13 3H6M13 3V10" />
                </svg>
              </motion.a>
            </FadeUp>
          </div>

          {/* RIGHT — Socials + meta */}
          <FadeUp delay={0.2}>
            <div className="space-y-4">
              <p className="label" style={{ color: 'rgba(243,239,230,0.5)', fontSize: '0.58rem' }}>
                Find me on
              </p>
              <ul className="space-y-3" role="list">
                {socials.map((social) => {
                  const isGitHub = social.label.toLowerCase() === 'github';
                  const isLinkedIn = social.label.toLowerCase() === 'linkedin';
                  
                  return (
                    <li key={social.label}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-8 group"
                        aria-label={`${social.label} — ${social.handle}`}
                      >
                        <span
                          className="label flex items-center gap-2 group-hover:text-white transition-colors duration-150"
                          style={{ color: 'rgba(243,239,230,0.45)', fontSize: '0.6rem' }}
                        >
                          {isGitHub && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                            </svg>
                          )}
                          {isLinkedIn && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          )}
                          <span>{social.label}</span>
                        </span>
                        <span
                          className="label group-hover:text-[#E87325] transition-colors duration-150"
                          style={{ color: 'rgba(243,239,230,0.85)', fontSize: '0.6rem' }}
                        >
                          {social.handle} ↗
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeUp>
        </div>

        {/* Footer bar */}
        <FadeUp delay={0.25}>
          <div
            className="flex items-center justify-between mt-20 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="label" style={{ color: 'rgba(243,239,230,0.4)', fontSize: '0.55rem' }}>
              © 2026 Albin Jojo · Built with Next.js, Tailwind, Framer Motion
            </span>
            <span className="label" style={{ color: 'rgba(243,239,230,0.4)', fontSize: '0.55rem' }}>
              v1.4.2 · 2026.05
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
