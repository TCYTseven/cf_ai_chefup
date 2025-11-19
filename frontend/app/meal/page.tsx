"use client";

import { Button } from "@heroui/button";
import { useChef } from "@/context/ChefContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MealCard } from "@/components/MealCard";

export default function MealPage() {
    const { mealSuggestion, startSession } = useChef();
    const router = useRouter();

    useEffect(() => {
        if (!mealSuggestion) {
            router.push("/");
        }
    }, [mealSuggestion, router]);

    if (!mealSuggestion) return null;

    const handleRestart = () => {
        startSession();
        router.push("/hat");
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <MealCard meal={mealSuggestion} onRestart={handleRestart} />
        </div>
    );
}
