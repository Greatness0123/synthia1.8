import { type ReactNode, useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

interface DraggablePanelProps {
  title: string
  defaultPosition?: { x: number; y: number }
  children: ReactNode
  onClose?: () => void
  className?: string
  width?: string
}

export default function DraggablePanel({
  title,
  defaultPosition = { x: 20, y: 80 },
  children,
  onClose,
  className = '',
  width = 'w-80',
}: DraggablePanelProps) {
  const [position, setPosition] = useState(defaultPosition)
  const dragRef = useRef<HTMLDivElement>(null)

  const handleDrag = useCallback((_: unknown, info: { offset: { x: number; y: number } }) => {
    setPosition({
      x: defaultPosition.x + info.offset.x,
      y: defaultPosition.y + info.offset.y,
    })
  }, [defaultPosition])

  return (
    <motion.div
      ref={dragRef}
      drag
      dragMomentum={false}
      onDrag={handleDrag}
      initial={false}
      animate={{ x: position.x, y: position.y }}
      className={`absolute z-40 ${width} glass-panel overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-glass-border cursor-grab active:cursor-grabbing drag-none">
        <span className="panel-header">{title}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-sm leading-none"
            aria-label="Close panel"
          >
            ✕
          </button>
        )}
      </div>
      <div className="p-3 max-h-[60vh] overflow-y-auto scrollbar-thin">
        {children}
      </div>
    </motion.div>
  )
}
