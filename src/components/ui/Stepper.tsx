import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface StepperProps {
  steps: string[];
}

export const Stepper = ({ steps }: StepperProps) => (
  <div className="space-y-3">
    {steps.map((step, index) => (
      <motion.div
        key={`${step}-${index}`}
        className="flex items-start gap-3"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <div
          className={cn(
            "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            index === 0 ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-700"
          )}
        >
          {index + 1}
        </div>
        <p className="text-sm leading-6 text-slate-700">{step}</p>
      </motion.div>
    ))}
  </div>
);
