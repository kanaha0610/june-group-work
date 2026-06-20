import React from 'react';
import Header from './components/Header';
import WeatherWidget from './components/WeatherWidget';
import NewsWidget from './components/NewsWidget';
import TasksWidget from './components/TasksWidget';

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
        <WeatherWidget />
        <NewsWidget />
        <TasksWidget />
      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs">
        &copy; 2026 Morning Dashboard Workshop - Built with React
      </footer>
    </div>
  );
}

export default App;