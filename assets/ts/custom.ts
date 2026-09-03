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
    measureArticle();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupReadingProgress, { once: true });
} else {
    setupReadingProgress();
}
