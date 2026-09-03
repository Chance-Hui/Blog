const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setupReadingProgress() {
    const article = document.querySelector<HTMLElement>('.main-article');

    if (!article || !document.querySelector('.article-back')) {
        return;
    }

    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.setAttribute('aria-hidden', 'true');

    const bar = document.createElement('span');
    bar.className = 'reading-progress__bar';
    progress.appendChild(bar);
    document.body.appendChild(progress);

    let frameId = 0;
    let articleTop = 0;
    let readableHeight = 1;

    const updateProgress = () => {
        frameId = 0;

        const ratio = Math.min(
            1,
            Math.max(0, (window.scrollY - articleTop) / readableHeight)
        );

        bar.style.transform = `scaleX(${ratio})`;
    };

    const requestProgressUpdate = () => {
        if (frameId === 0) {
            frameId = window.requestAnimationFrame(updateProgress);
        }
    };

    const measureArticle = () => {
        const bounds = article.getBoundingClientRect();
        articleTop = bounds.top + window.scrollY;
        readableHeight = Math.max(article.offsetHeight - window.innerHeight, 1);
        requestProgressUpdate();
    };

    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', measureArticle);
    window.addEventListener('load', measureArticle, { once: true });

    if ('ResizeObserver' in window) {
        const articleResizeObserver = new ResizeObserver(measureArticle);
        articleResizeObserver.observe(article);
    }

    measureArticle();
}

function setupScrollReveal() {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (items.length === 0) {
        return;
    }

    items.forEach((item, index) => {
        item.style.setProperty('--reveal-order', String(Math.min(index, 6)));
    });

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    document.documentElement.classList.add('motion-ready');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1,
        }
    );

    items.forEach((item) => observer.observe(item));
}

function setupHeroParallax() {
    const hero = document.querySelector<HTMLElement>('.home-hero');
    const content = hero?.querySelector<HTMLElement>('.home-hero__content');

    if (!hero || !content || reducedMotion.matches) {
        return;
    }

    let frameId = 0;

    const updateHero = () => {
        frameId = 0;
        const heroBottom = hero.offsetTop + hero.offsetHeight;

        if (window.scrollY > heroBottom) {
            return;
        }

        const offset = Math.min(window.scrollY * 0.075, 44);
        content.style.setProperty('--hero-offset', `${offset}px`);
    };

    const requestHeroUpdate = () => {
        if (frameId === 0) {
            frameId = window.requestAnimationFrame(updateHero);
        }
    };

    window.addEventListener('scroll', requestHeroUpdate, { passive: true });
    updateHero();
}

function setupEnhancements() {
    setupReadingProgress();
    setupScrollReveal();
    setupHeroParallax();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEnhancements, { once: true });
} else {
    setupEnhancements();
}
