import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Copy, Check, CreditCard, Building2, QrCode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTracking } from '@/hooks/use-tracking';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  isSubscription?: boolean;
}

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItems: OrderItem[];
  totalAmount: number;
  subscriptionAmount: number;
  email: string;
  phone: string;
}

export function PaymentModal({
  open,
  onOpenChange,
  selectedItems,
  totalAmount,
  subscriptionAmount,
  email,
  phone,
}: PaymentModalProps) {
  const navigate = useNavigate();
  const { trackCTA } = useTracking();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // 결제 메모 생성: FLOCA-이메일앞부분-날짜
  const emailPrefix = email.split('@')[0] || 'guest';
  const today = new Date();
  const dateString = `${today.getMonth() + 1}${today.getDate()}`;
  const paymentMemo = `FLOCA-${emailPrefix}-${dateString}`;

  // 계좌 정보 (placeholder)
  const bankInfo = {
    bank: '카카오뱅크',
    account: '3333-12-3456789',
    holder: '(주)플로카',
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      trackCTA('copy_button', field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const handlePaymentComplete = () => {
    trackCTA('payment_complete_button', '/order-complete');
    
    // 주문 정보를 state로 전달
    navigate('/order-complete', {
      state: {
        email,
        phone,
        items: selectedItems,
        totalAmount,
        subscriptionAmount,
        paymentMemo,
        orderDate: new Date().toISOString(),
      },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto sm:max-h-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            결제 안내
          </DialogTitle>
        </DialogHeader>

        {/* 결제 금액 표시 */}
        <div className="text-center py-4 bg-primary/5 rounded-xl mb-4">
          <p className="text-sm text-muted-foreground mb-1">총 결제 금액</p>
          <p className="text-3xl font-extrabold text-primary">
            ₩{totalAmount.toLocaleString()}
          </p>
          {subscriptionAmount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              + 월 ₩{subscriptionAmount.toLocaleString()} (구독)
            </p>
          )}
        </div>

        {/* 선택 항목 요약 */}
        <div className="text-sm text-muted-foreground mb-4">
          <p className="font-medium text-foreground mb-1">선택 항목:</p>
          <ul className="space-y-1">
            {selectedItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name}
                  {item.quantity && item.quantity > 1 && ` x${item.quantity}`}
                  {item.isSubscription && ' (월 구독)'}
                </span>
                <span className="font-medium">
                  ₩{(item.price * (item.quantity || 1)).toLocaleString()}
                  {item.isSubscription && '/월'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 결제 방법 탭 */}
        <Tabs defaultValue="kakaopay" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="kakaopay" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              카카오페이
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              계좌이체
            </TabsTrigger>
          </TabsList>

          {/* 카카오페이 QR 탭 */}
          <TabsContent value="kakaopay" className="space-y-4">
            {/* QR 이미지 placeholder */}
            <div className="aspect-square max-w-[200px] mx-auto bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center p-4">
                <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">
                  카카오페이 QR 이미지
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  (KAKAOPAY_QR_IMAGE_URL)
                </p>
              </div>
            </div>

            {/* 3스텝 안내 */}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm font-medium text-foreground mb-2">스캔 방법</p>
              <ol className="text-xs text-muted-foreground space-y-1">
                <li>1. 카카오페이 앱 열기</li>
                <li>2. 결제/송금 선택</li>
                <li>3. QR 스캔 후 결제</li>
              </ol>
            </div>

            {/* 결제 메모 복사 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">결제 메모</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm font-mono">
                  {paymentMemo}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(paymentMemo, 'memo')}
                  className="shrink-0"
                >
                  {copiedField === 'memo' ? (
                    <Check className="w-4 h-4 text-growth" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                ※ 결제 시 위 메모를 입력해 주세요
              </p>
            </div>
          </TabsContent>

          {/* 계좌이체 탭 */}
          <TabsContent value="bank" className="space-y-4">
            {/* 계좌 정보 */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">은행</span>
                <span className="font-medium text-foreground">{bankInfo.bank}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">계좌번호</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground font-mono">
                    {bankInfo.account}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2"
                    onClick={() => copyToClipboard(bankInfo.account, 'account')}
                  >
                    {copiedField === 'account' ? (
                      <Check className="w-3 h-3 text-growth" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">예금주</span>
                <span className="font-medium text-foreground">{bankInfo.holder}</span>
              </div>
            </div>

            {/* 입금자명 안내 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">입금자명 규칙</p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <p className="text-sm font-mono text-primary">{emailPrefix}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                ※ 입금 시 입금자명을 이메일 아이디로 설정해 주세요
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* 공통 버튼 */}
        <div className="flex flex-col gap-2 mt-4">
          <Button
            variant="hero"
            size="lg"
            onClick={handlePaymentComplete}
            className="w-full"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            결제 완료했어요
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
