import React from 'react';

export default function UranaiWidget(){
    return(
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="font-bold text-state-800 text-center">
                【今日の運勢】
            </h2>
            <div></div>
        </section>
    )
}

/*import { CheckCircle } from 'lucide-react';

function FortunesWidget() {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <CheckCircle className="text-emerald-500" /> Today's Fortunes
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" className="rounded border-slate-300" />
          <span>Drink 1 glass of water</span>
        </label>
      </div>
    </section>
  );
}

export default FortunesWidget;*/