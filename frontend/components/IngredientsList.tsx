"use client";

import { motion } from "framer-motion";

export const IngredientsList = ({ ingredients }: { ingredients: string[] }) => {
    return (
        <div className="flex flex-col gap-3">
            {ingredients.map((ingredient, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-default-50 dark:bg-default-100/50 rounded-xl border border-default-200 group hover:border-primary/50 transition-colors"
                >
                    <div className="w-6 h-6 rounded-full border-2 border-default-300 group-hover:border-primary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-base font-medium text-default-700 group-hover:text-default-900">
                        {ingredient}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};
