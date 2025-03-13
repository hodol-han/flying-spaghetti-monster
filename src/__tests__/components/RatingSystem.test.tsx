import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RatingSystem from '@/components/RatingSystem';

// 모의 함수 생성
const mockOnRate = jest.fn();

describe('RatingSystem 컴포넌트', () => {
  beforeEach(() => {
    // 각 테스트 전에 모의 함수 초기화
    mockOnRate.mockClear();

    // Jest의 타이머 모의 설정
    jest.useFakeTimers();
  });

  afterEach(() => {
    // 실제 타이머로 복원
    jest.useRealTimers();
  });

  it('컴포넌트가 올바르게 렌더링되어야 함', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // 제목이 올바르게 표시되는지 확인
    expect(screen.getByText('이 조합을 평가해보세요')).toBeInTheDocument();

    // 모든 평가 옵션이 표시되는지 확인
    expect(screen.getByText('끔찍해요')).toBeInTheDocument();
    expect(screen.getByText('별로예요')).toBeInTheDocument();
    expect(screen.getByText('그저 그래요')).toBeInTheDocument();
    expect(screen.getByText('맛있을 것 같아요')).toBeInTheDocument();
    expect(screen.getByText('환상적이에요')).toBeInTheDocument();

    // 버튼이 올바르게 표시되는지 확인
    expect(screen.getByText('평가 저장하기')).toBeInTheDocument();
  });

  it('평가 선택 전에는 저장 버튼이 비활성화되어야 함', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // 저장 버튼이 비활성화되어 있는지 확인
    const saveButton = screen.getByText('평가 저장하기');
    expect(saveButton).toBeDisabled();
  });

  it('평가 선택 후에는 저장 버튼이 활성화되어야 함', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // 평가 옵션 중 하나 클릭
    fireEvent.click(screen.getByText('맛있을 것 같아요'));

    // 저장 버튼이 활성화되어 있는지 확인
    const saveButton = screen.getByText('평가 저장하기');
    expect(saveButton).not.toBeDisabled();
  });

  it('평가 저장 시 onRate 콜백이 호출되어야 함', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // 평가 옵션 중 하나 클릭 (4점)
    fireEvent.click(screen.getByText('맛있을 것 같아요'));

    // 저장 버튼 클릭
    fireEvent.click(screen.getByText('평가 저장하기'));

    // onRate가 올바른 값으로 호출되었는지 확인
    expect(mockOnRate).toHaveBeenCalledWith(4);
  });

  it('평가 저장 후 감사 메시지가 표시되어야 함', () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // 평가 옵션 중 하나 클릭
    fireEvent.click(screen.getByText('환상적이에요'));

    // 저장 버튼 클릭
    fireEvent.click(screen.getByText('평가 저장하기'));

    // 감사 메시지가 표시되는지 확인
    expect(screen.getByText('평가해주셔서 감사합니다! 저장되었습니다.')).toBeInTheDocument();
  });

  it('3초 후에 평가 폼이 리셋되어야 함', async () => {
    render(<RatingSystem onRate={mockOnRate} />);

    // 평가 옵션 중 하나 클릭
    fireEvent.click(screen.getByText('끔찍해요'));

    // 저장 버튼 클릭
    fireEvent.click(screen.getByText('평가 저장하기'));

    // 감사 메시지가 표시되는지 확인
    expect(screen.getByText('평가해주셔서 감사합니다! 저장되었습니다.')).toBeInTheDocument();

    // 3초 진행
    jest.advanceTimersByTime(3000);

    // 폼이 리셋되어 다시 평가 옵션이 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByText('끔찍해요')).toBeInTheDocument();
    });
  });
});
