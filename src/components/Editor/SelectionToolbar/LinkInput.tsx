'use client'
import { useState } from 'react'

type ComponentProps = {
  initialUrl: string
  onApply: (url: string) => void
  onRemove: () => void
  onCancel: () => void
}

/** Compact URL field that replaces the format bar while a link is being set. */
const LinkInput: React.FC<ComponentProps> = ({ initialUrl, onApply, onRemove, onCancel }) => {
  const [url, setUrl] = useState<string>(initialUrl)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleApply()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      onCancel()
    }
  }

  const handleApply = () => {
    const trimmedUrl = url.trim()

    return trimmedUrl ? onApply(trimmedUrl) : onRemove()
  }

  const hasExistingLink = Boolean(initialUrl)

  return (
    <div className='flex w-[300px] items-center gap-2'>
      <span className='font-mono text-[15px] leading-none text-(--marigold-500)'>↳</span>
      <input
        autoFocus
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Paste or type a link'
        className='flex-1 border-none bg-transparent font-sans text-[13px] text-(--text-on-dark) outline-none placeholder:text-(--text-on-dark-muted)'
      />
      {hasExistingLink && (
        <button
          type='button'
          onClick={onRemove}
          className='rounded-[5px] px-[8px] py-[6px] font-mono text-[9.5px] tracking-[0.1em] text-(--text-on-dark-muted) cursor-pointer transition-colors hover:text-(--text-on-dark)'
        >
          REMOVE
        </button>
      )}
      <button
        type='button'
        onClick={handleApply}
        className='rounded-[5px] bg-(--marigold-500) px-[11px] py-[6px] font-mono text-[9.5px] tracking-[0.1em] text-(--on-accent) cursor-pointer'
      >
        APPLY
      </button>
    </div>
  )
}

export default LinkInput
