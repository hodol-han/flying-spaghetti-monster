# 랜덤 음식 조합 생성기 테스트 문서

이 문서는 랜덤 음식 조합 생성기 프로젝트의 테스트 방법과 구조에 대해 설명합니다.

## 테스트 구조

프로젝트의 테스트는 다음과 같은 구조로 구성되어 있습니다:

```
src/
├── types/                      # 타입 선언 파일
│   └── jest-dom.d.ts           # jest-dom 타입 선언
└── __tests__/
    ├── components/             # 컴포넌트 단위 테스트
    │   ├── FoodCombinationGenerator.test.tsx
    │   ├── CombinationDisplay.test.tsx
    │   ├── RatingSystem.test.tsx
    │   └── SavedCombinations.test.tsx
    └── integration/            # 통합 테스트
        └── FoodCombinationFlow.test.tsx
```

## 테스트 실행 방법

### 모든 테스트 실행 (간소화된 출력)

```bash
npm test
# 또는
yarn test
```

### 상세 출력으로 테스트 실행

```bash
npm run test:verbose
# 또는
yarn test:verbose
```

### 감시 모드로 테스트 실행 (개발 중 유용)

```bash
npm run test:watch
# 또는
yarn test:watch
```

### 테스트 커버리지 보고서 생성

```bash
npm run test:coverage
# 또는
yarn test:coverage
```

커버리지 보고서는 `coverage/` 디렉토리에 생성됩니다.

## 테스트 종류

### 컴포넌트 단위 테스트

각 컴포넌트의 기능을 독립적으로 테스트합니다:

- **FoodCombinationGenerator**: 음식 조합 생성 기능 테스트
- **CombinationDisplay**: 생성된 조합 표시 기능 테스트
- **RatingSystem**: 평가 시스템 기능 테스트
- **SavedCombinations**: 저장된 조합 목록 표시 기능 테스트

### 통합 테스트

여러 컴포넌트가 함께 작동하는 흐름을 테스트합니다:

- **FoodCombinationFlow**: 조합 생성부터 평가, 저장까지의 전체 흐름 테스트

## 테스트 도구

- **Jest**: JavaScript 테스트 프레임워크
- **React Testing Library**: React 컴포넌트 테스트 라이브러리
- **jest-dom**: DOM 노드에 대한 assertion 확장

## 모의(Mock) 설정

- **타이머**: `setTimeout`과 같은 타이머 함수는 각 테스트에서 필요에 따라 Jest의 가짜 타이머로 대체됩니다.
- **ResizeObserver**: 브라우저 API인 ResizeObserver는 모의 구현으로 대체됩니다.

## 테스트 작성 가이드라인

1. 각 테스트는 독립적이어야 합니다.
2. 테스트 설명은 명확하고 구체적이어야 합니다.
3. 각 테스트는 하나의 동작만 테스트해야 합니다.
4. 테스트 코드는 실제 사용자 경험을 반영해야 합니다.
5. 모든 주요 기능에 대한 테스트 케이스가 있어야 합니다.
6. 각 테스트 파일에는 `@testing-library/jest-dom`을 import하여 DOM 관련 assertion을 사용할 수 있도록 합니다.

## 문제 해결

### 타입 오류

테스트 파일에서 `toBeInTheDocument()`와 같은 jest-dom matcher에 대한 타입 오류가 발생하는 경우:

1. 테스트 파일 상단에 `import '@testing-library/jest-dom';`를 추가했는지 확인합니다.
2. `tsconfig.json`에 `"types": ["jest", "@testing-library/jest-dom"]`가 포함되어 있는지 확인합니다.
3. `src/types/jest-dom.d.ts` 파일이 존재하는지 확인합니다. 