'use client'

import type { PharmacistOrder } from '@/lib/api/api'
import { SectionCard } from '@/components/pharmacy/shared/SectionCard'
import { Button } from '@/components/ui/Button'
import { ClipboardList, CheckCircle2, XCircle, BadgeCheck } from 'lucide-react'

type Props = {
  orders: PharmacistOrder[]
  onUpdateStatus: (id: number, status: 'ACCEPTED' | 'REJECTED' | 'COMPLETED') => void | Promise<void>
}



function StatusPill({ status }: { status: PharmacistOrder['status'] }) {
  const base = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium'
  if (status === 'PENDING') return <span className={`${base} bg-subtle text-text`}>معلّق</span>
  if (status === 'ACCEPTED') return <span className={`${base} bg-primary/10 text-primary`}>مقبول</span>
  if (status === 'REJECTED') return <span className={`${base} bg-red-500/10 text-red-600`}>مرفوض</span>
  if (status === 'COMPLETED') return <span className={`${base} bg-green-500/10 text-green-600`}>مكتمل</span>
  return <span className={`${base} bg-subtle text-text`}>{status}</span>
}

export function OrdersTable({ orders, onUpdateStatus }: Props) {
  return (
    <SectionCard title="قائمة الطلبات" description="عرض وتحديث الحالات" icon={ClipboardList}>
      {orders.length === 0 ? (
        <p className="text-sm text-muted">لا توجد طلبات مطابقة للفلتر الحالي.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-muted">
              <tr className="border-b">
                <th className="py-3 text-right font-medium">رقم</th>
                <th className="py-3 text-right font-medium">الدواء</th>
                <th className="py-3 text-right font-medium">الكمية</th>
                <th className="py-3 text-right font-medium">المريض</th>
                <th className="py-3 text-right font-medium">الحالة</th>
                <th className="py-3 text-right font-medium">إجراءات</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-subtle/40 transition">
                  <td className="py-3 font-semibold">#{o.id}</td>
                  <td className="py-3">
                    <div className="font-medium">{o.drugName}</div>
                    <div className="text-xs text-muted">{new Date(o.createdAt).toLocaleString()}</div>
                  </td>
                  <td className="py-3">{o.quantity}</td>
                  <td className="py-3">
                    <div className="font-medium">
                      {o.patient ? `${o.patient.firstName} ${o.patient.lastName}` : '—'}
                    </div>
                    <div className="text-xs text-muted">
                      {o.patient?.phone ?? '—'}
                    </div>
                  </td>

                  <td className="py-3">
                    <StatusPill status={o.status} />
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        className="gap-2"
                        onClick={() => onUpdateStatus(o.id, 'ACCEPTED')}
                        disabled={o.status !== 'PENDING'}
                        title="قبول الطلب"
                      >
                        <CheckCircle2 size={16} />
                        قبول
                      </Button>

                      <Button
                        variant="soft"
                        className="gap-2"
                        onClick={() => onUpdateStatus(o.id, 'REJECTED')}
                        disabled={o.status !== 'PENDING'}
                        title="رفض الطلب"
                      >
                        <XCircle size={16} />
                        رفض
                      </Button>

                      <Button
                        variant="soft"
                        className="gap-2"
                        onClick={() => onUpdateStatus(o.id, 'COMPLETED')}
                        disabled={o.status !== 'ACCEPTED'}
                        title="إتمام الطلب"
                      >
                        <BadgeCheck size={16} />
                        إكمال
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  )
}
