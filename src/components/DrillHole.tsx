import { useEffect, useRef } from 'react'

const BANDS = [
  {
    label: 'Overburden',
    from: 0,
    to: 32,
    color: '#EAE4D6',
    border: '#D4CEC0',
    grade: null,
    commodity: null,
  },
  {
    label: 'Saprolite',
    from: 32,
    to: 74,
    color: '#D8D2C4',
    border: '#C4BEB0',
    grade: '< 0.1',
    commodity: 'g/t Au',
  },
  {
    label: 'Transition',
    from: 74,
    to: 118,
    color: '#BEBAA8',
    border: '#ACA890',
    grade: '0.3',
    commodity: 'g/t Au',
  },
  {
    label: 'Oxide',
    from: 118,
    to: 172,
    color: '#9E9888',
    border: '#8A8470',
    grade: '1.2',
    commodity: 'g/t Au',
  },
  {
    label: 'Sulphide',
    from: 172,
    to: 238,
    color: '#6E6858',
    border: '#5A5448',
    grade: '4.8',
    commodity: 'g/t Au',
  },
  {
    label: 'High Grade',
    from: 238,
    to: 285,
    color: '#3A3530',
    border: '#2A2520',
    grade: '12.4',
    commodity: 'g/t Au',
  },
]

const TOTAL_DEPTH = 285
const COL_X = 88
const COL_W = 42
const SVG_H = 440
const SVG_W = 220

function mToY(m: number) {
  return (m / TOTAL_DEPTH) * SVG_H
}

export default function DrillHole() {
  const svgRef = useRef<SVGSVGElement>(null)

  // Trigger the CSS animations once mounted
  useEffect(() => {
    const items = svgRef.current?.querySelectorAll('.drill-band')
    items?.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible')
      }, 200 + i * 420)
    })

    const bit = svgRef.current?.querySelector('.drill-bit')
    if (bit) {
      setTimeout(() => bit.classList.add('visible'), 100)
    }
  }, [])

  return (
    <div className="drill-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="drill-svg"
        aria-hidden="true"
      >
        {/* Collar / surface label */}
        <line
          x1={COL_X - 16}
          y1={1}
          x2={COL_X + COL_W + 52}
          y2={1}
          stroke="#CEC8BA"
          strokeWidth="1"
        />
        <text
          x={COL_X - 18}
          y={-3}
          fontSize="7"
          fill="#9E9890"
          textAnchor="end"
          fontFamily="'Courier Prime', monospace"
          letterSpacing="0.06em"
        >
          collar
        </text>
        <text
          x={COL_X - 18}
          y={8}
          fontSize="7"
          fill="#CEC8BA"
          textAnchor="end"
          fontFamily="'Courier Prime', monospace"
        >
          0m
        </text>

        {/* Drill string line (thin center line) */}
        <line
          x1={COL_X + COL_W / 2}
          y1={0}
          x2={COL_X + COL_W / 2}
          y2={SVG_H}
          stroke="#CEC8BA"
          strokeWidth="0.5"
          strokeDasharray="3 3"
          opacity="0.4"
        />

        {/* Lithology bands */}
        {BANDS.map((b, i) => {
          const y1 = mToY(b.from)
          const y2 = mToY(b.to)
          const h = y2 - y1
          const midY = y1 + h / 2

          return (
            <g key={i} className="drill-band" style={{ opacity: 0 }}>
              {/* Band fill */}
              <rect
                x={COL_X}
                y={y1}
                width={COL_W}
                height={h}
                fill={b.color}
                stroke={b.border}
                strokeWidth="0.6"
              />

              {/* Subtle hatching for texture */}
              {i % 2 === 1 && (
                <line
                  x1={COL_X}
                  y1={y1 + h * 0.33}
                  x2={COL_X + COL_W}
                  y2={y1 + h * 0.33}
                  stroke={b.border}
                  strokeWidth="0.4"
                  opacity="0.5"
                />
              )}

              {/* Depth tick + label on left */}
              <line
                x1={COL_X - 10}
                y1={y1}
                x2={COL_X}
                y2={y1}
                stroke="#CEC8BA"
                strokeWidth="0.8"
              />
              <text
                x={COL_X - 12}
                y={y1 + 4}
                fontSize="7"
                fill="#9E9890"
                textAnchor="end"
                fontFamily="'Courier Prime', monospace"
              >
                {b.from}m
              </text>

              {/* Lithology label on right */}
              <text
                x={COL_X + COL_W + 8}
                y={midY + (b.grade ? -3 : 3)}
                fontSize="7.5"
                fill={i >= 4 ? '#9E9890' : '#5C5750'}
                fontFamily="'Courier Prime', monospace"
                letterSpacing="0.04em"
              >
                {b.label.toUpperCase()}
              </text>

              {/* Grade value */}
              {b.grade && (
                <>
                  <text
                    x={COL_X + COL_W + 8}
                    y={midY + 9}
                    fontSize="9"
                    fill={i >= 4 ? '#EAE4D6' : '#1A1815'}
                    fontFamily="'Courier Prime', monospace"
                    fontWeight={i === 5 ? '700' : '400'}
                  >
                    {b.grade}
                  </text>
                  <text
                    x={COL_X + COL_W + 8}
                    y={midY + 19}
                    fontSize="6.5"
                    fill="#9E9890"
                    fontFamily="'Courier Prime', monospace"
                    letterSpacing="0.06em"
                  >
                    {b.commodity}
                  </text>
                </>
              )}
            </g>
          )
        })}

        {/* Bottom depth */}
        <line
          x1={COL_X - 10}
          y1={SVG_H}
          x2={COL_X}
          y2={SVG_H}
          stroke="#CEC8BA"
          strokeWidth="0.8"
        />
        <text
          x={COL_X - 12}
          y={SVG_H + 4}
          fontSize="7"
          fill="#9E9890"
          textAnchor="end"
          fontFamily="'Courier Prime', monospace"
        >
          285m
        </text>

        {/* Animated drill bit */}
        <g className="drill-bit" style={{ opacity: 0 }}>
          <polygon
            points={`
              ${COL_X + COL_W / 2 - 7}, ${SVG_H - 10}
              ${COL_X + COL_W / 2 + 7}, ${SVG_H - 10}
              ${COL_X + COL_W / 2},     ${SVG_H + 4}
            `}
            fill="#5C5750"
          />
        </g>

        {/* Hole ID label at top */}
        <text
          x={COL_X + COL_W / 2}
          y={-10}
          fontSize="7"
          fill="#9E9890"
          textAnchor="middle"
          fontFamily="'Courier Prime', monospace"
          letterSpacing="0.12em"
        >
          DDH-001
        </text>
      </svg>
    </div>
  )
}
