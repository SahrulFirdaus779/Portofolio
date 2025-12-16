// Data Cursor Effect
console.log("Initializing Data Cursor...");

function initCursor() {
    const cursorCanvas = document.createElement('canvas');
    const ctx = cursorCanvas.getContext('2d');
    cursorCanvas.id = 'data-cursor-canvas';
    document.body.appendChild(cursorCanvas);

    cursorCanvas.style.position = 'fixed';
    cursorCanvas.style.top = '0';
    cursorCanvas.style.left = '0';
    cursorCanvas.style.width = '100%';
    cursorCanvas.style.height = '100%';
    cursorCanvas.style.pointerEvents = 'none';
    cursorCanvas.style.zIndex = '99999'; // Super high Z-Index

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        cursorCanvas.width = width;
        cursorCanvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particles
    const particles = [];
    const phrases = ["0", "1", "01", "10"]; // More binary variety
    let mouse = { x: width / 2, y: height / 2 };
    let lastMouse = { x: width / 2, y: height / 2 };

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            // Larger confident text
            this.size = Math.random() * 10 + 14;
            this.text = phrases[Math.floor(Math.random() * phrases.length)];
            // Bright visible colors
            this.color = Math.random() > 0.5 ? '#3B82F6' : '#06b6d4'; // Blue or Cyan

            this.vx = (Math.random() - 0.5) * 2;
            this.vy = Math.random() * 2 + 1; // Fall down like Matrix rain

            this.life = 1.0;
            this.decay = Math.random() * 0.01 + 0.005; // Slower decay
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
        }

        draw() {
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.font = `bold ${this.size}px monospace`;
            ctx.fillText(this.text, this.x, this.y);
            ctx.globalAlpha = 1.0;
        }
    }

    // Spawn handler
    function spawn(x, y) {
        particles.push(new Particle(x, y));
    }

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);

        // Spawn more frequently
        if (dist > 1) {
            const count = Math.min(Math.floor(dist / 3), 5); // More spawn
            for (let i = 0; i < count; i++) {
                spawn(mouse.x + (Math.random() - 0.5) * 10, mouse.y + (Math.random() - 0.5) * 10);
            }
        }
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// Ensure body exists
if (document.body) {
    initCursor();
} else {
    window.addEventListener('DOMContentLoaded', initCursor);
}
