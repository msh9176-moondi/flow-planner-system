import { List } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-card border border-border rounded-2xl p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-foreground">목차</h2>
      </div>
      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className="text-left w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors text-sm"
            >
              <span className="text-primary/60 font-medium mr-2">
                {String(index + 1).padStart(2, '0')}.
              </span>
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
