'use client'

import { motion } from 'framer-motion'
import type { PharmacistProfile } from '@/lib/api/api'
import { SectionCard } from '@/components/pharmacy/shared/SectionCard'
import { Building2, KeyRound, Phone, MapPin, BadgeCheck, CalendarClock, LucideIcon } from 'lucide-react'

function formatDate(d?: string) {
  if (!d) return '—'
  try {
    return new Intl.DateTimeFormat('ar', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(d))
  } catch {
    return d
  }
}

export function ProfileGrid({ data }: { data: PharmacistProfile }) {
  const pharmacy = data.pharmacy

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* User */}
      <SectionCard title="بيانات المستخدم" description="معلومات الحساب الأساسية" icon={KeyRound} className="xl:col-span-1">
        <div className="space-y-3 text-sm">
          <Row label="ID" value={String(data.user.id)} />
          <Row label="اسم المستخدم" value={data.user.username} />
          <Row label="البريد" value={data.user.email} />
          <Row label="الدور" value={data.user.role} />
          <Row label="تاريخ الإنشاء" value={formatDate(data.user.createdAt)} />
        </div>
      </SectionCard>

      {/* Pharmacy */}
      <SectionCard
        title="بيانات الصيدلية"
        description="تفاصيل الصيدلية المرتبطة بالحساب"
        icon={Building2}
        className="xl:col-span-2"
      >
        {!pharmacy ? (
          <div className="text-sm text-muted">لا توجد صيدلية مرتبطة بهذا الحساب حالياً.</div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 text-sm">
              <Row label="اسم الصيدلية" value={pharmacy.name} icon={Building2} />
              <Row label="العنوان" value={pharmacy.address} icon={MapPin} />
              <Row label="الهاتف" value={pharmacy.phone} icon={Phone} />
              <Row label="رقم الترخيص" value={pharmacy.licenseNumber} icon={BadgeCheck} />
            </div>

            <div className="space-y-3 text-sm">
              <Row label="تاريخ إصدار الترخيص" value={formatDate(pharmacy.licenseIssuedAt)} icon={CalendarClock} />
              <Row label="انتهاء الترخيص" value={formatDate(pharmacy.licenseExpiresAt)} icon={CalendarClock} />
              <Row
                label="الموقع"
                value={
                  pharmacy.latitude && pharmacy.longitude
                    ? `${pharmacy.latitude}, ${pharmacy.longitude}`
                    : '—'
                }
                icon={MapPin}
              />
              <Row label="حالة الصيدلية" value={pharmacy.isActive ? 'مفعلة' : 'موقوفة'} icon={BadgeCheck} />
            </div>
          </motion.div>
        )}
      </SectionCard>
    </div>
  )
}

function Row({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-border/40 bg-bg/40 px-3 py-2">
      <div className="flex items-center gap-2 text-muted">
        {Icon ? <Icon size={16} className="text-muted" /> : null}
        <span className="text-xs">{label}</span>
      </div>
      <div className="text-sm font-semibold text-text text-right">{value}</div>
    </div>
  )
}