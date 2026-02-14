import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../constants/assets';
import { ChevronLeft, ChevronRight, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const CardStack = ({ onReplay, onFinalYes }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [showFinalScreen, setShowFinalScreen] = useState(false);

    const cards = [
        { id: 1, text: "Remember when we first met? My life got brighter that day.", img: ASSETS.IMAGES.CARD1 },
        { id: 2, text: "I love the way you laugh at my terrible jokes.", img: ASSETS.IMAGES.CARD2 },
        { id: 3, text: "You are my favorite notification.", img: ASSETS.IMAGES.CARD3 },
        { id: 4, text: "Every moment with you is a core memory.", img: ASSETS.IMAGES.CARD4 },
        { id: 5, text: "Your smile is my favorite view.", img: ASSETS.IMAGES.CARD5 },
        { id: 6, text: "So, I have one last thing to tell you...", img: ASSETS.IMAGES.CARD6 },
    ];

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '110%' : '-110%',
            opacity: 0,
            scale: 0.8,
            rotate: direction > 0 ? 10 : -10
        }),
        center: {
            zIndex: 10,
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '110%' : '-110%',
            opacity: 0,
            scale: 0.8,
            rotate: direction < 0 ? 10 : -10
        })
    };

    const paginate = (newDirection) => {
        const nextIndex = currentIndex + newDirection;
        if (nextIndex >= 0 && nextIndex < cards.length) {
            setDirection(newDirection);
            setCurrentIndex(nextIndex);
        } else if (nextIndex === cards.length && newDirection > 0) {
            // User swiped past the last card - show final screen
            setShowFinalScreen(true);
        }
    };

    const getStackStyle = (index) => {
        const relativePos = index - currentIndex;
        if (relativePos === 0) return { rotate: 0, x: 0 };
        if (relativePos === 1) return { rotate: -3, x: -5 };
        if (relativePos === 2) return { rotate: 4, x: 5 };
        return { rotate: 0, x: 0, opacity: 0 };
    };

    const handleHeartClick = () => {
        // Trigger fireworks
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                return;
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        // Call the parent handler to play music
        if (onFinalYes) {
            onFinalYes();
        }
    };

    // Final screen after all cards are viewed
    if (showFinalScreen) {
        return (
            <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden safe-bottom">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center justify-center gap-12 w-full"
                >
                    <h2 className="text-[2.5rem] text-[#E11D48] font-romantic text-center leading-tight px-4">
                        Will you be mine forever?
                    </h2>

                    {/* YES button - simple rectangle matching other buttons */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleHeartClick}
                        className="premium-button"
                        style={{
                            animation: 'heartbeat 2s ease-in-out infinite'
                        }}
                    >
                        YES
                    </motion.button>
                </motion.div>

                {/* Replay button - bottom right corner */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReplay}
                    className="fixed bottom-6 right-6 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg font-semibold"
                    style={{
                        backgroundColor: '#FF385C',
                        color: '#FFFFFF',
                        boxShadow: '0 8px 20px rgba(255, 56, 92, 0.4)'
                    }}
                >
                    <RotateCcw size={20} />
                    Replay
                </motion.button>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden safe-bottom">
            {/* Messy Stack Behind */}
            <div className="absolute inset-x-0 flex justify-center pointer-events-none">
                {[...Array(3)].map((_, i) => {
                    const style = getStackStyle(currentIndex + i + 1);
                    if (currentIndex + i + 1 >= cards.length) return null;
                    return (
                        <div
                            key={`stack-${i}`}
                            className="absolute polaroid w-[85vw] max-w-[320px] h-[55vh] max-h-[500px] opacity-40 transition-all duration-500"
                            style={{
                                transform: `rotate(${style.rotate}deg) translateX(${style.x}px)`,
                                zIndex: 5 - i
                            }}
                        />
                    );
                })}
            </div>

            {/* Active Polaroid Card slider */}
            <div className="relative w-[85vw] max-w-[320px] h-[55vh] max-h-[500px] perspective-1000 z-10">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -10000) {
                                paginate(1);
                            } else if (swipe > 10000) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full polaroid cursor-grab active:cursor-grabbing flex flex-col"
                    >
                        {/* Top 65% Image Area */}
                        <div className="h-[65%] overflow-hidden rounded-t-lg">
                            <img
                                src={cards[currentIndex].img}
                                alt={`Memory ${currentIndex + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Bottom 35% Text Area */}
                        <div className="h-[35%] flex items-center justify-center p-4 text-center">
                            <p className="font-body font-semibold text-[#374151] text-[1.1rem] leading-snug">
                                "{cards[currentIndex].text}"
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="mt-12 flex flex-col items-center gap-6 w-full z-20">
                <div className="flex items-center gap-8">
                    <motion.button
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => paginate(-1)}
                        disabled={currentIndex === 0}
                        className={`p-3 rounded-full transition-all duration-300 ${currentIndex === 0
                            ? 'opacity-20 bg-gray-200'
                            : 'bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg hover:shadow-xl'
                            }`}
                        style={{
                            boxShadow: currentIndex === 0 ? 'none' : '0 4px 15px rgba(255, 56, 92, 0.3)'
                        }}
                    >
                        <ChevronLeft size={32} className={currentIndex === 0 ? 'text-gray-400' : 'text-white'} strokeWidth={3} />
                    </motion.button>

                    <div className="flex gap-2">
                        {cards.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: i === currentIndex ? 1.2 : 1,
                                    width: i === currentIndex ? '24px' : '8px'
                                }}
                                className={`h-2 rounded-full transition-all duration-300`}
                                style={{
                                    backgroundColor: i === currentIndex ? '#FF385C' : '#D1D5DB',
                                    boxShadow: i === currentIndex ? '0 2px 8px rgba(255, 56, 92, 0.4)' : 'none'
                                }}
                            />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => paginate(1)}
                        disabled={false}
                        className="p-3 rounded-full transition-all duration-300 bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg hover:shadow-xl"
                        style={{
                            boxShadow: '0 4px 15px rgba(255, 56, 92, 0.3)'
                        }}
                    >
                        <ChevronRight size={32} className="text-white" strokeWidth={3} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default CardStack;
