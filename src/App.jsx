import { useState, useRef } from 'react';
import Hero from './components/Hero';
import TheQuestion from './components/TheQuestion';
import Explosion from './components/Explosion';
import CardStack from './components/CardStack';
import { ASSETS } from './constants/assets';

function App() {
  const [phase, setPhase] = useState('intro');
  const audioRef = useRef(null);

  const startProposal = () => {
    setPhase('question');
  };

  const handleYes = () => {
    // Don't play music here anymore - it will play when heart button is clicked
    setPhase('transition');
  };

  const handleTransitionComplete = () => {
    setPhase('cards');
  };

  const handleFinalYes = () => {
    // Play music when heart button is clicked
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const reset = () => {
    setPhase('intro');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="App selection:bg-rose-200 min-h-screen relative overflow-hidden">
      <audio ref={audioRef} src={ASSETS.AUDIO.BG_MUSIC} loop />

      {/* Decorative Floating Hearts */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            fontSize: `${15 + Math.random() * 20}px`
          }}
        >
          ❤️
        </div>
      ))}

      {phase === 'intro' && (
        <Hero onOpen={startProposal} />
      )}

      {phase === 'question' && (
        <TheQuestion onYes={handleYes} />
      )}

      {phase === 'transition' && (
        <Explosion onComplete={handleTransitionComplete} />
      )}

      {phase === 'cards' && (
        <CardStack onReplay={reset} onFinalYes={handleFinalYes} />
      )}
    </div>
  );
}

export default App;
