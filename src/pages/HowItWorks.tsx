import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Home,
  Clock,
  Magnet,
  Brain,
  Smartphone,
  Sparkles,
  Briefcase,
  Home as HomeIcon,
  Heart,
  Video,
  Image,
  Shield,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTracking } from '@/hooks/use-tracking';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';

const steps = [
  {
    number: 1,
    icon: Clock,
    title: '열기 (환경 트리거)',
    description: '정해진 시간·장소에 플래너가 열리도록 설정',
    userAction: '"아침 9시, 책상 앞" → 자동으로 오늘 할 일 표시',
    color: 'text-primary'
  },
  {
    number: 2,
    icon: Sparkles,
    title: '10분 세팅 (착수 쪼개기)',
    description: '큰 작업을 10분짜리 첫 단계로 분해',
    userAction: '"보고서 완성" → "보고서 파일 열기"로 변환',
    color: 'text-accent'
  },
  {
    number: 3,
    icon: Magnet,
    title: '자석 구조로 배치 (외재화)',
    description: '할 일을 시각적 보드에 붙여두기',
    userAction: '자석 카드를 "진행 중" 영역으로 이동',
    color: 'text-growth'
  },
  {
    number: 4,
    icon: Brain,
    title: '미루기/감정 리셋 (CBT)',
    description: '막힐 때 인지 재구조화 페이지 활용',
    userAction: '"왜 미루는지" 체크 → 리프레이밍 문장 확인',
    color: 'text-reward'
  },
  {
    number: 5,
    icon: Smartphone,
    title: '실행 후 NFC 터치 → 보상',
    description: '완료 시 NFC 태그 터치로 XP/코인 획득',
    userAction: '터치 → 나무 성장 애니메이션 → 성취감 루프',
    color: 'text-primary'
  }
];

const beforeAfterCards = [
  {
    icon: Briefcase,
    situation: '직장',
    before: '보고서 미루다 밤샘',
    after: '10분 착수로 점심 전 완료'
  },
  {
    icon: HomeIcon,
    situation: '집안일',
    before: '설거지 산더미 → 죄책감',
    after: '저녁 트리거로 매일 5분 처리'
  },
  {
    icon: Heart,
    situation: '자기관리',
    before: '운동 계획만 3년째',
    after: 'NFC 보상으로 주 3회 루틴화'
  }
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const { trackCTA } = useTracking();

  const handleStartClick = () => {
    trackCTA('how_it_works_start_button', '/start');
    navigate('/start');
  };

  const handleHomeClick = () => {
    trackCTA('how_it_works_home_button', '/');
    navigate('/');
  };

  const handleFAQClick = () => {
    trackCTA('how_it_works_faq_button', '/start#faq');
    navigate('/start#faq');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-hero overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              의지가 아니라,<br />
              <span className="text-gradient-primary">흐름을 바꿉니다</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              <strong className="text-foreground">트리거 → 10분 착수 → CBT 리셋 → NFC 보상</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleStartClick}
                className="group"
              >
                바로 구매 보기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleHomeClick}>
                <Home className="w-4 h-4" />
                홈으로
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Flow Section */}
      <section id="steps" className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              5단계 작동 흐름
            </h2>
            <p className="text-muted-foreground">60초 안에 이해하는 실행력 자동화</p>
          </div>

          {/* Progress indicator for mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <div 
                  key={idx}
                  className="w-2 h-2 rounded-full bg-primary/30"
                />
              ))}
            </div>
          </div>

          {/* Steps Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection line for desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              
              <div className="space-y-6 md:space-y-0">
                {steps.map((step, idx) => {
                  const IconComponent = step.icon;
                  const isEven = idx % 2 === 0;
                  
                  return (
                    <div 
                      key={step.number}
                      className={`relative md:grid md:grid-cols-2 md:gap-8 ${idx > 0 ? 'md:mt-8' : ''}`}
                    >
                      {/* Step number badge for desktop */}
                      <div className="hidden md:flex absolute left-1/2 top-4 -translate-x-1/2 z-10">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                          {step.number}
                        </div>
                      </div>
                      
                      {/* Content card */}
                      <div className={`${isEven ? 'md:col-start-1 md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-hover transition-shadow">
                          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            {/* Mobile step number */}
                            <div className="md:hidden w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                              {step.number}
                            </div>
                            <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center`}>
                              <IconComponent className={`w-5 h-5 ${step.color}`} />
                            </div>
                            <h3 className="font-bold text-foreground text-lg flex-1">
                              {step.title}
                            </h3>
                          </div>
                          
                          <p className="text-muted-foreground text-sm mb-3">
                            {step.description}
                          </p>
                          
                          <div className={`text-xs bg-secondary/50 rounded-lg p-3 ${isEven ? 'md:text-right' : ''}`}>
                            <span className="text-primary font-medium">사용자 행동: </span>
                            <span className="text-foreground">{step.userAction}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Empty column for alternating layout */}
                      {isEven ? <div className="hidden md:block" /> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before → After Section */}
      <section id="beforeafter" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Before → After
            </h2>
            <p className="text-muted-foreground">실제로 이렇게 달라져요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {beforeAfterCards.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={idx}
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-hover transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-foreground">{card.situation}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-destructive font-medium text-sm shrink-0">Before</span>
                      <span className="text-muted-foreground text-sm">{card.before}</span>
                    </div>
                    <div className="w-full h-px bg-border" />
                    <div className="flex items-start gap-2">
                      <span className="text-growth font-medium text-sm shrink-0">After</span>
                      <span className="text-foreground text-sm font-medium">{card.after}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              30초 데모
            </h2>
            <p className="text-muted-foreground">직접 확인해보세요</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Video placeholder */}
            <div className="aspect-video bg-card rounded-2xl border border-border shadow-soft flex items-center justify-center group cursor-pointer hover:shadow-hover transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">데모 영상 (준비 중)</p>
                <p className="text-xs text-muted-foreground/60 mt-1">클릭하여 재생</p>
              </div>
            </div>

            {/* Screenshot thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((num) => (
                <div 
                  key={num}
                  className="aspect-[4/3] bg-card rounded-xl border border-border shadow-soft flex items-center justify-center hover:shadow-hover transition-shadow cursor-pointer"
                >
                  <div className="text-center">
                    <Image className="w-6 h-6 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground/60">스크린샷 {num}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Notice Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-foreground text-lg">
                    알려드립니다
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>이 제품은 <strong className="text-foreground">의학적 치료를 대체하지 않습니다</strong>. ADHD 진단·치료는 전문가와 상담하세요.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>실행력 향상을 돕는 <strong className="text-foreground">행동 설계 도구</strong>입니다.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              지금 시작해보세요
            </h2>
            <p className="text-muted-foreground">
              첫 주 안에 "나도 할 수 있구나" 경험을 느껴보세요
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleStartClick}
                className="group"
              >
                시작 패키지로 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleFAQClick}>
                <HelpCircle className="w-4 h-4" />
                자주 묻는 질문
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
