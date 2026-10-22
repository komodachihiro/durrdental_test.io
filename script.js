const menu = document.querySelector('.menu');
const nav = document.querySelector('.header nav');
menu.addEventListener('click', () => { const opened=nav.classList.toggle('open'); menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'メニューを閉じる':'メニューを開く'); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
// 公開前にLINE・メール・電話のリンク先を設定してください。
// GA4導入時のイベント例: gtag('event','contact_click',{method:'line'});
document.querySelectorAll('[data-contact]').forEach(el=>el.addEventListener('click',()=>{if(typeof window.gtag==='function'){window.gtag('event','contact_click',{method:el.dataset.contact});}}));

// アンカーはPCでは中央スクロール領域のみ、スマホでは通常のページを移動
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target || link.hasAttribute('data-contact')) return;
    event.preventDefault();
    const desktop = window.matchMedia('(min-width: 801px)').matches;
    if (desktop) {
      const scrollBox = document.querySelector('.phone-scroll');
      const y = target.getBoundingClientRect().top - scrollBox.getBoundingClientRect().top + scrollBox.scrollTop;
      scrollBox.scrollTo({top: y, behavior:'smooth'});
    } else {
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});
