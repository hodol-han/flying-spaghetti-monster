// Localized food item
export interface LocalizedItem {
  en: string;
  ko: string;
}

// Food items by category
export interface FoodItems {
  [category: string]: LocalizedItem[];
}

// Cooking methods
export type CookingMethods = LocalizedItem[];

// Food forms
export type FoodForms = LocalizedItem[];
