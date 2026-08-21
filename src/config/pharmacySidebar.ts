import {
  LayoutDashboard,
  Scan,
  FileText,
  Layers,
  Package,
  ShoppingCart,
  Database,
  User,
  Bot,
  Settings,
} from 'lucide-react'

export type SidebarItem = {
  label: string
  href: string
  icon: React.ElementType
}

export type SidebarSection = {
  label: string
  icon: React.ElementType
  items: SidebarItem[]
}

export const pharmacySidebar: SidebarSection[] = [
  {
    label: 'لوحة التحكم',
    icon: LayoutDashboard,
    items: [
      {
        label: 'نظرة عامة',
        href: '/pharmacy/dashboard',
        icon: LayoutDashboard,
      },
      {
        label: 'الملف الشخصي',
        href: '/pharmacy/profile',
        icon: User,
      },
    ],
  },
  {
    label: 'مسح & تحليل',
    icon: Scan,
    items: [
      { label: 'مسح دواء', href: '/pharmacy/ocr/drug', icon: Scan },
      { label: 'مسح وصفة طبية', href: '/pharmacy/ocr/prescription', icon: FileText },
      { label: 'مقارنة أدوية', href: '/pharmacy/compare', icon: Layers },
    ],
  },
  {
    label: 'الصيدلية',
    icon: Package,
    items: [
      { label: 'المخزون', href: '/pharmacy/inventory', icon: Package },
      { label: 'الطلبات', href: '/pharmacy/orders', icon: ShoppingCart },
    ],
  },
  {
    label: 'البيانات',
    icon: Database,
    items: [
      { label: 'قاعدة الأدوية', href: '/pharmacy/database', icon: Database },
    ],
  },
  {
    label: 'الذكاء الاصطناعي',
    icon: Bot,
    items: [
      { label: 'المساعد الطبي', href: '/pharmacy/assistant', icon: Bot },
    ],
  },
  {
    label: 'الإعدادات',
    icon: Settings,
    items: [
      { label: 'الإعدادات', href: '/pharmacy/settings', icon: Settings },
    ],
  },
]
