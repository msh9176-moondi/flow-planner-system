import { TreePine, Coins, Gift, Sparkles } from "lucide-react";

const rewards = [
  {
    icon: TreePine,
    title: "나무 성장",
    desc: "매일 실행할수록 나만의 나무가 자라요. 숲을 만들어보세요.",
    color: "bg-growth text-growth-foreground",
  },
  {
    icon: Coins,
    title: "XP & 코인",
    desc: "NFC 태깅마다 경험치와 코인이 쌓여요. 레벨업 성취감!",
    color: "bg-reward text-reward-foreground",
  },
  {
    icon: Gift,
    title: "도파 마켓",
    desc: "코인으로 기프티콘, 속지, 부속품, 상담권 등을 교환하세요.",
    color: "bg-accent text-accent-foreground",
  },
];

const marketItems = [
  "☕ 카페 기프티콘",
  "📓 감성 속지 팩",
  "🧲 커스텀 자석",
  "🎧 집중 플레이리스트",
  "💬 1:1 코칭 상담권",
  "🌱 한정판 나무 테마",
];

export function RewardSection() {
  return (
    <section id="rewards" className="py-20 md:py-28 bg-muted scroll-mt-16">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-reward/10 rounded-full text-reward text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            보상 시스템
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            실행하면 <span className="text-gradient-accent">보상</span>이 따라와요
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            ADHD 뇌는 즉각적인 보상에 반응해요. 매 완료마다 도파민을 채워드려요.
          </p>
        </div>

        {/* Reward cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {rewards.map((r, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 shadow-card border border-border text-center hover:shadow-hover transition-shadow"
            >
              <div className={`w-16 h-16 rounded-2xl ${r.color} flex items-center justify-center mx-auto mb-4`}>
                <r.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Market preview */}
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            🛒 도파 마켓 아이템
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {marketItems.map((item, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
