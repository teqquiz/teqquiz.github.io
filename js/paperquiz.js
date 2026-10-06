// ペーパークイズ解答ページ（paperquiz2026.html）の処理
// ・点数入力 → コメント表示
// ・感想フォームの送信（Web3Forms）
document.addEventListener('DOMContentLoaded', function () {
    const TOTAL = 17;

    // 点数ごとのコメント（上から順に、min 点以上なら採用）
    const COMMENTS = [
        { min: 17, rank: '🏆 全問正解！', comment: 'おめでとうございます、完璧です！ その知識量、ぜひ TEQ で早押しクイズに活かしてみませんか？' },
        { min: 14, rank: '🥇 クイズ王級', comment: 'お見事！ ほとんどの問題を解ききりました。あと一歩で全問正解、相当なクイズ力の持ち主です。' },
        { min: 10, rank: '🥈 かなりの物知り', comment: '素晴らしい！ 幅広いジャンルに強いですね。間違えた問題も、これで次は答えられるはず。' },
        { min: 6, rank: '🥉 なかなかの実力', comment: 'いい調子です！ 知っている問題で確実に点を取れています。解説を読んで知識を増やしていきましょう。' },
        { min: 3, rank: '📚 伸びしろたっぷり', comment: '少し難しかったでしょうか。でも答えを知ると「へぇ〜」となる問題ばかりだったはず。それがクイズの楽しさです！' },
        { min: 0, rank: '🌱 クイズの世界へようこそ', comment: '今回は苦戦しましたね。でも大丈夫、誰でも最初はここから。参加してくれてありがとうございました！' }
    ];

    // --- 感想フォームの点数欄の選択肢を生成 ---
    const fbScore = document.getElementById('fb-score');

    for (let i = TOTAL; i >= 0; i--) {
        fbScore.insertAdjacentHTML('beforeend', `<option value="${i}点">${i}点</option>`);
    }

    // --- 点数判定 ---
    const scoreForm = document.getElementById('score-form');
    const scoreInput = document.getElementById('score-input');
    const scoreError = document.getElementById('score-error');
    const scoreResult = document.getElementById('score-result');

    scoreForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const value = scoreInput.value.trim();
        const score = Number(value);

        if (value === '' || !Number.isInteger(score) || score < 0 || score > TOTAL) {
            scoreError.textContent = `0〜${TOTAL} の整数で入力してください。`;
            scoreResult.hidden = true;
            return;
        }

        const entry = COMMENTS.find(function (c) { return score >= c.min; });
        scoreError.textContent = '';
        document.getElementById('score-rank').textContent = `${score} / ${TOTAL} 問正解　${entry.rank}`;
        document.getElementById('score-comment').textContent = entry.comment;
        scoreResult.hidden = false;

        // 感想フォームの点数欄にも反映
        fbScore.value = `${score}点`;
    });

    // --- 感想フォームの送信（Web3Forms） ---
    const form = document.getElementById('feedback-form');
    const result = document.getElementById('feedback-result');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const json = JSON.stringify(Object.fromEntries(new FormData(form)));

        result.className = 'form-result sending';
        result.textContent = '送信中です...';
        submitBtn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.status === 200) {
                    result.className = 'form-result success';
                    result.textContent = '送信しました。感想をお寄せいただき、ありがとうございました！';
                    form.reset();
                } else {
                    result.className = 'form-result error';
                    result.textContent = data.message || '送信に失敗しました。時間をおいて再度お試しください。';
                }
            })
            .catch(() => {
                result.className = 'form-result error';
                result.textContent = '送信に失敗しました。通信環境をご確認のうえ、再度お試しください。';
            })
            .finally(() => {
                submitBtn.disabled = false;
            });
    });
});
