'use client'
import { useEffect, useRef } from 'react'

/**
 * Reading surface pinned under the hero band. It holds at half the viewport until the
 * scroll passes that point, then rises with the page so the ink band reads as a static
 * backdrop the content slides over. The transform is written straight to the node —
 * a state update per scroll frame would re-render the whole drafts tree.
 */
const ParallaxSurface: React.FC = () => {
  const surfaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const surface = surfaceRef.current

    if (!surface) return

    const update = () => {
      const viewport = window.innerHeight
      const half = viewport / 2
      const offset =
        window.scrollY <= half ? half : Math.max(viewport - window.scrollY, -viewport)

      surface.style.transform = `translateY(${offset}px)`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={surfaceRef}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[1] h-screen translate-y-[50vh] rounded-t-[22px] bg-[var(--sand-200)] shadow-[0_-20px_50px_rgba(0,0,0,0.28)] will-change-transform"
    />
  )
}

export default ParallaxSurface
