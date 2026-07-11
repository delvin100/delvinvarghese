'use client';

import { motion } from 'framer-motion';
import FadeUp from '@/components/animations/FadeUp';
import SectionLabel from '@/components/ui/SectionLabel';
import { experimentalWork } from '@/lib/data';

export default function Lab() {
  return (
    <section
      id="lab"
      className="relative bg-corkboard"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        borderTop: '2px solid #111',
      }}
      aria-label="Experimental work section"
    >
      <div className="mx-auto max-w-7xl px-6 relative z-10">

        {/* Header */}
        <FadeUp>
          <div className="mb-14">
            <SectionLabel index="04" label="Experimental Lab" className="mb-3" />
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="leading-[1.1] font-bold text-[#111]"
                style={{
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  letterSpacing: '-0.025em',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Prototypes &
                <br />
                <span className="serif-italic text-[#E87325] text-[1.1em] font-normal font-serif">Research</span>
              </h2>
              <p
                className="max-w-xs text-xs sm:text-sm font-medium text-gray-600 leading-relaxed sm:mb-2 lg:mb-3"
              >
                Explorations at the frontier of agentic systems, LLM inference pipelines,
                and experimental browser interactions.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Lab entries grid (corkboard style with tilted pinned cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experimentalWork.map((item, index) => {
            // Apply unique minor rotations and colors to each pinned paper
            const rotations = ['rotate-[-1.5deg]', 'rotate-[2deg]', 'rotate-[-2deg]'];
            const cardRotate = rotations[index % rotations.length];
            
            const stickyClasses = [
              'bg-[#fff9db] border-yellow-200', // Yellow note
              'bg-[#e5f9db] border-green-200',  // Lime note
              'bg-[#f3dbf9] border-purple-200', // Purple note
            ];
            const bgClass = stickyClasses[index % stickyClasses.length];

            return (
              <FadeUp key={item.id} delay={index * 0.08}>
                <motion.div
                  className={`relative p-5 pb-6 border-2 border-black rounded-lg shadow-[4px_4px_0_0_#111] transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] ${cardRotate} ${bgClass} h-full flex flex-col justify-between`}
                >
                  {/* Push Pin SVG at the top center of each card */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Pushpin shadow */}
                      <circle cx="12" cy="12" r="5" fill="rgba(17,17,17,0.12)" />
                      {/* Pushpin pin */}
                      <path d="M12 12V22" stroke="#999" strokeWidth="2" strokeLinecap="round" />
                      {/* Pushpin top */}
                      <circle cx="12" cy="9" r="6" fill="#b85c4b" stroke="#111" strokeWidth="1.5" />
                      <circle cx="10" cy="7" r="2" fill="white" opacity="0.4" />
                    </svg>
                  </div>

                  {/* Tape strip at top-right for layered look */}
                  <div className="absolute top-2 right-2 w-10 h-3 bg-white/20 border-l border-r border-dashed border-black/10 rotate-[25deg] select-none pointer-events-none" />

                  {/* Card Content */}
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-4 border-b border-black/5 pb-2 font-mono text-[9px] font-bold text-gray-500 uppercase">
                      <span>{item.id}</span>
                      <span className="border border-black/15 bg-white px-2 py-0.5 rounded-[3px] text-gray-700">
                        {item.status}
                      </span>
                    </div>

                    <h3
                      className="font-bold mb-2 text-[#111] text-base leading-snug font-sans"
                    >
                      {item.title}
                    </h3>
                    
                    <p className="text-xs leading-relaxed text-gray-600 font-medium mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5 mt-auto">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-400"
                      >
                        #{tag.toLowerCase().replace(/ /g, '-')}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
