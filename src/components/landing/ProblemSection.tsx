import { X, Clock, Zap, TrendingUp, RefreshCcw } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "지속성 X",
    desc: "처음 며칠만 열심히 쓰고, 금방 책장에 박혀요.",
  },
  {
    icon: Zap,
    title: "트리거 X",
    desc: "'해야지' 생각만 하고 시작 타이밍을 놓쳐요.",
  },
  {
    icon: TrendingUp,
    title: "개선 효과 X",
    desc: "매일 똑같이 미루고 자책만 반복해요.",
  },
  {
    icon: RefreshCcw,
    title: "동기 유지 X",
    desc: "보상이 없으니 꾸준히 할 이유가 없어요.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        {/* Undertale-style dialog */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="dialog-box">
            <p className="text-foreground font-medium leading-relaxed">
              * 또 플래너를 샀구나...<br />
              * 이번엔 다를 거라 생각했지?<br />
              * ...나도 그랬어.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            왜 <span className="text-destructive">기존 플래너</span>는 실패할까요?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            문제는 당신의 의지가 아닙니다. 플래너의 구조 자체가 ADHD 뇌에 맞지 않았어요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="relative bg-card rounded-xl p-6 shadow-card border border-border group hover:border-destructive/30 transition-colors"
            >
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              <problem.icon className="w-10 h-10 text-muted-foreground mb-4" />
              <h3 className="font-bold text-foreground mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground">{problem.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
