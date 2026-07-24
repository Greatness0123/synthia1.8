import { type ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-synthia-dark">
      {children}
    </div>
  )
}
