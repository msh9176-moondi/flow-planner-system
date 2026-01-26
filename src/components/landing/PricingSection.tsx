import {
  Check,
  Package,
  RefreshCcw,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// CTA 문구 3안 - 원하는 스타일 선택 후 다른 두 개 삭제
const ctaOptions = {
  starter: {
    practical: '지금 시작하기', // 실용형
    emotional: '오늘, 첫 걸음', // 감정형
    challenge: '29일 도전 시작', // 도전형
  },
  refill: {
    practical: '추가 구매',
    emotional: '계속 이어가기',
    challenge: '확장하기',
  },
  subscription: {
    practical: '구독 신청',
    emotional: '성장 기록하기',
    challenge: '다음 레벨로',
  },
};

// 현재 선택된 CTA 스타일 (practical / emotional / challenge 중 선택)
const selectedStyle: keyof typeof ctaOptions.starter = 'emotional';

const packages = [
  {
    id: 'starter',
    name: '시작 패키지',
    price: '39,000',
    priceUnit: '',
    icon: Package,
    tier: 'main', // main | sub | optional
    badge: '가장 많이 선택',
    targetUser: '플래너를 사도 3일 만에 포기했던 분',
    features: [
      '플래너 본체 1권',
      '마그네틱 할 일 카드 기본 세트',
      'NFC 태그 스티커 3장',
      'CBT 미루기 대응 워크시트',
      '빠른 시작 가이드북',
    ],
    outcome: '→ 첫 주 안에 "오늘도 했다"는 감각을 경험합니다',
  },
  {
    id: 'refill',
    name: '리필 / 추가팩',
    price: '12,000',
    priceUnit: '~',
    icon: RefreshCcw,
    tier: 'sub',
    badge: null,
    targetUser: '시작 패키지를 이미 쓰고 계신 분',
    features: [
      '속지 리필 3개월분',
      '자석 카드 확장팩 (업무/생활/건강)',
      'NFC 태그 추가 5장',
      '테마별 워크시트',
    ],
    outcome: '→ 루틴을 확장하고 시스템을 유지합니다',
  },
  {
    id: 'subscription',
    name: '분석 구독',
    price: '2,900',
    priceUnit: '/월',
    icon: BarChart3,
    tier: 'optional',
    badge: null,
    targetUser: '패턴을 파악하고 개선하고 싶은 분',
    features: [
      '주간/월간 실행 리포트',
      'AI 기반 루틴 추천',
      '도파 마켓 10% 상시 할인',
      '신규 템플릿 우선 제공',
      '프리미엄 커뮤니티 접근',
    ],
    outcome: '→ 데이터로 나를 이해하고 성장합니다',
  },
];

export function PricingSection() {
  const getTierStyles = (tier: string) => {
    switch (tier) {
      case 'main':
        return {
          container: 'border-primary shadow-hover scale-[1.02] z-10 bg-card',
          icon: 'text-primary',
          button: 'hero' as const,
          priceColor: 'text-foreground',
        };
      case 'sub':
        return {
          container:
            'border-border shadow-card hover:border-primary/30 bg-card',
          icon: 'text-accent',
          button: 'outline' as const,
          priceColor: 'text-foreground',
        };
      case 'optional':
        return {
          container: 'border-border/50 shadow-soft bg-muted/30',
          icon: 'text-muted-foreground',
          button: 'ghost' as const,
          priceColor: 'text-muted-foreground',
        };
      default:
        return {
          container: 'border-border shadow-card bg-card',
          icon: 'text-muted-foreground',
          button: 'outline' as const,
          priceColor: 'text-foreground',
        };
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background scroll-mt-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            시작은 <span className="text-gradient-primary">단순하게</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            필요한 것만 담았습니다. 시작 패키지 하나면 충분해요.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {packages.map((pkg) => {
            const styles = getTierStyles(pkg.tier);
            const ctaText =
              ctaOptions[pkg.id as keyof typeof ctaOptions][selectedStyle];

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-6 border-2 transition-all ${styles.container}`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-5">
                  <pkg.icon
                    className={`w-10 h-10 mx-auto mb-3 ${styles.icon}`}
                  />
                  <h3 className="text-xl font-bold text-foreground">
                    {pkg.name}
                  </h3>
                </div>

                {/* Target User */}
                <div className="mb-5">
                  <p className="text-xs font-medium text-primary mb-1">
                    이런 분께
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {pkg.targetUser}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-5 py-3 bg-muted/50 rounded-xl">
                  <span
                    className={`text-3xl font-extrabold ${styles.priceColor}`}
                  >
                    ₩{pkg.price}
                  </span>
                  {pkg.priceUnit && (
                    <span className="text-muted-foreground text-sm">
                      {pkg.priceUnit}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-5">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          pkg.tier === 'optional'
                            ? 'text-muted-foreground'
                            : 'text-growth'
                        }`}
                      />
                      <span
                        className={
                          pkg.tier === 'optional'
                            ? 'text-muted-foreground'
                            : 'text-foreground'
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Expected Outcome */}
                <div className="mb-6 p-3 bg-growth/5 rounded-lg border border-growth/10">
                  <p className="text-xs text-growth font-medium">
                    {pkg.outcome}
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  variant={styles.button}
                  className="w-full group"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    {ctaText}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>

        {/* CTA Options Reference (개발용 - 배포 전 삭제) */}
        <div className="mt-12 max-w-2xl mx-auto">
          <details className="text-xs text-muted-foreground">
            <summary className="cursor-pointer hover:text-foreground">
              💡 CTA 문구 3안 보기 (개발용)
            </summary>
            <div className="mt-3 p-4 bg-muted rounded-lg space-y-2">
              <p>
                <strong>시작 패키지:</strong> 실용형 "지금 시작하기" / 감정형
                "오늘, 첫 걸음" / 도전형 "29일 도전 시작"
              </p>
              <p>
                <strong>리필팩:</strong> 실용형 "추가 구매" / 감정형 "계속
                이어가기" / 도전형 "확장하기"
              </p>
              <p>
                <strong>분석 구독:</strong> 실용형 "구독 신청" / 감정형 "성장
                기록하기" / 도전형 "다음 레벨로"
              </p>
              <p className="pt-2 border-t border-border">
                현재 선택:{' '}
                <code className="bg-background px-1 rounded">
                  {selectedStyle}
                </code>{' '}
                (코드에서 변경 가능)
              </p>
            </div>
          </details>
        </div>

        {/* Trust Note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          7일 이내 사용하지 않은 상품은 100% 환불 가능합니다.
        </p>
      </div>
    </section>
  );
}
