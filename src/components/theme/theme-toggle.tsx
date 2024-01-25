import { MoonStar, Sun } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [toggle, setToggle] = useState<boolean>(theme === 'dark')

  const handleSwitchTheme = () => {
    if (!toggle) {
      setTheme('dark')
      setToggle(true)
    } else {
      setTheme('light')
      setToggle(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-[251px] items-center justify-center gap-6 rounded-md bg-light-grey-light-bg py-[0.875rem] dark:bg-very-dark-grey-dark-bg">
      <Sun size={15} fill="#828FA3" color="#828FA3" />
      <button
        className="h-[20px] w-[40px] rounded-full bg-main-purple hover:bg-main-purple-hover"
        onClick={handleSwitchTheme}
      >
        <span
          className={twMerge(
            'block h-[14px] w-[14px] translate-x-1 rounded-full bg-white transition duration-300',
            toggle ? 'translate-x-[22px]' : 'translate-x-1',
          )}
        />
      </button>
      <MoonStar size={15} fill="#828FA3" color="#828FA3" />
    </div>
  )
}
