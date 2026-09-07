import React from 'react';

// Elegant botanical line-art SVG inspired directly by the reference PDF
export function FloralFlowerArt({ className = 'w-64 h-64 text-[#D9AAA6] opacity-35' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="28" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
      <circle cx="200" cy="200" r="16" fill="currentColor" fillOpacity="0.15" />
      
      {/* Radiating Petals */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i * 360) / 18;
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <path
              d="M194 172 C 185 110, 195 50, 200 35 C 205 50, 215 110, 206 172"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M200 172 L 200 90"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="2 3"
              opacity="0.6"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function BotanicalBranchArt({ className = 'w-48 h-48 text-[#756B67] opacity-25' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Graceful curving stem */}
      <path
        d="M60 380 C 100 280, 120 180, 240 40"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Leaves branching out */}
      <path
        d="M105 270 C 70 250, 60 210, 75 190 C 100 210, 110 240, 105 270"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M125 220 C 165 200, 190 220, 185 245 C 160 250, 135 240, 125 220"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M160 160 C 130 130, 135 95, 160 85 C 175 110, 175 140, 160 160"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M190 120 C 225 100, 245 115, 245 140 C 220 145, 200 135, 190 120"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.08"
      />
    </svg>
  );
}

// Organic curving line element (as seen across the reference portfolio slides)
export function OrganicCurveBackground({ className = 'absolute inset-0 pointer-events-none' }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        className="w-full h-full opacity-40"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50 400 C 300 650, 650 200, 1050 450 C 1280 600, 1400 350, 1500 300"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[#E4D3CC]"
        />
        <path
          d="M200 0 C 450 300, 750 150, 1100 500 C 1350 720, 1450 850, 1500 900"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          className="text-[#D9AAA6]"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
