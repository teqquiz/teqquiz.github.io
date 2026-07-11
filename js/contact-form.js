// お問い合わせフォームの送信処理（Web3Forms）
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const result = document.getElementById('form-result');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData));

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
                    result.textContent = '送信が完了しました。お問い合わせありがとうございます。数日以内に返信いたします。';
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
