"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const greetings = [
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "こんにちは",
  "مرحبا",
  "Привет",
  "안녕하세요",
  "നമസ്കാരം"
]

export function LoadingScreen() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index === greetings.length - 1) return

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1)
    }, 200)

    return () => clearTimeout(timeout)
  }, [index])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (pathname !== "/") {
    return null
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center"
        >
          {/* The Text container is perfectly centered */}
          <div className="relative flex items-center justify-center text-4xl sm:text-5xl font-medium text-slate-200">
            {/* The Dot is absolutely positioned to the left so it doesn't unbalance the text centering */}
            <span className="absolute right-full mr-4 sm:mr-6 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-300" />
            
            {/* Instantly snapping text */}
            <span className="text-center">
              {greetings[index]}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

