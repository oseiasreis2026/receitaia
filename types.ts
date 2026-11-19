
export type Page = 'home' | 'recipes' | 'analysis' | 'profile';

export interface NutrientInfo {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type RecipeCategory = 'Express' | 'Balanceada' | 'Performance';
export type RecipeDifficulty = 'Fácil' | 'Médio' | 'Difícil';

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Substitution {
    original: string;
    substitute: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  prepTime: number; // in minutes
  servings: number;
  healthScore: number;
  nutrients: NutrientInfo;
  ingredients: Ingredient[];
  steps: string[];
  substitutions: Substitution[];
  allergens: string[];
}

export interface Analysis {
  id: string;
  name: string;
  date: string;
  imageUrl: string;
  healthScore: number;
  nutrients: NutrientInfo;
  processingLevel: string;
}

export interface UserPreferences {
  vegetarian: boolean;
  lowSodium: boolean;
  highProtein: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  profileImage: string; // base64 string
}
