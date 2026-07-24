import { SunDim, MoonStars } from '@phosphor-icons/react'
import { useUIStore } from '@/store/uiStore'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore()

  return (
    <div className="absolute top-16 left-4 z-50">
      <button
        onClick={toggleTheme}
        className="glass-panel p-2 hover:bg-white/10 transition-colors"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <SunDim size={18} className="text-yellow-400" />
        ) : (
          <MoonStars size={18} className="text-blue-400" />
        )}
      </button>
    </div>
  )
}
