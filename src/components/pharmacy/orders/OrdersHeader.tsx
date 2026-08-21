'use client'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { RefreshCcw, Search } from 'lucide-react'

type Props = {
  query: string
  onQueryChange: (v: string) => void
  onRefresh: () => void
}

export function OrdersHeader({ query, onQueryChange, onRefresh }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="h1">الطلبات</h1>
        <p className="text-sm text-muted">إدارة طلبات المرضى وتحديث الحالات</p>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-[320px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="ابحث برقم الطلب / اسم الدواء / اسم المريض..."
            className="pl-10 bg-subtle"
          />
        </div>

        <Button variant="soft" onClick={onRefresh} className="gap-2">
          <RefreshCcw size={18} />
          تحديث
        </Button>
      </div>
    </div>
  )
}
