"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Progress } from "@heroui/progress";
import { useRouter } from "next/navigation";
import { useChef } from "@/context/ChefContext";
import { ArrowRight, Check } from "lucide-react";

const STEPS = [
    {
        id: "diet",
        question: "Do you follow any specific diet?",
        options: [
            { label: "No Restrictions", value: "none" },
            { label: "Vegetarian", value: "vegetarian" },
            { label: "Vegan", value: "vegan" },
            { label: "Keto", value: "keto" },
            { label: "Paleo", value: "paleo" },
        ],
    },
    {
        id: "allergies",
        question: "Any allergies we should know about?",
        type: "input",
        placeholder: "e.g. Peanuts, Shellfish (Press Enter to skip)",
    },
    {
        id: "time",
        question: "How much time do you have to cook?",
        options: [
            { label: "Quick (15m)", value: "15" },
            { label: "Medium (30m)", value: "30" },
            { label: "Relaxed (1h)", value: "60" },
            { label: "Unlimited", value: "unlimited" },
        ],
    },
    {
        id: "level",
        question: "How would you rate your cooking skills?",
        options: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" },
        ],
    },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { setUserProfile, startSession } = useChef();

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [inputValue, setInputValue] = useState("");

    const step = STEPS[currentStep];
    const progress = ((currentStep + 1) / STEPS.length) * 100;

    const handleOptionSelect = (value: string) => {
        setAnswers((prev) => ({ ...prev, [step.id]: value }));
        nextStep();
    };

    const handleInputSubmit = () => {
        setAnswers((prev) => ({ ...prev, [step.id]: inputValue }));
        nextStep();
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
            setInputValue("");
        } else {
            finishOnboarding();
        }
    };

    const finishOnboarding = () => {
        // Construct profile
        const profile = {
            userId: crypto.randomUUID(),
            diet: answers.diet || "none",
            allergies: answers.allergies ? answers.allergies.split(",").map((s: string) => s.trim()) : [],
            timePreference: answers.time || "30",
            cookingLevel: answers.level || "beginner",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setUserProfile(profile);
        startSession();
        router.push("/hat");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="w-full max-w-2xl mb-8">
                <Progress value={progress} color="primary" size="sm" className="mb-2" />
                <p className="text-xs text-default-400 text-right">Step {currentStep + 1} of {STEPS.length}</p>
            </div>

            <div className="w-full max-w-2xl min-h-[400px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            {step.question}
                        </h1>

                        {step.type === "input" ? (
                            <div className="flex gap-2">
                                <Input
                                    size="lg"
                                    placeholder={step.placeholder}
                                    value={inputValue}
                                    onValueChange={setInputValue}
                                    onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
                                    classNames={{
                                        input: "text-2xl",
                                        inputWrapper: "h-16"
                                    }}
                                    autoFocus
                                />
                                <Button
                                    size="lg"
                                    color="primary"
                                    className="h-16 px-8"
                                    onPress={handleInputSubmit}
                                >
                                    <ArrowRight />
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {step.options?.map((option) => (
                                    <Button
                                        key={option.value}
                                        size="lg"
                                        variant="flat"
                                        className="h-20 text-xl justify-start px-6 border-2 border-transparent hover:border-primary"
                                        onPress={() => handleOptionSelect(option.value)}
                                    >
                                        <span className="mr-2 text-primary">•</span> {option.label}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
