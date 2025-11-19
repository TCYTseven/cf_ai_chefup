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
            className="relative cursor-pointer group"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95, rotate: 2 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={!disabled ? onClick : undefined}
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <svg
                width="300"
                height="300"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 drop-shadow-2xl"
            >
                <motion.g
                    animate={isHovered ? { y: [0, -5, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Hat Body */}
                    <path
                        d="M6 14H18V17C18 18.6569 16.6569 20 15 20H9C7.34315 20 6 18.6569 6 17V14Z"
                        className="fill-white dark:fill-zinc-800 stroke-zinc-900 dark:stroke-white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                    {/* Hat Top (Puffy parts) */}
                    <path
                        d="M18 14V13.5C18 11.5 17 10 16 10C16 10 16.5 7 12 7C7.5 7 8 10 8 10C7 10 6 11.5 6 13.5V14"
                        className="fill-white dark:fill-zinc-800 stroke-zinc-900 dark:stroke-white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    {/* Decorative Band */}
                    <path
                        d="M6 14H18"
                        className="stroke-zinc-900 dark:stroke-white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />

                    {/* Stars/Sparkles */}
                    <motion.path
                        d="M19 5L19.5 6.5L21 7L19.5 7.5L19 9L18.5 7.5L17 7L18.5 6.5L19 5Z"
                        className="fill-yellow-400"
                        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <motion.path
                        d="M4 8L4.5 9.5L6 10L4.5 10.5L4 12L3.5 10.5L2 10L3.5 9.5L4 8Z"
                        className="fill-yellow-400"
                        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                </motion.g>
            </svg>

            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-center">
                <span className="text-lg font-handwriting font-bold text-zinc-500 dark:text-zinc-400 animate-pulse">
                    {disabled ? "Empty..." : "Tap to Draw!"}
                </span>
            </div>
        </motion.div>
    );
};
