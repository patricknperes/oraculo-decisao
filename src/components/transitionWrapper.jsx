import { motion } from "framer-motion";

export default function TransitionWrapper({ children }) {
    return (
        <div className="relative w-full min-h-screen bg-[#07060f]">
            <style>{`
                @keyframes spin-portal {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-portal { animation: spin-portal 8s linear infinite; }
                .animate-spin-portal-reverse { animation: spin-portal 12s linear infinite reverse; }
            `}</style>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full min-h-screen"
            >
                {children}
            </motion.div>

            <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-[#04020a]"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeInOut" } }}
                    exit={{ opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } }}
                />

                <motion.div
                    className="relative flex items-center justify-center rounded-full bg-[#04020a] shadow-[0_0_100px_rgba(139,92,246,0.8),inset_0_0_150px_rgba(139,92,246,1)] border-[4px] border-violet-400"
                    initial={{ width: "150vmax", height: "150vmax", opacity: 1 }}
                    animate={{ width: "0vmax", height: "0vmax", opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
                    exit={{ width: "150vmax", height: "150vmax", opacity: 1, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="absolute inset-[5%] border-[3px] border-dashed border-cyan-400/50 rounded-full animate-spin-portal" />
                    <div className="absolute inset-[15%] border-[2px] border-dotted border-violet-300/60 rounded-full animate-spin-portal-reverse" />

                    <motion.div
                        className="absolute flex items-center justify-center w-32 h-32 rounded-full bg-[radial-gradient(circle_at_30%_30%,#5b21b6,#020617)] shadow-[0_0_50px_#7c3aed]"
                        initial={{ scale: 2, opacity: 1 }}
                        animate={{ scale: 0, opacity: 0, transition: { duration: 0.8, delay: 0.2 } }}
                        exit={{ scale: 2, opacity: 1, transition: { duration: 0.6 } }}
                    >
                        <span className="text-5xl animate-pulse drop-shadow-[0_0_20px_white]">🔮</span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}