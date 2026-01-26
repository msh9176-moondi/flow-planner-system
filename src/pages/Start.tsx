import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Package,
  RefreshCcw,
  BarChart3,
  Timer,
  Puzzle,
  Brain,
  Smartphone,
  Mail,
  Phone,
  Sparkles,
  Eye,
  Plus,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { PaymentModal } from '@/components/PaymentModal';
import { useTracking } from '@/hooks/use-tracking';

// CTA 문구 3안
const ctaOptions = {
  practical: '지금 시작하기',
  emotional: '오늘, 첫 걸음',
  challenge: '29일 도전 시작',
};

const selectedCTA = ctaOptions.emotional;

// 가격 카드 데이터
const pricingCards = [
  {
    id: 'starter',
    name: '시작 패키지',
    price: 39000,
    displayPrice: '39,000',
    icon: Package,
    tier: 'main',
    badge: '추천',
    targetUser: '플래너를 사도 3일 만에 포기했던 분',
    features: [
      '플래너 본체 1권 ',
      '마그네틱 할 일 카드 기본 세트',
      'NFC 태그 스티커 3장',
      'CBT 미루기 대응 워크시트',
      '빠른 시작 가이드북',
    ],
    outcome: '첫 주 안에 "오늘도 했다"는 감각을 경험합니다',
  },
  {
    id: 'refill',
    name: '리필 / 추가팩',
    price: 12000,
    displayPrice: '12,000',
    pricePrefix: '',
    icon: RefreshCcw,
    tier: 'sub',
    badge: null,
    targetUser: '시작 패키지를 이미 쓰고 계신 분',
    features: [
      '속지 리필 3개월분',
      '자석 카드 확장팩',
      'NFC 태그 추가 5장',
      '테마별 워크시트',
    ],
    outcome: '루틴을 확장하고 시스템을 유지합니다',
    hasQuantity: true,
  },
  {
    id: 'subscription',
    name: '분석 구독',
    price: 2900,
    displayPrice: '2,900',
    priceUnit: '/월',
    icon: BarChart3,
    tier: 'optional',
    badge: null,
    targetUser: '패턴을 파악하고 개선하고 싶은 분',
    features: [
      '주간/월간 실행 리포트',
      'AI 기반 루틴 추천',
      '도파 마켓 10% 상시 할인',
      '프리미엄 커뮤니티 접근',
    ],
    outcome: '데이터로 나를 이해하고 성장합니다',
    isSubscription: true,
  },
];

// 차별점 카드 데이터
const differenceCards = [
  {
    icon: Timer,
    title: '10분 착수',
    desc: '큰 과제도 10분 단위로 쪼개면 시작이 쉬워집니다.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Puzzle,
    title: '자석 구조',
    desc: '물리적으로 떼고 붙이며 머릿속을 외재화합니다.',
    color: 'bg-growth/10 text-growth',
  },
  {
    icon: Brain,
    title: '미루기 리셋 (CBT)',
    desc: '미룬 감정을 기록하고 재구성해 다시 시작합니다.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Smartphone,
    title: 'NFC 보상',
    desc: '완료 즉시 태깅 → XP 적립 → 도파민 즉시 충전.',
    color: 'bg-reward/10 text-reward',
  },
];

// FAQ 데이터
const faqItems = [
  {
    q: '이 플래너가 ADHD 치료를 대체하나요?',
    a: '아니요. 본 플래너는 의학적 치료를 대체하지 않습니다. 실행력 향상을 위한 행동 설계 도구로, 전문 치료와 병행하시길 권장합니다.',
  },
  {
    q: '환불이 가능한가요?',
    a: '네, 제품 수령 후 7일 이내 미사용 상태라면 100% 환불 가능합니다. 고객센터로 연락해 주세요.',
  },
  {
    q: '배송은 얼마나 걸리나요?',
    a: '결제 완료 후 1~2 영업일 내 출고되며, 출고 후 1~2일 내 수령 가능합니다. (주말/공휴일 제외)',
  },
  {
    q: 'NFC 태그는 어떻게 사용하나요?',
    a: '스마트폰으로 NFC 스티커를 터치하면 자동으로 웹이 열리고 완료가 기록됩니다. 별도 앱 설치는 필요하지 않으며, 대부분의 스마트폰에서 지원됩니다.',
  },
  {
    q: '플래너 사용이 처음인데 어렵지 않을까요?',
    a: '빠른 시작 가이드가 포함되어 있어 10분 내에 세팅이 가능합니다. 복잡한 기능 없이 바로 시작할 수 있도록 설계했습니다.',
  },
  {
    q: '내 데이터는 어디에 저장되나요?',
    a: '구독 사용자의 경우 클라우드에 암호화되어 안전하게 저장됩니다. 구독하지 않으면 모든 기록은 물리적 플래너에만 남습니다.',
  },
  {
    q: '구독을 해지하면 어떻게 되나요?',
    a: '언제든 해지 가능하며, 해지 후에도 플래너 본체와 자석 카드는 계속 사용할 수 있습니다. 리포트 기능만 중단됩니다.',
  },
  {
    q: '아이도 사용할 수 있나요?',
    a: '네, 초등학년 이상이면 보호자와 함께 사용 가능합니다. 다만 아이 보호자와 함께 상황에 맞게 조정해 주세요.',
  },
];

interface SelectedItem {
  id: string;
  checked: boolean;
  quantity: number;
}

export default function Start() {
  const navigate = useNavigate();
  const {
    trackCTA,
    trackPageView,
    trackFormSubmit,
    trackOptionSelect,
    trackFAQOpen,
  } = useTracking();

  // 체크박스 기반 선택 상태
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedItem>
  >({
    starter: { id: 'starter', checked: true, quantity: 1 },
    refill: { id: 'refill', checked: false, quantity: 1 },
    subscription: { id: 'subscription', checked: false, quantity: 1 },
  });

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    trackPageView('start');
    window.scrollTo(0, 0);
  }, []);

  // 체크박스 토글
  const handleItemToggle = (id: string, checked: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked },
    }));
    trackOptionSelect(
      'package_toggle',
      `${id}_${checked ? 'checked' : 'unchecked'}`,
    );
  };

  // 수량 변경
  const handleQuantityChange = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const newQuantity = Math.max(1, prev[id].quantity + delta);
      return {
        ...prev,
        [id]: { ...prev[id], quantity: newQuantity },
      };
    });
    trackOptionSelect(
      'quantity_change',
      `${id}_${delta > 0 ? 'increase' : 'decrease'}`,
    );
  };

  // 총액 계산
  const calculateTotals = () => {
    let oneTimeTotal = 0;
    let subscriptionTotal = 0;

    Object.values(selectedItems).forEach((item) => {
      if (!item.checked) return;

      const cardData = pricingCards.find((c) => c.id === item.id);
      if (!cardData) return;

      if (cardData.isSubscription) {
        subscriptionTotal += cardData.price * item.quantity;
      } else {
        oneTimeTotal += cardData.price * item.quantity;
      }
    });

    return { oneTimeTotal, subscriptionTotal, total: oneTimeTotal };
  };

  const { oneTimeTotal, subscriptionTotal, total } = calculateTotals();

  // 선택된 항목 리스트 생성
  const getSelectedOrderItems = () => {
    return Object.values(selectedItems)
      .filter((item) => item.checked)
      .map((item) => {
        const cardData = pricingCards.find((c) => c.id === item.id)!;
        return {
          id: item.id,
          name: cardData.name,
          price: cardData.price,
          quantity: item.quantity,
          isSubscription: cardData.isSubscription,
        };
      });
  };

  // 폼 제출 → 결제 모달 열기
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      return;
    }

    if (getSelectedOrderItems().length === 0) {
      return;
    }

    trackFormSubmit('order_form', {
      items: getSelectedOrderItems()
        .map((i) => i.id)
        .join(','),
      hasEmail: !!formData.email,
      total: oneTimeTotal,
    });

    trackCTA('payment_modal_open', 'order_form');
    setIsPaymentModalOpen(true);
  };

  const scrollToOrder = () => {
    trackCTA('bottom_cta', '#order-form');
    document
      .getElementById('order-form')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToHowItWorks = () => {
    trackCTA('how_it_works_button', '/');
    navigate('/');
    setTimeout(() => {
      document
        .getElementById('how-it-works')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case 'main':
        return {
          container:
            'border-primary shadow-hover ring-2 ring-primary/20 bg-card',
          button: 'hero' as const,
        };
      case 'sub':
        return {
          container:
            'border-border shadow-card hover:border-primary/30 bg-card',
          button: 'outline' as const,
        };
      case 'optional':
        return {
          container: 'border-border/50 shadow-soft bg-muted/30',
          button: 'ghost' as const,
        };
      default:
        return {
          container: 'border-border shadow-card bg-card',
          button: 'outline' as const,
        };
    }
  };

  const hasSelectedItems = getSelectedOrderItems().length > 0;

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* 1. Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                오늘부터 <span className="text-gradient-primary">'시작'</span>만
                <br />
                자동화해도 달라집니다
              </h1>
              <p className="text-lg text-muted-foreground">
                <strong className="text-foreground">
                  트리거 → CBT → 리워드
                </strong>{' '}
                루프가 실행을 자동화합니다.
              </p>
              <p className="text-xs text-muted-foreground">
                ※ 본 플래너는 의학적 치료를 대체하지 않습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Pricing Cards */}
        <section
          id="pricing-cards"
          className="py-16 md:py-20 bg-background scroll-mt-16"
        >
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
              필요한 것만{' '}
              <span className="text-gradient-primary">담았습니다</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              시작 패키지 하나면 충분해요.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingCards.map((card) => {
                const styles = getTierStyles(card.tier);
                const isChecked = selectedItems[card.id]?.checked || false;

                return (
                  <div
                    key={card.id}
                    className={`relative rounded-2xl p-6 border-2 transition-all ${styles.container} ${
                      card.tier === 'main' ? 'md:scale-105 z-10' : ''
                    } ${isChecked ? 'ring-2 ring-primary/30' : ''}`}
                  >
                    {card.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                        {card.badge}
                      </div>
                    )}

                    <div className="text-center mb-4">
                      <card.icon
                        className={`w-10 h-10 mx-auto mb-3 ${
                          card.tier === 'optional'
                            ? 'text-muted-foreground'
                            : 'text-primary'
                        }`}
                      />
                      <h3 className="text-xl font-bold text-foreground">
                        {card.name}
                      </h3>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-primary mb-1">
                        이런 분께
                      </p>
                      <p className="text-sm text-foreground">
                        {card.targetUser}
                      </p>
                    </div>

                    <div className="text-center mb-4 py-3 bg-muted/50 rounded-xl">
                      <span
                        className={`text-3xl font-extrabold ${
                          card.tier === 'optional'
                            ? 'text-muted-foreground'
                            : 'text-foreground'
                        }`}
                      >
                        ₩{card.displayPrice}
                      </span>
                      {card.priceUnit && (
                        <span className="text-muted-foreground text-sm">
                          {card.priceUnit}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2 mb-4">
                      {card.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              card.tier === 'optional'
                                ? 'text-muted-foreground'
                                : 'text-growth'
                            }`}
                          />
                          <span
                            className={
                              card.tier === 'optional'
                                ? 'text-muted-foreground'
                                : 'text-foreground'
                            }
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mb-4 p-3 bg-growth/5 rounded-lg border border-growth/10">
                      <p className="text-xs text-growth font-medium">
                        → {card.outcome}
                      </p>
                    </div>

                    <Button
                      variant={styles.button}
                      className="w-full"
                      onClick={() => {
                        handleItemToggle(card.id, !isChecked);
                        document
                          .getElementById('order-form')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {isChecked ? '선택됨 ✓' : '선택하기'}
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* CTA 문구 3안 표시 */}
            <div className="mt-8 max-w-md mx-auto text-center">
              <p className="text-xs text-muted-foreground mb-2">
                CTA 문구 옵션
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  감정형: {ctaOptions.emotional}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  실용형: {ctaOptions.practical}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  도전형: {ctaOptions.challenge}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Differences Section */}
        <section
          id="differences"
          className="py-16 md:py-20 bg-muted scroll-mt-16"
        >
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
              무엇이 <span className="text-gradient-primary">다른가요?</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              ADHD 뇌 특성에 맞춘 4가지 핵심 설계
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {differenceCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl p-5 border border-border shadow-soft hover:shadow-hover transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}
                  >
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Order Form */}
        <section
          id="order-form"
          className="py-16 md:py-20 bg-background scroll-mt-16"
        >
          <div className="container">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
                주문하기
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Checkbox Package Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    패키지 선택 (중복 선택 가능)
                  </Label>
                  <div className="space-y-2">
                    {/* 시작 패키지 */}
                    <label
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedItems.starter.checked
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedItems.starter.checked}
                          onCheckedChange={(checked) =>
                            handleItemToggle('starter', !!checked)
                          }
                        />
                        <span className="font-medium text-foreground">
                          시작 패키지
                        </span>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        ₩39,000
                      </span>
                    </label>

                    {/* 리필/추가팩 with Quantity */}
                    <div
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedItems.refill.checked
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedItems.refill.checked}
                            onCheckedChange={(checked) =>
                              handleItemToggle('refill', !!checked)
                            }
                          />
                          <span className="font-medium text-foreground">
                            리필 / 추가팩
                          </span>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          ₩
                          {(
                            12000 * selectedItems.refill.quantity
                          ).toLocaleString()}
                        </span>
                      </label>

                      {/* Quantity Stepper */}
                      <div
                        className={`mt-3 flex items-center justify-between pl-7 ${
                          !selectedItems.refill.checked
                            ? 'opacity-50 pointer-events-none'
                            : ''
                        }`}
                      >
                        <span className="text-sm text-muted-foreground">
                          수량
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange('refill', -1)}
                            disabled={
                              !selectedItems.refill.checked ||
                              selectedItems.refill.quantity <= 1
                            }
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {selectedItems.refill.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange('refill', 1)}
                            disabled={!selectedItems.refill.checked}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* 분석 구독 */}
                    <label
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedItems.subscription.checked
                          ? 'border-primary bg-primary/5'
                          : 'border-border/50 hover:border-primary/30 bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedItems.subscription.checked}
                          onCheckedChange={(checked) =>
                            handleItemToggle('subscription', !!checked)
                          }
                        />
                        <div>
                          <span className="font-medium text-foreground">
                            분석 구독 - 준비중
                          </span>
                          <p className="text-xs text-muted-foreground">
                            매월 자동 결제
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-muted-foreground">
                        ₩0/월
                      </span>
                    </label>
                  </div>
                </div>

                {/* 선택 요약 박스 */}
                <div className="p-4 bg-muted/50 rounded-xl border border-border space-y-3">
                  <h4 className="font-semibold text-foreground">선택 요약</h4>

                  {!hasSelectedItems ? (
                    <p className="text-sm text-muted-foreground">
                      선택된 항목이 없습니다.
                    </p>
                  ) : (
                    <>
                      <ul className="space-y-1 text-sm">
                        {selectedItems.starter.checked && (
                          <li className="flex justify-between">
                            <span>시작 패키지</span>
                            <span className="font-medium">₩39,000</span>
                          </li>
                        )}
                        {selectedItems.refill.checked && (
                          <li className="flex justify-between">
                            <span>
                              리필 / 추가팩 x{selectedItems.refill.quantity}
                            </span>
                            <span className="font-medium">
                              ₩
                              {(
                                12000 * selectedItems.refill.quantity
                              ).toLocaleString()}
                            </span>
                          </li>
                        )}
                        {selectedItems.subscription.checked && (
                          <li className="flex justify-between text-muted-foreground">
                            <span>분석 구독 (월 결제)</span>
                            <span className="font-medium">₩0/월</span>
                          </li>
                        )}
                      </ul>

                      <div className="border-t border-border pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>총 결제 금액</span>
                          <span className="text-primary">
                            ₩{oneTimeTotal.toLocaleString()}
                          </span>
                        </div>
                        {subscriptionTotal > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            + 월 ₩{subscriptionTotal.toLocaleString()} (구독
                            별도 결제)
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Mail className="w-4 h-4" />
                      이메일 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Phone className="w-4 h-4" />
                      휴대폰 (선택)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Shipping Placeholder */}
                <div className="p-4 bg-muted rounded-xl border border-dashed border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    📦 배송지 입력은 결제 연동 후 제공됩니다
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full group"
                  disabled={!hasSelectedItems || !formData.email}
                >
                  <Sparkles className="w-5 h-5" />
                  {selectedCTA}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  7일 환불 보장 · 무료 배송 · 안전 결제
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* 5. FAQ */}
        <section
          id="start-faq"
          className="py-16 md:py-20 bg-muted scroll-mt-16"
        >
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
              자주 묻는 질문
            </h2>

            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-card rounded-xl border border-border px-4"
                  >
                    <AccordionTrigger
                      className="text-left font-medium py-4 hover:no-underline"
                      onClick={() => trackFAQOpen(item.q)}
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 6. Bottom CTA */}
        <section className="py-16 md:py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="container relative z-10">
            <div className="max-w-xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                시작은 <span className="text-gradient-primary">오늘</span>이
                가장 빠릅니다
              </h2>
              <p className="text-muted-foreground">
                일주일 뒤, 다른 하루를 보내고 있을 거예요.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  onClick={scrollToOrder}
                  className="group min-w-[200px]"
                >
                  <Sparkles className="w-5 h-5" />
                  {selectedCTA}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="heroSecondary"
                  size="lg"
                  onClick={goToHowItWorks}
                  className="min-w-[200px]"
                >
                  <Eye className="w-4 h-4" />
                  작동 방식 보기
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        selectedItems={getSelectedOrderItems()}
        totalAmount={oneTimeTotal}
        subscriptionAmount={subscriptionTotal}
        email={formData.email}
        phone={formData.phone}
      />
    </>
  );
}
