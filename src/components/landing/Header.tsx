import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTracking } from '@/hooks/use-tracking';

const navLinks = [
  { label: '작동 원리', href: 'how-it-works' },
  { label: '변화 스토리', href: 'before-after' },
  { label: '리워드', href: 'rewards' },
  { label: '가격', href: 'pricing' },
  { label: 'FAQ', href: 'faq' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { trackCTA } = useTracking();

  const isStartPage = location.pathname === '/start';
  const isHowItWorksPage = location.pathname === '/how-it-works';

  const handleScrollToSection = (sectionId: string) => {
    // 랜딩 페이지가 아니면 먼저 이동
    if (location.pathname !== '/') {
      navigate('/');
      // 페이지 이동 후 스크롤
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleStartClick = () => {
    trackCTA('header_start_button', '/start');
    navigate('/start');
    setIsOpen(false);
  };

  const handleHomeClick = () => {
    trackCTA('header_home_button', '/');
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleHomeClick();
          }}
          className="flex items-center gap-2 text-xl font-bold text-foreground"
        >
          <Sparkles className="w-6 h-6 text-primary" />
          <span>실행플래너</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {isStartPage ? (
            // Start 페이지용 네비게이션
            <>
              <Button variant="ghost" size="sm" onClick={handleHomeClick}>
                <Home className="w-4 h-4 mr-1" />
                홈으로
              </Button>
            </>
          ) : (
            // 랜딩 페이지용 네비게이션
            <>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleScrollToSection(link.href)}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <Button variant="hero" size="sm" onClick={handleStartClick}>
                시작하기
              </Button>
            </>
          )}
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
            {isStartPage ? (
              <>
                <Button variant="outline" onClick={handleHomeClick}>
                  <Home className="w-4 h-4 mr-1" />
                  홈으로
                </Button>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleScrollToSection(link.href)}
                    className="text-foreground hover:text-primary transition-colors font-medium py-2 bg-transparent border-none cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <Button variant="hero" onClick={handleStartClick}>
                  시작하기
                </Button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
