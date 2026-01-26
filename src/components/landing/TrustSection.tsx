import { User, Briefcase, GraduationCap, Mail } from 'lucide-react';

export function TrustSection() {
  // Placeholder data - 사용자가 쉽게 수정할 수 있도록 항목화
  const founderProfile = {
    name: '[문성하]',
    title: '[문성하 - 대표: 행동 설계 기반 플래너 디자이너]',
    photo: '/Mask group.png',
    email: '[msh4688@naver.com]',
  };

  const credentials = [
    {
      icon: Briefcase,
      label: '경력',
      value:
        '[경력 사항: 루틴/습관 설계 컨설팅 3년 · 부산 ADHD 오프라인 모임 운영 2년(현장 피드백 기반 프로그램 운영)]',
    },
    {
      icon: GraduationCap,
      label: '자격',
      value:
        '[자격/학력: 경성대학교 디자인 학사(4년제), 사용자 경험(UX) 분석 · 인터페이스/정보구조 설계(IA), 형태·공간·제품 설계 · 웹/앱 개발 · 데이터 흐름 설계 · UX 구현]',
    },
    {
      icon: User,
      label: '배경',
      value:
        '[개인 배경: ADHD 당사자로서 10년간의 시행착오를 바탕으로, “의지”가 아닌 시스템(트리거·구조·보상 루프)으로 실행을 설계하는 도구를 개발]',
    },
  ];

  return (
    <section id="trust" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            왜 이 플래너는 <span className="text-primary">'끝까지'</span> 가게
            만들까
          </h2>

          {/* 3-Sentence Story */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border mb-8">
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  문제를 목격했습니다.
                </span>{' '}
                수많은 사람들이 의지력 탓을 하며 무너지는 걸 봤습니다. 플래너를
                사도, 앱을 깔아도 결국 며칠 만에 포기하더군요.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  원리를 발견했습니다.
                </span>{' '}
                문제는 의지가 아니라 '실행을 자동화하는 구조'가 없다는
                것이었습니다. 트리거, 최소 단위, 즉각 보상—이 세 가지가
                핵심이었죠.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  시스템으로 구현했습니다.
                </span>{' '}
                인지행동 원리와 행동 설계를 결합해, 실행이 '자동으로 따라오는'
                플래너를 만들었습니다.
              </p>
            </div>
          </div>

          {/* Core Beliefs - 3 Lines */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <p className="text-xs text-primary font-medium mb-2">
                내가 하는 일
              </p>
              <p className="text-foreground font-medium text-sm">
                실행이 막히는 지점을 찾아 구조로 해결합니다.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <p className="text-xs text-primary font-medium mb-2">
                내가 믿는 원리
              </p>
              <p className="text-foreground font-medium text-sm">
                의지보다 환경, 동기보다 시스템이 행동을 만듭니다.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <p className="text-xs text-primary font-medium mb-2">
                내가 만든 시스템
              </p>
              <p className="text-foreground font-medium text-sm">
                트리거 + CBT + 리워드 루프로 실행을 자동화합니다.
              </p>
            </div>
          </div>

          {/* Founder Profile Card */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Profile Photo */}
              <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center shrink-0 overflow-hidden border-2 border-primary/20">
                <img
                  src={founderProfile.photo}
                  alt="창립자 프로필"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {founderProfile.name}
                </h3>
                <p className="text-sm text-primary mb-4">
                  {founderProfile.title}
                </p>

                {/* Credentials List - Placeholder */}
                <div className="space-y-2">
                  {credentials.map((cred, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <cred.icon className="w-4 h-4 text-primary/60 shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {cred.label}:
                        </span>{' '}
                        {cred.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary/60 shrink-0" />
                    <span className="text-muted-foreground">
                      <span className="font-medium text-foreground">
                        연락처:
                      </span>{' '}
                      {founderProfile.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mt-6 pt-6 border-t border-border">
              ※ 본 플래너는 의학적 치료를 대체하지 않습니다. 행동 설계 및 루틴
              구성을 돕는 도구입니다.
            </p>
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
