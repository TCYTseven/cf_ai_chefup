import { NextResponse } from "next/server";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const cerebras = new Cerebras({
    apiKey: process.env.CEREBRAS_API_KEY,
});

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
      You are a professional chef AI. Generate a personalized meal recipe based on the following user constraints:
      
      User Profile:
      - Diet: ${userProfile.diet}
      - Allergies: ${userProfile.allergies.join(", ") || "None"}
      - Time Preference: ${userProfile.timePreference} minutes
      - Cooking Level: ${userProfile.cookingLevel}
      
      Session Preferences (User answered Yes/No to these tags):
      ${answers
                .map((a: any) => `- ${a.questionKey}: ${a.value}`)
                .join("\n")}
      
      Generate ONE single meal recipe in strict JSON format. Do not include any markdown formatting (like \`\`\`json). Just return the raw JSON object.
      
      The JSON must match this TypeScript interface:
      {
        "title": string,
        "summary": string (2 sentences max),
        "whyItFits": string[] (3 short bullet points explaining why this matches their mood/diet),
        "ingredients": string[] (list of ingredients with quantities),
        "steps": string[] (step by step cooking instructions),
        "estimatedTimeMinutes": number,
        "difficulty": string ("Easy", "Medium", or "Hard")
      }
    `;

        const completion = await cerebras.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b",
            max_completion_tokens: 2048,
            temperature: 0.7,
            top_p: 1,
            stream: false,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            throw new Error("No content received from LLM");
        }

        // Parse JSON safely
        let recipeData;
        try {
            recipeData = JSON.parse(content);
        } catch (e) {
            console.error("Failed to parse JSON:", content);
            return NextResponse.json({ error: "Failed to generate valid JSON" }, { status: 500 });
        }

        // Add generated fields
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
