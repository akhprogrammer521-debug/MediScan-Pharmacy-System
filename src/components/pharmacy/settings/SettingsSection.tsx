'use client'

import { Settings } from 'lucide-react'
import { SectionCard } from '@/components/pharmacy/shared/SectionCard'
import { Button } from '@/components/ui/Button'

type Props = {
  saving: boolean
  onSave: () => void
}

export function SettingsSection({ saving, onSave }: Props) {
  return (
    <SectionCard
      title="الإعدادات"
      description="عدّل تفضيلاتك واحفظ التغييرات"
      icon={Settings}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted">
          سيتم تطبيق الإعدادات بعد الحفظ.
        </div>

        <Button variant="primary" onClick={onSave} disabled={saving} className="gap-2">
          {saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>
    </SectionCard>
  )
}
