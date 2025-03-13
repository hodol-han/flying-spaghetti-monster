'use client';

import { useState } from 'react';

// 음식 카테고리별 아이템 목록
const foodItems = {
  한식: [
    '김치',
    '불고기',
    '비빔밥',
    '떡볶이',
    '김밥',
    '된장찌개',
    '삼겹살',
    '냉면',
    '순두부찌개',
    '갈비탕',
  ],
  양식: [
    '피자',
    '파스타',
    '햄버거',
    '스테이크',
    '샐러드',
    '샌드위치',
    '오믈렛',
    '리조또',
    '타코',
    '핫도그',
  ],
  중식: [
    '짜장면',
    '짬뽕',
    '탕수육',
    '마파두부',
    '양장피',
    '깐풍기',
    '볶음밥',
    '딤섬',
    '마라탕',
    '훠궈',
  ],
  일식: [
    '초밥',
    '라멘',
    '우동',
    '돈카츠',
    '오니기리',
    '덴푸라',
    '오코노미야키',
    '타코야키',
    '규동',
    '나베',
  ],
  디저트: [
    '아이스크림',
    '케이크',
    '쿠키',
    '마카롱',
    '푸딩',
    '초콜릿',
    '젤리',
    '도넛',
    '타르트',
    '크레페',
  ],
  음료: ['커피', '차', '주스', '스무디', '소다', '맥주', '와인', '칵테일', '우유', '요구르트'],
  조미료: [
    '소금',
    '설탕',
    '후추',
    '간장',
    '고추장',
    '마요네즈',
    '케첩',
    '겨자',
    '식초',
    '올리브오일',
  ],
  과일: ['사과', '바나나', '딸기', '포도', '오렌지', '키위', '망고', '파인애플', '수박', '복숭아'],
};

// 조리 방법 목록
const cookingMethods = [
  '볶은',
  '구운',
  '삶은',
  '튀긴',
  '찐',
  '생',
  '절인',
  '훈제한',
  '말린',
  '발효시킨',
  '그라탕한',
  '수비드한',
  '블렌딩한',
  '숙성시킨',
  '캐러멜라이즈한',
];

// 형태 목록
const forms = [
  '소스',
  '스프',
  '샐러드',
  '퓨레',
  '무스',
  '젤리',
  '크림',
  '파우더',
  '칩',
  '롤',
  '케이크',
  '빵',
  '피자',
  '파스타',
  '샌드위치',
  '타코',
  '버거',
  '볼',
  '스틱',
  '아이스크림',
];

interface FoodCombinationGeneratorProps {
  onGenerate: (combination: string) => void;
}

export default function FoodCombinationGenerator({ onGenerate }: FoodCombinationGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomCombination = () => {
    setIsGenerating(true);

    // 랜덤 카테고리 선택
    const categories = Object.keys(foodItems);
    const randomCategory1 = categories[Math.floor(Math.random() * categories.length)];
    const randomCategory2 = categories[Math.floor(Math.random() * categories.length)];

    // 랜덤 음식 아이템 선택
    const randomFood1 =
      foodItems[randomCategory1 as keyof typeof foodItems][
        Math.floor(Math.random() * foodItems[randomCategory1 as keyof typeof foodItems].length)
      ];
    const randomFood2 =
      foodItems[randomCategory2 as keyof typeof foodItems][
        Math.floor(Math.random() * foodItems[randomCategory2 as keyof typeof foodItems].length)
      ];

    // 랜덤 조리 방법 선택
    const randomMethod = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];

    // 랜덤 형태 선택
    const randomForm = forms[Math.floor(Math.random() * forms.length)];

    // 조합 생성
    const combination = `${randomMethod} ${randomFood1}와(과) ${randomFood2} ${randomForm}`;

    // 약간의 딜레이 후 결과 전달 (생성 효과를 위해)
    setTimeout(() => {
      onGenerate(combination);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="bg-light p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-dark mb-4">음식 조합 생성기</h2>
      <p className="mb-4 text-gray-700">버튼을 클릭하여 상상도 못한 음식 조합을 생성해보세요!</p>

      <button
        onClick={generateRandomCombination}
        disabled={isGenerating}
        className={`w-full py-3 px-6 rounded-lg text-white font-bold transition-all ${
          isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-80'
        }`}
      >
        {isGenerating ? '생성 중...' : '랜덤 조합 생성하기'}
      </button>
    </div>
  );
}
