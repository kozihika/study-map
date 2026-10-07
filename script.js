// 鳥の目の箱（<a href="#ID">）をタップすると、
// 虫の目の <article id="ID"> の中身をポップアップに表示する。

const dialog = document.getElementById('detail');
const titleEl = document.getElementById('detail-title');
const bodyEl = dialog.querySelector('.detail-body');

function showDetail(id) {
  const article = document.getElementById(id);
  if (!article || article.tagName !== 'ARTICLE') return;

  titleEl.textContent = article.dataset.title || id;
  bodyEl.innerHTML = article.innerHTML;

  if (article.dataset.chapter) {
    const tag = document.createElement('p');
    tag.className = 'chapter-tag';
    tag.textContent = `📖 第 ${article.dataset.chapter} 章`;
    bodyEl.prepend(tag);
  }

  // コードに色を付ける
  if (window.hljs) {
    bodyEl.querySelectorAll('pre code').forEach((el) => hljs.highlightElement(el));
  }

  bodyEl.scrollTop = 0;
  if (!dialog.open) dialog.showModal();
}

// URL の # が変わったら（箱をタップしたら）表示する
function onHashChange() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (id) {
    showDetail(id);
  } else if (dialog.open) {
    dialog.close();
  }
}

// 閉じたら URL の # も消す
dialog.addEventListener('close', () => {
  if (location.hash) history.replaceState('', document.title, location.pathname + location.search);
});

// × ボタン・背景クリックで閉じる
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});

window.addEventListener('hashchange', onHashChange);
window.addEventListener('load', onHashChange); // #ID 付きのURLを直接開いたとき
