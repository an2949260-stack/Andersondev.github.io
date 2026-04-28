const navToggle = document.querySelector('.nav-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');
const navBackdrop = document.querySelector('.nav-backdrop');

function closeMenu() {
  navToggle.setAttribute('aria-expanded', 'false');
  primaryNavigation.dataset.visible = 'false';
  navBackdrop.dataset.visible = 'false';
  document.body.classList.remove('nav-open');
}

function openMenu() {
  navToggle.setAttribute('aria-expanded', 'true');
  primaryNavigation.dataset.visible = 'true';
  navBackdrop.dataset.visible = 'true';
  document.body.classList.add('nav-open');
}

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
});

navBackdrop.addEventListener('click', closeMenu);

document.querySelectorAll('#primary-navigation a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = this.getAttribute('href');
    if (target.length > 1) {
      e.preventDefault();
      document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

const observerOptions = {
  threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill, .projeto-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});