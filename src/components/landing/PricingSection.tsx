import { Check, Star, Package, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    name: "시작 패키지",
    price: "29,000",
    icon: Package,
    highlight: true,
    desc: "처음 시작하는 분께 추천",
    features: [
      "플래너 본체 1권",
      "자석 카드 기본 세트",
      "NFC 태그 스티커 3장",
      "빠른 시작 가이드",
      "CBT 미루기 대응 워크시트",
    ],
    cta: "시작하기",
  },
  {
    name: "리필/추가팩",
    price: "12,000",
    icon: RefreshCcw,
    highlight: false,
    desc: "속지·자석 추가 구매",
    features: [
      "속지 리필 (3개월분)",
      "또는 자석 카드 확장팩",
      "또는 NFC 태그 5장",
      "개별 구매 가능",
    ],
    cta: "추가 구매",
  },
  {
    name: "프리미엄 구독",
    price: "2,900",
    priceUnit: "/월",
    icon: Star,
    highlight: false,
    desc: "데이터 리포트 + 도파마켓",
    features: [
      "주간/월간 패턴 리포트",
      "맞춤 루틴 추천",
      "도파 마켓 할인 혜택",
      "신규 테마 먼저 받기",
      "커뮤니티 접근권",
    ],
    cta: "구독하기",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-background scroll-mt-16">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            심플한 <span className="text-gradient-primary">가격 구성</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            부담 없이 시작하고, 필요할 때 추가하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative bg-card rounded-2xl p-6 border-2 transition-all ${
                pkg.highlight 
                  ? "border-primary shadow-hover scale-105 z-10" 
                  : "border-border shadow-card hover:border-primary/30"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                  인기
                </div>
              )}
              
              <div className="text-center mb-6">
                <pkg.icon className={`w-10 h-10 mx-auto mb-3 ${pkg.highlight ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{pkg.desc}</p>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-extrabold text-foreground">₩{pkg.price}</span>
                {pkg.priceUnit && <span className="text-muted-foreground">{pkg.priceUnit}</span>}
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-growth shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.highlight ? "hero" : "outline"}
                className="w-full"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  {pkg.cta}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
