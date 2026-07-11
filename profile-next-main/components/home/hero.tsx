'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  {
    id: 'intro',
    label: '01. INTRO',
    color: '#FFE596', // Manila yellow
    labels: ['AI ENGINEER', 'SYSTEMS BUILDER', 'NEXT.JS EXPERT']
  },
  {
    id: 'stack',
    label: '02. STACK',
    color: '#FFC296', // Warm coral
    labels: ['PYTHON / GO', 'LLM INFRA', 'RAG PIPELINES', 'REACT / TS']
  },
  {
    id: 'vibe',
    label: '03. PHILOSOPHY',
    color: '#D7FF96', // Soft lime
    labels: ['TACTILE INTERFACES', 'ROBUST RUNTIMES', 'HUMAN-CENTERED DESIGN']
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState('intro');
  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full max-w-[100vw] flex-col items-center justify-center overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24"
      style={{ backgroundColor: '#F5F2EB' }}
    >
      {/* Subtle background noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid overlay for tactile blueprint look */}
      <div className="grid-overlay opacity-30" />

      {/* Main Container */}
      <div className="relative z-10 box-border w-full max-w-[1140px] px-4 sm:px-6 md:px-8 lg:px-12">

        {/* Interactive Folder Tabs */}
        <div className="relative z-0 -mb-[2px] flex items-end gap-1 px-4 sm:px-6 md:px-8 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab, i) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative shrink-0 rounded-t-xl px-4 py-2.5 sm:px-6 sm:py-3 text-[10px] sm:text-xs font-bold tracking-wider transition-all duration-200 uppercase cursor-pointer border-2 border-black"
                style={{
                  backgroundColor: isActive ? '#FAF8F5' : tab.color,
                  color: '#111',
                  zIndex: isActive ? 10 : 5 - i,
                  transform: isActive ? 'translateY(2px)' : 'translateY(0)',
                  boxShadow: isActive ? 'none' : 'inset 0 -3px 6px rgba(0,0,0,0.06)',
                  fontFamily: 'var(--font-mono)',
                  borderBottomWidth: isActive ? '0px' : '2px',
                  borderBottomColor: isActive ? 'transparent' : '#111',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dossier Card Folder Body */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-2xl md:rounded-3xl border-2 border-black bg-[#FAF8F5] p-6 sm:p-10 md:p-12 lg:p-16 shadow-[6px_6px_0_0_#111] md:shadow-[8px_8px_0_0_#111]"
          style={{ zIndex: 5 }}
        >
          {/* Wire paperclip drawing clipping the folder card */}
          <div className="absolute -top-6 right-16 hidden md:block z-20 pointer-events-none opacity-90 select-none">
            <svg width="28" height="54" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 36V12C8 7.58 11.58 4 16 4C20.42 4 24 7.58 24 12V38C24 43.52 19.52 48 14 48C8.48 48 4 43.52 4 38V14C4 10.68 6.68 8 10 8C13.32 8 16 10.68 16 14V36" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Grid Layout: Text Content on the Left, Visuals on the Right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">

            {/* Left Column: Text & CTAs */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full min-w-0">

              {/* Technical category tags */}
              <div className="mb-6 flex flex-wrap justify-center lg:justify-start items-center gap-2 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider text-[#E87325]">
                {activeTabData.labels.map((lbl, idx) => (
                  <span key={lbl} className="flex items-center gap-2">
                    {idx > 0 && <span className="w-1 h-1 rounded-full bg-black/20" />}
                    <span>{lbl}</span>
                  </span>
                ))}
              </div>

              {/* Animated Text Content */}
              <div className="w-full min-h-[220px] sm:min-h-[200px] flex flex-col justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="w-full flex flex-col items-center lg:items-start"
                  >
                    {activeTab === 'intro' && (
                      <>
                        <h1
                          className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] text-[#111] tracking-tight mb-6 text-center lg:text-left"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          Building{' '}
                          <span className="serif-italic font-normal text-[#E87325] text-5xl sm:text-6xl lg:text-[4rem] relative inline-block mx-1">
                            intelligent
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#E87325]/40 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path d="M3,7 Q50,2 97,7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                          </span>{' '}
                          systems.
                        </h1>
                        <p className="text-sm sm:text-base leading-relaxed text-gray-700 font-medium max-w-xl mb-6 text-center lg:text-left">
                          Hey! I&apos;m Albin Jojo, an AI engineer and systems builder. I craft robust backend architectures and intelligence pipelines, married with delightful, tactile user interfaces.
                        </p>
                        <div className="handwritten text-lg sm:text-xl text-gray-500 mt-2 select-none flex items-center gap-3 rotate-[-2deg]">
                          <span>that&apos;s me on the right!</span>
                          <svg width="32" height="16" viewBox="0 0 32 16" fill="none" className="text-gray-400 transform scale-x-[-1] lg:scale-x-1">
                            <path d="M2 8H30M30 8L24 2M30 8L24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </>
                    )}

                    {activeTab === 'stack' && (
                      <>
                        <h2
                          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-[#111] tracking-tight mb-6 text-center lg:text-left"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          Technical{' '}
                          <span className="serif-italic font-normal text-[#4C8FA3] text-4xl sm:text-5xl lg:text-[3.5rem] relative inline-block mx-1">
                            Arsenal
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#4C8FA3]/40 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path d="M5,8 C35,2 75,3 95,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                          </span>
                        </h2>
                        <div className="w-full mt-2 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-5">
                          {/* Tactile Sticky Notes (TinkerSpace Style) */}
                          <div className="sticky-note-yellow p-5 w-full sm:w-[160px] shrink-0 rotate-[-2deg] hover:rotate-0 transition-transform duration-200 rounded-lg relative border border-black/15">
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 tape-strip rotate-[3deg]" />
                            <h4 className="font-mono text-[9px] font-bold tracking-wider uppercase mb-1 text-gray-500">01 / CORE</h4>
                            <p className="font-sans font-black text-sm text-[#111] mb-1">PYTHON & GO</p>
                            <p className="font-mono text-[8px] leading-tight text-gray-500 uppercase">FastAPI · gRPC · Workers · Concurrency</p>
                          </div>

                          <div className="sticky-note-lime p-5 w-full sm:w-[160px] shrink-0 rotate-[3deg] hover:rotate-0 transition-transform duration-200 rounded-lg relative border border-black/15">
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 tape-strip rotate-[-2deg]" />
                            <h4 className="font-mono text-[9px] font-bold tracking-wider uppercase mb-1 text-gray-500">02 / INFRA</h4>
                            <p className="font-sans font-black text-sm text-[#111] mb-1">LLMs & RAG</p>
                            <p className="font-mono text-[8px] leading-tight text-gray-500 uppercase">vLLM · Pinecone · LangChain · Evals</p>
                          </div>

                          <div className="sticky-note-orange p-5 w-full sm:w-[160px] shrink-0 rotate-[-1deg] hover:rotate-0 transition-transform duration-200 rounded-lg relative border border-black/15">
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 tape-strip rotate-[1deg]" />
                            <h4 className="font-mono text-[9px] font-bold tracking-wider uppercase mb-1 text-gray-500">03 / WEB</h4>
                            <p className="font-sans font-black text-sm text-[#111] mb-1">NEXT.JS & TS</p>
                            <p className="font-mono text-[8px] leading-tight text-gray-500 uppercase">React · Tailwind · Framer Motion</p>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'vibe' && (
                      <>
                        <h2
                          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-[#111] tracking-tight mb-6 text-center lg:text-left"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          The{' '}
                          <span className="serif-italic font-normal text-[#8CBF3F] text-4xl sm:text-5xl lg:text-[3.5rem] relative inline-block mx-1">
                            Philosophy
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#8CBF3F]/40 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path d="M2,6 Q50,1 98,6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                          </span>
                        </h2>
                        {/* Ruled Paper Sheet Container */}
                        <div className="w-full max-w-md pt-6 pb-6 pr-6 pl-10 bg-ruled border border-black/15 shadow-[3px_3px_0_0_rgba(17,17,17,0.06)] rounded-xl text-left relative overflow-hidden mx-auto lg:mx-0">
                          <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-red-400/25 pointer-events-none" />
                          <p className="serif-italic text-xl font-normal leading-relaxed text-gray-800 mb-2">
                            &ldquo;Software shouldn&apos;t just compile. It should feel good to touch.&rdquo;
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed font-sans">
                            I build code that is highly performant under the hood, but presents itself with organic, delightful interfaces that respect human attention.
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="tactile-btn w-full sm:w-auto flex items-center justify-center gap-2.5 text-xs py-3.5 px-6 rounded-xl border-2 border-black bg-[#ff914d] text-black shadow-[3px_3px_0_0_#111] hover:bg-[#ff914d]/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_#111] transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span>LET&apos;S TALK</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 13L13 3M13 3H6M13 3V10" />
                  </svg>
                </a>
                <a
                  href="#projects"
                  className="tactile-btn w-full sm:w-auto flex items-center justify-center gap-2.5 text-xs py-3.5 px-6 rounded-xl border-2 border-black bg-white text-black shadow-[3px_3px_0_0_#111] hover:bg-gray-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_#111] transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span>EXPLORE WORK</span>
                </a>
              </div>
            </div>

            {/* Right Column: Portrait Polaroid Visual Card */}
            <div className="w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[320px] flex-shrink-0 flex justify-center mt-6 lg:mt-0 relative">

              {/* Paperclip clipping the photo to the dossier */}
              <div className="absolute -top-5 left-8 z-20 pointer-events-none opacity-95 select-none">
                <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 36V12C8 7.58 11.58 4 16 4C20.42 4 24 7.58 24 12V38C24 43.52 19.52 48 14 48C8.48 48 4 43.52 4 38V14C4 10.68 6.68 8 10 8C13.32 8 16 10.68 16 14V36" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div
                className="relative bg-white border-2 border-black p-4 pb-8 shadow-[5px_5px_0_0_rgba(17,17,17,0.08)] hover:shadow-[7px_7px_0_0_rgba(17,17,17,0.12)] rotate-[2deg] transition-all hover:rotate-0 duration-300 w-full"
              >
                {/* Visual Tape Strip Accent on the top-right corner */}
                <div className="absolute -top-3 right-6 w-16 h-5 tape-strip rotate-[15deg] z-10 select-none" />

                {/* Profile Image container */}
                <div className="relative aspect-square w-full overflow-hidden border border-black/10 bg-[#FAF8F5] rounded-md">
                  <Image
                    src="/hero-tech.png"
                    alt="Albin Jojo portrait illustration"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
                  />
                </div>

                {/* Polaroid handwritten caption */}
                <div className="font-handwriting text-center text-xl sm:text-2xl font-bold text-gray-700 mt-4 rotate-[-1deg] select-none">
                  Albin Jojo
                </div>
              </div>
            </div>

          </div>

          {/* Aesthetic sticker badge — positioned absolute on desktop, styled rotate */}
          <motion.div
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="hidden lg:block absolute right-12 bottom-12 rotate-[-5deg] border-2 border-black bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider shadow-[3px_3px_0_0_#111] font-mono"
          >
            Tactile Intelligence ⚡
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
