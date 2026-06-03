import { motion } from "framer-motion";

export default function TransitionWrapper({ children }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="relative w-full min-h-screen bg-black"
      >
        {children}
      </motion.div>
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex">
        <motion.div
          className="relative w-1/2 h-full bg-black border-r border-zinc-800/80 shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          exit={{ x: "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="relative w-1/2 h-full bg-black border-l border-zinc-800/80 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          exit={{ x: "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          initial={{ opacity: 1, scaleY: 1 }}
          animate={{ opacity: 0, scaleY: 0 }}
          exit={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        />
      </div>
    </>
  );
}
