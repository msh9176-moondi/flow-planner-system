import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTracking } from '@/hooks/use-tracking';

export function HeroSection() {
  const navigate = useNavigate();
  const { trackCTA } = useTracking();

  const handleStartClick = () => {
    trackCTA('hero_start_button', '/start');
    navigate('/start');
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium">
            <span className="w-2 h-2 bg-growth rounded-full animate-pulse" />
            ADHD를 위한 실행력 강화 시스템
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
            계획만 세우다 지친 당신,<br />
            <span className="text-gradient-primary">실행은 시스템이 합니다</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            의지력에 의존하지 마세요. 
            <strong className="text-foreground">트리거 → CBT → 리워드</strong> 루프로 
            뇌가 자동으로 움직이게 만드는 플래너입니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleStartClick}
              className="group"
            >
              지금 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="heroSecondary" 
              size="lg" 
              onClick={() => {
                trackCTA('hero_how_it_works_button', '/how-it-works');
                navigate('/how-it-works');
              }}
            >
              <Play className="w-4 h-4" />
              어떻게 작동하나요?
            </Button>
          </div>

          {/* Social proof hint */}
          <p className="text-sm text-muted-foreground pt-4">
            이미 <strong className="text-primary">1,200+명</strong>이 실행력을 되찾았어요
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
