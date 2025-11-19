import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userProfile, answers } = body;

        if (!userProfile || !answers) {
            return NextResponse.json(
                { error: "Missing profile or answers" },
                { status: 400 }
            );
        }

        const prompt = `
      You are a world-class chef designing a modern, trendy menu item.
      
      User Profile:
      - Diet: ${userProfile.diet}
      - Allergies: ${userProfile.allergies.join(", ") || "None"}
      - Time: ${userProfile.timePreference} minutes
      - Skill: ${userProfile.cookingLevel}
      
      Preferences:
      ${answers.map((a: any) => `- ${a.questionKey}: ${a.value}`).join("\n")}
      
      Create a unique, mouth-watering meal.
      Return ONLY valid JSON matching this structure:
      {
        "title": "Creative Dish Name",
        "summary": "A short, appetizing description (max 2 sentences).",
        "whyItFits": ["Reason 1", "Reason 2", "Reason 3"],
        "ingredients": ["Qty Item", "Qty Item"],
        "steps": ["Step 1", "Step 2"],
        "estimatedTimeMinutes": 30,
        "difficulty": "Medium",
        "calories": 500
      }
    `;

        const accountId = process.env.WORKERS_ACCOUNT_ID;
        const apiToken = process.env.WOERKERS_AI_KEY; // User provided this var name

        // Using Llama 3.1 8B Instruct
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: "You are a helpful assistant that outputs only JSON." },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 2048,
                }),
            }
        );

        if (!response.ok) {
            const err = await response.text();
            console.error("Cloudflare AI Error:", err);
            throw new Error("Failed to fetch from Cloudflare AI");
        }

        const result = await response.json();

        // Cloudflare AI response structure
        const content = result.result?.response;

        if (!content) {
            throw new Error("No content received from LLM");
        }

        // Attempt to parse JSON (sometimes LLMs add markdown blocks)
        const jsonString = content.replace(/```json\n?|```/g, "").trim();
        let recipeData;
        try {
            recipeData = JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse JSON:", jsonString);
            return NextResponse.json({ error: "Failed to generate valid JSON" }, { status: 500 });
        }

        const finalResponse = {
            mealId: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...recipeData
        };

        return NextResponse.json(finalResponse);

    } catch (error) {
        console.error("Error generating meal:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
