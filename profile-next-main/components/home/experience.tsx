'use client';

import FadeUp from '@/components/animations/FadeUp';
import SectionLabel from '@/components/ui/SectionLabel';
import { experience } from '@/lib/data';

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        backgroundColor: '#FAF8F5',
        borderTop: '2px border-black',
      }}
      aria-label="Experience section"
    >
      {/* Grid overlay for texture */}
      <div className="grid-overlay opacity-10" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <FadeUp>
            <div>
              <SectionLabel index="03" label="Engineering Experience" className="mb-3" />
              <h2
                className="leading-none font-bold text-[#111]"
                style={{
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  letterSpacing: '-0.025em',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Where I&apos;ve
                <br />
                <span className="serif-italic text-[#E87325] text-[1.15em] font-normal font-serif">Shipped</span>
              </h2>
            </div>
          </FadeUp>
        </div>

        {/* Timeline dossier sheet */}
        <div className="relative border-2 border-black rounded-2xl bg-white p-6 sm:p-10 shadow-[6px_6px_0_0_#111] overflow-hidden">
          
          {/* Subtle notebook page red left line */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-12 w-[1.5px] bg-red-400/25 pointer-events-none" />

          <div className="divide-y-2 divide-dashed divide-black/10">
            {experience.map((item, index) => {
              // Staggered index label colors
              const colors = ['#FFE596', '#FFC296', '#D7FF96', '#F3DBF9'];
              const folderTabColor = colors[index % colors.length];

              return (
                <article
                  key={item.id}
                  className="relative grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 py-8 sm:py-10 pl-6 sm:pl-16 first:pt-2 last:pb-2"
                >
                  {/* Left Column — Metadata styled as folder logs */}
                  <div className="md:pr-8 flex flex-col items-start">
                    <div
                      className="font-mono text-[9px] font-bold tracking-wider uppercase mb-2 flex items-center gap-2"
                      style={{ color: '#4C8FA3' }}
                    >
                      <span className="status-dot" style={{ backgroundColor: '#4C8FA3' }} aria-hidden="true" />
                      {item.period}
                    </div>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                      {item.type} · {item.location}
                    </p>
                    
                    {/* Stamped tab/label for the company name */}
                    <div
                      className="font-mono text-[10px] font-black uppercase tracking-wider border-2 border-black px-3 py-1 shadow-[2px_2px_0_0_#111] inline-block rotate-[-1.5deg] hover:rotate-0 transition-transform duration-150 select-none text-[#111]"
                      style={{ backgroundColor: folderTabColor }}
                    >
                      {item.company}
                    </div>
                  </div>

                  {/* Right Column — Accomplishment Logs */}
                  <div className="flex flex-col justify-start">
                    <h3
                      className="text-base sm:text-lg font-bold mb-4 text-[#111] font-sans"
                      style={{ letterSpacing: '-0.01em' }}
                    >
                      {item.role}
                    </h3>

                    <ul className="space-y-3" role="list">
                      {item.points.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-gray-600 font-medium"
                        >
                          {/* Mini check-style doodle arrow indicator */}
                          <span
                            className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: '#E87325' }}
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
