import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CombinationDisplay from '@/components/CombinationDisplay';

describe('CombinationDisplay 컴포넌트', () => {
  const mockCombination = '볶은 김치와(과) 초콜릿 아이스크림';

  it('컴포넌트가 올바르게 렌더링되어야 함', () => {
    render(<CombinationDisplay combination={mockCombination} />);

    // 제목이 올바르게 표시되는지 확인
    expect(screen.getByText('생성된 음식 조합')).toBeInTheDocument();

    // 음식 조합이 올바르게 표시되는지 확인
    expect(screen.getByText(mockCombination)).toBeInTheDocument();

    // 안내 텍스트가 올바르게 표시되는지 확인
    expect(
      screen.getByText('이 음식 조합은 어떤가요? 맛있을 것 같나요, 아니면 끔찍할 것 같나요?')
    ).toBeInTheDocument();
  });

  it('다른 조합으로 렌더링할 때 올바르게 업데이트되어야 함', () => {
    const { rerender } = render(<CombinationDisplay combination={mockCombination} />);

    // 초기 조합이 올바르게 표시되는지 확인
    expect(screen.getByText(mockCombination)).toBeInTheDocument();

    // 새로운 조합
    const newCombination = '그라탕한 커피와(과) 김밥 젤리';

    // 컴포넌트 다시 렌더링
    rerender(<CombinationDisplay combination={newCombination} />);

    // 새로운 조합이 올바르게 표시되는지 확인
    expect(screen.getByText(newCombination)).toBeInTheDocument();

    // 이전 조합이 더 이상 표시되지 않는지 확인
    expect(screen.queryByText(mockCombination)).not.toBeInTheDocument();
  });

  it('긴 조합 텍스트도 올바르게 표시되어야 함', () => {
    const longCombination =
      '수비드한 마파두부와(과) 아이스크림 샌드위치를 블렌딩한 후 캐러멜라이즈한 특별한 디저트';

    render(<CombinationDisplay combination={longCombination} />);

    // 긴 조합이 올바르게 표시되는지 확인
    expect(screen.getByText(longCombination)).toBeInTheDocument();
  });
});
