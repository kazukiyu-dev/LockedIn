(() => {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  const closeMenu = () => {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navLinks.classList.remove('open');
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navToggle.setAttribute('aria-label', willOpen ? 'Close menu' : 'Open menu');
      navLinks.classList.toggle('open', willOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(event.target) && !navToggle.contains(event.target)) {
        closeMenu();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 740) closeMenu();
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px' });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('visible'));
  }

  document.addEventListener('pointermove', (event) => {
    document.body.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.body.style.setProperty('--pointer-y', `${event.clientY}px`);
  }, { passive: true });

  document.querySelectorAll('[data-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const toggles = document.querySelectorAll('[data-pricing-toggle]');
  const pricingPanels = document.querySelectorAll('[data-pricing-panel]');
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const mode = toggle.dataset.pricingToggle;
      toggles.forEach((item) => {
        const active = item === toggle;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      pricingPanels.forEach((panel) => {
        const active = panel.dataset.pricingPanel === mode;
        panel.hidden = !active;
        if (active) panel.classList.add('visible');
      });
    });
  });

  const form = document.querySelector('#booking-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitButton = form.querySelector('.submit-button');
    const endpoint = 'https://formsubmit.co/ajax/louisjeff2912@gmail.com';

    const setStatus = (message, type = '') => {
      if (!status) return;
      status.className = `form-status${type ? ` ${type}` : ''}`;
      status.textContent = message;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      if (String(formData.get('_honey') || '').trim()) return;

      const payload = {};
      formData.forEach((value, key) => {
        if (key !== '_honey') payload[key] = String(value).trim();
      });

      setStatus('Sending your enquiry…', 'sending');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === false) {
          throw new Error(result.message || 'The enquiry could not be sent.');
        }

        form.reset();
        setStatus('Thanks — your enquiry has been sent to Louis. He will reply as soon as possible.', 'success');
      } catch (error) {
        setStatus('The automatic send did not complete. Please email louisjeff2912@gmail.com or call 0434 433 652.', 'error');
        console.error('Booking form submission failed:', error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.removeAttribute('aria-busy');
        }
      }
    });
  }
})();
