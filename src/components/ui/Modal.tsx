import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

export const Modal = ({ open, onClose, title, children }: PropsWithChildren<ModalProps>) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#020816]/70 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-panel-strong atmura-glow-border w-full max-w-2xl rounded-[32px] border border-white/10 p-6 shadow-glass"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">{title}</h3>
            <button className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-sm text-white/75" onClick={onClose} type="button">
              Yopish
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
