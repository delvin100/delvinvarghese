'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#lab', label: 'Lab' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 0.98]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: `rgba(243,239,230,${bgOpacity})`,
          backdropFilter: 'blur(12px)',
          borderBottomColor: `rgba(17,17,17,calc(${borderOpacity} * 0.08))`,
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
        }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5"
          aria-label="Primary navigation"
        >
          {/* Logo with high-contrast tactile border */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Home" id="logo-link">
            <span className="font-sans text-xs md:text-sm font-black tracking-[0.2em] text-[#111] group-hover:opacity-70 transition-opacity">
              ALBIN JOJO
            </span>
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 border border-black bg-[#c1ff72] rounded-full uppercase tracking-wider text-[#111] shadow-[1px_1px_0_0_#111]">
              AI
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:underline underline-offset-4 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Section: Status Pill on Desktop, Menu Button on Mobile */}
          <div className="flex items-center gap-3">
            {/* Status pill (Desktop only) */}
            <div
              className="hidden md:flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-4 py-1.5 shadow-[2px_2px_0_0_rgba(17,17,17,0.06)]"
            >
              <span className="status-dot active" aria-label="Available for projects" />
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-gray-600">
                Available for work
              </span>
            </div>

            {/* Mobile Menu Button with proper tap spacing (44x44px target) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden items-center justify-center border border-black bg-white rounded-full h-10 w-10 shadow-[2px_2px_0_0_#111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0_0_#111] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0.5px_0.5px_0_0_#111] transition-all cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
              id="mobile-menu-btn"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-black">
                <path d="M1 1H17M1 6H17M1 11H17" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Fullscreen Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[#FAF2DE] p-6 justify-between border-b-4 border-black"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '150px 150px' }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-black tracking-[0.2em] text-[#111]">
                  ALBIN JOJO
                </span>
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 border border-black bg-[#c1ff72] rounded-full uppercase tracking-wider text-[#111]">
                  AI
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center border border-black bg-[#ff914d] rounded-full shadow-[2px_2px_0_0_#111] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0_0_#111] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0.5px_0.5px_0_0_#111] h-10 w-10 cursor-pointer font-bold"
                aria-label="Close navigation menu"
                id="close-menu-btn"
              >
                ✕
              </button>
            </div>

            {/* Menu Links - Vertical Storytelling layout */}
            <div className="my-auto flex flex-col items-center justify-center gap-8 py-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ff914d] font-bold">
                Navigation
              </span>
              <ul className="flex flex-col items-center gap-6" role="list">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl font-extrabold text-[#111] hover:text-[#ff914d] active:text-[#ff914d] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
              {/* Elegant hand-drawn serif note */}
              <span className="serif-italic text-lg text-gray-600 mt-4 text-center max-w-[200px]">
                Let&apos;s build something intelligent.
              </span>
            </div>

            {/* Drawer Footer */}
            <div className="flex flex-col items-center gap-4 border-t border-black/10 pt-6">
              {/* Status indicator */}
              <div className="flex items-center gap-2 rounded-full border border-black/15 bg-white/70 px-4 py-1.5 shadow-[2px_2px_0_0_rgba(17,17,17,0.05)]">
                <span className="status-dot active" />
                <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-600">
                  Available for new contracts
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                © 2026 Albin Jojo
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
