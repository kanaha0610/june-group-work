import { useState , useEffect } from 'react';

export default function CosmeticWidget() {

    const [ humidity, setHumidity ] = useState(0);
    const [ uvIndex, setUvIndex ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Tokyo&lang=ja`)
            .then(res => {
                if (!res.ok) throw new Error("データの取得に失敗しました");
                return res.json();
            })
            .then(data => {
                setHumidity(data.current.humidity);
                setUvIndex(data.current.uv);
                setIsLoading(false);
            })
            .catch(err => setError(err.message)); // 👈 エラーを捕まえて状態に保存
    }, []);

    if (error) return <p className="text-red-500 font-bold">🚨 {error}</p>;

    // おすすめコスメを決める
    const getRecommendedCosmetics = () => {
        const items: { file: string; label: string }[] = [];

        // 下地・日焼け止め
        if (humidity < 50 && uvIndex < 3) {
            items.push({ file: 'foundationA.png', label: '下地' });
        } else if (humidity < 50 && uvIndex >= 3) {
            items.push({ file: 'foundationA.png', label: '下地' });
            items.push({ file: 'sunscreen.png', label: '日焼け止め' });
        } else if (humidity >= 50 && uvIndex < 3) {
            items.push({ file: 'foundationB.png', label: '下地' });
        } else {
            items.push({ file: 'foundationB.png', label: '下地' });
            items.push({ file: 'sunscreen.png', label: '日焼け止め' });
        }

        // パウダー
        if (humidity >= 60) {
            items.push({ file: 'powder.png', label: 'パウダー' });
        }

        // ミスト
        if (humidity < 40) {
            items.push({ file: 'mist.png', label: 'ミスト' });
        }

        return items;
    };

    if (isLoading) {
        return (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-500">
                <h3 className="font-bold text-lg mb-2">Cosmetics picked for you</h3>
                <p>天気を読み込み中...</p>
            </section>
        )
    }
    
    const cosmetics = getRecommendedCosmetics();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">
                <span>💄</span>
                今日のベースメイク
            </h3>
            <p className="text-slate-400 text-sm mb-4">湿度 {humidity}% / UV {uvIndex}</p>
            <div className="flex flex-row gap-4">
                {cosmetics.map((item) => (
                    <div>
                    <p className="text-slate-400 text-sm mb-4">{item.label}</p>
                    <img
                        key={item.file}
                        src={new URL(`./images_CosmeticWidget/${item.file}`, import.meta.url).href}
                        alt={item.label}
                        className="w-20 h-20 object-contain"
                    />
                    </div>
                ))}
            </div>
        </div>
    );
    /*return (
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Cosmetics picked for you</h3>
            <h4 className="text-slate-600">下地</h4>
            <h4 className="text-slate-600">パウダー</h4>
            <h4 className="text-slate-600">ミスト</h4>
        </div>
        
    );*/
}

/*import { Newspaper } from 'lucide-react';

function CosmeticWidget() {
  const cosmeticItems = [1, 2, 3];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Newspaper className="text-blue-500" /> Cosmetics picked for you
        </h2>
      </div>
      <ul className="space-y-3">
        {cosmeticItems.map((i) => (
          <li key={i} className="text-sm text-slate-600 border-b border-slate-50 pb-2 last:border-0">
            Loading some interesting cosmetics...
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CosmeticWidget;*/