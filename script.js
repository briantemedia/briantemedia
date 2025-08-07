document.addEventListener('DOMContentLoaded', function() {
    // Logik zum Wechseln der Icons
    const iconContainer = document.getElementById('changing-icon');
    const icons = [
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.375 3.375 0 0112 18.75V19.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-.75a3.375 3.375 0 01-1.06-2.163l-.547-.547z" /></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`
    ];
    let currentIndex = 0;
    if (iconContainer) {
        iconContainer.innerHTML = icons[currentIndex];
        iconContainer.style.opacity = '1';
        setInterval(() => {
            iconContainer.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % icons.length;
                iconContainer.innerHTML = icons[currentIndex];
                iconContainer.style.opacity = '1';
            }, 400);
        }, 2000);
    }
    
    const headlineElement = document.getElementById('dynamic-headline');
    if (headlineElement) {
        const headlines = [
            { pre: "Ihnen fehlen die richtigen ", accent: "Fachkräfte?" },
            { pre: "Sie haben genug von ", accent: "Preiskämpfen?" },
            { pre: "Ihr digitaler Auftritt wirkt ", accent: "veraltet?" },
            { pre: "Sie wollen mehr qualifizierte ", accent: "Anfragen?" }
        ];
        
        let headlineIndex = 0;

        function changeHeadline() {
            headlineElement.style.opacity = '0';

            setTimeout(() => {
                headlineIndex = (headlineIndex + 1) % headlines.length;
                const newHeadline = headlines[headlineIndex];
                headlineElement.innerHTML = `${newHeadline.pre}<span class="headline-accent-word">${newHeadline.accent}</span>`;
                headlineElement.style.opacity = '1';
            }, 600);
        }

        const initialHeadline = headlines[headlineIndex];
        headlineElement.innerHTML = `${initialHeadline.pre}<span class="headline-accent-word">${initialHeadline.accent}</span>`;
        headlineElement.style.opacity = '1';

        setInterval(changeHeadline, 4000);
    }

    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY <= 60) {
            header.classList.remove('header-hidden');
            header.classList.remove('header-scrolled');
        } else {
            if (currentScrollY > lastScrollY) {
                header.classList.add('header-hidden');
            } 
            else {
                header.classList.remove('header-hidden');
                header.classList.add('header-scrolled');
            }
        }
        lastScrollY = currentScrollY;
    });

    // --- START: Painpoint Parallax Scroll-Logik ---
    const painpointSection = document.getElementById('painpoint-parallax');
    const stickyContainer = document.querySelector('.painpoint-sticky-container');
    const painpointTexts = document.querySelectorAll('.painpoint-text');
    const numPainpoints = painpointTexts.length;

    if (painpointSection && stickyContainer && painpointTexts.length > 0) {
        
        painpointTexts[0].classList.add('active');
        stickyContainer.classList.add('state-1');

        window.addEventListener('scroll', () => {
            const rect = painpointSection.getBoundingClientRect();
            
            if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                const scrollProgress = -rect.top / (painpointSection.scrollHeight - window.innerHeight);
                let currentIndex = Math.floor(scrollProgress * numPainpoints);
                currentIndex = Math.min(numPainpoints - 1, currentIndex);

                painpointTexts.forEach((text, index) => {
                    if (index === currentIndex) {
                        text.classList.add('active');
                    } else {
                        text.classList.remove('active');
                    }
                });

                const currentStateClass = 'state-' + (currentIndex + 1);
                for (let i = 1; i <= numPainpoints; i++) {
                    stickyContainer.classList.remove('state-' + i);
                }
                stickyContainer.classList.add(currentStateClass);
            }
        });
    }
    // --- ENDE: Painpoint Parallax Scroll-Logik ---

    const burgerButton = document.getElementById('burger-menu-button');
    const closeButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');

    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10);
    };
    const closeMenu = () => {
        mobileMenu.classList.add('opacity-0');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    };

    if (burgerButton && closeButton && mobileMenu) {
        burgerButton.addEventListener('click', openMenu);
        closeButton.addEventListener('click', closeMenu);
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});