---
marp: true
theme: default
paginate: true
header: "Web Development Workshop: Week 03"
footer: "Morning Dashboard Project - API & useEffect"
---
<style>
section {
    background-color: #f8fafc;
    color: #334155;
    font-family: 'Inter', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Noto Sans JP', sans-serif;
}
h1, h2, h3 {
    color: #0ea5e9;
}
footer, header {
    color: #64748b;
    opacity: 0.8;
}
a {
    color: #0284c7;
}
code, pre {
    background-color: #1e293b !important;
    color: #e2e8f0 !important;
}
.box {
    border: 2px dashed #0ea5e9;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    background: #e0f2fe;
}
.failure {
    border: 2px solid #ef4444;
    background: #fef2f2;
    padding: 10px;
    border-radius: 8px;
}
.success {
    border: 2px solid #22c55e;
    background: #f0fdf4;
    padding: 10px;
    border-radius: 8px;
}
.warning {
    border: 2px solid #f59e0b;
    background: #fffbeb;
    padding: 10px;
    border-radius: 8px;
}
.two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
table {
    font-size: 0.85em;
}
</style>

# 第3週: API通信と魔法のフック
## 〜 外の世界からデータを取ってくる 〜

<!-- 
【講師用台本】
第3週へようこそ！
先週は画面を綺麗な「箱（コンポーネント）」に分けました。しかし、今の箱の中身はダミーデータです。
今日は、いよいよ外の世界（API）から本物のデータを取ってきて、箱に流し込みます。
ここで立ちはだかるのが「非同期処理」と「無限ループの罠」です。
一歩間違えるとブラウザがフリーズするので、しっかりルールを学んでいきましょう！
-->

---

## 本日のメニュー

1. **APIとは？:** インターネット上の情報レストラン
2. **HTTPの基礎:** リクエストとレスポンスの仕組み
3. **非同期処理:** カレーを作りながらサラダを作る
4. **失敗例:** 恐怖の無限ループ
5. **解決策:** 魔法のフック `useEffect`
6. **async/await:** モダンな非同期処理の書き方
7. **おもてなし:** ローディングとエラー処理
8. **プロの技:** クリーンアップとカスタムフック
9. **デバッグ術:** ネットワークタブの使い方
10. **実践タイム:** 自分のウィジェットに命を吹き込もう！

---

## 1. APIとは？（情報レストラン）

API（Application Programming Interface）は、インターネット上にある**「情報レストラン」**です。

<div class="box" style="font-family: monospace; line-height: 1.6;">
📱 <b>あなた (Client)</b><br>
&nbsp;│ ①「東京の天気を教えて！」(<b>Request</b>)<br>
&nbsp;▼<br>
💁‍♂️ <b>ウェイター (API)</b><br>
&nbsp;│ ② 厨房の巨大なデータベースを検索<br>
&nbsp;▼<br>
🍳 <b>厨房 (Server)</b><br>
&nbsp;│ ③「晴れ」のデータをJSONに調理<br>
&nbsp;▼<br>
💁‍♂️ <b>ウェイター (API)</b><br>
&nbsp;│ ④「晴れです」とお届け (<b>Response</b>)<br>
&nbsp;▼<br>
📱 <b>あなた (画面に表示)</b>
</div>

この注文をするためのJavaScriptの命令が **`fetch`** です。

---

## 2. HTTPの基礎：リクエストとレスポンス

APIとの通信は**HTTP（HyperText Transfer Protocol）**というルールで行われます。

<div class="two-column">
<div>

### 📤 リクエスト（注文）
- **URL**: どこに注文するか
- **メソッド**: 何をしたいか
- **ヘッダー**: 追加情報
- **ボディ**: 送りたいデータ

</div>
<div>

### 📥 レスポンス（返答）
- **ステータスコード**: 結果の番号
- **ヘッダー**: 追加情報
- **ボディ**: 受け取るデータ（JSON等）

</div>
</div>

---

## 2. HTTPメソッド（CRUD操作）

| メソッド | 操作 | 用途の例 |
|:------:|:----:|:--------|
| **GET** | Read（取得） | ニュース一覧を取得、ユーザー情報を取得 |
| **POST** | Create（作成） | 新しいTodoを追加、コメントを投稿 |
| **PUT** | Update（更新） | プロフィールを編集、設定を変更 |
| **PATCH** | Update（部分更新） | 名前だけ変更、ステータスだけ変更 |
| **DELETE** | Delete（削除） | Todoを削除、アカウントを削除 |

<div class="box">
💡 <b>覚え方（CRUD）</b>: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE
</div>

---

## 2. HTTPステータスコード（返答の意味）

| コード | 意味 | あなたがすべきこと |
|:-----:|:-----|:-----------------|
| **200** | ✅ OK（成功） | データを使う |
| **201** | ✅ Created（作成成功） | POSTが成功した |
| **400** | ❌ Bad Request | リクエストの書き方を見直す |
| **401** | 🔐 Unauthorized | ログインが必要 |
| **403** | 🚫 Forbidden | アクセス権限がない |
| **404** | 🔍 Not Found | URLが間違っている |
| **429** | ⏱️ Too Many Requests | API呼びすぎ（制限超過） |
| **500** | 💥 Server Error | サーバー側の問題（待つしかない） |

---

## 3. 非同期処理とは？（フードコートの呼び出しベル）

APIに注文してからデータが届くまで、**「待ち時間」**が発生します。

- ❌ **同期処理（ダメな例）**:
  レジの前で立ち尽くして待つ。他の人は注文できず、お店の時間が止まる。（＝**画面がフリーズ！**）

- ⭕ **非同期処理（Reactの書き方）**:
  注文したら**「呼び出しベル（Promise）」**をもらって席に着く。
  待っている間は、お水を飲んだり会話したりする（＝**先に画面の枠だけ描画する**）。
  ベルが鳴ったら（`.then`）、料理（データ）を受け取る！

---

## 3. 恐怖の失敗例

「じゃあ、コンポーネントの中でAPIを呼んで、結果を `useState` に入れよう！」
...実はこれ、**絶対にやってはいけない書き方**です。

<div class="failure">

```tsx
function WeatherWidget() {
  const [temp, setTemp] = useState(0);

  // ❌ コンポーネントの中に直接fetchを書く
  fetch("https://api.weather.com/tokyo")
    .then(res => res.json()) // ベルが鳴ったら
    .then(data => {
      setTemp(data.temp);    // 👈 状態を更新！
    });

  return <p>{temp}度</p>;
}
```

</div>

---

## 3. なぜ無限ループするのか？（図解）

先週学んだルールのせいで、**「恐怖のデス・ループ」**が起きてしまいます。
**ルール：`useState` の値が更新されると、コンポーネントは再描画（上から再実行）される**

<div class="box">
🔄 <b>無限ループの仕組み</b><br><br>
1️⃣ 画面を描画<br>
 ⬇️<br>
2️⃣ fetch でデータ取得<br>
 ⬇️<br>
3️⃣ setTemp でデータを保存<br>
 ⬇️ （Stateが変わると...）<br>
4️⃣ React「値が変わった！画面を描き直さなきゃ！」👉 <b>1️⃣へ戻る</b><br>
 ⬇️<br>
5️⃣ 画面を描画（再）👉 そして再び fetch... 💣💥
</div>

※ 数秒で数千回APIを叩くことになり、API提供元から**アカウントをBAN**されます。

---

## 4. 解決策：魔法のフック `useEffect`

「最初に画面が表示された時だけ、1回だけAPIを呼びたい」。
それを叶えるのが **`useEffect`** です。

```tsx
import { useState, useEffect } from 'react';

function WeatherWidget() {
  const [temp, setTemp] = useState(0);

  // useEffect( やりたいこと, [いつやるか] )
  useEffect(() => {
    fetch("https://api.weather.com/tokyo")
      .then(res => res.json())
      .then(data => setTemp(data.temp));
  }, []); // 👈 この空の配列 [] が「最初の一回だけ」の呪文！

  return <p>{temp}度</p>;
}
```

---

## 5. 依存配列 `[]` を絶対に忘れないで！

`useEffect` の第2引数にある配列 `[]` を **「依存配列」** と呼びます。

| 書き方 | いつ実行される | 使用例 |
|:------|:-------------|:------|
| `[]` (空っぽ) | **最初の一回だけ** | 初期データ取得 |
| `[keyword]` | `keyword`が**変わった時** | 検索、フィルタリング |
| `[a, b]` | `a`か`b`が**変わった時** | 複数条件に依存 |
| **書き忘れ** | **毎回実行**（危険！） | 無限ループの原因 |

<div class="warning">
⚠️ <b>★ APIを叩くときは、必ず <code>[]</code> がついているか指差し確認しましょう！</b>
</div>

---

## 6. async/await：モダンな非同期処理

`.then` チェーンは読みにくくなりがち。**async/await** を使うと、同期処理のように書けます。

<div class="two-column">
<div>

**❌ .then チェーン（従来）**
```tsx
useEffect(() => {
  fetch(url)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => setError(err));
}, []);
```

</div>
<div>

**✅ async/await（モダン）**
```tsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err);
    }
  };
  fetchData();
}, []);
```

</div>
</div>

---

## 6. なぜ useEffect の中で直接 async を使えないのか？

```tsx
// ❌ これはエラーになる！
useEffect(async () => {
  const data = await fetch(url);
}, []);
```

<div class="failure">
<b>理由</b>: useEffectは「クリーンアップ関数」を返すことを期待しているが、<br>
async関数は常に「Promise」を返すため、Reactが混乱してしまう。
</div>

<div class="success">
<b>解決策</b>: useEffectの中で関数を定義し、それを呼び出す

```tsx
useEffect(() => {
  const fetchData = async () => { /* ... */ };
  fetchData(); // 定義した関数を呼び出す
}, []);
```
</div>

---

## 7. おもてなし：ローディング表示

APIを待っている間、画面が真っ白だとユーザーは不安になります。「今データを取ってきているよ」と伝えるのがプロの仕事です。

```tsx
function WeatherWidget() {
  const [temp, setTemp] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 👈 ローディング状態を追加

  useEffect(() => {
    fetch("...")
      .then(res => res.json())
      .then(data => {
        setTemp(data.temp);
        setIsLoading(false); // 👈 データが来たらローディング終了！
      });
  }, []);

  if (isLoading) {
    return <p className="text-slate-400 animate-pulse">読み込み中...</p>;
  }

  return <p>{temp}度</p>;
}
```

---

## 8. API実装レシピ集（CRUDとエラー処理）

ここからはコピペで使えるAPI通信の基本レシピです。

**レシピ1: データのリストを取得・表示する (GET)**
ニュースや予定のリストなど、複数のデータを配列で取得する場合の書き方です。
```tsx
const [items, setItems] = useState([]); // 👈 初期値は空の配列 [] にする！

useEffect(() => {
  fetch("https://api.example.com/items")
    .then(res => res.json())
    .then(data => setItems(data)); // 配列を丸ごと保存
}, []);

// 表示する時は map を使い、必ず key を設定する
return (
  <ul>
    {items.map(item => <li key={item.id}>{item.title}</li>)}
  </ul>
);
```

---

## 8. API実装レシピ集（続き）

**レシピ2: データを送信・追加する (POST)**
Todoリストの追加など、自分のデータをサーバーに送る書き方です。
（※これは `useEffect` ではなく、ボタンのクリックなどで実行します）

```tsx
const handleAdd = () => {
  const newTask = { title: "牛乳を買う" };
  
  fetch("https://api.example.com/tasks", {
    method: "POST", // 👈 送信を意味するメソッド
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask) // 👈 JSのオブジェクトをJSON文字列に変換
  })
  .then(res => res.json())
  .then(data => console.log("保存完了！", data));
};
```

---

## 8. API実装レシピ集（エラーハンドリング）

**レシピ3: エラーから復活する (catch)**
APIが落ちていたり、スマホが圏外の時に画面を壊さないためのプロの作法です。

```tsx
const [error, setError] = useState(null);

useEffect(() => {
  fetch("https://api.example.com/data")
    .then(res => {
      if (!res.ok) throw new Error("データの取得に失敗しました");
      return res.json();
    })
    .then(data => setData(data))
    .catch(err => setError(err.message)); // 👈 エラーを捕まえて状態に保存
}, []);

// エラーが発生していたら、専用のメッセージを表示する
if (error) return <p className="text-red-500 font-bold">🚨 {error}</p>;
```

---

## 9. プロの技：クリーンアップ関数

コンポーネントが画面から消える時、実行中のfetchをキャンセルしないと**メモリリーク**が発生します。

```tsx
useEffect(() => {
  const controller = new AbortController(); // 👈 中断用のコントローラー

  const fetchData = async () => {
    try {
      const res = await fetch(url, { signal: controller.signal });
      const data = await res.json();
      setData(data);
    } catch (err) {
      if (err.name !== 'AbortError') { // キャンセルエラーは無視
        setError(err.message);
      }
    }
  };
  fetchData();

  // 👇 クリーンアップ関数：コンポーネントが消える時に実行される
  return () => controller.abort();
}, []);
```

---

## 9. なぜクリーンアップが必要なのか？

<div class="box">
🔄 <b>問題のシナリオ</b><br><br>
1️⃣ ユーザーがページAを開く → APIリクエスト開始<br>
2️⃣ データが届く前に、ユーザーがページBに移動<br>
3️⃣ ページAのコンポーネントは消えたが、APIはまだ実行中...<br>
4️⃣ データが届いて、存在しないコンポーネントのsetStateを呼ぼうとする<br>
5️⃣ 💥 エラー発生！または古いデータが表示される
</div>

<div class="success">
✅ <b>クリーンアップ関数</b>を使えば、コンポーネントが消える時にAPIリクエストを中断できる！
</div>

---

## 9. カスタムフック：useFetch を作ろう

同じfetchのロジックを何度も書くのは面倒。**カスタムフック**で再利用可能にしよう！

```tsx
// hooks/useFetch.ts
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { setData(data); setIsLoading(false); })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message); setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}
```

---

## 9. カスタムフックの使い方

作ったカスタムフックは、たった1行で使えます！

```tsx
function WeatherWidget() {
  // 👇 3行のコードが1行に！
  const { data, isLoading, error } = useFetch<WeatherData>(
    "https://api.weather.com/tokyo"
  );

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;

  return <p>{data?.temp}度</p>;
}
```

<div class="success">
✅ <b>カスタムフックの命名規則</b>: 必ず <code>use</code> で始める（useXxx）<br>
これによりReactがフックとして認識し、ルールを適用してくれる
</div>

---

## 10. デバッグ術：Networkタブの使い方

APIがうまく動かない時は、**ブラウザの開発者ツール**のNetworkタブを確認しよう！

<div class="box">
<b>開き方</b>: F12キー → 「Network」タブを選択 → ページをリロード
</div>

| 確認項目 | 見るべきポイント |
|:--------|:---------------|
| **Status** | 200なら成功、400/500系ならエラー |
| **Response** | 実際に返ってきたデータ（JSON）を確認 |
| **Headers** | リクエストヘッダー、レスポンスヘッダー |
| **Timing** | どれくらい時間がかかったか |

---

## 10. よくあるエラーと解決法

| エラー | 原因 | 解決法 |
|:------|:----|:------|
| **CORS error** | 別ドメインへのアクセス拒否 | バックエンドでCORS設定が必要 |
| **404 Not Found** | URLが間違っている | URLをコピペで確認 |
| **401 Unauthorized** | APIキーが無い/間違い | APIキーを確認 |
| **429 Too Many Requests** | 呼びすぎ | 無限ループ？依存配列を確認 |
| **TypeError: data.map is not a function** | dataが配列じゃない | console.logでdataの中身を確認 |
| **Cannot read property of undefined** | データが来る前にアクセス | オプショナルチェーン `?.` を使う |

---

## 10. デバッグのベストプラクティス

```tsx
useEffect(() => {
  const fetchData = async () => {
    console.log("🚀 fetch開始"); // ① いつ呼ばれたか確認

    try {
      const res = await fetch(url);
      console.log("📥 レスポンス:", res.status); // ② ステータス確認

      const data = await res.json();
      console.log("📦 データ:", data); // ③ データの形を確認

      setData(data);
    } catch (err) {
      console.error("❌ エラー:", err); // ④ エラー内容確認
    }
  };
  fetchData();
}, []);
```

<div class="warning">
⚠️ <b>本番環境にデプロイする前に、console.logは削除しましょう！</b>
</div>

---

## 発展：ライブラリを使うともっと楽に

実務では、fetchを直接使うよりもライブラリを使うことが多いです。

| ライブラリ | 特徴 |
|:---------|:----|
| **TanStack Query** (React Query) | キャッシュ、再取得、状態管理が自動 |
| **SWR** | Vercel製、シンプルで軽量 |
| **Axios** | fetch のラッパー、インターセプター機能 |

```tsx
// TanStack Query の例
import { useQuery } from '@tanstack/react-query';

function WeatherWidget() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', 'tokyo'],
    queryFn: () => fetch(url).then(res => res.json())
  });
  // ... 自動でキャッシュ、再取得、エラーリトライを管理！
}
```

---

## 11. 実践タイム: 自分のウィジェットに命を吹き込もう

**今日のチームミッション：**

### ステップ1: APIを選ぶ
- `docs/api-catalog.md` を開いて、使いたいAPIをチームで1つ選ぶ

### ステップ2: 基本実装
- `useEffect` と `fetch` でデータを取得
- `console.log` でデータの形を確認（Networkタブも活用！）
- `useState` に保存して画面に表示

### ステップ3: ユーザー体験を向上
- ローディング状態を追加
- エラー処理を追加

---

## 11. 実装チェックリスト

実装が終わったら、以下をチェックしましょう！

<div class="box">

- [ ] `useEffect` に**依存配列 `[]`** がついている
- [ ] **ローディング中**の表示がある
- [ ] **エラー時**の表示がある
- [ ] `console.log` で**データの形**を確認した
- [ ] **Networkタブ**でステータスコードを確認した
- [ ] APIキーを使う場合は **`.env`** に保存している

</div>

---

## 11. 余裕があるチームへの追加課題

<div class="success">

**🌟 チャレンジ課題**

1. **カスタムフック化**: useFetch フックを作成して再利用可能にする
2. **クリーンアップ**: AbortController でキャンセル処理を実装
3. **再取得ボタン**: ボタンクリックでAPIを再取得する機能を追加
4. **型定義**: TypeScriptで取得データの型を定義する

</div>

---

## 今週のまとめ

<div class="two-column">
<div>

### 学んだこと
- APIとHTTP通信の基礎
- 非同期処理と無限ループの罠
- `useEffect` の使い方
- async/await構文
- ローディング・エラー処理
- クリーンアップの重要性

</div>
<div>

### 重要ポイント
- 🔴 依存配列 `[]` を忘れない
- 🔴 `useEffect` の中で直接 async を使わない
- 🔴 エラー処理を必ず書く
- 🔴 Networkタブでデバッグ
- 🔴 本番前に console.log を消す

</div>
</div>

---

## 次週予告

### 第4週: 複数コンポーネント間のデータ共有

- Props のバケツリレー問題
- Context API による状態管理
- グローバルな状態 vs ローカルな状態

**予習**: 今日作ったウィジェットを動かしておいてね！

---

## 付録: fetch のテンプレート

コピペして使ってOK！必要な部分だけ変更してください。

```tsx
import { useState, useEffect } from 'react';

function MyWidget() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.example.com/data", { signal: controller.signal })
      .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then(json => { setData(json); setIsLoading(false); })
      .catch(err => { if (err.name !== 'AbortError') { setError(err.message); setIsLoading(false); }});

    return () => controller.abort();
  }, []);

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;
  return <div>{/* dataを使って表示 */}</div>;
}
```

---

## 付録: TypeScript での型定義例

```tsx
// 取得するデータの型を定義
interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  city: string;
}

// ジェネリクスで型を指定
const [data, setData] = useState<WeatherData | null>(null);

// オプショナルチェーンで安全にアクセス
return (
  <div>
    <p>気温: {data?.temp}度</p>
    <p>湿度: {data?.humidity}%</p>
    <p>天気: {data?.description}</p>
  </div>
);
```

<div class="box">
💡 <b>オプショナルチェーン <code>?.</code></b>: dataがnullでもエラーにならず、undefinedを返す
</div>
