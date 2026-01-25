import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, Check, Home, Mail, Phone, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { useTracking } from '@/hooks/use-tracking';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  isSubscription?: boolean;
}

interface OrderState {
  email: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number;
  subscriptionAmount: number;
  paymentMemo: string;
  orderDate: string;
}

export default function OrderComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const { trackPageView, trackCTA } = useTracking();
  const [copied, setCopied] = useState(false);

  const orderData = location.state as OrderState | null;

  useEffect(() => {
    trackPageView('order_complete');
    window.scrollTo(0, 0);
  }, []);

  // 주문 정보가 없으면 홈으로 리다이렉트
  if (!orderData) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">주문 정보를 찾을 수 없습니다.</p>
            <Button variant="hero" onClick={() => navigate('/')}>
              홈으로 돌아가기
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { email, phone, items, totalAmount, subscriptionAmount, paymentMemo, orderDate } = orderData;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const orderSummaryText = `
[FLOCA 주문 정보]
주문일시: ${formatDate(orderDate)}
결제메모: ${paymentMemo}

연락처:
- 이메일: ${email}
${phone ? `- 휴대폰: ${phone}` : ''}

선택 항목:
${items.map((item) => `- ${item.name}${item.quantity && item.quantity > 1 ? ` x${item.quantity}` : ''}${item.isSubscription ? ' (월 구독)' : ''}: ₩${(item.price * (item.quantity || 1)).toLocaleString()}${item.isSubscription ? '/월' : ''}`).join('\n')}

총 결제 금액: ₩${totalAmount.toLocaleString()}
${subscriptionAmount > 0 ? `월 구독료: ₩${subscriptionAmount.toLocaleString()}/월` : ''}
  `.trim();

  const copyOrderInfo = async () => {
    try {
      await navigator.clipboard.writeText(orderSummaryText);
      setCopied(true);
      trackCTA('copy_order_info', 'order_complete');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const goHome = () => {
    trackCTA('go_home', '/');
    navigate('/');
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-hero">
        <div className="container py-16 md:py-24">
          <div className="max-w-lg mx-auto">
            {/* 완료 아이콘 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-growth/10 mb-4">
                <CheckCircle className="w-12 h-12 text-growth" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                주문 접수 완료
              </h1>
              <p className="text-muted-foreground">
                입금 확인 후 24시간 내 안내드립니다
              </p>
            </div>

            {/* 주문 정보 카드 */}
            <div className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-6">
              {/* 결제 메모 */}
              <div className="text-center p-4 bg-primary/5 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">결제 메모</p>
                <p className="text-lg font-bold font-mono text-primary">
                  {paymentMemo}
                </p>
              </div>

              {/* 연락처 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">연락처 정보</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{email}</span>
                  </div>
                  {phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 선택 항목 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">선택 항목</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">
                          {item.name}
                          {item.quantity && item.quantity > 1 && (
                            <span className="text-muted-foreground ml-1">
                              x{item.quantity}
                            </span>
                          )}
                          {item.isSubscription && (
                            <span className="text-xs text-muted-foreground ml-1">
                              (월 구독)
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        ₩{(item.price * (item.quantity || 1)).toLocaleString()}
                        {item.isSubscription && '/월'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 총 결제 금액 */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">총 결제 금액</span>
                  <span className="text-xl font-bold text-primary">
                    ₩{totalAmount.toLocaleString()}
                  </span>
                </div>
                {subscriptionAmount > 0 && (
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-muted-foreground">월 구독료</span>
                    <span className="text-muted-foreground">
                      ₩{subscriptionAmount.toLocaleString()}/월
                    </span>
                  </div>
                )}
              </div>

              {/* 주문일시 */}
              <div className="text-xs text-muted-foreground text-center">
                주문일시: {formatDate(orderDate)}
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex flex-col gap-3 mt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={copyOrderInfo}
                className="w-full"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-growth" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    주문 정보 복사
                  </>
                )}
              </Button>
              <Button
                variant="hero"
                size="lg"
                onClick={goHome}
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </div>

            {/* 안내 문구 */}
            <div className="mt-8 p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground text-center">
                📧 입금 확인 후 이메일로 주문 확정 안내를 보내드립니다.
                <br />
                문의: support@floca.kr
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
