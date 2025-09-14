export function createNavbarDOM() {

  const menuItems = [
    { href: '#/', text: 'Home' },
    { href: '#/medications', text: 'Medications' },
    { href: '#/learnMore', text: 'Map' },
    { href: '#/wikiProfessions', text: 'Professions' },
    { href: '#/aboutUs', text: 'About Us' },
    { href: '#/schedule', text: 'Schedule' }
  ];


  const headerContainer = document.getElementById("header");


  if (!headerContainer) {

    return;
  }

  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-expand-lg navbar-dark navbar-custom';

  const container = document.createElement('div');
  container.className = 'container';

  const brandLink = document.createElement('a');
  brandLink.className = 'navbar-brand navbar-brand-custom';
  brandLink.href = '#/';
  brandLink.innerHTML = `
    <svg width="32" height="20" viewBox="0 0 150 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="146" height="86" rx="43" fill="white"/>
        <circle cx="35" cy="45" r="6" fill="#333"/>
        <circle cx="115" cy="45" r="6" fill="#333"/>
        <rect x="42" y="43" width="66" height="4" fill="#333"/>
    </svg>
    I am Baymax
  `;

  const button = document.createElement('button');
  button.className = 'navbar-toggler';
  button.type = 'button';
  button.setAttribute('data-bs-toggle', 'collapse');
  button.setAttribute('data-bs-target', '#mainNav');
  button.innerHTML = '<span class="navbar-toggler-icon"></span>';

  const collapseDiv = document.createElement('div');
  collapseDiv.className = 'collapse navbar-collapse justify-content-end';
  collapseDiv.id = 'mainNav';

  const ul = document.createElement('ul');
  ul.className = 'navbar-nav';

  menuItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    const a = document.createElement('a');
    a.className = 'nav-link ';
    a.href = item.href;
    a.textContent = item.text;
    a.setAttribute('data-link', '');

    li.appendChild(a);
    ul.appendChild(li);
  });

  collapseDiv.appendChild(ul);
  container.appendChild(brandLink);
  container.appendChild(button);
  container.appendChild(collapseDiv);
  nav.appendChild(container);

  headerContainer.innerHTML = '';

  headerContainer.appendChild(nav);

  const menuCollapse = document.getElementById('mainNav');

  if (menuCollapse) {

    const navLinks = menuCollapse.querySelectorAll('.nav-link');

    const bsCollapse = new bootstrap.Collapse(menuCollapse, { toggle: false });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (menuCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }
}