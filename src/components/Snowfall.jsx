const SNOWFLAKES = Array.from({ length: 34 }, (_, index) => ({
  id: `snow-${index}`,
  left: `${(index * 2.95 + (index % 5) * 1.4) % 99}%`,
  size: 4 + (index % 5) * 2.2,
  delay: `${(index % 11) * 0.85}s`,
  duration: `${8 + (index % 6) * 2.1}s`,
  opacity: 0.45 + (index % 4) * 0.14,
  drift: `${(index % 2 === 0 ? 1 : -1) * (14 + (index % 4) * 10)}px`,
}));

function Snowfall() {
  return (
    <div className="snow-layer" aria-hidden="true">
      {SNOWFLAKES.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            '--snow-drift': flake.drift,
          }}
        />
      ))}
    </div>
  );
}

export default Snowfall;
