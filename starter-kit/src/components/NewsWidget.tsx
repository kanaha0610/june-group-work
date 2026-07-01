import { useEffect, useState } from "react";
import { fetchNews } from "../services/news";

type News = {
  title: string;
  link: string;
  source_id: string;
};

export default function NewsWidget() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then((data) => {
        setNews(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>ニュース取得中...</p>;
  }

  return (
    <div 
    style={{
      padding: "20px",
      textAlign: "left",
      fontFamily: "Zen Maru Gothic, sans-serif",
      backgroundColor: "#fff",
      borderRadius: "12px",
    }}
    >
        
     <h3 className="font-bold text-lg mb-2">
  📰 今日のニュース
</h3>

      {news.map((item) => (
        <a key={item.link} href={item.link} target="_blank">
         <div
  key={item.link}
  style={{
    marginBottom: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid #eee",
  }}
>
  <a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "none", color: "#333" }}
  >
    <p>{item.title}</p>
    <small style={{ color: "#888" }}>
      {item.source_id}
    </small>
  </a>
</div>
        </a>
      ))}
    </div>
  );
}
