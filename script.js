document.addEventListener('DOMContentLoaded', () => {
    const light = document.querySelector('.light');
    const fundo = document.querySelector('.fundo');
    const tracker = document.querySelector('.luiz');

    let value = 0.5;
    let isDragging = false;
    let lastY = 0;

    const updateOpacity = () => {
        value = Math.max(0, Math.min(1, value));
        if (light) light.style.opacity = value;
        if (fundo) fundo.style.opacity = 1 - value;
    };

    const handlePointerDown = (event) => {
        if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
        isDragging = true;
        lastY = event.clientY;
        event.target.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (isDragging) {
            const delta = lastY - event.clientY;
            value += delta * 0.003;
            lastY = event.clientY;
            updateOpacity();
            return;
        }

        if (event.pointerType === 'mouse' && tracker) {
            tracker.style.left = `${event.clientX}px`;
            tracker.style.top = `${event.clientY}px`;
        }
    };

    const handlePointerUp = (event) => {
        isDragging = false;
        if (event.target.hasPointerCapture && event.target.hasPointerCapture(event.pointerId)) {
            event.target.releasePointerCapture(event.pointerId);
        }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);

    document.addEventListener('wheel', (event) => {
        value += event.deltaY < 0 ? 0.06 : -0.06;
        updateOpacity();
    }, { passive: true });

    updateOpacity();
});