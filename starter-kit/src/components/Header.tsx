import { Clock } from 'lucide-react';

import logoimage from './logo.png';

interface HeaderProps {
  time: Date;
}

function Header({ time }: HeaderProps) {
  return (
    <header className="mb-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
     <div className="flex items-center gap-4">
      <div className="flex items-center justify-center">
        <button
           onClick={() => window.location.reload()}
           className="cursor-pointer hover:opacity-80 transition-opacity"
           title="Reload Page"
        >
          <img src={logoimage} alt="Logo" className="h-12 w-auto object-contain" /> 
          </button>
          <p className="text-[10px] text-slate-400 font-medium mt-1 tracking-wider pl-1">
            あさ忙しいあなたのために
          </p>
        </div>
     </div>
      <p className="text-slate-500 flex items-center gap-2">
        <Clock size={30} />
        {time.toLocaleTimeString()}
      </p>
    </header>
  );
}

export default Header;