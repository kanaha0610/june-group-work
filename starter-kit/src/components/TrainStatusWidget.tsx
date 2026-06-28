import React, { useState, useEffect } from 'react';

interface TrainLine {
  name: string;
  status: string;
  url: string;
  isDelay: boolean;
}

export default function TrainStatusWidget() {
  const [lines, setLines] = useState<TrainLine[]>([
    { name: '山手線', status: '取得中...', url: 'https://traininfo.jreast.co.jp/train_info/kanto.aspx', isDelay: false },
    { name: '東西線', status: '取得中...', url: 'https://www.tokyometro.jp/unkou/', isDelay: false }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💡 外部APIが落ちていても動くよう、1秒後にデータをパッと切り替える（疑似API化）
    const timer = setTimeout(() => {
      // 本日の実際の運行状況に合わせて、ここの文字や isDelay を書き換えてテストできます！
      const mockData = [
        { 
          name: '山手線', 
          status: '一部列車に遅れ', 
          url: 'https://traininfo.jreast.co.jp/train_info/kanto.aspx', 
          isDelay: true 
        },
        { 
          name: '東西線', 
          status: '平常運転', 
          url: 'https://www.tokyometro.jp/unkou/', 
          isDelay: false 
        }
      ];

      setLines(mockData);
      setLoading(false);
    }, 1000); // 1000ミリ秒（1秒）待つ設定

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚃</span>
          <h2 className="font-semibold text-lg text-slate-800">電車の運行情報</h2>
        </div>
        {loading && <span className="text-xs text-slate-400 animate-pulse">更新中...</span>}
      </div>
      
      <div className="space-y-3">
        {lines.map((line) => {
          const bgClass = line.isDelay ? 'bg-red-50 border-red-100 hover:bg-red-100' : 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100';
          const textClass = line.isDelay ? 'text-red-700' : 'text-emerald-700';
          const badgeClass = line.isDelay ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800';

          return (
            <a 
              key={line.name}
              href={line.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex justify-between items-center p-3 rounded-xl border ${bgClass} transition-colors block cursor-pointer`}
            >
              <span className={`font-medium text-sm ${textClass}`}>{line.name}</span>
              <span className={`px-2 py-0.5 text-xs font-semibold ${badgeClass} rounded-full`}>
                {line.status}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}