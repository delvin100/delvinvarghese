'use client';

import FadeUp from '@/components/animations/FadeUp';
import SectionLabel from '@/components/ui/SectionLabel';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        backgroundColor: 'var(--bg-alt)',
        borderTop: '1px solid var(--border)',
      }}
      aria-label="Projects section"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <FadeUp>
            <div>
              <SectionLabel index="02" label="Selected Work" className="mb-3" />
              <h2
                className="leading-[1.1] font-bold text-[#111]"
                style={{
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  letterSpacing: '-0.025em',
                  fontFamily: 'var(--font-display)',
                }}
              >
                AI & Engineering
                <br />
                <span className="serif-italic text-[#E87325] text-[1.1em] font-normal font-serif">Projects</span>
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div
              className="flex items-center gap-6 text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink-faint)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="status-dot" style={{ backgroundColor: '#4caf72' }} />
                Deployed
              </div>
              <div className="flex items-center gap-1.5">
                <span className="status-dot" style={{ backgroundColor: 'var(--blue)' }} />
                In Progress
              </div>
              <div className="flex items-center gap-1.5">
                <span className="status-dot" style={{ backgroundColor: '#999' }} />
                Archived
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer */}
        <FadeUp delay={0.15} className="mt-12">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#111]"
            style={{
              backgroundColor: '#fdfbf7',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="status-dot active" aria-hidden="true" />
              <span className="label" style={{ fontSize: '0.6rem' }}>
                {projects.length} projects indexed · active source code
              </span>
            </div>
            <a
              href="https://github.com/albinjojo"
              target="_blank"
              rel="noopener noreferrer"
              className="label hover:opacity-60 transition-opacity flex items-center gap-1.5"
              style={{ color: 'var(--ink-muted)', fontSize: '0.6rem' }}
            >
              View all on GitHub
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 13L13 3M13 3H6M13 3V10" />
              </svg>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
