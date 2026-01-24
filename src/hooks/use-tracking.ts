// 이벤트 트래킹 훅 - 분석 도구 연동 대비
type EventName = 
  | 'cta_click'
  | 'page_view'
  | 'form_submit'
  | 'option_select'
  | 'faq_open';

interface EventData {
  label?: string;
  value?: string | number;
  page?: string;
  [key: string]: unknown;
}

export function trackEvent(eventName: EventName, data?: EventData) {
  // 콘솔 로그 (개발용)
  console.log(`[Event] ${eventName}`, data);

  // TODO: 실제 분석 도구 연동 시 아래 주석 해제
  // Google Analytics 4
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', eventName, data);
  // }

  // Mixpanel
  // if (typeof mixpanel !== 'undefined') {
  //   mixpanel.track(eventName, data);
  // }

  // Amplitude
  // if (typeof amplitude !== 'undefined') {
  //   amplitude.track(eventName, data);
  // }
}

export function useTracking() {
  const trackCTA = (label: string, destination?: string) => {
    trackEvent('cta_click', { label, destination, page: window.location.pathname });
  };

  const trackPageView = (pageName: string) => {
    trackEvent('page_view', { page: pageName });
  };

  const trackFormSubmit = (formName: string, data?: Record<string, unknown>) => {
    trackEvent('form_submit', { label: formName, ...data });
  };

  const trackOptionSelect = (optionName: string, value: string) => {
    trackEvent('option_select', { label: optionName, value });
  };

  const trackFAQOpen = (question: string) => {
    trackEvent('faq_open', { label: question });
  };

  return {
    trackCTA,
    trackPageView,
    trackFormSubmit,
    trackOptionSelect,
    trackFAQOpen,
  };
}
