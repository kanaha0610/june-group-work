import { Newspaper } from 'lucide-react';

function NewsWidget() {
  const newsItems = [1, 2, 3];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Newspaper className="text-blue-500" /> Top Stories
        </h2>
      </div>
      <ul className="space-y-3">
        {newsItems.map((i) => (
          <li key={i} className="text-sm text-slate-600 border-b border-slate-50 pb-2 last:border-0">
            Loading some interesting news...
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NewsWidget;