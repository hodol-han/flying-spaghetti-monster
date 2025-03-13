import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SavedCombinations from '@/components/SavedCombinations';

describe('SavedCombinations 컴포넌트', () => {
  it('저장된 조합이 없을 때 안내 메시지를 표시해야 함', () => {
    render(<SavedCombinations combinations={[]} />);
    
    // 제목이 올바르게 표시되는지 확인
    expect(screen.getByText('저장된 음식 조합')).toBeInTheDocument();
    
    // 안내 메시지가 표시되는지 확인
    expect(screen.getByText('아직 저장된 음식 조합이 없습니다.')).toBeInTheDocument();
    expect(screen.getByText('음식 조합을 생성하고 평가해보세요!')).toBeInTheDocument();
  });

  it('저장된 조합이 있을 때 목록을 표시해야 함', () => {
    const mockCombinations = [
      { combination: '볶은 김치와(과) 초콜릿 아이스크림', rating: 4 },
      { combination: '그라탕한 커피와(과) 김밥 젤리', rating: 2 }
    ];
    
    render(<SavedCombinations combinations={mockCombinations} />);
    
    // 각 조합이 표시되는지 확인
    expect(screen.getByText('볶은 김치와(과) 초콜릿 아이스크림')).toBeInTheDocument();
    expect(screen.getByText('그라탕한 커피와(과) 김밥 젤리')).toBeInTheDocument();
    
    // 조합 번호가 표시되는지 확인
    expect(screen.getByText('조합 #1')).toBeInTheDocument();
    expect(screen.getByText('조합 #2')).toBeInTheDocument();
  });

  it('평점에 따라 올바른 이모지가 표시되어야 함', () => {
    const mockCombinations = [
      { combination: '조합 1', rating: 1 }, // 🤢
      { combination: '조합 2', rating: 2 }, // 😕
      { combination: '조합 3', rating: 3 }, // 😐
      { combination: '조합 4', rating: 4 }, // 😋
      { combination: '조합 5', rating: 5 }  // 🤩
    ];
    
    render(<SavedCombinations combinations={mockCombinations} />);
    
    // 각 평점에 맞는 이모지가 표시되는지 확인
    const emojis = screen.getAllByTitle(/평점: \d\/5/);
    expect(emojis).toHaveLength(5);
    
    expect(emojis[0]).toHaveTextContent('🤢');
    expect(emojis[1]).toHaveTextContent('😕');
    expect(emojis[2]).toHaveTextContent('😐');
    expect(emojis[3]).toHaveTextContent('😋');
    expect(emojis[4]).toHaveTextContent('🤩');
  });

  it('많은 수의 조합도 올바르게 표시되어야 함', () => {
    const mockCombinations = Array.from({ length: 10 }, (_, i) => ({
      combination: `테스트 조합 ${i + 1}`,
      rating: (i % 5) + 1
    }));
    
    render(<SavedCombinations combinations={mockCombinations} />);
    
    // 모든 조합이 표시되는지 확인
    mockCombinations.forEach((item, index) => {
      expect(screen.getByText(`테스트 조합 ${index + 1}`)).toBeInTheDocument();
      expect(screen.getByText(`조합 #${index + 1}`)).toBeInTheDocument();
    });
  });

  it('유효하지 않은 평점에 대해 물음표 이모지를 표시해야 함', () => {
    // 유효하지 않은 평점(0, 6)을 가진 조합 추가
    const mockCombinations = [
      { combination: '유효하지 않은 평점 0', rating: 0 },
      { combination: '유효하지 않은 평점 6', rating: 6 }
    ];
    
    render(<SavedCombinations combinations={mockCombinations} />);
    
    // 물음표 이모지가 표시되는지 확인
    const items = screen.getAllByText('❓');
    expect(items).toHaveLength(2);
    
    // 조합 텍스트가 올바르게 표시되는지 확인
    expect(screen.getByText('유효하지 않은 평점 0')).toBeInTheDocument();
    expect(screen.getByText('유효하지 않은 평점 6')).toBeInTheDocument();
  });
}); 