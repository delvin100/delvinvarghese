'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusConfig = {
  deployed: { label: 'Deployed', color: '#4caf72' },
  'in-progress': { label: 'In Progress', color: '#5b7c99' },
  archived: { label: 'Archived', color: '#999999' },
};

const typeConfig = {
  ai: { label: 'AI / ML', accent: '#E87325' },
  systems: { label: 'Systems', accent: '#4C8FA3' },
  product: { label: 'Product', accent: '#8CBF3F' },
  research: { label: 'Research', accent: '#7F5FA3' },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const type = typeConfig[project.type] || typeConfig.product;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.07,
      }}
      className="group relative flex flex-col pt-6 h-full w-full"
    >
      {/* Folder Tab Ear - Sticking out of the top border */}
      <div className="absolute top-0 left-4 z-10 flex items-end">
        <div 
          className="rounded-t-lg border-2 border-black border-b-0 px-4 py-1 text-[9px] font-bold tracking-wider uppercase bg-[#FAF8F5] select-none"
          style={{
            fontFamily: 'var(--font-mono)',
            borderColor: '#111',
            color: '#111',
            transform: 'translateY(2px)',
          }}
        >
          {project.id}
        </div>
        
        {/* Mini Tape strip holding the tab label */}
        <div className="w-6 h-3 bg-red-400/10 border-l border-r border-dashed border-black/10 rotate-[-15deg] -ml-2 -mb-0.5 select-none hidden sm:block" />
      </div>

      {/* Main Index Card Body */}
      <div 
        className="flex-1 rounded-xl rounded-tl-none border-2 border-black bg-[#FAF8F5] p-5 pb-6 shadow-[4px_4px_0_0_#111] transition-all duration-200 group-hover:-translate-x-[1px] group-hover:-translate-y-[1px] group-hover:shadow-[6px_6px_0_0_#111] flex flex-col justify-between relative overflow-hidden"
      >
        {/* Subtle lined pattern in background of index card */}
        <div className="absolute inset-0 bg-ruled opacity-20 pointer-events-none" />

        {/* Card Header */}
        <div className="relative z-10 flex items-center justify-between mb-4 border-b border-black/5 pb-2">
          {/* Tech Type Tag */}
          <span
            className="font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-black rounded-[3px]"
            style={{ backgroundColor: `${type.accent}18`, color: type.accent }}
          >
            {type.label}
          </span>

          {/* Status badge */}
          <div className="flex items-center gap-1.5">
            <span
              className="status-dot"
              style={{
                backgroundColor: status.color,
                boxShadow: project.status === 'deployed' ? `0 0 5px ${status.color}88` : 'none',
              }}
              aria-hidden="true"
            />
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#111]">
              {status.label}
            </span>
          </div>
        </div>

        {/* Project Details */}
        <div className="relative z-10 mb-4 flex-1">
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            {project.year}
          </p>
          
          <h3
            className="text-lg font-bold leading-snug text-[#111] mb-2 font-sans group-hover:text-[#E87325] transition-colors"
            style={{ letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm leading-relaxed text-gray-600 font-medium mb-4">
            {project.description}
          </p>

          {/* Stack Pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[8px] font-bold uppercase tracking-wider border border-black/15 bg-white px-2 py-0.5 rounded-[3px] text-gray-600 shadow-[1px_1px_0_0_rgba(17,17,17,0.06)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-black/5 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-400"
              >
                #{tag.toLowerCase().replace(/ /g, '-')}
              </span>
            ))}
          </div>

          <a
            href={project.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider border-2 border-black bg-white px-2.5 py-1.5 shadow-[2px_2px_0_0_#111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0_0_#111] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0.5px_0.5px_0_0_#111] transition-all"
            aria-label={`View ${project.title}`}
          >
            <span>VIEW</span>
            <svg
              width="9"
              height="9"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M3 13L13 3M13 3H6M13 3V10" />
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
