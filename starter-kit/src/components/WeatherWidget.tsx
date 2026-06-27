import { Sun } from 'lucide-react';

function WeatherWidget() {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Sun className="text-amber-500" /> Weather
        </h2>
      </div>
      <div className="text-center py-4">
        <div className="text-4xl font-bold mb-1">24°C</div>
        <p className="text-slate-500">Sunny Day</p>
      </div>
    </section>
  );
}

export default WeatherWidget;