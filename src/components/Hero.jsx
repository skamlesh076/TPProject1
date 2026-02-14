import { motion } from 'framer-motion';
import { ASSETS } from '../constants/assets';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const Hero = ({ onOpen }) => {
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#FF385C', '#5D4037', '#FFFBF0']
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 safe-bottom">
            {/* Stationery Look Container (Polaroid Style) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="mb-12 w-full max-w-[320px] md:max-w-md aspect-[3/4] polaroid flex flex-col items-center"
            >
                <div className="w-full h-full overflow-hidden rounded-lg">
                    <img
                        src={ASSETS.IMAGES.BOUQUET}
                        alt="Flowers"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mb-12 text-primary-mocha font-romantic"
            >
                Happy Valentine's Day
            </motion.h1>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="premium-button"
            >
                OPEN WITH LOVE
            </motion.button>

            {/* Subtle background flourishes */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
                <div className="absolute top-[5%] left-[10%] text-6xl rotate-12">🌸</div>
                <div className="absolute bottom-[10%] right-[15%] text-5xl -rotate-12">💖</div>
            </div>
        </div>
    );
};

export default Hero;
