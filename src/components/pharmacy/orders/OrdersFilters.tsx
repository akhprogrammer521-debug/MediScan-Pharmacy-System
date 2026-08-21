'use client'

import type { PharmacistOrder } from '@/lib/api/api'
import { SectionCard } from '@/components/pharmacy/shared/SectionCard'
import { Button } from '@/components/ui/Button'
import { Filter } from 'lucide-react'

type OrderFilter = 'ALL' | 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED'

type Props = {
  value: OrderFilter
  onChange: (v: OrderFilter) => void
  orders: PharmacistOrder[]
}

const filters: { key: OrderFilter; label: string }[] = [
  { key: 'ALL', label: 'الكل' },
  { key: 'PENDING', label: 'معلّقة' },
  { key: 'ACCEPTED', label: 'مقبولة' },
  { key: 'REJECTED', label: 'مرفوضة' },
  { key: 'COMPLETED', label: 'مكتملة' },
]

export function OrdersFilters({ value, onChange, orders }: Props) {
  const count = (k: OrderFilter) => {
    if (k === 'ALL') return orders.length
    return orders.filter((o) => o.status === k).length
  }

  return (
    <SectionCard title="فلترة سريعة" description="فرز الطلبات حسب الحالة" icon={Filter}>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = value === f.key
          return (
            <Button
              key={f.key}
              variant={active ? 'primary' : 'soft'}
              onClick={() => onChange(f.key)}
              className="gap-2"
            >
              <span>{f.label}</span>
              <span className={active ? 'text-white/90' : 'text-muted'}>({count(f.key)})</span>
            </Button>
          )
        })}
      </div>
    </SectionCard>
  )
}
