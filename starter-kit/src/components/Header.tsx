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
          <p className="text-[13px] text-slate-400 font-medium mt-1 tracking-wider pl-1">
            ―あさ忙しいあなたのために―
          </p>
        </div>
     </div>
      <p className="text-slate-700 text-2xl font-bold flex items-center gap-2">
        <Clock size={20} color="#283655" strokeWidth={3}/>
        {time.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit'})}
      </p>
    </header>
  );
}

export default Header;