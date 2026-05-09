import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Badge } from "./Badge";
import { useAppStore } from "../../store/useAppStore";

export const ToastViewport = () => {
  const toasts = useAppStore((state) => state.toasts);
  const dismissToast = useAppStore((state) => state.dismissToast);

  useEffect(() => {
    if (toasts.length === 0) {
      return undefined;
    }

    const timeout = window.setTimeout(() => dismissToast(toasts[0].id), 2800);
    return () => window.clearTimeout(timeout);
  }, [dismissToast, toasts]);

  return (
    <div className="pointer-events-none fixed right-6 top-6 z-[60] flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="pointer-events-auto rounded-3xl border border-white/10 bg-[rgba(6,20,38,0.88)] px-5 py-4 text-white shadow-glass backdrop-blur-xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{toast.title}</p>
              <Badge tone={toast.tone === "warning" ? "warning" : toast.tone === "success" ? "success" : "info"}>
                {toast.tone}
              </Badge>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
