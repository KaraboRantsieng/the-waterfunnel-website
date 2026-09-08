/* ========================================
   THE WATERFUNNEL — MAIN JAVASCRIPT
   ======================================== */

'use strict';

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});


// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });


// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = 18;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * 10;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: 0.4;
    `;
    container.appendChild(p);
  }
}
createParticles();


// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));


// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const galleryImages = Array.from(galleryItems).map(item => ({
  src: item.querySelector('img').src,
  alt: item.querySelector('img').alt
}));

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  lightboxImg.src = galleryImages[index].src;
  lightboxImg.alt = galleryImages[index].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

function navigateLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = galleryImages[currentLightboxIndex].src;
    lightboxImg.style.opacity = '1';
  }, 200);
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

if (lightbox) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  lightboxNext.addEventListener('click', () => navigateLightbox(1));
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});


// ===== VIDEO MODAL =====
const videoThumbs = document.querySelectorAll('.video-thumb');
const videoModal = document.getElementById('videoModal');
const videoModalClose = document.getElementById('videoModalClose');
const videoIframe = document.getElementById('videoIframe');

videoThumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const videoUrl = thumb.dataset.video;
    videoIframe.src = videoUrl;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeVideoModal() {
  if (!videoModal) return;
  videoModal.classList.remove('active');
  videoIframe.src = '';
  document.body.style.overflow = '';
}

if (videoModal) {
  videoModalClose.addEventListener('click', closeVideoModal);
  videoModal.querySelector('.video-modal-backdrop').addEventListener('click', closeVideoModal);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeVideoModal();
});


// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      formSuccess.classList.add('show');
      contactForm.reset();
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1500);
  });
}


// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ===== HERO VIDEO FALLBACK =====
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  heroVideo.addEventListener('error', () => {
    heroVideo.parentElement.style.background =
      'linear-gradient(135deg, #0a1628 0%, #0d3a5e 50%, #0a1628 100%)';
  });

  // Pause video when not visible for performance
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroVideo.play().catch(() => {});
      } else {
        heroVideo.pause();
      }
    });
  }, { threshold: 0 });
  videoObserver.observe(heroVideo);
}


// ===== PRODUCT CARD TILT EFFECT =====
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function update(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isFloat
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      if (text.includes('%')) animateCounter(el, 100, '%');
      else if (text.includes('+')) animateCounter(el, parseInt(text), '+');
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(stat => statsObserver.observe(stat));


// ===== NAVBAR LINK UNDERLINE EFFECT =====
navItems.forEach(link => {
  link.addEventListener('mouseenter', function () {
    this.style.letterSpacing = '0.03em';
  });
  link.addEventListener('mouseleave', function () {
    this.style.letterSpacing = '';
  });
});


// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
