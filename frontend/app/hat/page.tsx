"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { SlipCard } from "@/components/SlipCard";
import { useChef } from "@/context/ChefContext";
import { QUESTIONS } from "@/config/questions";

// Dynamically import Scene3D to avoid SSR issues with Three.js
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function HatPage() {
    const router = useRouter();
    const { sessionState, addAnswer, setMealSuggestion } = useChef();

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

    const generateMeal = () => {
        setIsGenerating(true);

        // Mock API call / Generation
        setTimeout(() => {
            // Mock Meal Data
            const mockMeal = {
                mealId: crypto.randomUUID(),
                title: "Spicy Basil Chicken Stir-Fry",
                summary: "A quick, aromatic stir-fry that hits the spot with fresh basil and a kick of chili.",
                whyItFits: [
                    "Matches your 'Spicy' preference",
                    "Ready in under 30 minutes",
                    "High protein for your diet"
                ],
                ingredients: [
                    "2 Chicken Breasts, sliced",
                    "1 cup Fresh Basil Leaves",
                    "2 cloves Garlic, minced",
                    "1 Red Chili, sliced",
                    "2 tbsp Soy Sauce",
                    "1 tbsp Oyster Sauce",
                    "1 tsp Sugar",
                    "1 tbsp Vegetable Oil",
                    "Jasmine Rice (for serving)"
                ],
                steps: [
                    "Heat oil in a wok or large pan over high heat.",
                    "Add garlic and chili, stir-fry for 30 seconds until fragrant.",
                    "Add chicken slices and stir-fry until cooked through (about 3-4 mins).",
                    "Add soy sauce, oyster sauce, and sugar. Toss to coat.",
                    "Remove from heat and immediately stir in basil leaves until wilted.",
                    "Serve hot over jasmine rice."
                ],
                estimatedTimeMinutes: 20,
                difficulty: "Easy",
                createdAt: new Date().toISOString(),
            };

            setMealSuggestion(mockMeal);
            router.push("/meal");
        }, 2000);
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
            <div className="text-center mb-4 z-10 pointer-events-none">
                <h1 className="text-4xl font-bold mb-2">The Magic Hat</h1>
                <p className="text-default-500">Click the hat to draw a slip!</p>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-[500px]">
                <div className="w-full h-[400px] relative">
                    <Scene3D onShake={handleDraw} />

                    <AnimatePresence>
                        {showSlip && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                                animate={{ opacity: 1, y: -100, scale: 1 }}
                                exit={{ opacity: 0, y: -200, scale: 0.5 }}
                            >
                                <SlipCard
                                    question={questionsToAsk[currentQuestionIndex].text}
                                    onAnswer={handleAnswer}
                                />
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
