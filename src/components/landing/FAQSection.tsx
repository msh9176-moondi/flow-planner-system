import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "ADHD 치료를 대체할 수 있나요?",
    a: "아니요. 이 플래너는 의학적 치료를 대체하지 않습니다. 약물 치료, 상담 등 전문 치료와 병행하여 일상 실행력을 보조하는 도구예요.",
  },
  {
    q: "개인정보는 어떻게 보호되나요?",
    a: "감정 기록과 실행 데이터는 암호화되어 저장되며, 제3자에게 절대 공유되지 않습니다. 언제든 데이터 삭제를 요청할 수 있어요.",
  },
  {
    q: "환불이 가능한가요?",
    a: "제품 수령 후 7일 이내, 미사용 상태라면 전액 환불이 가능합니다. 단, 속지 리필이나 디지털 상품은 환불이 어려워요.",
  },
  {
    q: "NFC 태그는 어떻게 사용하나요?",
    a: "스마트폰 뒷면을 NFC 스티커에 가까이 대면 자동으로 앱이 인식해요. 아이폰/안드로이드 모두 호환됩니다.",
  },
  {
    q: "플래너 사용이 어렵지 않나요?",
    a: "최대한 단순하게 설계했어요. 자석 카드로 직관적으로 조작하고, 10분 단위로 쪼개니 부담이 적습니다. 빠른 시작 가이드도 함께 드려요.",
  },
  {
    q: "배송은 얼마나 걸리나요?",
    a: "결제 완료 후 1~2 영업일 내 발송되며, 국내 기준 2~3일 소요됩니다. 무료 배송이에요.",
  },
  {
    q: "플래너 사용이 처음인데 괜찮을까요?",
    a: "물론이에요! 오히려 기존 플래너에 실패했던 분들을 위해 만들었어요. 처음이라면 시작 패키지로 가볍게 시작해보세요.",
  },
  {
    q: "아이와 성인 모두 사용할 수 있나요?",
    a: "네. 기본 구성은 성인용이지만, 아동/청소년용 버전도 준비 중이에요. 현재는 보호자가 함께 사용하시면 효과적입니다.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted scroll-mt-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            궁금한 점이 있으시면 언제든 문의해 주세요.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-xl border border-border px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
