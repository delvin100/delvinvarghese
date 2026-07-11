'use client';

import FadeUp from '@/components/animations/FadeUp';
import SectionLabel from '@/components/ui/SectionLabel';

const capabilities = [
  {
    group: 'AI & Machine Learning',
    items: ['Random Forest', 'Model Training', 'Model Deployment', 'Data Preprocessing', 'RAG Chatbots', 'scikit-learn', 'OpenCV'],
  },
  {
    group: 'Programming & Web Frameworks',
    items: ['Python', 'JavaScript', 'React', 'SQL', 'Flask', 'REST APIs', 'Joblib'],
  },
  {
    group: 'Tools & Cloud Platforms',
    items: ['Git', 'GitHub', 'Firebase', 'Google Cloud', 'AWS', 'Render', 'NumPy', 'Pandas'],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
      aria-label="About section"
    >
      <div className="mx-auto max-w-7xl px-6">

        <FadeUp>
          <SectionLabel index="01" label="About" className="mb-12" />
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT — Headline + bio ── */}
          <div>
            <FadeUp delay={0.05}>
              <h2
                className="leading-[1.1] mb-8 font-bold text-[#111]"
                style={{
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  letterSpacing: '-0.025em',
                  fontFamily: 'var(--font-display)',
                }}
              >
                I build the <span className="serif-italic text-[#E87325] text-[1.1em] font-normal font-serif">systems</span>
                <br />
                that power AI products.
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-4 text-sm leading-relaxed text-gray-700 max-w-[440px]">
                <p>
                  I&apos;m an AI engineer with a strong systems background and a
                  designer&apos;s eye for detail. I&apos;ve shipped LLM-powered products,
                  built inference infrastructure at scale, and led engineering
                  efforts from early prototype to production.
                </p>
                <p>
                  My work spans the full stack: from training-loop tooling and
                  embedding pipelines to the React interfaces that make those
                  capabilities accessible to real users. I care deeply about
                  the boundary where model intelligence meets human experience.
                </p>
                <p>
                  Currently interested in: agentic systems, on-device inference,
                  real-time AI interfaces, and pushing the quality ceiling on
                  human-centered AI products.
                </p>
              </div>
            </FadeUp>

            {/* Quick stats */}
            <FadeUp delay={0.18}>
              <div
                className="grid grid-cols-3 gap-4 mt-10 pt-8"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {[
                  { value: '3+', label: 'Years coding' },
                  { value: '4+', label: 'Various AI Projects' },
                  { value: '3+', label: 'Hackathon Awards' },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-black mb-0.5 text-2xl text-[#111]"
                      style={{
                        letterSpacing: '-0.03em',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {s.value}
                    </p>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT — Capabilities table ── */}
          <FadeUp delay={0.1}>
            <div
              className="rounded-2xl overflow-hidden border-2 border-black bg-[#fdfbf7] shadow-[4px_4px_0_0_#111]"
            >
              {/* Header */}
              <div
                className="px-5 py-3 border-b-2 border-black bg-white"
              >
                <span className="font-mono text-[9px] font-black uppercase tracking-wider text-[#111]">
                  Capability Map
                </span>
              </div>

              {/* Capability groups */}
              <div className="divide-y divide-black/10">
                {capabilities.map((group, gi) => (
                  <div key={group.group} className="px-5 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="font-mono text-[9.5px] font-black uppercase tracking-wider text-[#111]"
                      >
                        {group.group}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[8.5px] font-bold tracking-wider uppercase border border-black bg-white px-2.5 py-1 rounded-[3px] text-gray-700 shadow-[1px_1px_0_0_#111]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-5 py-3.5 bg-white border-t-2 border-black flex items-center justify-between"
              >
                <span className="font-mono text-[8px] font-black uppercase tracking-wider text-gray-500">
                  LAST UPDATED · 2026
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="status-dot active" aria-hidden="true" />
                  <span className="font-mono text-[8px] font-black uppercase tracking-wider text-[#111]">
                    active learner
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
