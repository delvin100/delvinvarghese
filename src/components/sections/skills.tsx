"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "../ui/section-header"
import { 
  Code2, 
  Database, 
  Layout, 
  Terminal,
  type LucideIcon
} from "lucide-react"

export interface SkillCategory {
  id: string;
  name: string;
  category: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = {
  Database,
  Terminal,
  Layout,
  Code2,
}

// Group flat skills from DB into categories
function groupSkills(skills: SkillCategory[]) {
  const groups: Record<string, { title: string, icon: LucideIcon, skills: string[] }> = {}
  
  skills.forEach(skill => {
    if (!groups[skill.category]) {
      groups[skill.category] = {
        title: skill.category,
        icon: iconMap[skill.icon] || Code2,
        skills: []
      }
    }
    groups[skill.category].skills.push(skill.name)
  })
  
  return Object.values(groups)
}

export function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  const skillCategories = groupSkills(skills)
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader title="My Skills" subtitle="Technologies I work with." centered />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <category.icon size={24} />
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                
                <ul className="space-y-3 mt-auto">
                  {category.skills.map((skill, i) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.3 + (i * 0.05) }}
                      className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
