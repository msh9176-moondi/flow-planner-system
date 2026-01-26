import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const FORM_ID = 'mlgbbgnq';

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORM_ID);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      toast.success('문의가 접수되었습니다! 빠르게 답변 드릴게요.');
      setEmail('');
      setMessage('');
      setShowSuccess(true);
    }
  }, [state.succeeded]);

  // ✅ reset()이 없으니, 성공 화면만 로컬 state로 되돌리기
  if (showSuccess) {
    return (
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              문의 완료 ✅
            </h2>
            <p className="text-muted-foreground">
              메시지를 잘 받았어요. 가능한 빨리 답변 드릴게요!
            </p>

            <Button
              variant="hero"
              onClick={() => setShowSuccess(false)}
              className="mt-4"
            >
              새 문의 보내기
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              문의하기
            </h2>
            <p className="text-muted-foreground">
              궁금한 점이나 제안이 있으시면 편하게 남겨주세요.
            </p>
          </div>

          {/* ✅ Formspree 훅 handleSubmit 그대로 사용 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-card border-border"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="mt-2 text-sm text-destructive"
              />
            </div>

            <div>
              <Textarea
                id="message"
                name="message"
                placeholder="문의 내용을 입력해 주세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="bg-card border-border resize-none"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="mt-2 text-sm text-destructive"
              />
            </div>

            {/* 폼 전체 에러 */}
            <ValidationError
              errors={state.errors}
              className="text-sm text-destructive"
            />

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={state.submitting}
            >
              {state.submitting ? (
                '전송 중...'
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  문의 보내기
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
