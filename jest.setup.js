// jest-dom은 DOM 노드에 대한 assertion을 추가합니다
import '@testing-library/jest-dom';

// 모의 타이머 설정 - 전역 설정이므로 개별 테스트에서 필요할 때만 사용하도록 변경
// jest.useFakeTimers();

// 전역 모의 설정
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// 콘솔 오류 억제 (필요한 경우)
const originalConsoleError = console.error;
console.error = (...args) => {
  // React 18의 useEffect 경고 억제
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: ReactDOM.render is no longer supported')
  ) {
    return;
  }
  originalConsoleError(...args);
};
