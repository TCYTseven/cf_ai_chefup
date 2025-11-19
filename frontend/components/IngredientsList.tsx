"use client";

import { Checkbox } from "@heroui/checkbox";

export const IngredientsList = ({ ingredients }: { ingredients: string[] }) => {
    return (
        <div className="flex flex-col gap-2">
            {ingredients.map((ingredient, idx) => (
                <Checkbox key={idx} value={ingredient} lineThrough>
                    {ingredient}
                </Checkbox>
            ))}
        </div>
    );
};
