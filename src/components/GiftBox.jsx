function GiftBox({ isOpen = false, size = 'large' }) {
  return (
    <div
      className={`gift-box-stage ${isOpen ? 'is-open' : 'is-opening'} gift-${size}`}
      aria-hidden="true"
    >
      <div className="gift-burst-glow" />
      <div className="gift-sparkles">
        <span className="gift-pop-item pop-1">💖</span>
        <span className="gift-pop-item pop-2">✨</span>
        <span className="gift-pop-item pop-3">❤️</span>
        <span className="gift-pop-item pop-4">⭐</span>
        <span className="gift-pop-item pop-5">💗</span>
        <span className="gift-pop-item pop-6">✨</span>
      </div>

      <svg
        className="gift-box-svg"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="90" cy="164" rx="54" ry="8" fill="#E8B9C7" opacity="0.6" />

        {/* Gift Box Base */}
        <g className="gift-base">
          <rect
            x="38"
            y="84"
            width="104"
            height="76"
            rx="14"
            fill="#F9B4C7"
            stroke="#5B2333"
            strokeWidth="3.5"
          />
          {/* Vertical cream/red ribbon */}
          <rect
            x="79"
            y="84"
            width="22"
            height="76"
            fill="#D94B64"
            stroke="#5B2333"
            strokeWidth="3"
          />
          <rect x="85" y="86" width="10" height="72" fill="#FFF8F2" opacity="0.35" />
        </g>

        {/* Animated Gift Lid & Bow */}
        <g className="gift-lid">
          <rect
            x="30"
            y="60"
            width="120"
            height="28"
            rx="10"
            fill="#FFE2EA"
            stroke="#5B2333"
            strokeWidth="3.5"
          />
          <rect
            x="77"
            y="60"
            width="26"
            height="28"
            fill="#D94B64"
            stroke="#5B2333"
            strokeWidth="3"
          />
          {/* Left & Right Bow Loops */}
          <path
            d="M88 58C76 34 46 34 52 54C56 64 78 60 88 58Z"
            fill="#E85B74"
            stroke="#5B2333"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M92 58C104 34 134 34 128 54C124 64 102 60 92 58Z"
            fill="#E85B74"
            stroke="#5B2333"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <circle
            cx="90"
            cy="56"
            r="9"
            fill="#FFF8F2"
            stroke="#5B2333"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  );
}

export default GiftBox;
