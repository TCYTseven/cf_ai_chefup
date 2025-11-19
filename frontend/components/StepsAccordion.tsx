"use client";

import { motion } from "framer-motion";

export const StepsAccordion = ({ steps }: { steps: string[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {steps.map((step, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="relative pl-8 pb-8 last:pb-0 border-l-2 border-default-200 last:border-l-0"
                >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />

                    <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-default-200 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                            Step {idx + 1}
                        </h4>
                        <p className="text-lg text-default-700 leading-relaxed">
                            {step}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
