import Link from "next/link"
import { Mail } from "lucide-react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface/50 border-t border-border/50 py-12 mt-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            <span className="text-primary">&lt;</span>
            Dev
            <span className="text-primary">/&gt;</span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Designing and building digital experiences.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-background rounded-full hover:text-primary transition-colors hover:scale-110 interactive"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-background rounded-full hover:text-primary transition-colors hover:scale-110 interactive"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-background rounded-full hover:text-primary transition-colors hover:scale-110 interactive"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="mailto:hello@example.com"
            className="p-2 bg-background rounded-full hover:text-primary transition-colors hover:scale-110 interactive"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-8 pt-8 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Dev Portfolio. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-2">
          <a href="https://www.flaticon.com/free-icons/cursor" title="cursor icons" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Cursor icons created by zky.icon - Flaticon
          </a>
        </p>
      </div>
    </footer>
  )
}
