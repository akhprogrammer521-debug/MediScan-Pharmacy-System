'use client'

import { SectionCard } from '@/components/pharmacy/shared/SectionCard'
import { Input } from '@/components/ui/Input'
import { SlidersHorizontal } from 'lucide-react'

type Props = {
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}

function boolToString(v: boolean) {
  return v ? 'true' : 'false'
}

function stringToBool(v: string) {
  return v === 'true' || v === '1' || v.toLowerCase() === 'yes'
}

export function GeneralSettings({ values, onChange }: Props) {
  const notificationsEnabled = stringToBool(values['notifications.enabled'] ?? 'true')
  const defaultLanguage = values['assistant.language'] ?? 'ar'

  return (
    <SectionCard
      title="تفضيلات عامة"
      description="إعدادات سريعة لتجربة أفضل"
      icon={SlidersHorizontal}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">تفعيل الإشعارات</div>
              <div className="text-xs text-muted">السماح بعرض الإشعارات داخل النظام</div>
            </div>

            <button
              onClick={() => onChange('notifications.enabled', boolToString(!notificationsEnabled))}
              className={[
                'relative h-8 w-14 rounded-full border transition',
                notificationsEnabled ? 'bg-primary/20 border-primary/30' : 'bg-subtle border-border/60',
              ].join(' ')}
              aria-label="toggle notifications"
            >
              <span
                className={[
                  'absolute top-1 h-6 w-6 rounded-full bg-white shadow transition',
                  notificationsEnabled ? 'right-1' : 'right-7',
                ].join(' ')}
              />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white p-4">
          <div className="font-semibold">لغة المساعد الافتراضية</div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onChange('assistant.language', 'ar')}
              className={[
                'rounded-xl px-4 py-2 text-sm border transition',
                defaultLanguage === 'ar' ? 'bg-primary/10 border-primary/30' : 'border-border/60 hover:bg-subtle/40',
              ].join(' ')}
            >
              عربي
            </button>
            <button
              onClick={() => onChange('assistant.language', 'en')}
              className={[
                'rounded-xl px-4 py-2 text-sm border transition',
                defaultLanguage === 'en' ? 'bg-primary/10 border-primary/30' : 'border-border/60 hover:bg-subtle/40',
              ].join(' ')}
            >
              English
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white p-4">
          <div className="font-semibold">اسم العرض داخل النظام</div>
          <div className="text-xs text-muted">اختياري</div>
          <Input
            className="mt-2 bg-subtle"
            value={values['profile.displayName'] ?? ''}
            onChange={(e) => onChange('profile.displayName', e.target.value)}
            placeholder="مثال: صيدلية أحمد"
          />
        </div>
      </div>
    </SectionCard>
  )
}
