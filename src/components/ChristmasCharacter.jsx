import { useState } from 'react';

function ChristmasCharacter({ celebrate = false }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`character-wrapper ${celebrate ? 'character-celebrate' : ''}`}
    >
      <div className="character-glow" aria-hidden="true" />
      {imgError ? (
        <div
          className="character-fallback"
          role="img"
          aria-label="Cute kawaii Christmas character"
        >
          🐰🎄
        </div>
      ) : (
        <img
          src="/christmas-character.png"
          alt="Cute kawaii bunny in a Santa hat holding a heart"
          className="character-image"
          width="168"
          height="168"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
}

export default ChristmasCharacter;
