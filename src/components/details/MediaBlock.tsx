import { useState } from 'react';
import { ImageIcon, FileText, FileImage } from 'lucide-react';

interface MediaBlockProps {
  type: 'image' | 'svg' | 'pdf';
  src: string;
  alt?: string;
  caption?: string;
}

export function MediaBlock({ type, src, alt = '미디어 콘텐츠', caption }: MediaBlockProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Placeholder UI when media is missing or errored
  const PlaceholderUI = ({ icon: Icon, label }: { icon: typeof ImageIcon; label: string }) => (
    <div className="w-full bg-muted/50 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center py-16 px-8">
      <Icon className="w-12 h-12 text-muted-foreground mb-4" />
      <p className="text-muted-foreground text-sm text-center">
        여기에 {label}을(를) 넣으세요
      </p>
      <p className="text-muted-foreground/60 text-xs mt-2">
        경로: {src || 'public/assets/...'}
      </p>
    </div>
  );

  // Render based on type
  const renderMedia = () => {
    if (hasError || !src) {
      const iconMap = {
        image: { icon: ImageIcon, label: 'PNG/JPG/WebP 이미지' },
        svg: { icon: FileImage, label: 'SVG 파일' },
        pdf: { icon: FileText, label: 'PDF 파일' },
      };
      const { icon, label } = iconMap[type];
      return <PlaceholderUI icon={icon} label={label} />;
    }

    switch (type) {
      case 'image':
      case 'svg':
        return (
          <div className="relative w-full">
            {isLoading && (
              <div className="absolute inset-0 bg-muted/50 rounded-xl animate-pulse" />
            )}
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onError={handleError}
              onLoad={handleLoad}
              className="w-full h-auto rounded-xl shadow-soft object-contain max-h-[600px]"
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="w-full">
            <iframe
              src={src}
              title={alt}
              className="w-full h-[400px] md:h-[600px] max-w-[800px] mx-auto rounded-xl border border-border shadow-soft"
              onError={handleError}
            />
            <p className="text-xs text-muted-foreground text-center mt-2">
              PDF가 보이지 않으면{' '}
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                새 탭에서 열기
              </a>
            </p>
          </div>
        );

      default:
        return <PlaceholderUI icon={ImageIcon} label="미디어" />;
    }
  };

  return (
    <figure className="my-6">
      {renderMedia()}
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
