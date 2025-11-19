"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types from Spec
export type UserProfile = {
    userId: string;
    diet: string;
    allergies: string[];
    cookingLevel: string;
    timePreference: string;
    createdAt: string;
    updatedAt: string;
};

export type SessionState = {
    sessionId: string;
    userId: string;
    answers: { questionKey: string; value: "yes" | "no" }[];
    createdAt: string;
    lastUpdated: string;
};

export type MealSuggestion = {
    mealId: string;
    title: string;
    summary: string;
    whyItFits: string[];
    ingredients: string[];
    steps: string[];
    estimatedTimeMinutes: number;
    difficulty: string;
    createdAt: string;
};

interface ChefContextType {
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile) => void;
    sessionState: SessionState | null;
    setSessionState: (session: SessionState) => void;
    mealSuggestion: MealSuggestion | null;
    setMealSuggestion: (meal: MealSuggestion) => void;
    startSession: () => void;
    addAnswer: (questionKey: string, value: "yes" | "no") => void;
}

const ChefContext = createContext<ChefContextType | undefined>(undefined);

export const ChefProvider = ({ children }: { children: React.ReactNode }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [sessionState, setSessionState] = useState<SessionState | null>(null);
    const [mealSuggestion, setMealSuggestion] = useState<MealSuggestion | null>(null);

    // Load from local storage on mount
    useEffect(() => {
        const storedProfile = localStorage.getItem("chefup_profile");
        if (storedProfile) {
            setUserProfile(JSON.parse(storedProfile));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (userProfile) {
            localStorage.setItem("chefup_profile", JSON.stringify(userProfile));
        }
    }, [userProfile]);

    const startSession = () => {
        if (!userProfile) return;
        const newSession: SessionState = {
            sessionId: crypto.randomUUID(),
            userId: userProfile.userId,
            answers: [],
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
        };
        setSessionState(newSession);
    };

    const addAnswer = (questionKey: string, value: "yes" | "no") => {
        if (!sessionState) return;
        const updatedAnswers = [...sessionState.answers, { questionKey, value }];
        setSessionState({
            ...sessionState,
            answers: updatedAnswers,
            lastUpdated: new Date().toISOString(),
        });
    };

    return (
        <ChefContext.Provider
            value={{
                userProfile,
                setUserProfile,
                sessionState,
                setSessionState,
                mealSuggestion,
                setMealSuggestion,
                startSession,
                addAnswer,
            }}
        >
            {children}
        </ChefContext.Provider>
    );
};

export const useChef = () => {
    const context = useContext(ChefContext);
    if (context === undefined) {
        throw new Error("useChef must be used within a ChefProvider");
    }
    return context;
};
