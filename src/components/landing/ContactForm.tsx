import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("문의가 접수되었습니다! 빠르게 답변 드릴게요.");
      setEmail("");
      setMessage("");
      setIsLoading(false);
    }, 1000);
  };

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-card border-border"
              />
            </div>
            <div>
              <Textarea
                placeholder="문의 내용을 입력해 주세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="bg-card border-border resize-none"
              />
            </div>
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                "전송 중..."
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
