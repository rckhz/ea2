document.addEventListener('DOMContentLoaded', () => {
    const light = document.querySelector('.light');
    const fundo = document.querySelector('.fundo1');
    const tracker = document.querySelector('.luiz');

    if (tracker) {
        tracker.style.transform = 'translate(-50%, -82%)';
    }

    let value = 0.5;
    let isDragging = false;
    let lastX = 0;

    const updateOpacity = () => {
        value = Math.max(0, Math.min(1, value));
        if (light) light.style.opacity = value;
        if (fundo) fundo.style.opacity = value;
    };

    const handlePointerDown = (event) => {
        if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
        isDragging = true;
        lastX = event.clientX;
        event.target.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (isDragging) {
            const delta = lastX - event.clientX;
            value += delta * 0.009;
            lastX = event.clientX
            updateOpacity();
            return;
        }
        // imagem acompanha o cursor do mouse
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