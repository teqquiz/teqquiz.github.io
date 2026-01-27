// menu.js

const menuHtml = `
<div class="hamburger-menu">
    <input type="checkbox" id="menu-btn-check">
    <label for="menu-btn-check" class="menu-btn"><span></span></label>
    <div class="menu-content">
        <ul>
            <li><a href="index.html">ホーム</a></li>
            <li><a href="join.html">入会案内</a></li>
            <li><a href="schedule.html">スケジュール</a></li>
            <li><a href="contact.html">連絡先</a></li>
            <li><a href="contact.html">歴史</a></li>
            </ul>
    </div>
</div>
`;

// 文書の中に、このHTMLを書き出す命令
document.write(menuHtml);
