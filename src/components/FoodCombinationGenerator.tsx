'use client';

import { useState } from 'react';

// Food items by category
const foodItems = {
  Korean: [
    'Kimchi',
    'Bulgogi',
    'Bibimbap',
    'Tteokbokki',
    'Kimbap',
    'Doenjang Jjigae',
    'Samgyeopsal',
    'Naengmyeon',
    'Sundubu Jjigae',
    'Galbitang',
  ],
  Western: [
    'Pizza',
    'Pasta',
    'Hamburger',
    'Steak',
    'Salad',
    'Sandwich',
    'Omelette',
    'Risotto',
    'Taco',
    'Hot Dog',
  ],
  Chinese: [
    'Jajangmyeon',
    'Jjamppong',
    'Sweet and Sour Pork',
    'Mapo Tofu',
    'Yangjangpi',
    'Ganpoongi',
    'Fried Rice',
    'Dim Sum',
    'Malatang',
    'Hot Pot',
  ],
  Japanese: [
    'Sushi',
    'Ramen',
    'Udon',
    'Tonkatsu',
    'Onigiri',
    'Tempura',
    'Okonomiyaki',
    'Takoyaki',
    'Gyudon',
    'Nabe',
  ],
  Dessert: [
    'Ice Cream',
    'Cake',
    'Cookie',
    'Macaron',
    'Pudding',
    'Chocolate',
    'Jelly',
    'Donut',
    'Tart',
    'Crepe',
  ],
  Beverage: [
    'Coffee',
    'Tea',
    'Juice',
    'Smoothie',
    'Soda',
    'Beer',
    'Wine',
    'Cocktail',
    'Milk',
    'Yogurt',
  ],
  Condiment: [
    'Salt',
    'Sugar',
    'Pepper',
    'Soy Sauce',
    'Gochujang',
    'Mayonnaise',
    'Ketchup',
    'Mustard',
    'Vinegar',
    'Olive Oil',
  ],
  Fruit: [
    'Apple',
    'Banana',
    'Strawberry',
    'Grape',
    'Orange',
    'Kiwi',
    'Mango',
    'Pineapple',
    'Watermelon',
    'Peach',
  ],
};

// Cooking methods
const cookingMethods = [
  'Stir-fried',
  'Grilled',
  'Boiled',
  'Fried',
  'Steamed',
  'Raw',
  'Pickled',
  'Smoked',
  'Dried',
  'Fermented',
  'Gratinated',
  'Sous-vide',
  'Blended',
  'Aged',
  'Caramelized',
];

// Food forms
const forms = [
  'Sauce',
  'Soup',
  'Salad',
  'Puree',
  'Mousse',
  'Jelly',
  'Cream',
  'Powder',
  'Chips',
  'Roll',
  'Cake',
  'Bread',
  'Pizza',
  'Pasta',
  'Sandwich',
  'Taco',
  'Burger',
  'Balls',
  'Sticks',
  'Ice Cream',
];

interface FoodCombinationGeneratorProps {
  onGenerate: (combination: string) => void;
}

export default function FoodCombinationGenerator({ onGenerate }: FoodCombinationGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomCombination = () => {
    setIsGenerating(true);

    // Select random categories
    const categories = Object.keys(foodItems);
    const randomCategory1 = categories[Math.floor(Math.random() * categories.length)];
    const randomCategory2 = categories[Math.floor(Math.random() * categories.length)];

    // Select random food items
    const randomFood1 =
      foodItems[randomCategory1 as keyof typeof foodItems][
        Math.floor(Math.random() * foodItems[randomCategory1 as keyof typeof foodItems].length)
      ];
    const randomFood2 =
      foodItems[randomCategory2 as keyof typeof foodItems][
        Math.floor(Math.random() * foodItems[randomCategory2 as keyof typeof foodItems].length)
      ];

    // Select random cooking method
    const randomMethod = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];

    // Select random form
    const randomForm = forms[Math.floor(Math.random() * forms.length)];

    // Generate combination
    const combination = `${randomMethod} ${randomFood1} and ${randomFood2} ${randomForm}`;

    // Deliver result after a slight delay (for generation effect)
    setTimeout(() => {
      onGenerate(combination);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="bg-light p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-dark mb-4">Food Combination Generator</h2>
      <p className="mb-4 text-gray-700">
        Click the button to generate an unexpected food combination!
      </p>

      <button
        onClick={generateRandomCombination}
        disabled={isGenerating}
        className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all ${
          isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-80'
        }`}
      >
        {isGenerating ? 'Generating...' : 'Generate Random Combination'}
      </button>
    </div>
  );
}
