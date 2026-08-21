'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextProps {
  theme: 'light' | 'dark'
  mounted: boolean
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  //  مهم: أول render يكون ثابت مثل السيرفر
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  //  بعد mount فقط: اقرأ الثيم الحقيقي وطبّقه
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    const stored = localStorage.getItem('pharmacy-theme')
    let nextTheme: 'light' | 'dark' = 'light'

    if (stored === 'light' || stored === 'dark') {
      nextTheme = stored
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      nextTheme = prefersDark ? 'dark' : 'light'
    }

    setThemeState(nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    localStorage.setItem('pharmacy-theme', nextTheme)
  }, [])

  //  أي تغيير لاحق (زر toggle) طبّقه على <html> واحفظه
  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('pharmacy-theme', theme)
  }, [theme, mounted])

  const setTheme = (value: 'light' | 'dark') => setThemeState(value)
  const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
