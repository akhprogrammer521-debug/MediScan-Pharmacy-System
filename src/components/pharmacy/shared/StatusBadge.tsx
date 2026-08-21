'use client'

import { ShieldCheck, ShieldX, HelpCircle } from 'lucide-react'

type Status = 'active' | 'inactive' | 'unknown'

export function StatusBadge({ status }: { status: Status }) {
  const map = {
    active: {
      label: 'مفعل',
      Icon: ShieldCheck,
      className: 'bg-primary/10 text-primary border-border/40',
    },
    inactive: {
      label: 'موقوف',
      Icon: ShieldX,
      className: 'bg-subtle text-text border-border/50',
    },
    unknown: {
      label: 'غير معروف',
      Icon: HelpCircle,
      className: 'bg-subtle text-muted border-border/40',
    },
  } as const

  const cfg = map[status]
  const I = cfg.Icon

  return (
    <span
      className={[
        'inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs',
        cfg.className,
      ].join(' ')}
    >
      <I size={14} />
      {cfg.label}
    </span>
  )
}
