import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../constants/assets';

const CardStack = ({ onReplay }) => {
    const [cards, setCards] = useState([
        { id: 5, text: "So, I have one last thing to tell you...", img: ASSETS.IMAGES.PHOTO5 },
        { id: 4, text: "Every moment with you is a core memory.", img: ASSETS.IMAGES.PHOTO4 },
        { id: 3, text: "You are my favorite notification.", img: ASSETS.IMAGES.PHOTO3 },
        { id: 2, text: "I love the way you laugh at my terrible jokes.", img: ASSETS.IMAGES.PHOTO2 },
        { id: 1, text: "Remember when we first met? My life got brighter that day.", img: ASSETS.IMAGES.PHOTO1 },
    ]);

    const removeCard = (id) => {
        setCards((prev) => prev.filter((card) => card.id !== id));
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center">
            {/* Final Message Hidden Layer */}
            <div className="absolute text-center p-6 z-0">
                <h2 className="text-4xl mb-6 text-accent-ruby">I love you more than words can say.</h2>
                <p className="text-2xl mb-8">Happy Valentine's Day! ❤️</p>
                <button
                    onClick={onReplay}
                    className="text-sm underline text-gray-400 hover:text-accent-ruby"
                >
                    Replay
                </button>
            </div>

            {/* Cards stack */}
            <div className="relative w-full max-w-sm h-[450px]">
                <AnimatePresence>
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, info) => {
                                if (Math.abs(info.offset.x) > 100) {
                                    removeCard(card.id);
                                }
                            }}
                            initial={{ rotate: Math.random() * 10 - 5, scale: 0.95 }}
                            animate={{ x: 0, rotate: Math.random() * 10 - 5, scale: 1 }}
                            exit={{
                                x: Math.random() > 0.5 ? 500 : -500,
                                opacity: 0,
                                rotate: 45,
                                transition: { duration: 0.5 }
                            }}
                            style={{ x: 0, zIndex: index + 10 }}
                            className="absolute inset-0 polaroid flex flex-col cursor-grab active:cursor-grabbing"
                        >
                            <img
                                src={card.img}
                                alt="Memory"
                                className="w-full h-2/3 object-cover pointer-events-none"
                            />
                            <div className="p-4 flex-grow flex items-center justify-center text-center">
                                <p className="font-body text-lg italic">{card.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CardStack;
