import React from 'react';
import Header from './Header'; //
import { Sun, Cloud, Newspaper, CheckCircle, } from 'lucide-react';
import Weather from "./weather";

function App() {
  

  return (
    <div className="min-h-screen p-4 md:p-8">
     <Header />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Weather />
        

        {/* News Widget Placeholder */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Newspaper className="text-blue-500" /> Top Stories
            </h2>
          </div>
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="text-sm text-slate-600 border-b border-slate-50 pb-2 last:border-0">
                Loading some interesting news...
              </li>
            ))}
          </ul>
        </section>

        {/* Tasks Widget Placeholder */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <CheckCircle className="text-emerald-500" /> Today's Focus
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded border-slate-300" />
              <span>Drink 1 glass of water</span>
            </label>
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs">
        &copy; 2026 Morning Dashboard Workshop - Built with React
      </footer>
    </div>
  );
}

export default App;
