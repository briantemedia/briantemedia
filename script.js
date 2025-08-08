document.addEventListener('DOMContentLoaded', () => {
  // Icon Switcher (Hero)
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

  // Headline Rotator
  const headlineElement = document.getElementById('dynamic-headline');
  if (headlineElement) {
    const headlines = [
      { pre: "Ihnen fehlen die richtigen ", accent: "Fachkräfte?" },
      { pre: "Sie haben genug von ", accent: "Preiskämpfen?" },
      { pre: "Ihr digitaler Auftritt wirkt ", accent: "veraltet?" },
      { pre: "Sie wollen mehr qualifizierte ", accent: "Anfragen?" }
    ];
    let i = 0;
    const render = () => headlineElement.innerHTML = `${headlines[i].pre}<span class="font-serif-accent italic text-white/95">${headlines[i].accent}</span>`;
    render();
    setInterval(()=>{ i=(i+1)%headlines.length; headlineElement.style.opacity='0'; setTimeout(()=>{ render(); headlineElement.style.opacity='1'; },350); },3800);
  }

  // Header hide/show
  const header = document.getElementById('main-header');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y <= 60) { header.classList.remove('header-hidden','header-scrolled'); }
    else {
      header.classList.add('header-scrolled');
      if (y > lastY) header.classList.add('header-hidden');
      else header.classList.remove('header-hidden');
    }
    lastY = y;
  });

  // Mobile menu
  const burger = document.getElementById('burger-menu-button');
  const mobile = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-menu-button');
  const openMenu = ()=>{ mobile.classList.remove('hidden'); setTimeout(()=> mobile.classList.remove('opacity-0'),10); };
  const closeMenu = ()=>{ mobile.classList.add('opacity-0'); setTimeout(()=> mobile.classList.add('hidden'),200); };
  burger && burger.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  mobile && mobile.addEventListener('click', e => { if(e.target === mobile) closeMenu(); });

  // Year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ===== Scroll Reveal (IntersectionObserver) =====
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));

  // ===== Custom Cursor + Magnet Hover =====
  const cursor = document.getElementById('cursor');
  const move = (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  };
  window.addEventListener('mousemove', move, { passive:true });

  const interactive = document.querySelectorAll('a, button, .arrow-circle, .badge-floating, .magnet');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', ()=> cursor.classList.add('cursor-active'));
    el.addEventListener('mouseleave', ()=> cursor.classList.remove('cursor-active'));
  });

  // Magnet effect (leichtgewichtig)
  const magnets = document.querySelectorAll('.magnet');
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

  // ===== Lightbox =====
  const lbItems = document.querySelectorAll('[data-lightbox]');
  if (lbItems.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img src="" alt="Lightbox">';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    lbItems.forEach(img=>{
      img.addEventListener('click',()=>{
        lbImg.src = img.src;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click',()=> lb.classList.remove('open'));
  }
});
