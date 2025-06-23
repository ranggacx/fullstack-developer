const fireworkCanvas = document.getElementById('firework-canvas');
const fireworkCtx = fireworkCanvas.getContext('2d');

function resizeFireworkCanvas() {
    fireworkCanvas.width = window.innerWidth;
    fireworkCanvas.height = window.innerHeight;
}
resizeFireworkCanvas();
window.addEventListener('resize', resizeFireworkCanvas);

const fireworkParticles = [];

function createFirework(x, y) {
    for (let i = 0; i < 10; i++) {
        fireworkParticles.push({
            x,
            y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 5 + 2,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            life: 40
        });
    }
}

function animateFireworks() {
    fireworkCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
    for (let i = 0; i < fireworkParticles.length; i++) {
        const p = fireworkParticles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;

        fireworkCtx.beginPath();
        fireworkCtx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        fireworkCtx.fillStyle = p.color;
        fireworkCtx.fill();

        if (p.life <= 0) {
            fireworkParticles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

window.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});
