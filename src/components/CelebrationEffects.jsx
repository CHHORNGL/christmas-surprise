const FLOATING_HEARTS = [
  { id: 'fh-1', left: '7%', size: 18, delay: '0s', duration: '9s', color: '#E85B74' },
  { id: 'fh-2', left: '19%', size: 14, delay: '1.8s', duration: '11s', color: '#F390AA' },
  { id: 'fh-3', left: '34%', size: 20, delay: '0.9s', duration: '10s', color: '#D94B64' },
  { id: 'fh-4', left: '52%', size: 15, delay: '3.2s', duration: '12s', color: '#FF9EB5' },
  { id: 'fh-5', left: '68%', size: 18, delay: '1.2s', duration: '9.5s', color: '#E85B74' },
  { id: 'fh-6', left: '82%', size: 16, delay: '2.5s', duration: '11.5s', color: '#D94B64' },
  { id: 'fh-7', left: '92%', size: 14, delay: '4.1s', duration: '10.5s', color: '#F390AA' },
  { id: 'fh-8', left: '13%', size: 16, delay: '4.8s', duration: '12.5s', color: '#D94B64' },
];

const SPARKLING_STARS = [
  { id: 'ss-1', top: '14%', left: '12%', size: 18, delay: '0s', color: '#FFD66B' },
  { id: 'ss-2', top: '20%', left: '86%', size: 22, delay: '0.6s', color: '#FFE599' },
  { id: 'ss-3', top: '38%', left: '7%', size: 16, delay: '1.2s', color: '#FFF8F2' },
  { id: 'ss-4', top: '45%', left: '91%', size: 18, delay: '0.3s', color: '#FFD66B' },
  { id: 'ss-5', top: '70%', left: '10%', size: 20, delay: '0.9s', color: '#FFE599' },
  { id: 'ss-6', top: '76%', left: '88%', size: 16, delay: '1.5s', color: '#FFD66B' },
  { id: 'ss-7', top: '10%', left: '48%', size: 15, delay: '1.1s', color: '#FFF8F2' },
  { id: 'ss-8', top: '86%', left: '26%', size: 16, delay: '0.4s', color: '#FFD66B' },
];

function HeartGlyph({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function StarGlyph({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
    </svg>
  );
}

function CelebrationEffects() {
  return (
    <div className="celebration-effects" aria-hidden="true">
      {FLOATING_HEARTS.map((heart) => (
        <span
          key={heart.id}
          className="celebration-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          <HeartGlyph size={heart.size} color={heart.color} />
        </span>
      ))}

      {SPARKLING_STARS.map((star) => (
        <span
          key={star.id}
          className="sparkling-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        >
          <StarGlyph size={star.size} color={star.color} />
        </span>
      ))}
    </div>
  );
}

export default CelebrationEffects;
