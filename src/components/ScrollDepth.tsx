import { useEffect, useState } from 'react'

const MAX_DEPTH = 820

export default function ScrollDepth() {
  const [depth, setDepth] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function update() {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const pct = total > 0 ? scrolled / total : 0
      setDepth(Math.round(pct * MAX_DEPTH))
      setVisible(scrolled > 80)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className={`scroll-depth${visible ? ' scroll-depth--visible' : ''}`} aria-hidden="true">
      <span className="scroll-depth-line" />
      <span className="scroll-depth-val">{depth}m</span>
      <span className="scroll-depth-line scroll-depth-line--grow" />
      <span className="scroll-depth-label">depth</span>
    </div>
  )
}
