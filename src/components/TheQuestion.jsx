import { useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const TheQuestion = ({ onYes }) => {
    const [noPosition, setNoPosition] = useState({ top: '60%', left: '50%' });

    const moveNo = () => {
        const maxX = window.innerWidth - 120;
        const maxY = window.innerHeight - 60;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        setNoPosition({ top: `${randomY}px`, left: `${randomX}px` });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative p-4 overflow-hidden">
            <h2 className="text-4xl mb-12 text-center">Will you be my Valentine?</h2>

            <div className="flex gap-8 items-center">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onYes}
                    className="heartbeat px-10 py-4 bg-accent-ruby text-white rounded-full text-2xl shadow-xl z-20"
                >
                    YES
                </motion.button>
            </div>

            <motion.div
                animate={{ top: noPosition.top, left: noPosition.left }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={moveNo}
                onTouchStart={moveNo}
                className="blob absolute w-24 h-24 bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-white font-bold cursor-pointer shadow-lg z-10 select-none"
                style={{ position: 'absolute' }}
            >
                NO
            </motion.div>
        </div>
    );
};

export default TheQuestion;
