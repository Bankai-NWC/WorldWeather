document.querySelector(".header").addEventListener('mousemove', e => {
    const moveX = Math.max(-3.6, Math.min(3.6, (e.clientX - window.innerWidth / 2) * -.005));
    const moveY = Math.max(-3.9, Math.min(3.9, (e.clientY - window.innerHeight / 2) * .009));

    Object.assign(document.documentElement, {
        style: `
        --move-x: ${moveX}deg;
        --move-y: ${moveY}deg;
        `
    })
})