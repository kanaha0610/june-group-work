import React, { useState, useEffect } from 'react';

interface TrainLine {
  name: string;
  status: string;
  url: string;
  isDelay: boolean;
}

export default function TrainStatusWidget() {
  // 初期データ（APIから取るまでの仮表示）
  const [lines, setLines] = useState<TrainLine[]>([
    { name: '山手線', status: '取得中...', url: 'https://traininfo.jreast.co.jp/train_info/kanto.aspx', isDelay: false },
    { name: '東西線', status: '取得中...', url: 'https://www.tokyometro.jp/unkou/', isDelay: false }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💡【テスト用】1秒後にデータをパッと切り替える（API風の動き）
    // 本物のAPI URLが決まったら、ここを fetch() の処理に書き換えてください！
    const timer = setTimeout(() => {
      const mockData: TrainLine[] = [
        {
          name: '山手線',
          status: '一部遅延あり',
          url: 'https://traininfo.jreast.co.jp/train_info/kanto.aspx',
          isDelay: true,
        },
        {
          name: '東西線',
          status: '平常運転',
          url: 'https://www.tokyometro.jp/unkou/',
          isDelay: false,
        },
      ];
      setLines(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🚃</span>
        <h2 className="font-semibold text-lg text-slate-800">電車の運行情報</h2>
      </div>

      <div className="space-y-3">
        {lines.map((line, index) => (
          <a
            key={index}
            href={line.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex justify-between items-center p-3 rounded-xl border transition-all duration-200 block ${
              line.isDelay
                ? 'bg-red-50 border-red-100 hover:bg-red-100' // 遅延時の色
                : 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100' // 通常時の色
            }`}
          >
            {/* 路線名 */}
            <span className={`font-medium text-sm ${line.isDelay ? 'text-red-700' : 'text-emerald-700'}`}>
              {line.name}
            </span>

            {/* 運行ステータス */}
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
              line.isDelay ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {line.status}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}