'use client'

import { motion } from 'framer-motion'
import { User2, Mail } from 'lucide-react'
import { StatusBadge } from '@/components/pharmacy/shared/StatusBadge'

export function ProfileHeader({
  pharmacyName,
  username,
  email,
  userActive,
  pharmacyActive,
}: {
  pharmacyName: string
  username: string
  email: string
  userActive: 'active' | 'inactive' | 'unknown'
  pharmacyActive: 'active' | 'inactive' | 'unknown'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-border/40 bg-subtle/60 p-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <User2 size={20} />
          </span>
          <div>
            <h1 className="h1">الملف الشخصي</h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted">
              <Mail size={16} />
              {email}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted">
              <User2 size={16} />
              {pharmacyName}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted self-center">حالة المستخدم:</span>
          <StatusBadge status={userActive} />
          <span className="text-xs text-muted self-center">حالة الصيدلية:</span>
          <StatusBadge status={pharmacyActive} />
        </div>
      </div>

      <div className="mt-4 text-sm">
        <span className="text-muted">اسم المستخدم: </span>
        <span className="font-semibold">{username}</span>
      </div>
    </motion.div>
  )
}
