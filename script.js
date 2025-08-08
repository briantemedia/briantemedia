document.addEventListener('DOMContentLoaded', () => {
  // ===== Hero Icon Switcher (Startseite)
  const iconContainer = document.getElementById('changing-icon');
  const icons = ['💡','⚙️','⭐'];
  let iconIndex = 0;
  if (iconContainer) {
    iconContainer.textContent = icons[0];
    setInterval(() => {
      iconIndex = (iconIndex + 1) % icons.length;
      iconContainer.textContent = icons[iconIndex];
    }, 2200);
  }

  // ===== Headline Rotator (Startseite)
  const headlineElement = document.getElementById('dynamic-headline');
  if (headlineElement) {
    const headlines = [
      { pre: "Ihnen fehlen die richtigen ", accent: "Fachkräfte?" },
      { pre: "Sie haben genug von ", accent: "Preiskämpfen?" },
      { pre: "Ihr digitaler Auftritt wirkt ", accent: "veraltet?" },
      { pre: "Sie wollen mehr qualifizierte ", accent: "Anfragen?" }
    ];
    let i = 0;
    const render = () =>
      (headlineElement.innerHTML = `${headlines[i].pre}<span class="font-serif-accent italic text-white/95">${headlines[i].accent}</span>`);
    render();
    setInterval(() => {
      i = (i + 1) % headlines.length;
      headlineElement.style.opacity = '0';
      setTimeout(() => { render(); headlineElement.style.opacity = '1'; }, 350);
    }, 3800);
  }

  // ===== Header hide/show (nur wenn #main-header existiert)
  const header = document.getElementById('main-header');
  if (header) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y <= 60) {
        header.classList.remove('header-hidden','header-scrolled');
      } else {
        header.classList.add('header-scrolled');
        if (y > lastY) header.classList.add('header-hidden');
        else header.classList.remove('header-hidden');
      }
      lastY = y;
    });
  }

  // ===== Mobile Menu (Startseite)
  const burger = document.getElementById('burger-menu-button');
  const mobile = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-menu-button');
  const openMenu = ()=>{ mobile.classList.remove('hidden'); setTimeout(()=> mobile.classList.remove('opacity-0'),10); };
  const closeMenu = ()=>{ mobile.classList.add('opacity-0'); setTimeout(()=> mobile.classList.add('hidden'),200); };
  burger && mobile && burger.addEventListener('click', openMenu);
  closeBtn && mobile && closeBtn.addEventListener('click', closeMenu);
  mobile && mobile.addEventListener('click', e => { if(e.target === mobile) closeMenu(); });

  // ===== Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ===== Scroll Reveal (Startseite .reveal)
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.18 });
    revealEls.forEach(el => io.observe(el));
  }

  // ===== Custom Cursor + Magnet (Startseite)
  const cursor = document.getElementById('cursor');
  if (cursor) {
    const move = (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; };
    window.addEventListener('mousemove', move, { passive:true });

    const interactive = document.querySelectorAll('a, button, .arrow-circle, .badge-floating, .magnet, .magnet-btn');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', ()=> cursor.classList.add('cursor-active'));
      el.addEventListener('mouseleave', ()=> cursor.classList.remove('cursor-active'));
    });

    // Magnet effect (leicht)
    const magnets = document.querySelectorAll('.magnet, .magnet-btn');
    magnets.forEach(el => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width/2)) / (r.width/2);
        const dy = (e.clientY - (r.top + r.height/2)) / (r.height/2);
        el.style.transform = `translate(${dx*6}px, ${dy*6}px)`;
      };
      const reset = () => { el.style.transform = 'translate(0,0)'; };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', reset);
    });
  }

  // ===== Fade-In (Galabau .fade-in)
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    faders.forEach(fader => observer.observe(fader));
  }

  // ===== Lightbox (Galabau)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  const galleryImgs = document.querySelectorAll('.gallery img');
  if (lightbox && lightboxImg && galleryImgs.length) {
    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        requestAnimationFrame(()=> lightbox.classList.add('show'));
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Bild';
      });
    });

    const closeLb = () => {
      lightbox.classList.remove('show');
      setTimeout(() => { lightbox.style.display = 'none'; lightboxImg.src = ''; }, 400);
    };

    lightboxClose && lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', (e)=> { if(e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', (e)=> { if(e.key === 'Escape' && lightbox.style.display === 'flex') closeLb(); });
  }
});
