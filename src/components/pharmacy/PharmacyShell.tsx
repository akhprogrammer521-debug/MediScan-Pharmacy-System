'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export function PharmacyShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="relative flex h-screen overflow-hidden bg-bg">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col md:mr-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto page-padding">
          {children}
        </main>
      </div>
    </div>
  )
}
