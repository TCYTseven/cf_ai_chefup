"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface HatProps {
    onClick: () => void;
    disabled?: boolean;
}

export const Hat = ({ onClick, disabled }: HatProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={!disabled ? onClick : undefined}
        >
            <motion.svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={isHovered ? { rotate: [0, -5, 5, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
            >
                {/* Chef Hat Icon */}
                <path
                    d="M100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z"
                    fill="#F3F4F6"
                    className="dark:fill-zinc-800"
                />
                <path
                    d="M60 120H140V150C140 161.046 131.046 170 120 170H80C68.9543 170 60 161.046 60 150V120Z"
                    fill="#E5E7EB"
                    className="dark:fill-zinc-700"
                />
                <path
                    d="M60 120C60 120 50 80 70 60C70 60 80 40 100 40C120 40 130 60 130 60C150 80 140 120 140 120"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="white"
                    className="dark:fill-zinc-900"
                />
            </motion.svg>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                    {disabled ? "Empty" : "Draw"}
                </span>
            </div>
        </motion.div>
    );
};
