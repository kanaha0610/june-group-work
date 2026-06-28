import React from 'react';
import Header from './components/Header';
import WeatherWidget from './components/WeatherWidget';
import FortunesWidget from './components/FortunesWidget';
import ClothesWidget from './components/ClothesWidget';
import CosmeticWidget from './components/CosmeticWidget';
import TrainStatusWidget from './components/TrainStatusWidget';

function App() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Header time={time} />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* 左カラム: 天気と電車の運行情報を縦に並べる */}
      <div className="flex flex-col gap-6">
        <WeatherWidget />
        <TrainStatusWidget />
      </div>

      {/* 中央カラム */}
        <ClothesWidget />

      {/* 右カラム */}
      <div className="flex flex-col gap-6">
        <CosmeticWidget />
        <FortunesWidget />
      </div>
      
      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs">
        &copy; 2026 Morning Dashboard Workshop - Built with React
      </footer>
    </div>
  );
}

export default App;