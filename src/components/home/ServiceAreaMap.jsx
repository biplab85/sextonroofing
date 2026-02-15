'use client';

import { useRef, useState, useEffect } from 'react';

/* ── County shape data ── */
const counties = [
  {
    id: 'franklin',
    name: 'Franklin',
    path: 'M 48,18 C 100,6 240,4 332,12 L 328,55 C 324,92 318,128 312,158 L 72,168 C 62,132 54,88 48,48 Z',
    fill: 'rgba(58, 107, 85, 0.12)',
    stroke: 'rgba(58, 107, 85, 0.55)',
    labelX: 192,
    labelY: 92,
  },
  {
    id: 'hampshire',
    name: 'Hampshire',
    path: 'M 72,168 L 312,158 C 306,198 300,238 294,272 L 288,302 L 78,314 C 74,278 72,232 72,198 Z',
    fill: 'rgba(126, 104, 145, 0.12)',
    stroke: 'rgba(126, 104, 145, 0.55)',
    labelX: 185,
    labelY: 238,
  },
  {
    id: 'hampden',
    name: 'Hampden',
    path: 'M 78,314 L 288,302 C 296,338 306,376 316,412 L 322,440 C 252,448 128,448 52,442 L 56,408 C 64,368 72,340 78,314 Z',
    fill: 'rgba(42, 123, 168, 0.12)',
    stroke: 'rgba(42, 123, 168, 0.55)',
    labelX: 190,
    labelY: 378,
  },
];

/* ── Connecticut River path ── */
const riverPath =
  'M 218,4 C 212,42 202,78 196,112 C 190,142 182,178 176,212 C 172,244 174,274 178,304 C 183,334 196,368 216,408 L 226,448';

/* ── City markers ── */
const cities = [
  { name: 'Greenfield', x: 198, y: 72, label: true },
  { name: 'Deerfield', x: 178, y: 112, label: false },
  { name: 'Northampton', x: 152, y: 218, label: true },
  { name: 'Amherst', x: 232, y: 202, label: true },
  { name: 'Easthampton', x: 130, y: 252, label: false },
  { name: 'S. Hadley', x: 215, y: 272, label: false },
  { name: 'Holyoke', x: 178, y: 328, label: true, isHQ: true },
  { name: 'Springfield', x: 248, y: 368, label: true },
  { name: 'Chicopee', x: 222, y: 342, label: false },
  { name: 'Westfield', x: 108, y: 382, label: true },
];

export default function ServiceAreaMap() {
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`area-map ${isVisible ? 'area-map--visible' : ''}`} ref={mapRef}>
      <svg
        viewBox="0 0 380 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="area-map__svg"
        role="img"
        aria-label="Service area map of Hampshire, Franklin, and Hampden Counties"
      >
        <defs>
          <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hqRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(58,107,85,0.18)" />
            <stop offset="60%" stopColor="rgba(58,107,85,0.06)" />
            <stop offset="100%" stopColor="rgba(58,107,85,0)" />
          </radialGradient>
        </defs>

        {/* ── Coverage radius pulses from HQ ── */}
        <circle className="area-map__pulse area-map__pulse--1" cx="178" cy="328" r="0" />
        <circle className="area-map__pulse area-map__pulse--2" cx="178" cy="328" r="0" />

        {/* ── County shapes ── */}
        {counties.map((c, i) => (
          <g key={c.id}>
            <path
              d={c.path}
              fill={hovered === c.id ? c.fill.replace('0.12', '0.22') : c.fill}
              className="area-map__county-fill"
              style={{ '--county-delay': `${i * 300 + 600}ms` }}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
            />
            <path
              d={c.path}
              fill="none"
              stroke={c.stroke}
              strokeWidth="1.5"
              strokeLinejoin="round"
              className="area-map__county-stroke"
              style={{ '--county-delay': `${i * 300}ms` }}
            />
          </g>
        ))}

        {/* ── Connecticut River ── */}
        <path
          d={riverPath}
          stroke="rgba(42,123,168,0.12)"
          strokeWidth="8"
          strokeLinecap="round"
          className="area-map__river area-map__river--glow"
        />
        <path
          d={riverPath}
          stroke="rgba(42,123,168,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          className="area-map__river"
        />

        {/* ── County labels ── */}
        {counties.map((c, i) => (
          <text
            key={`lbl-${c.id}`}
            x={c.labelX}
            y={c.labelY}
            textAnchor="middle"
            className="area-map__county-label"
            style={{ '--label-delay': `${900 + i * 200}ms` }}
          >
            {c.name}
          </text>
        ))}

        {/* ── City markers ── */}
        {cities.map((city, i) => (
          <g
            key={city.name}
            className="area-map__city"
            style={{ '--city-delay': `${1400 + i * 80}ms` }}
          >
            {city.isHQ ? (
              <>
                {/* HQ animated rings */}
                <circle cx={city.x} cy={city.y} r="14" className="area-map__hq-ring area-map__hq-ring--outer" />
                <circle cx={city.x} cy={city.y} r="9" className="area-map__hq-ring area-map__hq-ring--inner" />
                {/* HQ dot */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="5"
                  fill="#3A6B55"
                  stroke="#fff"
                  strokeWidth="2"
                  filter="url(#mapGlow)"
                  className="area-map__city-dot area-map__city-dot--hq"
                />
                {/* HQ label */}
                <text x={city.x} y={city.y - 22} textAnchor="middle" className="area-map__city-label area-map__city-label--hq">
                  {city.name}
                </text>
                <text x={city.x} y={city.y - 12} textAnchor="middle" className="area-map__hq-tag">
                  ★ HQ
                </text>
              </>
            ) : (
              <>
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={city.label ? 3 : 2}
                  fill="rgba(255,255,255,0.8)"
                  className="area-map__city-dot"
                />
                {city.label && (
                  <text x={city.x} y={city.y - 8} textAnchor="middle" className="area-map__city-label">
                    {city.name}
                  </text>
                )}
              </>
            )}
          </g>
        ))}

        {/* ── Compass rose ── */}
        <g className="area-map__compass" transform="translate(340, 38)">
          <circle r="15" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <line x1="0" y1="-12" x2="0" y2="-5" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
          <line x1="0" y1="5" x2="0" y2="12" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="-12" y1="0" x2="-5" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="5" y1="0" x2="12" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeLinecap="round" />
          <text y="-2" textAnchor="middle" className="area-map__compass-letter">N</text>
        </g>
      </svg>
    </div>
  );
}
