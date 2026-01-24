import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTracking } from '@/hooks/use-tracking';

export function FinalCTASection() {
  const navigate = useNavigate();
  const { trackCTA } = useTracking();

  const handleStartClick = () => {
    trackCTA('final_cta_start_button', '/start');
    navigate('/start');
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-hero relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Undertale dialog */}
          <div className="max-w-md mx-auto">
            <div className="dialog-box">
              <p className="text-foreground font-medium leading-relaxed">
                * 이번엔 진짜 다를 수 있어.<br />
                * 시스템이 널 도와줄 거야.<br />
                * ...시작해볼래?
              </p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-gradient-primary">실행</span>은 더 이상<br />
            당신 혼자의 싸움이 아닙니다
          </h2>

          <p className="text-lg text-muted-foreground">
            오늘 시작하면, 일주일 뒤엔 다른 하루를 보내고 있을 거예요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleStartClick}
              className="group"
            >
              <Sparkles className="w-5 h-5" />
              지금 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            7일 환불 보장 · 무료 배송 · 안전 결제
          </p>
        </div>
      </div>
    </section>
  );
}
