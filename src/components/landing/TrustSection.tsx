import { Quote } from 'lucide-react';

export function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              만든 사람들
            </h2>
            <p className="text-muted-foreground">
              직접 ADHD를 겪으며 시행착오 끝에 만들었어요.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Profile placeholder */}
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center shrink-0">
                <img src="/Mask group.png" alt="" />
              </div>

              {/* Bio */}
              <div className="flex-1 text-center md:text-left">
                <Quote className="w-8 h-8 text-primary/30 mb-4 mx-auto md:mx-0" />
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ['FLOCA' 창립자 문성하]
                  <br />
                  저도 수십 개의 플래너를 실패했어요. 의지력 탓을 하다 지쳤죠.
                  결국 '시스템'으로 접근해야 한다는 걸 깨달았고, 이 플래너를
                  만들게 되었습니다.
                </p>
                <div>
                  <p className="font-bold text-foreground">[이름: 문성하]</p>
                  <p className="text-sm text-muted-foreground">
                    [직함/소개: 대표]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="px-4 py-2 bg-card rounded-lg border border-border text-sm text-muted-foreground">
              🔒 개인정보 보호
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border border-border text-sm text-muted-foreground">
              ✅ 7일 환불 보장
            </div>
            <div className="px-4 py-2 bg-card rounded-lg border border-border text-sm text-muted-foreground">
              📦 안전 포장 배송
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
