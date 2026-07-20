'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/actions/auth"
import { useActionState, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ScanFace, Fingerprint, Command } from "lucide-react"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, { error: '' })

  // Mouse spotlight logic
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const formRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // 3D Tilt logic for the visual side
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleVisualMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleVisualMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="min-h-screen bg-[#030303] flex overflow-hidden font-sans selection:bg-primary/30">
      {/* Left Panel - Visual (Hidden on mobile) */}
      <div 
        className="hidden lg:flex w-1/2 relative overflow-hidden bg-black items-center justify-center p-12 perspective-1000"
        onMouseMove={handleVisualMouseMove}
        onMouseLeave={handleVisualMouseLeave}
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(var(--primary),_0.15),_transparent_60%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent w-full z-20 pointer-events-none shadow-[0_0_15px_rgba(var(--primary),0.8)]"
        />

        {/* Rotating Geometric SVG Grid */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ rotate: { duration: 100, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute opacity-[0.15] pointer-events-none mix-blend-screen text-primary"
        >
          <svg viewBox="0 0 800 800" width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 10">
              <circle cx="400" cy="400" r="350" />
              <circle cx="400" cy="400" r="250" strokeDasharray="5 5" />
              <circle cx="400" cy="400" r="150" strokeDasharray="20 10" />
              <line x1="50" y1="400" x2="750" y2="400" />
              <line x1="400" y1="50" x2="400" y2="750" />
              <line x1="152.5" y1="152.5" x2="647.5" y2="647.5" />
              <line x1="647.5" y1="152.5" x2="152.5" y2="647.5" />
            </g>
          </svg>
        </motion.div>

        {/* 3D Tilted Content */}
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative z-10 max-w-lg p-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl"
        >
          <motion.div 
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 50 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono mb-6 border border-primary/30 uppercase tracking-widest">
              <Command className="w-3 h-3 animate-pulse" />
              System Secured
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
              ACCESS <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 animate-pulse">
                GRANTED.
              </span>
            </h1>
            
            <p className="text-zinc-400 text-lg leading-relaxed font-mono text-sm max-w-sm">
              <span className="text-primary">&gt;</span> AUTHENTICATING USER...<br/>
              <span className="text-primary">&gt;</span> ESTABLISHING SECURE CONNECTION...<br/>
              <span className="text-primary">&gt;</span> WAITING FOR CREDENTIALS...
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Form with Spotlight */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-[#030303] backdrop-blur-xl">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Spotlight Card */}
          <div 
            ref={formRef}
            onMouseMove={handleMouseMove}
            className="relative group/card w-full p-8 sm:p-10 rounded-[2.5rem] bg-zinc-950/80 border border-white/5 shadow-2xl overflow-hidden backdrop-blur-2xl"
          >
            {/* Dynamic Spotlight */}
            <div 
              className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-500 group-hover/card:opacity-100 z-0"
              style={{
                background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary), 0.15), transparent 40%)`
              }}
            />
            
            {/* Content Container (z-10 to stay above spotlight) */}
            <div className="relative z-10">
              <div className="mb-10 text-center">
                <motion.div 
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.6, delay: 0.3 }}
                  className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.2)]"
                >
                  <ScanFace className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Identify Yourself</h2>
                <p className="mt-2 text-zinc-500 font-mono text-sm">Enter your credentials to proceed.</p>
              </div>

              <form action={formAction} className="space-y-6">
                {state?.error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="p-4 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 shadow-sm font-mono"
                  >
                    <div className="w-2 h-2 rounded-full bg-destructive animate-ping"></div>
                    {state.error}
                  </motion.div>
                )}

                <div className="space-y-2 group/input">
                  <label className="text-xs font-mono font-medium text-zinc-400 ml-1 group-focus-within/input:text-primary transition-colors flex items-center gap-2" htmlFor="username">
                    <span className="w-1 h-1 rounded-full bg-zinc-600 group-focus-within/input:bg-primary transition-colors"></span>
                    USERNAME
                  </label>
                  <div className="relative overflow-hidden rounded-2xl">
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe123"
                      required
                      className="bg-black/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-primary/50 focus-visible:border-primary/50 py-6 px-5 rounded-2xl transition-all group-hover/input:bg-black/80 font-mono relative z-10"
                    />
                    {/* Input bottom highlight line */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 group-focus-within/input:w-full transition-all duration-500 ease-out z-20"></div>
                  </div>
                </div>

                <div className="space-y-2 group/input">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-xs font-mono font-medium text-zinc-400 group-focus-within/input:text-primary transition-colors flex items-center gap-2" htmlFor="password">
                      <span className="w-1 h-1 rounded-full bg-zinc-600 group-focus-within/input:bg-primary transition-colors"></span>
                      PASSWORD
                    </label>
                    <Link href="#" className="text-[10px] font-mono text-primary hover:text-primary/80 transition-colors uppercase tracking-wider">
                      Recover Key
                    </Link>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-black/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-primary/50 focus-visible:border-primary/50 py-6 px-5 rounded-2xl transition-all group-hover/input:bg-black/80 font-mono tracking-[0.3em] relative z-10"
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 group-focus-within/input:w-full transition-all duration-500 ease-out z-20"></div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="w-full relative overflow-hidden bg-primary/10 border border-primary/30 hover:bg-primary hover:text-black text-primary font-bold py-6 rounded-2xl mt-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] group/btn"
                >
                  {/* Cyberpunk glitch line on button */}
                  <motion.div 
                    className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                  
                  {isPending ? "AUTHORIZING..." : (
                    <span className="flex items-center gap-3 relative z-20 tracking-widest uppercase font-mono">
                      <Fingerprint className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      Initialize Sequence
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center text-xs font-mono text-zinc-500">
                NO CLEARANCE YET?{" "}
                <Link href="/chat-register" className="text-primary hover:text-white transition-colors border-b border-primary/30 hover:border-white pb-0.5 ml-2">
                  REQUEST ACCESS
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
