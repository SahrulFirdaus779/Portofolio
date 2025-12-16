/**
 * Interactive Data Network Animation
 * Creates a network of connected particles to simulate data connections.
 */

const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 60; // Number of nodes
const connectionDistance = 150; // Max distance to connect nodes
const mouseDistance = 200; // Interaction radius

// Mouse position
let mouse = {
    x: null,
    y: null
};

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 1.5; // Velocity Y
        this.size = Math.random() * 2 + 1; // Radius
        this.color = '#2563EB'; // Blue primary
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseDistance) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouseDistance - distance) / mouseDistance;
                const directionX = forceDirectionX * force * 0.6;
                const directionY = forceDirectionY * force * 0.6;

                this.vx += directionX;
                this.vy += directionY;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize Canvas
function init() {
    resize();
    createParticles();
    animate();
}

// Resize Canvas
function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
}

// Create Particles
function createParticles() {
    particles = [];
    // Adjust particle count based on screen size
    const count = width < 768 ? 30 : particleCount;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(37, 99, 235, ${1 - distance / connectionDistance})`; // Fade out
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', () => {
    resize();
    createParticles();
});

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Start
init();
