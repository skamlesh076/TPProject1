import { useState, useRef } from 'react';
import Hero from './components/Hero';
import TheQuestion from './components/TheQuestion';
import Explosion from './components/Explosion';
import CardStack from './components/CardStack';
import { ASSETS } from './constants/assets';
import './App.css';

function App() {
  const [phase, setPhase] = useState('intro');
  const audioRef = useRef(null);

  const startProposal = () => {
    setPhase('question');
  };

  const handleYes = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setPhase('transition');
  };

  const handleTransitionComplete = () => {
    setPhase('cards');
  };

  const reset = () => {
    setPhase('intro');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="App selection:bg-rose-200">
      <audio ref={audioRef} src={ASSETS.AUDIO.BG_MUSIC} loop />

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
        <CardStack onReplay={reset} />
      )}
    </div>
  );
}

export default App;
