'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

// Import data types
import type { FoodItems, CookingMethods, FoodForms, LocalizedItem } from '@/types/food';

interface FoodCombinationGeneratorProps {
  onGenerate: (combination: string) => void;
}

export default function FoodCombinationGenerator({ onGenerate }: FoodCombinationGeneratorProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [isGenerating, setIsGenerating] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItems>({});
  const [cookingMethods, setCookingMethods] = useState<CookingMethods>([]);
  const [forms, setForms] = useState<FoodForms>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from JSON files
  useEffect(() => {
    const loadData = async () => {
      try {
        const [foodItemsData, cookingMethodsData, foodFormsData] = await Promise.all([
          import('@/data/foodItems.json').then(module => module.default),
          import('@/data/cookingMethods.json').then(module => module.default),
          import('@/data/foodForms.json').then(module => module.default),
        ]);

        setFoodItems(foodItemsData);
        setCookingMethods(cookingMethodsData);
        setForms(foodFormsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading food data:', error);
      }
    };

    loadData();
  }, []);

  // Get localized text based on current locale
  const getLocalizedText = (item: LocalizedItem): string => {
    return locale === 'ko' ? item.ko : item.en;
  };

  const generateRandomCombination = () => {
    if (isLoading) return;

    setIsGenerating(true);

    // Select random categories
    const categories = Object.keys(foodItems);
    const randomCategory1 = categories[Math.floor(Math.random() * categories.length)];
    const randomCategory2 = categories[Math.floor(Math.random() * categories.length)];

    // Get localized category names
    const category1 = t(`foodCategories.${randomCategory1}`);
    const category2 = t(`foodCategories.${randomCategory2}`);

    // Select random food items
    const randomFoodItem1 =
      foodItems[randomCategory1 as keyof typeof foodItems][
        Math.floor(Math.random() * foodItems[randomCategory1 as keyof typeof foodItems].length)
      ];
    const randomFoodItem2 =
      foodItems[randomCategory2 as keyof typeof foodItems][
        Math.floor(Math.random() * foodItems[randomCategory2 as keyof typeof foodItems].length)
      ];

    // Get localized food names
    const randomFood1 = getLocalizedText(randomFoodItem1);
    const randomFood2 = getLocalizedText(randomFoodItem2);

    // Select random cooking method
    const randomMethodItem = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];
    const randomMethod = getLocalizedText(randomMethodItem);

    // Select random form
    const randomFormItem = forms[Math.floor(Math.random() * forms.length)];
    const randomForm = getLocalizedText(randomFormItem);

    // Generate combination using template from translation file
    const combination = t('generator.combinationTemplate', {
      method: randomMethod,
      food1: randomFood1,
      food2: randomFood2,
      form: randomForm,
    });

    // Deliver result after a slight delay (for generation effect)
    setTimeout(() => {
      onGenerate(combination);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="bg-light p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-dark mb-4">{t('generator.title')}</h2>
      <p className="mb-4 text-gray-700">{t('generator.description')}</p>

      <button
        onClick={generateRandomCombination}
        disabled={isGenerating || isLoading}
        className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all ${
          isGenerating || isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-opacity-80'
        }`}
      >
        {isLoading
          ? t('generator.loading')
          : isGenerating
            ? t('generator.generating')
            : t('generator.button')}
      </button>
    </div>
  );
}
