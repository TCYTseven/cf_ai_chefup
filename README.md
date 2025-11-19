# ChefUp

ChefUp is a lightweight, AI-powered meal generator that helps users decide what to cook based on preferences, dietary restrictions, and mood. Instead of browsing endless recipe sites, users interact with a simple “Magic Hat” interface that guides them through a short series of yes/no prompts before generating a personalized recipe.

## Features
- Magic Hat flow for simple, playful meal selection
- AI-generated recipes using Cloudflare Workers AI (Llama 3.1)
- Clean modern UI built with HeroUI and Framer Motion
- Responsive bento-style layout for recipe details
- Personalized results based on diet, allergies, cooking time, and skill level

## Tech Stack
- Framework: Next.js 14 (App Router)
- UI Library: HeroUI
- Styling: Tailwind CSS
- Animations: Framer Motion
- AI Backend: Cloudflare Workers AI (REST API)
- Icons: Lucide React

## Getting Started

### Requirements
- Node.js 18+
- Cloudflare account with Workers AI enabled

### Installation & Setup
1. Install dependencies  
   cd frontend  
   npm install  

2. Create a .env file in frontend/ with:
   CEREBRAS_API_KEY=your_api_key_here
   WORKERS_ACCOUNT_ID=your_account_id_here  
   WORKERS_AI_KEY=your_api_token_here  

4. Start the dev server  
   npm run dev  

5. Visit  
   http://localhost:3000

## Usage
1. Complete onboarding and set dietary preferences.
2. Use the Magic Hat to draw slips and answer yes/no prompts.
3. Generate a personalized recipe.
4. View ingredients and steps in a clean UI layout.

## Project Structure
- app/ — Next.js pages (onboarding, hat, meal)
- components/ — UI components (Hat, MealCard, etc.)
- context/ — Global state management
- config/ — Static configuration (questions, settings)
- api/ — Backend routes for AI interaction

## Note
Some commits may appear under my alternate GitHub account: @hack_united.
