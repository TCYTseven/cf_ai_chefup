"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Hat } from "@/components/Hat";
import { SlipCard } from "@/components/SlipCard";
import { useChef } from "@/context/ChefContext";
import { QUESTIONS } from "@/config/questions";

export default function HatPage() {
    const router = useRouter();
    const { userProfile, sessionState, addAnswer, setMealSuggestion } = useChef();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showSlip, setShowSlip] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Shuffle questions on mount or just pick the first few
    const [questionsToAsk] = useState(() => {
        // Simple shuffle
        return [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 4);
    });

    const handleDraw = () => {
        if (showSlip) return;
        setShowSlip(true);
    };

    const handleAnswer = (answer: "yes" | "no") => {
        const question = questionsToAsk[currentQuestionIndex];
        addAnswer(question.key, answer);

        setShowSlip(false);

        if (currentQuestionIndex < questionsToAsk.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
            }, 500); // Wait for exit animation
        } else {
            // Finished questions
            generateMeal();
        }
    };

    const generateMeal = async () => {
        setIsGenerating(true);

        try {
            const response = await fetch("/api/generate-meal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userProfile,
                    answers: sessionState?.answers || []
                })
            });

            if (!response.ok) throw new Error("Failed to generate");

            const data = await response.json();
            setMealSuggestion(data);
            router.push("/meal");
        } catch (error) {
            console.error("Generation failed:", error);
            setIsGenerating(false);
            alert("Something went wrong while cooking up your recipe. Please try again.");
        }
    };

    if (isGenerating) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[80vh]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-4"
                >
                    🍳
                </motion.div>
                <h2 className="text-2xl font-bold animate-pulse">ChefUp is cooking up an idea...</h2>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[80vh] relative overflow-hidden">
            <div className="text-center mb-8 z-10 pointer-events-none">
                <h1 className="text-4xl font-bold mb-2">The Magic Hat</h1>
                <p className="text-default-500">Click the hat to draw a slip!</p>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-[500px]">
                <div className="w-full h-[400px] flex items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        {showSlip ? (
                            <motion.div
                                key="slip"
                                className="z-20"
                                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -50, scale: 0.5 }}
                            >
                                <SlipCard
                                    question={questionsToAsk[currentQuestionIndex].text}
                                    onAnswer={handleAnswer}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="hat"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                            >
                                <Hat onClick={handleDraw} disabled={false} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-200 via-transparent to-transparent dark:from-orange-900" />
        </div>
    );
}
