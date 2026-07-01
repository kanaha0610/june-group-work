const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

export async function fetchNews() {
  const res = await fetch(
    `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=jp&language=ja`
  );

  if (!res.ok) {
    throw new Error("ニュース取得失敗");
  }

  const data = await res.json();

  return data.results.slice(0, 3);
}
