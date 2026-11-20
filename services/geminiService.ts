import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Recipe, Analysis, UserPreferences } from "../types";

const resolveApiKey = (apiKey?: string): string => {
    const key =
        (apiKey && apiKey.trim()) ||
        import.meta.env.VITE_GEMINI_API_KEY ||
        (typeof process !== "undefined" ? process.env?.GEMINI_API_KEY : "") ||
        "";

    if (!key) {
        throw new Error("API Key is missing.");
    }
    return key;
};

const getSystemInstructionForRecipes = (preferences: UserPreferences) => {
    let instruction =
        "You are a helpful culinary assistant named ReceitIA. Respond strictly in Brazilian Portuguese (Português-BR). Your goal is to identify ingredients from an image of a fridge or pantry and create three distinct recipes: one 'Express' (quick and easy), one 'Balanceada' (nutritionally balanced), and one 'Performance' (high in protein). You must respond in JSON format according to the provided schema.";

    if (preferences.vegetarian) instruction += " All recipes must be vegetarian.";
    if (preferences.lowSodium) instruction += " All recipes must be low in sodium.";
    if (preferences.highProtein)
        instruction +=
            " The 'Performance' recipe should be particularly high in protein, but all recipes should prioritize protein where possible.";

    return instruction;
};

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "Creative and appealing name for the recipe in Portuguese." },
        category: { type: Type.STRING, enum: ["Express", "Balanceada", "Performance"] },
        difficulty: { type: Type.STRING, enum: ["Fácil", "Médio", "Difícil"] },
        prepTime: { type: Type.INTEGER, description: "Total preparation and cooking time in minutes." },
        servings: { type: Type.INTEGER, description: "Number of portions this recipe makes." },
        healthScore: { type: Type.INTEGER, description: "A score from 0 to 100 indicating how healthy the recipe is." },
        nutrients: {
            type: Type.OBJECT,
            properties: {
                kcal: { type: Type.INTEGER, description: "Total calories." },
                protein: { type: Type.INTEGER, description: "Protein in grams." },
                carbs: { type: Type.INTEGER, description: "Carbohydrates in grams." },
                fat: { type: Type.INTEGER, description: "Fat in grams." },
            },
            required: ["kcal", "protein", "carbs", "fat"],
        },
        ingredients: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Name of the ingredient in Portuguese." },
                    quantity: { type: Type.STRING, description: "Quantity and unit (e.g., '2 unidades', '100g')." },
                },
                required: ["name", "quantity"],
            },
        },
        steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING, description: "A single, clear step for preparation in Portuguese." },
        },
        substitutions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    original: { type: Type.STRING, description: "The ingredient to be replaced." },
                    substitute: { type: Type.STRING, description: "A suitable substitute for the ingredient." },
                },
            },
        },
        allergens: {
            type: Type.ARRAY,
            items: { type: Type.STRING, description: "Common allergens present in the recipe (e.g., 'Ovos', 'Leite', 'Glúten')." },
        },
    },
    required: ["name", "category", "difficulty", "prepTime", "servings", "healthScore", "nutrients", "ingredients", "steps"],
};

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "A descriptive name for the dish in Portuguese, like 'Prato Executivo' or 'Salada de Frango'." },
        healthScore: { type: Type.INTEGER, description: "A score from 0-100 based on nutritional balance and food processing level." },
        nutrients: {
            type: Type.OBJECT,
            properties: {
                kcal: { type: Type.INTEGER, description: "Estimated total calories." },
                protein: { type: Type.INTEGER, description: "Estimated protein in grams." },
                carbs: { type: Type.INTEGER, description: "Estimated carbohydrates in grams." },
                fat: { type: Type.INTEGER, description: "Estimated fat in grams." },
            },
            required: ["kcal", "protein", "carbs", "fat"],
        },
        processingLevel: { type: Type.STRING, description: "The estimated food processing level in Portuguese (e.g., 'Minimamente processado', 'Processado', 'Ultraprocessado')." },
    },
    required: ["name", "healthScore", "nutrients", "processingLevel"],
};

export const generateRecipesFromImage = async (
    apiKey: string,
    base64Image: string,
    mimeType: string,
    preferences: UserPreferences
): Promise<Recipe[]> => {
    const finalKey = resolveApiKey(apiKey);
    const ai = new GoogleGenAI({ apiKey: finalKey });

    const imagePart = { inlineData: { data: base64Image, mimeType } };
    const textPart = { text: "Based on the ingredients visible, generate three recipes in Brazilian Portuguese as per my system instructions." };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [imagePart, textPart] },
        config: {
            systemInstruction: getSystemInstructionForRecipes(preferences),
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: recipeSchema,
            },
        },
    });

    const jsonString = (response.text || "[]").trim();
    const generatedRecipes = JSON.parse(jsonString) as Omit<Recipe, "id">[];

    return generatedRecipes.map((recipe) => ({ ...recipe, id: crypto.randomUUID() }));
};

export const analyzeDishFromImage = async (
    apiKey: string,
    base64Image: string,
    mimeType: string
): Promise<Omit<Analysis, "id" | "date" | "imageUrl">> => {
    const finalKey = resolveApiKey(apiKey);
    const ai = new GoogleGenAI({ apiKey: finalKey });

    const imagePart = { inlineData: { data: base64Image, mimeType } };
    const textPart = { text: "Analyze the meal in this image and provide a nutritional breakdown in Brazilian Portuguese." };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [imagePart, textPart] },
        config: {
            systemInstruction:
                "You are a nutritional expert named ReceitIA. Respond strictly in Brazilian Portuguese (Português-BR). Analyze the provided image of a meal. Estimate its ingredients, calculate the macronutrients (protein, carbs, fat), total calories, and assign a 'Health Score' from 0-100 based on its nutritional balance and processing level. Also, describe the processing level (e.g., 'Minimamente processado', 'Processado'). Respond in JSON format according to the provided schema.",
            responseMimeType: "application/json",
            responseSchema: analysisSchema,
        },
    });

    const jsonString = (response.text || "{}").trim();
    return JSON.parse(jsonString) as Omit<Analysis, "id" | "date" | "imageUrl">;
};
