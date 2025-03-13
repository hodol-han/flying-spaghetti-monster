import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodCombinationGenerator from '@/components/FoodCombinationGenerator';

// 모의 함수 생성
const mockOnGenerate = jest.fn();

describe('FoodCombinationGenerator 컴포넌트', () => {
  beforeEach(() => {
    // 각 테스트 전에 모의 함수 초기화
    mockOnGenerate.mockClear();
  });

  it('컴포넌트가 올바르게 렌더링되어야 함', () => {
    render(<FoodCombinationGenerator onGenerate={mockOnGenerate} />);
    
    // 제목이 올바르게 표시되는지 확인
    expect(screen.getByText('음식 조합 생성기')).toBeInTheDocument();
    
    // 설명 텍스트가 올바르게 표시되는지 확인
    expect(screen.getByText('버튼을 클릭하여 상상도 못한 음식 조합을 생성해보세요!')).toBeInTheDocument();
    
    // 버튼이 올바르게 표시되는지 확인
    expect(screen.getByText('랜덤 조합 생성하기')).toBeInTheDocument();
  });

  it('버튼 클릭 시 생성 중 상태로 변경되어야 함', () => {
    render(<FoodCombinationGenerator onGenerate={mockOnGenerate} />);
    
    // 버튼 클릭
    fireEvent.click(screen.getByText('랜덤 조합 생성하기'));
    
    // 버튼 텍스트가 '생성 중...'으로 변경되었는지 확인
    expect(screen.getByText('생성 중...')).toBeInTheDocument();
  });

  it('버튼 클릭 후 onGenerate 콜백이 호출되어야 함', async () => {
    // Jest의 타이머 모의 설정
    jest.useFakeTimers();
    
    render(<FoodCombinationGenerator onGenerate={mockOnGenerate} />);
    
    // 버튼 클릭
    fireEvent.click(screen.getByText('랜덤 조합 생성하기'));
    
    // 타이머 진행
    jest.advanceTimersByTime(800);
    
    // onGenerate가 호출되었는지 확인
    await waitFor(() => {
      expect(mockOnGenerate).toHaveBeenCalledTimes(1);
    });
    
    // 문자열 형태의 조합이 전달되었는지 확인
    expect(mockOnGenerate).toHaveBeenCalledWith(expect.any(String));
    
    // 실제 타이머로 복원
    jest.useRealTimers();
  });

  it('생성된 조합이 예상 형식을 따라야 함', async () => {
    // Jest의 타이머 모의 설정
    jest.useFakeTimers();
    
    render(<FoodCombinationGenerator onGenerate={mockOnGenerate} />);
    
    // 버튼 클릭
    fireEvent.click(screen.getByText('랜덤 조합 생성하기'));
    
    // 타이머 진행
    jest.advanceTimersByTime(800);
    
    // onGenerate가 호출되었는지 확인
    await waitFor(() => {
      expect(mockOnGenerate).toHaveBeenCalledTimes(1);
    });
    
    // 호출 인자 가져오기
    const generatedCombination = mockOnGenerate.mock.calls[0][0];
    
    // 조합이 예상 형식을 따르는지 확인 (조리방법 + 음식1 + '와(과)' + 음식2 + 형태)
    expect(generatedCombination).toMatch(/^.+ .+와\(과\) .+ .+$/);
    
    // 실제 타이머로 복원
    jest.useRealTimers();
  });
}); 