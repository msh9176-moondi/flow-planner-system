import { ArrowDown, Briefcase, Home, Heart } from 'lucide-react';

const storyCards = [
  {
    icon: Briefcase,
    situation: '보고서 착수가 안 돼서 결국 밤샘',
    before: [
      '마감 3일 전부터 불안하지만 손이 안 감',
      '막상 시작하면 완벽하게 하려다 지침',
      '결국 전날 밤샘 → 다음 날 번아웃',
    ],
    after: [
      '알람에 맞춰 10분만 초안 작성',
      '쪼갠 단계별로 NFC 태깅 → 성취감',
      '여유 있게 마감, 퇴근 후 자유 시간',
    ],
    tags: ['#10분착수', '#고정트리거', '#NFC보상'],
    color: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    icon: Home,
    situation: '집안일이 쌓여서 집에 있기 싫음',
    before: [
      '설거지·빨래가 눈에 보여도 미룸',
      '한 번에 다 하려다 시작 자체를 포기',
      '더러운 집 → 자책 → 무기력 루프',
    ],
    after: [
      '아침 8시 알람 + 10분 타이머 세팅',
      '자석 카드로 오늘 할 것만 보드에 배치',
      '매일 조금씩 → 늘 정돈된 공간',
    ],
    tags: ['#아침트리거', '#자석보드', '#과제쪼개기'],
    color: 'border-growth/30',
    iconBg: 'bg-growth/10 text-growth',
  },
  {
    icon: Heart,
    situation: '운동·영양제 루틴이 3일을 못 넘김',
    before: [
      '"오늘부터 매일 운동!" 결심만 반복',
      '하루 빼먹으면 죄책감 → 완전히 포기',
      '건강 걱정은 커지는데 행동은 제로',
    ],
    after: [
      '저녁 7시 NFC 스티커 터치로 시작',
      '미루고 싶으면 CBT 페이지에서 감정 정리',
      '3주째 연속 달성 → 나무 레벨업',
    ],
    tags: ['#NFC보상', '#CBT리셋', '#나무성장'],
    color: 'border-accent/30',
    iconBg: 'bg-accent/10 text-accent',
  },
];

export function BeforeAfterSection() {
  return (
    <section id="before-after" className="py-20 md:py-28 bg-muted scroll-mt-16">
      <div className="container">
        {/* Undertale dialog */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="dialog-box">
            <p className="text-foreground font-medium leading-relaxed">
              * 전엔 매일 자책했어...<br />
              * 근데 지금은 나무가 자라는 게<br />
              * 왠지 모르게 뿌듯하더라.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            일상이 이렇게 <span className="text-gradient-primary">바뀝니다</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            같은 상황, 다른 결과. 시스템이 만드는 차이예요.
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {storyCards.map((card, i) => (
            <div
              key={i}
              className={`bg-card rounded-2xl overflow-hidden shadow-card border-2 ${card.color}`}
            >
              {/* Situation Header */}
              <div className="p-5 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">
                    STORY {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="font-bold text-foreground">
                  "{card.situation}"
                </p>
              </div>

              {/* Before/After Content */}
              <div className="p-5 space-y-4">
                {/* Before */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-destructive/10 rounded text-xs font-bold text-destructive mb-2">
                    BEFORE
                  </div>
                  <ul className="space-y-1.5">
                    {card.before.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive/60 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow */}
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-5 h-5 text-primary" />
                </div>

                {/* After */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-growth/10 rounded text-xs font-bold text-growth mb-2">
                    AFTER
                  </div>
                  <ul className="space-y-1.5">
                    {card.after.map((item, j) => (
                      <li key={j} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-growth mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="px-5 pb-5">
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
