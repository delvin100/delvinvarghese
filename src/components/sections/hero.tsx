"use client"

import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            {/* Eyebrow / Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-8"
            >
              <div className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Terminal size={12} className="mr-2" />
                Available for Work
              </div>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-tight"
            >
              Architecting <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                full-stack
              </span> <br className="hidden lg:block" />
              digital experiences.
            </motion.h1>
            
            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed font-light"
            >
              I am a full stack developer who bridges the gap between robust backend systems and intuitive user interfaces. From database design to pixel-perfect frontends, I build complete, high-performance web applications that scale.
            </motion.p>
            
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all hover:-translate-y-1 group shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                Let's Talk
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-foreground bg-surface border border-border rounded-lg hover:bg-muted transition-all hover:-translate-y-1 glass"
              >
                Explore Work
              </a>
            </motion.div>
          </div>

          {/* Right Column: Code Snippet Window */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="relative mx-auto w-full lg:max-w-xl order-1 lg:order-2 mb-10 lg:mb-0"
          >
            {/* Background glow behind editor */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            
            {/* The Editor Window */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0d1117]/90 backdrop-blur-xl overflow-hidden shadow-2xl font-mono text-sm">
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-black/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-black/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-black/20" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Terminal size={14} />
                  <span>delvin.ts</span>
                </div>
                <div className="w-12" /> {/* Spacer for centering */}
              </div>
              
              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <div className="flex leading-loose">
                  {/* Line Numbers */}
                  <div className="text-slate-600 select-none pr-6 text-right">
                    1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11
                  </div>
                  {/* Code */}
                  <div className="text-slate-300">
                    <span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> = {'{'}
                    <br/>
                    {'  '}name: <span className="text-yellow-300">'Delvin Varghese'</span>,
                    <br/>
                    {'  '}role: <span className="text-yellow-300">'Full Stack Engineer'</span>,
                    <br/>
                    {'  '}skills: [<span className="text-yellow-300">'React'</span>, <span className="text-yellow-300">'Next.js'</span>, <span className="text-yellow-300">'Node'</span>, <span className="text-yellow-300">'SQL'</span>],
                    <br/>
                    {'  '}passion: <span className="text-yellow-300">'Building scalable systems'</span>,
                    <br/>
                    {'}'};
                    <br/><br/>
                    <span className="text-pink-400">export default</span> <span className="text-cyan-300">function</span> <span className="text-green-300">buildFuture</span>() {'{'}
                    <br/>
                    {'  '}<span className="text-pink-400">return</span> developer.<span className="text-blue-300">code</span>();
                    <br/>
                    {'}'}
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-[1px] h-8 bg-border relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-blue-500 absolute top-0"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
