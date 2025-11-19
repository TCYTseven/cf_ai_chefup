"use client";

import { Chip } from "@heroui/chip";
import { IngredientsList } from "./IngredientsList";
import { StepsAccordion } from "./StepsAccordion";
import { MealSuggestion } from "@/context/ChefContext";
import { Clock, Flame, ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@heroui/button";

export const MealCard = ({ meal, onRestart }: { meal: MealSuggestion; onRestart: () => void }) => {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">

            {/* Header Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2 p-8 bg-white dark:bg-zinc-900 rounded-[2rem] border border-default-200 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <ChefHat size={120} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex gap-3 mb-4">
                            <Chip color="primary" variant="flat" className="uppercase font-bold">
                                {meal.difficulty}
                            </Chip>
                            <Chip startContent={<Clock size={14} />} variant="flat" color="secondary">
                                {meal.estimatedTimeMinutes} mins
                            </Chip>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-default-900">
                            {meal.title}
                        </h1>

                        <p className="text-xl text-default-500 leading-relaxed max-w-2xl">
                            {meal.summary}
                        </p>
                    </div>
                </div>

                <div className="p-8 bg-primary/10 dark:bg-primary/5 rounded-[2rem] border border-primary/20 flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-4 text-primary">Why this fits you</h3>
                    <div className="flex flex-col gap-3">
                        {meal.whyItFits.map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                                <p className="text-sm font-medium text-default-700">{reason}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8">

                {/* Ingredients Column (Left) */}
                <div className="lg:col-span-4">
                    <div className="sticky top-8">
                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-default-200 shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-3xl">🛒</span> Ingredients
                            </h2>
                            <IngredientsList ingredients={meal.ingredients} />
                        </div>

                        <Button
                            size="lg"
                            variant="flat"
                            color="danger"
                            className="w-full mt-6 font-bold py-8 rounded-2xl"
                            onPress={onRestart}
                            startContent={<ArrowRight className="rotate-180" />}
                        >
                            Cook Something Else
                        </Button>
                    </div>
                </div>

                {/* Instructions Column (Right) */}
                <div className="lg:col-span-8">
                    <div className="p-6 md:p-8 bg-default-50 dark:bg-zinc-800/50 rounded-[2rem] border border-default-200">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="text-3xl">👨‍🍳</span> Instructions
                        </h2>
                        <StepsAccordion steps={meal.steps} />
                    </div>
                </div>

            </div>
        </div>
    );
};
