import { BookOpen, Settings, LayoutGrid, Play, Smartphone, MessageSquareHeart } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    title: "플래너 열기",
    desc: "아침, 정해진 시간에 알람이 울려요.",
  },
  {
    icon: Settings,
    title: "10분 세팅",
    desc: "오늘 할 일을 자석 카드로 배치해요.",
  },
  {
    icon: LayoutGrid,
    title: "계획 배치",
    desc: "시간대별로 카드를 옮겨 놓으세요.",
  },
  {
    icon: Play,
    title: "실행",
    desc: "타이머 시작, 딱 10분만 집중해요.",
  },
  {
    icon: Smartphone,
    title: "NFC 보상",
    desc: "완료 후 태깅 → XP·코인·나무 성장!",
  },
  {
    icon: MessageSquareHeart,
    title: "감정 기록",
    desc: "CBT 페이지에 오늘 느낌을 적어요.",
  },
];

export function FlowSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            하루 <span className="text-gradient-primary">사용 플로우</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            복잡하지 않아요. 6단계로 하루를 완성하세요.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Step card */}
              <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-soft border border-border hover:shadow-hover transition-shadow">
                {/* Number */}
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
              
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="flow-connector" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
