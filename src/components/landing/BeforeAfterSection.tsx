import { ArrowRight, Briefcase, Home, Heart } from "lucide-react";

const scenarios = [
  {
    icon: Briefcase,
    title: "직장 업무",
    before: "마감 전날 밤새기, 매일 야근, 번아웃",
    after: "오전 10분씩 쪼개서 진행, 정시 퇴근",
    color: "bg-primary",
  },
  {
    icon: Home,
    title: "집안일",
    before: "싱크대 쌓인 설거지, 빨래 산더미",
    after: "아침 알람에 10분 청소, 깔끔한 집",
    color: "bg-growth",
  },
  {
    icon: Heart,
    title: "자기 관리",
    before: "운동 결심만 100번, 영양제 방치",
    after: "매일 NFC 태깅으로 루틴 완료",
    color: "bg-accent",
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

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-muted-foreground">Before</span> → <span className="text-gradient-primary">After</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            실제 사용자들의 일상이 이렇게 바뀌었어요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {scenarios.map((s, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl overflow-hidden shadow-card border border-border"
            >
              {/* Header */}
              <div className={`${s.color} p-4 flex items-center gap-3`}>
                <s.icon className="w-6 h-6 text-primary-foreground" />
                <h3 className="font-bold text-primary-foreground">{s.title}</h3>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Before */}
                <div className="flex items-start gap-3">
                  <div className="w-16 shrink-0 text-xs font-bold text-destructive bg-destructive/10 py-1 px-2 rounded text-center">
                    BEFORE
                  </div>
                  <p className="text-sm text-muted-foreground">{s.before}</p>
                </div>
                
                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                </div>
                
                {/* After */}
                <div className="flex items-start gap-3">
                  <div className="w-16 shrink-0 text-xs font-bold text-growth bg-growth/10 py-1 px-2 rounded text-center">
                    AFTER
                  </div>
                  <p className="text-sm text-foreground font-medium">{s.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
