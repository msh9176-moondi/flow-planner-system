import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "작동 원리", href: "#how-it-works" },
  { label: "변화 스토리", href: "#before-after" },
  { label: "리워드", href: "#rewards" },
  { label: "가격", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Sparkles className="w-6 h-6 text-primary" />
          <span>실행플래너</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="sm" asChild>
            <a href="#pricing">시작하기</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="메뉴 열기"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-card border-b border-border py-4">
          <div className="container flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="hero" asChild>
              <a href="#pricing" onClick={() => setIsOpen(false)}>시작하기</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
