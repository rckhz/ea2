    document.addEventListener('DOMContentLoaded', () => {
    const light = document.querySelector('.light');
    const fundo = document.querySelector('.fundo');
    const tracker = document.querySelector('.luiz');
    
    let value = 0.5;

    const updateOpacity = () => {
        value = Math.max(0, Math.min(1, value));
        if (light) light.style.opacity = value;
        if (fundo) fundo.style.opacity = 1 - value;
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') value += 0.06;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') value -= 0.06;
        updateOpacity();
    });

    document.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            value -= 0.06;
        } else {
            value += 0.06;
        }
        updateOpacity();
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
        tracker.style.left = `${e.clientX -140}px`;
        tracker.style.top = `${e.clientY- 140}px`;
    });
});