"use client"

import { motion } from "framer-motion"
import { Download, Paperclip } from "lucide-react"
import { SectionHeader } from "../ui/section-header"

import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader 
          title="About Me" 
          subtitle={
            <span className="font-handwriting text-3xl text-primary/80 rotate-[-2deg] inline-block mt-2">
              building stuff so I don't have to touch grass.
            </span>
          } 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a full stack developer passionate about building fast, scalable, and beautiful web applications.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I handle the entire development process—from designing complex databases and secure APIs on the backend, to crafting pixel-perfect, interactive React interfaces on the frontend. I believe that writing clean, maintainable code is just as important as the end-user experience.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond just writing code, I love solving hard architectural problems and bridging the gap between design and engineering. Whether it's optimizing slow database queries or fine-tuning CSS animations, I'm driven by the details.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Right now, I'm especially focused on exploring real-time features, modern web architectures, and pushing the boundaries of what's possible in human-centered digital products.
            </p>
            
            <div className="pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-foreground bg-surface border border-border rounded-full hover:bg-muted transition-all hover:scale-105 active:scale-95 interactive glass"
              >
                <Download className="mr-2" size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            whileHover={{ scale: 1.05, rotate: -2, y: -8 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative mx-auto w-full max-w-[340px] mt-8 lg:-mt-12 group cursor-pointer"
          >
            {/* Masking Tape */}
            <div className="absolute -top-4 right-12 w-24 h-8 bg-yellow-100/90 rotate-[-8deg] z-20 shadow-sm border border-yellow-200/50 mix-blend-overlay" />
            
            {/* Paperclip */}
            <div className="absolute -top-6 left-8 z-20 text-slate-600 rotate-[15deg]">
              <Paperclip size={40} strokeWidth={1.5} />
            </div>
            
            {/* Polaroid Frame */}
            <div className="bg-white p-4 pb-12 shadow-2xl relative rounded-sm">
              <div className="aspect-[4/5] relative bg-slate-200 overflow-hidden rounded-sm border border-slate-100">
                <Image 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" 
                  alt="Delvin Varghese" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <h3 className="text-3xl font-bold text-center mt-6 text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-primary">Delvin Varghese</h3>
            </div>
            
            {/* Skewed Badge */}
            <div className="absolute -bottom-6 right-0 bg-white border-2 border-slate-800 px-4 py-2 font-mono text-xs font-bold text-slate-800 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] rotate-[-4deg] z-20">
              FULL STACK DEV 💻
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
