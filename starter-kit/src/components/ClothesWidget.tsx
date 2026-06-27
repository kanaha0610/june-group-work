import React, { useState, useEffect } from 'react';
// ※もしlucide-reactなどのアイコンライブラリを使っている場合は適宜インポートしてください
// import { CloudSun, Umbrella, Thermometer } from 'lucide-react';

  function ClothesWidget() {
  // 状態管理（天気データ、画像URL、服のテキスト、読み込み状態）
  const [weatherData, setWeatherData] = useState<{ temp: number; main: string } | null>(null);
  const [outfit, setOutfit] = useState({ text: '読み込み中...', image: '' });
  const [loading, setLoading] = useState(true);

  // APIキーと都市名（ご自身の環境に合わせて書き換えてください）
  const API_KEY = "c5099a123d35708a80218aba1b3e7b98";
  const CITY = "Tokyo"; 

  useEffect(() => {
    // 1. APIから天気データを取得
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=ja`)
      .then((res) => res.json())
      .then((data) => {
        const temp = data.main.temp;
        const main = data.weather[0].main.toLowerCase();
        setWeatherData({ temp, main });

        // 2. 天気と気温による条件分岐（画像と服の決定）
        let clothesText = "";
        let imagePath = "";

          if (main.includes("rain") || main.includes("snow")) {
            //雨・雪など
          if (temp >= 20) {
            clothesText = "半そでか長そでシャツ（雨と雪対策で傘は必須！）";
            imagePath = "images.outfit_summer_rain.jpg";
          } else if (temp >= 10 && temp < 20) {
            clothesText = "パーカー（雨と雪対策で傘は必須！）";
            imagePath = "images.outfit_spring_rain.jpg";
          } else {
            clothesText = "ダウンジャケット、防水靴、マフラー（雨と雪対策で傘は必須！）";
            imagePath = "images.outfit_winter_rain.jpg";
          }
        } else {
          // 晴れ・曇りなど
          if (temp >= 25) {
            clothesText = "半そでまたはノースリーブ、サンダル";
            imagePath = "images.outfit_25deg_up.jpg";
          } else if (temp >= 20 && temp < 25) {
            clothesText = "長そでシャツ、カーディガン";
            imagePath = "images.outfit_20_24deg.jpg";
          } else if (temp >= 15 && temp < 20) {
            clothesText = "薄手ニット、ジャケット、スウェット";
            imagePath = "images.outfit_15_20deg.jpg";
          } else if (temp >= 10 && temp < 15) {
            clothesText = "トレンチコート、厚手ニット";
            imagePath = "images.outfit_10_14deg.jpg";
          } else {
            clothesText = "ダウンジャケット、チェスターコート、マフラー";
            imagePath = "outfit_9deg_under.jpg";
          }
        }

        setOutfit({ text: clothesText, image: imagePath });
        setLoading(false);
      })
      .catch((err) => {
        console.error("天気データの取得に失敗しました", err);
        setOutfit({ text: "データ取得エラー", image: "" });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-500">
        天気を読み込み中...
      </section>
    );
  }

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2 text-slate-800">
          <span>👕</span> 今日のコーディネート
        </h2>
        <span className="text-sm font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
          {CITY}: {weatherData ? Math.round(weatherData.temp) + '°C' : '--°C'}
``
        </span>
      </div>

      {/* メインコンテンツ（画像と服の提案） */}
      <div className="flex flex-col gap-4">
        {outfit.image && (
          <div className="w-full h-64 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
            <img 
              src={outfit.image} 
              alt="本日の服装" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // 画像が読み込めなかった場合のフォールバック
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          </div>
        )}
        
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium mb-1">RECOMMENDED OUTFIT</p>
          <p className="text-slate-700 font-semibold">{outfit.text}</p>
        </div>
      </div>
    </section>
  );
}

export default ClothesWidget;