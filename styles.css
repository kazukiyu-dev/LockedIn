(() => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const year = document.getElementById('year');
  const formNext = document.getElementById('form-next');
  const lessonType = document.getElementById('lesson-type');

  if (year) year.textContent = new Date().getFullYear();

  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.setAttribute('aria-expanded', 'false');
      nav?.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  document.querySelectorAll('[role="tab"]').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      document.querySelectorAll('[role="tab"]').forEach(item => item.setAttribute('aria-selected', String(item === tab)));
      document.querySelectorAll('.pricing-panel').forEach(panel => {
        const active = panel.id === targetId;
        panel.hidden = !active;
        panel.classList.toggle('active', active);
      });
    });
  });

  document.querySelectorAll('[data-booking-type]').forEach(link => {
    link.addEventListener('click', () => {
      const requested = (link.dataset.bookingType || '').replace(/^travel\s+/i, '').toLowerCase();
      if (lessonType) {
        const matching = Array.from(lessonType.options).find(option => {
          const optionGroup = option.text.split(' — ')[0].toLowerCase();
          return requested.startsWith(optionGroup);
        });
        if (matching) lessonType.value = matching.value;
      }
    });
  });

  if (formNext && /^https?:$/.test(window.location.protocol)) {
    const currentDir = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    formNext.value = `${currentDir}success.html`;
  } else if (formNext) {
    formNext.remove();
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.13 })
    : null;

  document.querySelectorAll('.reveal').forEach(element => {
    if (observer) observer.observe(element);
    else element.classList.add('revealed');
  });
})();
