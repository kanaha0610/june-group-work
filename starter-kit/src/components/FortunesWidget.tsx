import React, { useState, useEffect } from 'react';

// 余り（0〜9）に対応する10パターンのデータ
const FORTUNE_MAPPING = {
  0: { color: "スノーホワイト", item: "新しい歯ブラシ" },
  1: { color: "スカイブルー", item: "昨日カバンに入れたレシート" },
  2: { color: "レモンイエロー", item: "お気に入りの靴" },
  3: { color: "ビビッドピンク", item: "コンビニの新作スイーツ" },
  4: { color: "フォレストグリーン", item: "温かい飲み物" },
  5: { color: "クラシックネイビー", item: "いつもと違う道" },
  6: { color: "ほっこりベージュ", item: "お気に入りのペン" },
  7: { color: "ラベンダーパープル", item: "お守り代わりのリップ" },
  8: { color: "ビターブラウン", item: "ミントタブレット" },
  9: { color: "サンセットオレンジ", item: "スマホのクリーニングクロス" }
};

export default function FortuneWidget() {
  const [fortune, setFortune] = useState({ color: '', item: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFortune() {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Tokyo');
        if (!response.ok) throw new Error('API response was not ok');
        
        const data = await response.json();
        const dateStr = data.datetime.split('T')[0]; 
        const [year, month, date] = dateStr.split('-').map(Number);

        calculateFortune(year, month, date);
      } catch (error) {
        console.error("APIエラーのため、ローカル時間を使用します:", error);
        const now = new Date();
        calculateFortune(now.getFullYear(), now.getMonth() + 1, now.getDate());
      } finally {
        setLoading(false);
      }
    }

    // 10で割った余り（0〜9）で場合分けするロジック
    function calculateFortune(year, month, date) {
      const dateSum = year + month + date;
      
      // 【ここがポイント】10で割った余りを算出（必ず 0 〜 9 になる）
      const remainder = dateSum % 10;

      // マッピングデータから該当する運勢を取得
      const todaysFortune = FORTUNE_MAPPING[remainder];

      setFortune({
        color: todaysFortune.color,
        item: todaysFortune.item
      });
    }

    loadFortune();
  }, []);

  return (
    <div style={{
      padding: '20px', 
      textAlign: 'left', 
      fontFamily: "'Hiragino Kaku Gothic ProN', sans-serif",
      backgroundColor: '#fff',
      borderRadius: '12px',
    }}>
      <h2 style={{ margin: 0, color: '#555' }}>🔮 今日の運勢 🔮</h2>
      
      {loading ? (
        <p style={{ color: '#888' }}>今日の運勢を占っています...</p>
      ) : (
        <div>
          <p className="text-slate-400 text-sm mb-4">
            ラッキーカラー:<br />
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>{fortune.color}</span>
          </p>
          <p className="text-slate-400 text-sm mb-4">
            ラッキーアイテム:<br />
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>{fortune.item}</span>
          </p>
        </div>
      )}
    </div>
  );
}