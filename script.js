/* ============================================================
   Email Etiquette — JavaScript
   ============================================================ */

// ---- Scroll-in animation for slide sections ----
(function () {
  const targets = document.querySelectorAll('.slide-inner');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();


// ---- Interactive checklist ----
(function () {
  const items = document.querySelectorAll('.ci-item');

  items.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', () => {
      item.classList.toggle('checked', checkbox.checked);
      updateProgress();
    });
  });

  function updateProgress() {
    const checked = document.querySelectorAll('.ci-item.checked').length;
    const total   = items.length;

    if (checked === total && total > 0) {
      showAllCheckedMessage();
    }
  }

  function showAllCheckedMessage() {
    const note = document.querySelector('.cta-note');
    if (!note) return;
    note.style.transition = 'background .4s, color .4s';
    note.style.background  = '#dcfce7';
    note.style.color       = '#16a34a';
    note.style.borderColor = '#86efac';
    note.textContent = '✅ All items checked — your email is ready to send!';
  }
})();


// ---- Highlight active nav dot on scroll ----
(function () {
  const navLinks = document.querySelectorAll('.side-nav a');
  const sections = Array.from({ length: 10 }, (_, i) =>
    document.getElementById('slide-' + (i + 1))
  ).filter(Boolean);

  function updateNav() {
    const scrollY = window.scrollY + window.innerHeight * 0.4;
    let current = sections[0];

    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollY) current = sec;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.background  = href === current.id ? 'var(--blue)' : '';
      link.style.borderColor = href === current.id ? 'var(--blue)' : '';
      link.style.color       = href === current.id ? '#fff' : '';
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();
