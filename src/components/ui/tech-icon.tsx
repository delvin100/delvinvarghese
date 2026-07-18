import React from 'react';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiPython, 
  SiTailwindcss, SiNodedotjs, SiHtml5, SiCss, SiGit, 
  SiGithub, SiMongodb, SiPostgresql, SiFirebase, SiFramer,
  SiVuedotjs, SiSvelte, SiAngular, SiDocker, SiFigma, SiSupabase,
  SiPrisma
} from 'react-icons/si';
import { Terminal } from 'lucide-react';

const iconMap: Record<string, { icon: React.ElementType, color: string }> = {
  react: { icon: SiReact, color: '#61DAFB' },
  'next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  nextjs: { icon: SiNextdotjs, color: '#FFFFFF' },
  typescript: { icon: SiTypescript, color: '#3178C6' },
  javascript: { icon: SiJavascript, color: '#F7DF1E' },
  python: { icon: SiPython, color: '#3776AB' },
  tailwind: { icon: SiTailwindcss, color: '#06B6D4' },
  tailwindcss: { icon: SiTailwindcss, color: '#06B6D4' },
  nodejs: { icon: SiNodedotjs, color: '#339933' },
  node: { icon: SiNodedotjs, color: '#339933' },
  html: { icon: SiHtml5, color: '#E34F26' },
  css: { icon: SiCss, color: '#1572B6' },
  git: { icon: SiGit, color: '#F05032' },
  github: { icon: SiGithub, color: '#FFFFFF' },
  mongodb: { icon: SiMongodb, color: '#47A248' },
  postgresql: { icon: SiPostgresql, color: '#4169E1' },
  firebase: { icon: SiFirebase, color: '#FFCA28' },
  supabase: { icon: SiSupabase, color: '#3ECF8E' },
  prisma: { icon: SiPrisma, color: '#2D3748' },
  framer: { icon: SiFramer, color: '#0055FF' },
  'framer motion': { icon: SiFramer, color: '#0055FF' },
  vue: { icon: SiVuedotjs, color: '#4FC08D' },
  svelte: { icon: SiSvelte, color: '#FF3E00' },
  angular: { icon: SiAngular, color: '#DD0031' },
  docker: { icon: SiDocker, color: '#2496ED' },
  figma: { icon: SiFigma, color: '#F24E1E' }
};

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = '' }: TechIconProps) {
  const normalizedName = name.toLowerCase().trim();
  
  // Try to find an exact match first
  let match = iconMap[normalizedName];
  
  // If not found, try a loose include match for common variants
  if (!match) {
    const looseMatchKey = Object.keys(iconMap).find(key => normalizedName.includes(key));
    if (looseMatchKey) {
      match = iconMap[looseMatchKey];
    }
  }

  // Fallback icon if no match is found
  const IconComponent = match?.icon || Terminal;
  const color = match?.color || '#94a3b8'; // default to slate-400

  return (
    <IconComponent 
      className={className} 
      style={{ color: color }} 
      aria-label={`${name} icon`}
    />
  );
}
