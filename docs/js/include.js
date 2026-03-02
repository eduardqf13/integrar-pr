const ComponentLoader = (() => {
  const cache = new Map();

  async function load(targetId, file) {
    const el = document.getElementById(targetId);
    if (!el) return;

    const cacheBuster = `?t=${Date.now()}`;
    const url = file + cacheBuster;

    if (cache.has(url)) {
      el.innerHTML = cache.get(url);
      initMenu();
      return;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);

    const html = await response.text();
    cache.set(url, html);
    el.innerHTML = html;
    initMenu();
  }

  return { load };
})();

document.addEventListener('DOMContentLoaded', () => {
  ComponentLoader.load('header', 'components/header.html');
  ComponentLoader.load('footer', 'components/footer.html');
});

function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');
    
    if (menuToggle && headerMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            headerMenu.classList.toggle('active');
        });

        const menuLinks = headerMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                headerMenu.classList.remove('active');
            });
        });
    }
}