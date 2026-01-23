import { Bell, Timer, Puzzle, Brain, Smartphone, CheckCircle } from "lucide-react";

const solutions = [
  {
    icon: Bell,
    title: "고정 트리거",
    desc: "정해진 시간·장소에 알람이 울려요. '언제 할까' 고민이 사라집니다.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Timer,
    title: "10분 최소 실행",
    desc: "딱 10분만 시작하세요. 과제를 잘게 쪼개니 시작이 쉬워요.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Puzzle,
    title: "자석 탈부착",
    desc: "카드를 옮기고 떼고 붙이는 물리적 조작. 인지 부담이 줄어들어요.",
    color: "bg-growth/10 text-growth",
  },
  {
    icon: Brain,
    title: "CBT 미루기 대응",
    desc: "미루고 싶을 때 감정·생각을 기록하고 재구성해요. 자책 대신 이해로.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Smartphone,
    title: "NFC 리워드",
    desc: "완료하면 NFC 태깅 → XP·코인 적립 → 나무 성장. 뇌에 즉각 보상.",
    color: "bg-reward/10 text-reward",
  },
];

export function SolutionSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background scroll-mt-16">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-growth/10 rounded-full text-growth text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            해결책
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            이렇게 <span className="text-gradient-primary">작동</span>합니다
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            의지력 대신 시스템에 맡기세요. 5가지 구조가 실행을 자동화합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {solutions.map((sol, i) => (
            <div
              key={i}
              className="group bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-hover hover:border-primary/20 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${sol.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <sol.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{sol.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{sol.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
