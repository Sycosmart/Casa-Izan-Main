/* ==========================================================================
   CASA IZAN · LANDING PAGE (ADS) · SCRIPTS
   ========================================================================== */

(() => {
  'use strict';

  // Nav hide on scroll down
  const nav = document.getElementById('mainNav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 120 && y > lastY) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastY = y;
  });

  // Toast
  const toast = document.getElementById('toast');
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
  };

  // Copy promo code
  const copyBtn = document.getElementById('copyCode');
  const promoCode = document.getElementById('promoCode');
  if (copyBtn && promoCode) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(promoCode.textContent.trim())
        .then(() => {
          showToast(`Código ${promoCode.textContent.trim()} copiado`);
          copyBtn.textContent = '¡Copiado!';
          setTimeout(() => (copyBtn.textContent = 'Copiar'), 1800);
        })
        .catch(() => showToast('No pudimos copiar el código'));
    });
  }

  // Countdown to end of current month
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  const pad = (n) => String(n).padStart(2, '0');

  const updateCountdown = () => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
    let diff = Math.max(0, end - now);
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000); diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);
    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMins) cdMins.textContent = pad(mins);
    if (cdSecs) cdSecs.textContent = pad(secs);
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Lead form → open WhatsApp with prefilled message
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const city = (data.get('city') || '').toString().trim();
      const interest = (data.get('interest') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const lines = [
        `Hola Casa Izan, soy ${name}.`,
        `Ciudad: ${city}`,
        `Me interesa: ${interest}`,
        phone ? `Mi WhatsApp: ${phone}` : null,
        message ? `Mensaje: ${message}` : null,
        '',
        'Vengo desde su anuncio y me gustaría recibir más información.'
      ].filter(Boolean).join('\n');

      const waUrl = `https://wa.me/59171234567?text=${encodeURIComponent(lines)}`;
      showToast('Abriendo WhatsApp…');
      setTimeout(() => window.open(waUrl, '_blank', 'noopener'), 400);
    });
  }

})();
