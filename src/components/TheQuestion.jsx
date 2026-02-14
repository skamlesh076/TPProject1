import { useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ASSETS } from '../constants/assets';

const TheQuestion = ({ onYes }) => {
    const [noPosition, setNoPosition] = useState(null);

    const moveNo = () => {
        const padding = 80;
        const maxX = window.innerWidth - 120 - padding;
        const maxY = window.innerHeight - 50 - padding;

        const randomX = Math.random() * maxX + padding;
        const randomY = Math.random() * maxY + padding;

        setNoPosition({ top: `${randomY}px`, left: `${randomX}px` });
    };

    return (
        <div className="flex flex-col items-center min-h-screen relative p-6 overflow-hidden safe-bottom">
            {/* Rule 3: Headings at the Top - Explicit color for contrast */}
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="mt-12 text-[#5D4037] font-romantic text-center z-10"
                style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}
            >
                Will you be my Valentine?
            </motion.h2>

            {/* Mascot Image - Polaroid Style */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="mt-8 w-full max-w-[280px] md:max-w-sm aspect-[3/4] polaroid z-0"
            >
                <div className="w-full h-full overflow-hidden rounded-lg">
                    <img
                        src={ASSETS.IMAGES.TENSE_WAITING}
                        alt="Waiting Mascot"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            {/* Buttons always side-by-side initially */}
            <div className="absolute top-[65%] w-full flex justify-center items-center gap-4 px-6 z-20">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onYes}
                    className="premium-button"
                >
                    YES
                </motion.button>

                {/* NO button - moves when hovered but keeps same style */}
                {!noPosition ? (
                    <motion.button
                        onMouseEnter={moveNo}
                        onTouchStart={moveNo}
                        className="premium-button"
                    >
                        NO
                    </motion.button>
                ) : (
                    <motion.button
                        animate={{ top: noPosition.top, left: noPosition.left }}
                        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                        onMouseEnter={moveNo}
                        onTouchStart={moveNo}
                        className="premium-button absolute"
                        style={{ transform: 'translate(-50%, -50%)' }}
                    >
                        NO
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default TheQuestion;
