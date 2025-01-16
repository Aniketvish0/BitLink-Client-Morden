import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full overflow-hidden"
    >
      <div className="transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {theme === 'dark' ? (
          <Sun 
            className="h-5 w-5 text-yellow-500 animate-spin-once" 
            aria-hidden="true"
          />
        ) : (
          <Moon 
            className="h-5 w-5 text-slate-900 animate-spin-once " 
            aria-hidden="true"
          />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 