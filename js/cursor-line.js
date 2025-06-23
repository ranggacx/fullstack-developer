const canvas = document.getElementById("trail-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let trail = [0];

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener("mousemove", (e) => {
    trail.push({
        x: e.clientX,
        y: e.clientY,
        hue: Math.random() * 30,
        life: 1
    });

    if (trail.length > 30) trail.shift();
});

function drawTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 1; i < trail.length; i++) {
        const p1 = trail[i - 1];
        const p2 = trail[i];

        ctx.strokeStyle = `hsla(${p2.hue}, 50%, 50%, ${p2.life})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        p2.life -= 0.03;
    }

    trail = trail.filter(p => p.life > 0);

    requestAnimationFrame(drawTrail);
}

drawTrail();
