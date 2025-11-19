"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { MealCard } from "@/components/MealCard";
import { useChef } from "@/context/ChefContext";
import { motion } from "framer-motion";

export default function MealPage() {
    const router = useRouter();
    const { mealSuggestion, startSession } = useChef();

    useEffect(() => {
        if (!mealSuggestion) {
            router.push("/");
        }
    }, [mealSuggestion, router]);

    if (!mealSuggestion) return null;

    const handleStartOver = () => {
        startSession();
        router.push("/hat");
    };

    return (
        <div className="flex flex-col items-center gap-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex justify-center"
            >
                <MealCard meal={mealSuggestion} />
            </motion.div>

            <Button
                color="primary"
                variant="ghost"
                size="lg"
                onPress={handleStartOver}
            >
                Cook Something Else
            </Button>
        </div>
    );
}
