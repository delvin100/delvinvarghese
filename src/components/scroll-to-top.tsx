"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="hidden md:flex fixed bottom-8 right-8 z-50"
        >
          {/* Holographic Ripple 1 */}
          <motion.div 
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-primary/50 pointer-events-none"
          />
          {/* Holographic Ripple 2 */}
          <motion.div 
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.25 }}
            className="absolute inset-0 rounded-full border border-primary/50 pointer-events-none"
          />
          
          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            aria-label="Scroll to top"
          >
            {/* Shimmer effect */}
            <motion.div 
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-0" 
            />
            
            <ArrowUp size={20} strokeWidth={2.5} className="group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300 relative z-10" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
