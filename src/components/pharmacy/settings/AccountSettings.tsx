'use client'

import { SectionCard } from '@/components/pharmacy/shared/SectionCard'
import { Input } from '@/components/ui/Input'
import { Shield } from 'lucide-react'

type Props = {
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}

export function AccountSettings({ values, onChange }: Props) {
  return (
    <SectionCard
      title="إعدادات الحساب"
      description="قيم قابلة للحفظ ضمن إعدادات الصيدلي"
      icon={Shield}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-white p-4">
          <div className="font-semibold">رقم هاتف للتواصل</div>
          <div className="text-xs text-muted">سيُستخدم داخل إشعارات النظام</div>
          <Input
            className="mt-2 bg-subtle"
            value={values['account.phone'] ?? ''}
            onChange={(e) => onChange('account.phone', e.target.value)}
            placeholder="مثال: +963**********"
            inputMode="tel"
          />
        </div>

        <div className="rounded-2xl border border-border/60 bg-white p-4">
          <div className="font-semibold">عنوان الصيدلية (عرض فقط)</div>
          <div className="text-xs text-muted">مفتاح اختياري إذا تحب تخزنه</div>
          <Input
            className="mt-2 bg-subtle"
            value={values['pharmacy.address.note'] ?? ''}
            onChange={(e) => onChange('pharmacy.address.note', e.target.value)}
            placeholder="مثال: دمشق - المزة..."
          />
        </div>

        <div className="rounded-2xl border border-border/60 bg-white p-4">
          <div className="font-semibold">ملاحظات داخلية</div>
          <div className="text-xs text-muted">لا تظهر للمستخدمين</div>
          <Input
            className="mt-2 bg-subtle"
            value={values['internal.notes'] ?? ''}
            onChange={(e) => onChange('internal.notes', e.target.value)}
            placeholder="..."
          />
        </div>
      </div>
    </SectionCard>
  )
}
