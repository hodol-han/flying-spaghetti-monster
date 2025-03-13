import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe('음식 조합 생성 및 평가 흐름', () => {
  beforeEach(() => {
    // 각 테스트 전에 모의 함수 초기화
    jest.clearAllMocks();
    
    // Jest의 타이머 모의 설정
    jest.useFakeTimers();
  });

  afterEach(() => {
    // 실제 타이머로 복원
    jest.useRealTimers();
  });

  it('전체 흐름: 조합 생성 -> 평가 -> 저장', async () => {
    render(<Home />);
    
    // 1. 초기 상태 확인
    expect(screen.getByText('랜덤 음식 조합 생성기')).toBeInTheDocument();
    expect(screen.getByText('상상도 못한 음식 조합을 발견하세요!')).toBeInTheDocument();
    expect(screen.getByText('랜덤 조합 생성하기')).toBeInTheDocument();
    expect(screen.getByText('아직 저장된 음식 조합이 없습니다.')).toBeInTheDocument();
    
    // 2. 조합 생성 버튼 클릭
    fireEvent.click(screen.getByText('랜덤 조합 생성하기'));
    
    // 생성 중 상태 확인
    expect(screen.getByText('생성 중...')).toBeInTheDocument();
    
    // 타이머 진행
    jest.advanceTimersByTime(800);
    
    // 3. 생성된 조합 확인
    await waitFor(() => {
      expect(screen.getByText('생성된 음식 조합')).toBeInTheDocument();
    });
    
    // 4. 평가 시스템 확인
    expect(screen.getByText('이 조합을 평가해보세요')).toBeInTheDocument();
    expect(screen.getByText('끔찍해요')).toBeInTheDocument();
    expect(screen.getByText('환상적이에요')).toBeInTheDocument();
    
    // 5. 평가 선택
    fireEvent.click(screen.getByText('맛있을 것 같아요'));
    
    // 6. 평가 저장
    fireEvent.click(screen.getByText('평가 저장하기'));
    
    // 7. 감사 메시지 확인
    expect(screen.getByText('평가해주셔서 감사합니다! 저장되었습니다.')).toBeInTheDocument();
    
    // 8. 저장된 조합 목록 확인
    expect(screen.queryByText('아직 저장된 음식 조합이 없습니다.')).not.toBeInTheDocument();
    expect(screen.getByText('조합 #1')).toBeInTheDocument();
    
    // 9. 다시 조합 생성
    // 3초 진행하여 평가 폼 리셋
    jest.advanceTimersByTime(3000);
    
    // 다시 버튼 클릭
    await waitFor(() => {
      expect(screen.getByText('랜덤 조합 생성하기')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('랜덤 조합 생성하기'));
    
    // 타이머 진행
    jest.advanceTimersByTime(800);
    
    // 10. 두 번째 조합 평가
    await waitFor(() => {
      expect(screen.getByText('생성된 음식 조합')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('환상적이에요'));
    fireEvent.click(screen.getByText('평가 저장하기'));
    
    // 11. 두 개의 저장된 조합 확인
    expect(screen.getByText('조합 #1')).toBeInTheDocument();
    expect(screen.getByText('조합 #2')).toBeInTheDocument();
  });
}); 