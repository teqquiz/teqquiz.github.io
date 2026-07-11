# teqquiz.github.io

東京科学大学クイズ研究会 **TEQ（てっく）** の公式サイトです。

🌐 https://teqquiz.github.io

---

## ページ構成

| ファイル | 内容 |
|---|---|
| `index.html` | トップページ・各ページへのナビゲーション・今日の1問 |
| `join.html` | 入会案内 |
| `schedule.html` | 活動紹介・年間スケジュール |
| `blog.html` | 活動ブログ |
| `booth.html` | 問題集の販促ページ |
| `contact.html` | 連絡先（X・メール）・お問い合わせフォーム |
| `history.html` | TEQの歴史・由来 |

## ディレクトリ構成

```
/
├── *.html
├── css/
│   └── style.css
├── js/
│   ├── menu.js       # ハンバーガーメニュー（全ページ共通）
│   ├── footer.js     # フッター（全ページ共通）
│   ├── quiz.js       # 今日の1問ロジック
│   └── contact-form.js # お問い合わせフォームの送信処理
├── img/              # 画像素材
└── data/
    └── questions.json  # 今日の1問 問題データ
```

## コンテンツの更新

### 今日の1問を追加する

`data/questions.json` に以下の形式で追記する。

```json
[
  { "q": "問題文", "a": "答え" },
  { "q": "問題文", "a": "答え" }
]
```

日付をもとに自動で1問が選ばれるため、問題数が増えるほど日替わりのサイクルが長くなる。

### ブログ記事を追加する

`blog.html` の `<div id="blog-list">` 内に以下のブロックをコピーして追記する。

```html
<div class="blog-card">
    <div class="blog-card-meta">YYYY年MM月DD日 ／ カテゴリ</div>
    <div class="blog-card-title">記事タイトル</div>
    <div class="blog-card-excerpt">本文の抜粋...</div>
</div>
```

### お問い合わせフォームの管理

`contact.html` のお問い合わせフォームは、無料サービス **[Web3Forms](https://web3forms.com/)** を使ってメール送信している（GitHub Pages は静的サイトのためサーバー側でメールを送れないため）。

- **ログイン**：Web3Forms のサイトから **Google アカウント（teqquiz@gmail.com）でログイン**する
- 送信された内容は **teqquiz@gmail.com** に届き、そのまま返信できる（フォームには送信者のメールアドレスが必須項目として含まれる）
- 送信先の切り替えやスパム設定などは Web3Forms の管理画面から変更できる
- `contact.html` 内の `access_key`（`name="access_key"` の hidden input）が Web3Forms と紐づくキー。フォームを作り直した場合はこの値を差し替える

## 技術スタック

- 静的 HTML / CSS / JavaScript（フレームワークなし）
- ホスティング：GitHub Pages

## デザイン

| 役割 | カラーコード |
|---|---|
| メインカラー | `#1C3177` |
| サブカラー | `#7F96C2` |
