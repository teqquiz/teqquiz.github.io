// footer.js

const footerHtml = `
<footer style="text-align: center; padding: 20px; font-size: 0.8rem; color: #666;">
    &copy; 2026 〇〇大学 クイズ研究会
</footer>
`;

// ページの一番下（beforeend）に追加する
document.body.insertAdjacentHTML('beforeend', footerHtml);
