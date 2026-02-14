import { motion } from 'framer-motion';

const Explosion = ({ onComplete }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 150 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 bg-chocolate z-50 rounded-full"
            style={{ originX: 0.5, originY: 0.5 }}
        />
    );
};

export default Explosion;
