'use client'

import { motion } from 'framer-motion'

export function PageSkeleton({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="h1">{title}</h1>
        <p className="text-sm text-muted mt-1">جاري تحميل البيانات…</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border/40 bg-subtle/60 p-5"
          >
            <div className="h-4 w-32 rounded bg-border/30 animate-pulse" />
            <div className="mt-3 h-8 w-20 rounded bg-border/30 animate-pulse" />
            <div className="mt-4 h-3 w-40 rounded bg-border/20 animate-pulse" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl border border-border/40 bg-subtle/60 p-5">
          <div className="h-4 w-40 rounded bg-border/30 animate-pulse" />
          <div className="mt-4 h-56 rounded bg-border/20 animate-pulse" />
        </div>
        <div className="rounded-2xl border border-border/40 bg-subtle/60 p-5">
          <div className="h-4 w-40 rounded bg-border/30 animate-pulse" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded bg-border/20 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/40 bg-subtle/60 p-5">
        <div className="h-4 w-44 rounded bg-border/30 animate-pulse" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-border/20 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
