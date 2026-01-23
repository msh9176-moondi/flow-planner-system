import { BarChart3, TrendingUp, Lightbulb } from "lucide-react";

export function DataSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <BarChart3 className="w-4 h-4" />
                데이터 리포트
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                패턴을 알면<br />
                <span className="text-gradient-primary">개선이 보여요</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                감정 기록과 실행 데이터가 쌓이면, 
                나만의 패턴 리포트를 받아볼 수 있어요. 
                언제 미루는지, 어떤 감정일 때 잘하는지 — 
                스스로를 이해하는 첫걸음이에요.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-growth/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-growth" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">주간/월간 리포트</h4>
                    <p className="text-sm text-muted-foreground">실행률, 감정 변화, 시간대별 패턴 분석</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">맞춤 추천</h4>
                    <p className="text-sm text-muted-foreground">데이터 기반으로 최적 시간대/루틴 제안</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual mockup */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">이번 주 실행률</span>
                  <span className="text-lg font-bold text-growth">78%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-growth rounded-full" />
                </div>
                
                <div className="grid grid-cols-7 gap-1 pt-4">
                  {["월", "화", "수", "목", "금", "토", "일"].map((day, i) => (
                    <div key={day} className="text-center">
                      <span className="text-xs text-muted-foreground">{day}</span>
                      <div className={`mt-1 h-16 rounded ${i < 5 ? "bg-growth/20" : "bg-muted"}`}>
                        <div 
                          className="bg-growth rounded transition-all"
                          style={{ height: `${[70, 85, 60, 90, 80, 40, 0][i]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground text-center pt-2">
                  💡 오전 10시~11시가 가장 집중이 잘 돼요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
