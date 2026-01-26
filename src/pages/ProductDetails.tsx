import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { MediaBlock } from '@/components/details/MediaBlock';
import { TableOfContents } from '@/components/details/TableOfContents';
import { Button } from '@/components/ui/button';
import { useTracking } from '@/hooks/use-tracking';
import { ArrowRight, Home, CheckCircle2, Sparkles } from 'lucide-react';

// 섹션 데이터 - 나중에 파일만 교체하면 됨
const sections = [
  {
    id: 'trigger',
    title: '고정 트리거 시스템',
    description:
      'ADHD 뇌는 "언제 할까" 결정에 에너지를 소진합니다. 시간, 장소, 사물에 연결된 트리거가 결정 피로를 제거하고 자동으로 시작하게 만듭니다. 매일 같은 조건에서 플래너를 열면, 뇌는 저항 없이 실행 모드로 전환됩니다.',
    mediaType: 'image' as const,
    mediaSrc: '/assets/details/trigger-system.png',
    caption: '요일별 알람 + 장소 태그 + 루틴 템플릿 화면',
    bullets: [
      '요일/시간별 자동 알람 설정',
      '장소 기반 트리거 (책상, 카페 등)',
      '사물 연결 (플래너 펼치기 = 시작 신호)',
    ],
  },
  {
    id: 'ten-minute',
    title: '10분 최소 실행',
    description:
      '큰 과제는 시작 자체를 막습니다. "보고서 쓰기"가 아니라 "보고서 파일 열기"처럼 10분 안에 끝낼 수 있는 단위로 쪼개면, 착수 저항이 사라지고 일단 시작하면 흐름이 생깁니다.',
    mediaType: 'svg' as const,
    mediaSrc: '/assets/details/task-breakdown.png',
    caption: '과제 분해 카드 + 10분 타이머 + 단계별 체크',
    bullets: [
      '큰 과제를 작은 첫 단계로 분해',
      '10분 타이머로 집중 구간 생성',
      '완료 체크로 성취감 즉시 획득',
    ],
  },
  {
    id: 'magnetic',
    title: '자석 구조 (외재화)',
    description:
      '작업 기억이 약하면 머릿속 계획이 흩어집니다. 마그네틱 카드로 할 일을 물리적으로 떼고 붙이면, "눈에 보이는 시스템"이 만들어져 잊어버릴 걱정이 사라집니다.',
    mediaType: 'image' as const,
    mediaSrc: '/assets/details/magnetic-board.png',
    caption: '마그네틱 할 일 카드 + 우선순위 보드 + 완료 존',
    bullets: [
      '할 일을 물리적 카드로 시각화',
      '우선순위 보드로 중요도 정렬',
      '완료 존으로 성취 기록 누적',
    ],
  },
  {
    id: 'cbt',
    title: 'CBT 미루기 대응',
    description:
      '미루기는 의지 부족이 아니라 감정 회피입니다. 불안, 완벽주의, 지루함을 기록하고 재구성하면 자책 없이 다시 시작할 수 있습니다. 인지행동 기반 워크시트가 감정 리셋을 도와줍니다.',
    mediaType: 'image' as const,
    mediaSrc: '/assets/details/cbt-worksheet.png', // ✅ pdf -> png (또는 jpg)
    caption: '미루기 대응 페이지 + 감정 기록 + 회복 일기',
    bullets: [
      '미루기 원인 감정 파악 워크시트',
      '인지 재구성 단계별 가이드',
      '회복 일기로 패턴 분석',
    ],
  },
  {
    id: 'nfc-reward',
    title: 'NFC 보상 / 나무 성장',
    description:
      'ADHD 뇌는 지연 보상에 약합니다. 과제 완료 즉시 NFC 스티커를 태깅하면 XP와 코인이 적립되고, 나무가 자라는 것을 눈으로 확인할 수 있어 도파민 보상이 즉각적으로 작동합니다.',
    mediaType: 'image' as const,
    mediaSrc: '/assets/details/nfc-reward.png',
    caption: 'NFC 스티커 태깅 → XP 적립 → 나무 성장 트래커',
    bullets: [
      'NFC 스티커로 완료 태깅 (1초)',
      'XP/코인으로 즉각 보상',
      '나무 성장으로 장기 동기 유지',
    ],
  },
  {
    id: 'scenarios',
    title: '사용 시나리오',
    description:
      '직장, 집안일, 자기관리 등 다양한 상황에서 FLOCA 시스템이 어떻게 작동하는지 실제 예시로 확인하세요. 미루기 루프에서 실행 루프로 전환되는 Before/After를 비교해 보세요.',
    mediaType: 'image' as const,
    mediaSrc: '/assets/details/use-cases.png',
    caption: '직장/집안일/자기관리 시나리오 비교',
    bullets: [
      '직장: 업무 시작 전 10분 세팅',
      '집안일: 장소 트리거로 자동 시작',
      '자기관리: CBT로 감정 리셋 후 재도전',
    ],
  },
];

// TOC용 데이터 추출
const tocItems = sections.map((s) => ({ id: s.id, title: s.title }));

export default function ProductDetails() {
  const navigate = useNavigate();
  const { trackCTA, trackPageView } = useTracking();

  useEffect(() => {
    trackPageView('product_details');
    document.title = 'FLOCA 제품 상세 | 실행플래너';
  }, []);

  const handleStartClick = () => {
    trackCTA('details_start_button', '/start');
    navigate('/start');
  };

  const handleHowItWorksClick = () => {
    trackCTA('details_how_it_works', '/#how-it-works');
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('how-it-works');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                제품 상세
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                FLOCA <span className="text-gradient-primary">제품 상세</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                트리거 → 10분 착수 → CBT 리셋 → NFC 보상
                <br />
                의지가 아닌 시스템으로 실행까지 이어지는 구조
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={handleStartClick}>
                  구매 / 시작하기
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleHowItWorksClick}
                >
                  <Home className="w-5 h-5" />
                  작동 원리로 돌아가기
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* TOC + Content */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
              {/* Sticky TOC */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <TableOfContents items={tocItems} />
              </aside>

              {/* Content Sections */}
              <div className="space-y-16 md:space-y-24">
                {sections.map((section, index) => (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    {/* Section Header */}
                    <div className="mb-6">
                      <span className="text-sm font-bold text-primary/60 tracking-wider">
                        SECTION {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                        {section.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {section.description}
                    </p>

                    {/* Media Block */}
                    <MediaBlock
                      type={section.mediaType}
                      src={section.mediaSrc}
                      alt={section.title}
                      caption={section.caption}
                    />

                    {/* Bullets */}
                    {section.bullets && section.bullets.length > 0 && (
                      <div className="mt-6 bg-card border border-border rounded-xl p-5">
                        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-growth" />
                          핵심 포인트
                        </h3>
                        <ul className="space-y-2">
                          {section.bullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-primary mt-1">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-gradient-to-t from-primary/5 to-background">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                지금 시작해보세요
              </h2>
              <p className="text-muted-foreground mb-8">
                시작 패키지로 트리거 → CBT → 리워드 시스템을 경험하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={handleStartClick}>
                  시작 패키지로 시작하기
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    trackCTA('details_faq', '/start#faq');
                    navigate('/start');
                    setTimeout(() => {
                      const element = document.getElementById('start-faq');
                      if (element)
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  자주 묻는 질문
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
