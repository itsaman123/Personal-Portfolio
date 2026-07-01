const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navItem = document.querySelectorAll(".nav__item"),
  header = document.getElementById("header");

// open and close menu
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav__menu--open");
  changeIcon();
});

// close the menu when the user clicks the nav links
navItem.forEach((item) => {
  item.addEventListener("click", () => {
    if (navMenu.classList.contains("nav__menu--open")) {
      navMenu.classList.remove("nav__menu--open");
    }
    changeIcon();
  });
});

// Change nav toggle icon
function changeIcon() {
  if (navMenu.classList.contains("nav__menu--open")) {
    navToggle.classList.replace("ri-menu-3-line", "ri-close-line");
  } else {
    navToggle.classList.replace("ri-close-line", "ri-menu-3-line");
  }
}

// Testimonial Slide

const testimonialSlide = new Swiper(".testimonial__wrapper", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  effect: "coverflow",
  grabCursor: true,
  slidesPerView: 1,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    520: {
      slidesPerView: "auto",
    },
  },
});

// header scroll animation
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("header--scroll");
  } else {
    header.classList.remove("header--scroll");
  }
});

// ScrollReveal animations
const sr = ScrollReveal({
  duration: 2000,
  distance: "100px",
  delay: 400,
  reset: false,
});

sr.reveal(".hero__content, .about__content");
sr.reveal(".hero__img", { origin: "top" });

sr.reveal(
  ".hero__info-wrapper, .skills__title, .skills__content, .qualification__name, .qualification__item, .service__card, .project__content, .testimonial__wrapper, .footer__content",
  {
    delay: 500,
    interval: 100,
  }
);

sr.reveal(".qualification__footer-text, .contact__content", {
  origin: "left",
});

sr.reveal(".qualification__footer .btn, .contact__btn", { origin: "right" });

// Animate years experience counter
function animateYearsExperience() {
  const startDate = new Date('2022-08-01');
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const m = now.getMonth() - startDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < startDate.getDate())) {
    years--;
  }
  // Add decimal for months
  const months = (now.getMonth() - startDate.getMonth() + 12) % 12;
  const totalYears = years + months / 12;
  const displayYears = totalYears.toFixed(1);
  const el = document.getElementById('years-count');
  let current = 0;
  const duration = 1200;
  const frameRate = 30;
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let frame = 0;
  function update() {
    frame++;
    const progress = frame / totalFrames;
    const value = (displayYears * progress).toFixed(1);
    el.textContent = value;
    if (frame < totalFrames) {
      requestAnimationFrame(update);
    } else {
      el.textContent = displayYears;
    }
  }
  update();
}

document.addEventListener('DOMContentLoaded', animateYearsExperience);

// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');

if (cursorOuter && cursorInner && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0, outerX = 0, outerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorInner.style.left = mouseX - 4 + 'px';
    cursorInner.style.top = mouseY - 4 + 'px';
  });

  (function trackCursor() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;
    cursorOuter.style.left = outerX - 20 + 'px';
    cursorOuter.style.top = outerY - 20 + 'px';
    requestAnimationFrame(trackCursor);
  })();

  document.querySelectorAll('a, button, .service__card, .project__content, .skills__item, .nav__toggle').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOuter.style.transform = 'scale(2)';
      cursorOuter.style.opacity = '0.35';
    });
    el.addEventListener('mouseleave', () => {
      cursorOuter.style.transform = 'scale(1)';
      cursorOuter.style.opacity = '0.8';
    });
  });
}

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
const typewriterEl = document.querySelector('.hero__typewriter');
if (typewriterEl) {
  const roles = [
    'Software Developer',
    'MERN Stack Expert',
    'Full Stack Engineer',
    'API Architect',
    'Problem Solver',
  ];
  let roleIdx = 0, charIdx = 0, isDeleting = false;

  function typewrite() {
    const current = roles[roleIdx];
    typewriterEl.textContent = isDeleting
      ? current.slice(0, charIdx - 1)
      : current.slice(0, charIdx + 1);
    if (isDeleting) charIdx--; else charIdx++;

    let delay = isDeleting ? 60 : 120;
    if (!isDeleting && charIdx === current.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 400; }

    setTimeout(typewrite, delay);
  }
  setTimeout(typewrite, 1000);
}

// ============================================================
// HERO CANVAS PARTICLES
// ============================================================
const heroCanvas = document.getElementById('hero-particles');
if (heroCanvas) {
  const ctx = heroCanvas.getContext('2d');
  const SYMBOLS = ['</', '{}', '=>', '()', '[]', '/*', '/>', '&&', '||', '+=', 'fn()', 'const'];

  function resizeCanvas() {
    heroCanvas.width = heroCanvas.offsetWidth;
    heroCanvas.height = heroCanvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * heroCanvas.width;
      this.y = initial ? Math.random() * heroCanvas.height : heroCanvas.height + 20;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.opacity = Math.random() * 0.12 + 0.03;
      this.size = Math.random() * 10 + 9;
      this.symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -30) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#13A3EA';
      ctx.font = `${this.size}px 'Space Grotesk', monospace`;
      ctx.fillText(this.symbol, this.x, this.y);
      ctx.restore();
    }
  }

  const particles = Array.from({ length: 25 }, () => new Particle());

  (function animateParticles() {
    ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  })();
}

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 160;
  allSections.forEach(section => {
    const top = section.offsetTop;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + section.offsetHeight) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
});











