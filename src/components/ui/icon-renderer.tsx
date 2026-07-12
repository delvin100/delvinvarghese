import * as LucideIcons from 'lucide-react'

interface IconRendererProps {
  iconType: string
  iconValue: string
  className?: string
  alt?: string
}

export function IconRenderer({ iconType, iconValue, className = '', alt = 'Icon' }: IconRendererProps) {
  if (iconType === 'lucide') {
    const IconComponent = (LucideIcons as any)[iconValue] || LucideIcons.HelpCircle
    return <IconComponent className={className} />
  }

  if (iconType === 'url' || iconType === 'upload') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={iconValue} alt={alt} className={`object-contain ${className}`} />
  }

  return <LucideIcons.HelpCircle className={className} />
}
