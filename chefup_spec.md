# 🍳 ChefUp — MVP Product Specification

## 1. One-Line Summary
**ChefUp** is a playful, hat-based cooking assistant where users draw virtual question slips, answer simple yes/no mood prompts, and receive an AI-crafted meal + recipe tailored to their diet, mood, and constraints.

## 2. Problem & Solution

### Problem
Cooking at home is:
- cognitively demanding,
- time-consuming,
- hard to align with mood, diet, or time.

### Solution
Turn choosing a meal into a fun interactive experience using a virtual “hat” that generates yes/no questions and an AI-crafted recipe based on user preferences and session answers.

## 3. Core User Flow
### 3.1 Onboarding (`/`)
Collect:
- Diet
- Allergies
- Time preference
- Cooking level

Stored in Durable Object as `UserProfile`.

### 3.2 Hat Interaction (`/hat`)
- User draws animated slips from a virtual hat.
- Answers 3–6 yes/no questions.
- Answers saved in session Durable Object.

### 3.3 Meal Suggestion (`/meal`)
Workflow:
1. Fetch profile
2. Fetch answers
3. Call Llama 3.3 (Workers AI)
4. Return structured recipe JSON

Displayed with ingredients + steps.

## 4. Cloudflare Requirements Mapping
- **LLM**: Workers AI (Llama 3.3)
- **Workflow**: `chefup_generate_meal`
- **User Input**: hat UI with yes/no prompts
- **Memory**: Durable Objects (profiles, sessions, saved recipes)

## 5. Data Models
### UserProfile
```ts
type UserProfile = {
  userId: string;
  diet: string;
  allergies: string[];
  cookingLevel: string;
  timePreference: string;
  createdAt: string;
  updatedAt: string;
};
```

### SessionState
```ts
type SessionState = {
  sessionId: string;
  userId: string;
  answers: { questionKey: string; value: "yes" | "no" }[];
  createdAt: string;
  lastUpdated: string;
};
```

### MealSuggestion
```ts
type MealSuggestion = {
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
```

## 6. API Endpoints
- `POST /api/profile/upsert`
- `POST /api/session/start`
- `POST /api/session/answer`
- `POST /api/chefup/suggestMeal`

## 7. LLM Prompt (Summary)
Generate one meal + recipe JSON given:
- diet/allergies
- time preference
- cooking level
- hat answers

## 8. Frontend Structure
Pages:
```
/
/hat
/meal
```

Components:
```
Hat.tsx
SlipCard.tsx
MealCard.tsx
IngredientsList.tsx
StepsAccordion.tsx
```

Uses HeroUI + Framer Motion.

## 9. Stretch Features
- Voice input
- Pantry-based filtering
- Weekly meal rotation
