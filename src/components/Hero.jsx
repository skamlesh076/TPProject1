import { motion } from 'framer-motion';
import { ASSETS } from '../constants/assets';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const Hero = ({ onOpen }) => {
    useEffect(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mb-8"
            >
                <img
                    src={ASSETS.IMAGES.BOUQUET}
                    alt="Flowers"
                    className="w-64 h-64 object-cover rounded shadow-xl"
                />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl mb-8 text-accent-ruby"
            >
                Happy Valentine's Day!
            </motion.h1>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onOpen}
                className="heartbeat px-8 py-3 bg-accent-ruby text-white rounded-full text-xl shadow-lg"
            >
                Open
            </motion.button>

            {/* Background particles placeholder */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-pink-200 opacity-50 blur-sm animate-pulse" />
                <div className="absolute bottom-20 right-20 w-6 h-6 rounded-full bg-pink-100 opacity-60 blur-md animate-bounce" />
            </div>
        </div>
    );
};

export default Hero;
