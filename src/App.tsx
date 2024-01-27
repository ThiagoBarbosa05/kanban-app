import { Eye } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAppSelector } from './app/hooks'
import { Board } from './components/board'
// import { EmptyBoard } from './components/empty-board'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  const [isHideSidebar, setIsHideSidebar] = useState(false)
  const boards = useAppSelector((state) => state.board)

  return (
    <ThemeProvider defaultTheme="light" storageKey="kanban-theme">
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-light-grey-light-bg antialiased dark:bg-very-dark-grey-dark-bg">
        <Header />
        <section className="flex flex-1 flex-col md:flex-row">
          <Sidebar
            isHideSidebar={isHideSidebar}
            setIsHideSidebar={setIsHideSidebar}
          />
          {boards.length === 0 ? <div></div> : <Board />}
        </section>
      </div>
      <button
        onClick={() => setIsHideSidebar(false)}
        className={twMerge(
          'leading-0 fixed bottom-8 flex h-12 w-14 items-center justify-center rounded-r-full bg-main-purple text-white hover:bg-main-purple-hover',
          !isHideSidebar && 'hidden',
        )}
      >
        <Eye />
      </button>
    </ThemeProvider>
  )
}
