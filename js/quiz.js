// quiz.js
// questions.json から今日の日付に対応する問題を1問表示する

fetch('data/questions.json')
    .then(res => res.json())
    .then(questions => {
        if (!questions || questions.length === 0) return;

        // 日付（YYYY-MM-DD）をシードにして問題を選ぶ
        const today = new Date();
        const seed = today.getFullYear() * 10000
                   + (today.getMonth() + 1) * 100
                   + today.getDate();
        const index = seed % questions.length;

        const item = questions[index];
        document.getElementById('question-text').textContent = item.q;
        document.getElementById('answer-text').textContent = 'A. ' + item.a;
    })
    .catch(() => {
        document.getElementById('question-text').textContent = '問題を読み込めませんでした。';
    });
