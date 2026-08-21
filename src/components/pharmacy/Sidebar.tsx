'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { pharmacySidebar } from '@/config/pharmacySidebar'
import { cn } from '@/lib/cn'
import { ChevronDown, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<string | null>(null)

  return (
    <aside
      className={cn(
        'fixed right-0 top-0 z-40 h-full w-64 bg-surface border-l',
        'transition-transform duration-300 ease-out',
        'md:translate-x-0',
        open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      )}
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
            M
          </div>
          <span className="font-semibold text-sm">mediScan</span>
        </div>

        <button
          onClick={onClose}
          className="md:hidden text-muted hover:text-text"
        >
          <X size={18} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {pharmacySidebar.map((section) => {
          const isOpen = openSection === section.label
          const hasActive = section.items.some(
            (item) => pathname === item.href
          )

          return (
            <div key={section.label}>
              {/* Section Button */}
              <button
                onClick={() =>
                  setOpenSection(isOpen ? null : section.label)
                }
                className={cn(
                  'w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm',
                  'transition-colors',
                  hasActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted hover:bg-subtle'
                )}
              >
                <span className="flex items-center gap-3">
                  <section.icon size={18} />
                  {section.label}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>

              {/* Animated Items */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.06,
                          },
                        },
                      }}
                      className="mt-1 mr-6 space-y-1"
                    >
                      {section.items.map((item) => {
                        const isActive = pathname === item.href

                        return (
                          <motion.div
                            key={item.href}
                            variants={{
                              hidden: { opacity: 0, x: 10 },
                              visible: { opacity: 1, x: 0 },
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm',
                                'transition-colors',
                                isActive
                                  ? 'bg-primary text-primaryFg'
                                  : 'text-muted hover:bg-subtle'
                              )}
                            >
                              <item.icon size={16} />
                              {item.label}
                            </Link>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
