// =============================================================================
// Notlyfe Landing Page — Interactions & Fluid Animations
// Anti-AI-Slop, High-Performance Native JavaScript
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initMockupTabs();
  initMockupTilt();
  initFaqAccordion();
  initScrollReveal();
  initInteractivePhoneDemos();
});

/**
 * 1. Top Reading Scroll Progress Bar
 */
function initScrollProgressBar() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const currentScroll = window.scrollY;
    const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 2. Interactive Phone Mockup Tab Switcher
 */
function initMockupTabs() {
  const tabButtons = document.querySelectorAll('.mockup-tab-btn');
  const panels = document.querySelectorAll('.screen-panel');

  if (!tabButtons.length || !panels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      if (!targetId) return;

      // Update button states
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel visibility
      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/**
 * 3. 3D Perspective Tilt on Phone Frame with Smooth Spring-Back
 */
function initMockupTilt() {
  const mockupWrapper = document.querySelector('.mockup-wrapper');
  const phoneFrame = document.querySelector('.phone-frame');

  if (!mockupWrapper || !phoneFrame) return;

  // Only enable 3D tilt on devices that support hover / pointer
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let isHovered = false;

  mockupWrapper.addEventListener('mouseenter', () => {
    isHovered = true;
    phoneFrame.style.transition = 'transform 0.08s ease-out';
  });

  mockupWrapper.addEventListener('mousemove', (e) => {
    if (!isHovered) return;

    const rect = mockupWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max ~9 degrees
    const rotateY = ((x - centerX) / centerX) * 8.5;
    const rotateX = -((y - centerY) / centerY) * 8.5;

    phoneFrame.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  mockupWrapper.addEventListener('mouseleave', () => {
    isHovered = false;
    phoneFrame.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    phoneFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/**
 * 4. FAQ Accordion with Fluid Max-Height Expansion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/**
 * 5. Scroll Reveal with IntersectionObserver
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 6. Interactive Micro-Demos inside Phone Mockup
 */
function initInteractivePhoneDemos() {
  // Mini Todo Toggles
  const todoItems = document.querySelectorAll('.mini-todo-item');
  todoItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('done');
      const checkIcon = item.querySelector('.mini-todo-check');
      if (checkIcon) {
        if (item.classList.contains('done')) {
          checkIcon.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else {
          checkIcon.innerHTML = '';
        }
      }
    });
  });

  // Dynamic CGPA interactive slider or touch response
  const cgpaCard = document.querySelector('.mini-cgpa-display');
  if (cgpaCard) {
    const cgpaNum = cgpaCard.querySelector('.mini-cgpa-num');
    const possibleCgpas = ['3.84', '3.91', '3.78', '4.00', '3.88'];
    let index = 0;
    cgpaCard.addEventListener('click', () => {
      index = (index + 1) % possibleCgpas.length;
      if (cgpaNum) {
        cgpaNum.style.transform = 'scale(0.85)';
        setTimeout(() => {
          cgpaNum.textContent = possibleCgpas[index];
          cgpaNum.style.transform = 'scale(1)';
        }, 120);
      }
    });
  }
}
