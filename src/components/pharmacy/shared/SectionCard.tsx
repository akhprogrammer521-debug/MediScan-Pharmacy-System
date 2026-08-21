'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type Props = {
  title: string
  description?: string
  icon?: LucideIcon
  className?: string
  children: ReactNode
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  className = '',
  children,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        rounded-2xl
        border border-border/50
        bg-surface
        shadow-sm
        p-4 sm:p-5
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <Icon size={18} />
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-sm sm:text-base font-semibold text-text">
            {title}
          </h2>

          {description && (
            <p className="mt-0.5 text-xs sm:text-sm text-muted">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">{children}</div>
    </motion.section>
  )
}
