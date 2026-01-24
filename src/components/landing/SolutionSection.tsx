import { Bell, Timer, Puzzle, Brain, Smartphone, Zap } from 'lucide-react';

const principles = [
  {
    icon: Bell,
    number: '01',
    claim: '고정 트리거로 시작을 자동화',
    adhdBenefit: 'ADHD 뇌는 \'언제 할까\' 결정에 에너지를 소진합니다. 시간·장소·사물에 연결된 트리거가 결정 피로를 제거해요.',
    example: '📍 기능: 요일별 알람 + 장소 태그 + 루틴 템플릿',
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    icon: Timer,
    number: '02',
    claim: '10분 최소 실행 + 착수 쪼개기',
    adhdBenefit: '큰 과제는 시작 자체를 막습니다. 10분 단위로 쪼개면 착수 저항이 사라지고, 일단 시작하면 흐름이 생겨요.',
    example: '📍 기능: 과제 분해 카드 + 10분 타이머 + 단계별 체크',
    color: 'bg-accent/10 text-accent border-accent/20',
  },
  {
    icon: Puzzle,
    number: '03',
    claim: '자석 구조로 머릿속을 외재화',
    adhdBenefit: '작업 기억이 약하면 계획이 흩어집니다. 물리적으로 떼고 붙이는 자석 카드가 \'눈에 보이는 시스템\'을 만들어요.',
    example: '📍 기능: 마그네틱 할 일 카드 + 우선순위 보드 + 완료 존',
    color: 'bg-growth/10 text-growth border-growth/20',
  },
  {
    icon: Brain,
    number: '04',
    claim: 'CBT로 미루기 감정을 다루기',
    adhdBenefit: '미루기는 감정 회피입니다. 불안·완벽주의를 기록하고 재구성하면 자책 없이 다시 시작할 수 있어요.',
    example: '📍 기능: 미루기 대응 페이지 + 감정 기록 + 회복 일기',
    color: 'bg-secondary text-secondary-foreground border-secondary',
  },
  {
    icon: Smartphone,
    number: '05',
    claim: 'NFC 리워드로 즉각 보상 루프',
    adhdBenefit: 'ADHD 뇌는 지연 보상에 약합니다. 완료 즉시 NFC 태깅 → XP·코인 적립 → 나무 성장으로 도파민을 채워요.',
    example: '📍 기능: NFC 스티커 + 도파 마켓 + 성장 트래커',
    color: 'bg-reward/10 text-reward border-reward/20',
  },
];

export function SolutionSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background scroll-mt-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-growth/10 rounded-full text-growth text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            작동 원리
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            왜 이 플래너는 <span className="text-gradient-primary">실행</span>까지 이어질까?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            ADHD 뇌 특성에 맞춘 5가지 행동 설계 원리입니다.
          </p>
        </div>

        {/* Principle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {principles.map((p, i) => (
            <div
              key={i}
              className={`group bg-card rounded-2xl p-6 shadow-soft border hover:shadow-hover transition-all duration-300 ${
                i === 4 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''
              }`}
            >
              {/* Header Row */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <p.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60 tracking-wider">
                    PRINCIPLE {p.number}
                  </span>
                  <h3 className="text-lg font-bold text-foreground leading-snug">
                    {p.claim}
                  </h3>
                </div>
              </div>

              {/* ADHD Benefit */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {p.adhdBenefit}
              </p>

              {/* Feature Example */}
              <div className="px-3 py-2 bg-muted/50 rounded-lg">
                <p className="text-xs text-foreground/80">
                  {p.example}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-muted-foreground mt-10 max-w-lg mx-auto">
          ※ 본 원리는 인지행동 및 행동 설계 연구를 기반으로 구성되었으며, 의학적 치료를 대체하지 않습니다.
        </p>
      </div>
    </section>
  );
}
