// src/Header.tsx
import React from 'react';
import { Clock } from 'lucide-react';

function Header() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="mb-8 p-4 bg-pink-100 rounded-2xl shadow-sm">
      <h1 className="text-3xl font-bold text-slate-800">あさナビ（開発中）</h1>
      <p className="text-slate-500 flex items-center gap-2">
        <Clock size={18} />
        {time.toLocaleTimeString()}
      </p>
    </header>
  );
}

// 他のファイル（App.tsxなど）で使えるように外に送り出す
export default Header;
