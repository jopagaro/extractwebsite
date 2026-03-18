import { useState, useRef } from 'react'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <ul className="accordion-list">
      {items.map((item, i) => (
        <AccordionRow
          key={i}
          item={item}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </ul>
  )
}

function AccordionRow({
  item,
  open,
  onToggle,
}: {
  item: AccordionItem
  open: boolean
  onToggle: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  return (
    <li className="accordion-item">
      <button className="accordion-trigger" onClick={onToggle} aria-expanded={open}>
        <span>{item.question}</span>
        <span className={`accordion-icon${open ? ' open' : ''}`}>+</span>
      </button>
      <div
        ref={panelRef}
        className={`accordion-panel${open ? ' open' : ''}`}
        style={{
          maxHeight: open ? `${panelRef.current?.scrollHeight ?? 400}px` : '0px',
        }}
      >
        <p className="accordion-body">{item.answer}</p>
      </div>
    </li>
  )
}
