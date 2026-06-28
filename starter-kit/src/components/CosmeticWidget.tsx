import { useState , useEffect } from 'react';

export default function CosmeticWidget() {

    const [ humidity, setHumidity ] = useState(0);
    const [ uvIndex, setUvIndex ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=a07002e8d3fe445eb7b141328262706&q=Tokyo&lang=ja`)
            .then(res => res.json())
            .then(data => {
                setHumidity(data.current.humidity);
                setUvIndex(data.current.uvIndex);
                setIsLoading(false);
      });
    }, []);

    // おすすめコスメを決める
    const getRecommendedCosmetics = () => {
        const items: string[] = [];

        // 下地・日焼け止め
        if (humidity < 50 && uvIndex < 3) {
            items.push('foundationA.png');
        } else if (humidity < 50 && uvIndex >= 3) {
            items.push('foundationA.png');
            items.push('sunscreen.png');
        } else if (humidity >= 50 && uvIndex < 3) {
            items.push('foundationB.png');
        } else {
            items.push('foundationB.png');
            items.push('sunscreen.png');
        }

        // パウダー
        if (humidity >= 60) {
            items.push('powder.png');
        }

        // ミスト
        if (humidity < 40) {
            items.push('mist.png');
        }

        return items;
    };

    if (isLoading) {
        return (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-500">
                天気を読み込み中...
                </section>
        )
    }
    
    const cosmetics = getRecommendedCosmetics();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Cosmetics picked for you</h3>
            <p className="text-slate-400 text-sm mb-4">湿度 {humidity}% / UV {uvIndex}</p>
            <div className="flex flex-row gap-4">
                {cosmetics.map((img) => (
                    <img
                        key={img}
                        src={new URL(`../components/images_CosmeticWidget/${img}`, import.meta.url).href}
                        alt={img}
                        className="w-20 h-20 object-contain"
                    />
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