"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { SectionHeader } from "../ui/section-header"

const testimonials = [
  {
    content: "Working with this developer was an absolute pleasure. They brought our vision to life with incredible attention to detail and a seamless user experience.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
  },
  {
    content: "The portfolio website they built for me exceeded all my expectations. The animations are smooth, and the performance is top-notch. Highly recommended!",
    author: "Michael Chen",
    role: "Creative Director",
  },
  {
    content: "A true professional who understands both the technical and design aspects of web development. They delivered the project on time and bug-free.",
    author: "Elena Rodriguez",
    role: "Product Manager",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 relative z-10 bg-surface/30">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader title="Client Testimonials" subtitle="What people say about my work." centered />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 text-primary/20 w-12 h-12" />
              
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-muted-foreground text-lg italic mb-8 flex-1">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
