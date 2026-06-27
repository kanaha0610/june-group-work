import React from 'react';
import Header from './components/Header';
import WeatherWidget from './components/WeatherWidget';
import FortunesWidget from './components/FortunesWidget';
import ClothesWidget from './components/ClothesWidget';

function App() {
  const time=new Date();
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <Header time={time} />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherWidget />
        <ClothesWidget />
        <FortunesWidget />
      </main>

      <Footer />
    </div>
  );
}

export default App;