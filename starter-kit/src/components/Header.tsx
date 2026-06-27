import { Clock } from 'lucide-react';

interface HeaderProps {
  time: Date;
}

function Header({ time }: HeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800">Good Morning!</h1>
      <p className="text-slate-500 flex items-center gap-2">
        <Clock size={18} />
        {time.toLocaleTimeString()}
      </p>
    </header>
  );
}

export default Header;