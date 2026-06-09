document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });

  // Hamburger menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('aos-visible'); }),
    { threshold: 0.15 }
  );
  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

  // Particles
  const container = document.getElementById('particles');
  if (container) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = 6 + Math.random() * 10 + 's';
      p.style.animationDelay = Math.random() * 8 + 's';
      p.style.width = p.style.height = 1 + Math.random() * 3 + 'px';
      container.appendChild(p);
    }
  }
});
