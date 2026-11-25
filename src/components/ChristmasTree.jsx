function ChristmasTree({ celebrate = false }) {
  return (
    <div
      className={`tree-wrapper ${celebrate ? 'tree-celebrate' : ''}`}
      aria-hidden="true"
    >
      <div className="tree-aura" />
      <svg
        className="christmas-tree-svg"
        viewBox="0 0 180 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Warm tree shadow */}
        <ellipse cx="90" cy="204" rx="52" ry="8" fill="#E8B9C7" opacity="0.55" />

        {/* Cozy trunk & pot */}
        <rect
          x="76"
          y="174"
          width="28"
          height="24"
          rx="6"
          fill="#B66E57"
          stroke="#5B2333"
          strokeWidth="3"
        />
        <rect
          x="71"
          y="190"
          width="38"
          height="13"
          rx="6"
          fill="#D94B64"
          stroke="#5B2333"
          strokeWidth="3"
        />

        {/* Bottom bough */}
        <path
          d="M90 88C64 114 36 146 28 168C25 176 31 182 40 182H140C149 182 155 176 152 168C144 146 116 114 90 88Z"
          fill="#3A7D5C"
          stroke="#5B2333"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Middle bough */}
        <path
          d="M90 56C68 80 46 108 39 128C37 136 43 142 51 142H129C137 142 143 136 141 128C134 108 112 80 90 56Z"
          fill="#47926D"
          stroke="#5B2333"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Top bough */}
        <path
          d="M90 30C74 48 59 72 54 88C52 95 57 101 65 101H115C123 101 128 95 126 88C121 72 106 48 90 30Z"
          fill="#55A57E"
          stroke="#5B2333"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Soft garland curves */}
        <path
          d="M60 88C76 98 104 98 120 88"
          stroke="#FFF8F2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 7"
          opacity="0.85"
        />
        <path
          d="M48 128C72 141 108 141 132 128"
          stroke="#FFF8F2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 7"
          opacity="0.85"
        />
        <path
          d="M38 166C68 179 112 179 142 166"
          stroke="#FFF8F2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 7"
          opacity="0.85"
        />

        {/* Glowing Star Topper */}
        <g className="tree-star">
          <circle cx="90" cy="24" r="16" fill="#FFE89E" opacity="0.5" />
          <path
            d="M90 8L94.3 17.5L104.6 18.8L97 25.9L99 36.1L90 31.1L81 36.1L83 25.9L75.4 18.8L85.7 17.5L90 8Z"
            fill="#FFD66B"
            stroke="#5B2333"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </g>

        {/* Glowing Twinkling Fairy Lights & Cute Ornaments */}
        <circle className="tree-light light-1" cx="78" cy="70" r="5.5" fill="#FF8FA8" />
        <circle className="tree-light light-2" cx="102" cy="76" r="5.5" fill="#FFE680" />
        <circle className="tree-light light-3" cx="65" cy="113" r="6" fill="#FFE680" />
        <circle className="tree-light light-4" cx="92" cy="108" r="6.5" fill="#E64F6B" />
        <circle className="tree-light light-5" cx="116" cy="116" r="6" fill="#FFB3C6" />
        <circle className="tree-light light-6" cx="53" cy="152" r="6.5" fill="#FF8FA8" />
        <circle className="tree-light light-7" cx="80" cy="158" r="6.5" fill="#FFE680" />
        <circle className="tree-light light-8" cx="106" cy="152" r="6.5" fill="#FFF8F2" />
        <circle className="tree-light light-9" cx="129" cy="158" r="6.5" fill="#E64F6B" />

        {/* Mini heart ornament */}
        <path
          d="M90 135C87.2 131.5 82 132.4 82 136.5C82 140.4 90 145.5 90 145.5C90 145.5 98 140.4 98 136.5C98 132.4 92.8 131.5 90 135Z"
          fill="#FF9EB5"
          stroke="#5B2333"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default ChristmasTree;
