import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 bg-foreground text-muted">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold text-card">실행플래너</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="hover:text-card transition-colors">이용약관</a>
            <a href="#" className="hover:text-card transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-card transition-colors">고객센터</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2025 실행플래너. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
