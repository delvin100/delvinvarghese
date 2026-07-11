"use client"

import { motion } from "framer-motion"
import { MonitorSmartphone, PenTool, LayoutTemplate, Zap, Search } from "lucide-react"
import { SectionHeader } from "../ui/section-header"

const services = [
  {
    title: "Frontend Development",
    description: "Building responsive, high-performance web applications using modern frameworks like React and Next.js.",
    icon: MonitorSmartphone,
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and visually stunning user interfaces with a focus on seamless user experiences.",
    icon: PenTool,
  },
  {
    title: "Responsive Web Design",
    description: "Ensuring your website looks and functions perfectly across all devices and screen sizes.",
    icon: LayoutTemplate,
  },
  {
    title: "Website Optimization",
    description: "Improving load times, performance metrics, and accessibility to deliver a superior user experience.",
    icon: Zap,
  },
  {
    title: "SEO & Accessibility",
    description: "Implementing best practices to improve search engine rankings and ensure accessibility for all users.",
    icon: Search,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative z-10 bg-surface/30">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader title="My Services" subtitle="What I can do for you." centered />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8 group hover:bg-surface/50 transition-colors duration-300 border border-border/50"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300">
                <service.icon size={28} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
