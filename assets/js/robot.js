
// 3D Robot Animation using Three.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('robot-container');
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 0;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400); // Fixed size for the aspect ratio
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // MATERIALS
    const whitePlasticMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x555555,
        shininess: 30
    });
    const darkScreenMat = new THREE.MeshPhongMaterial({
        color: 0x111827,
        specular: 0x111111,
        shininess: 100
    });
    const blueGlowingMat = new THREE.MeshBasicMaterial({
        color: 0x3B82F6
    });
    const metalMat = new THREE.MeshStandardMaterial({
        color: 0x9CA3AF,
        roughness: 0.4,
        metalness: 0.8
    });

    // ROBOT CONSTRUCTION
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // 1. Head Group
    const headGroup = new THREE.Group();
    robotGroup.add(headGroup);

    // Head Base
    const headGeo = new THREE.BoxGeometry(1.2, 0.8, 0.8);
    // Smooth edges hack: using a subdivision or simplified geometry for speed
    // Or just a capsule/sphere for cuteness. Let's start with a rounded-friend vibe (Sphere+Scale)
    const headBaseGeo = new THREE.SphereGeometry(0.7, 32, 32);
    headBaseGeo.scale(1.2, 0.9, 1);
    const head = new THREE.Mesh(headBaseGeo, whitePlasticMat);
    headGroup.add(head);

    // Face Screen REMOVED for cleaner look
    /*
    const faceGeo = new THREE.SphereGeometry(0.55, 32, 32);
    faceGeo.scale(1.2, 0.8, 0.8);
    const face = new THREE.Mesh(faceGeo, darkScreenMat);
    face.position.z = 0.25; 
    face.position.y = 0.05;
    headGroup.add(face);
    */

    // Eyes (Digital Ovals)
    // Using thin cylinders for flat "sticker" look on the curved face
    const eyeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32);

    const leftEye = new THREE.Mesh(eyeGeo, blueGlowingMat);
    leftEye.rotation.x = Math.PI / 2; // Face forward
    leftEye.position.set(-0.22, 0.1, 0.70); // Sit on surface
    leftEye.scale.set(0.8, 1, 1.4); // Vertical oval shape
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, blueGlowingMat);
    rightEye.rotation.x = Math.PI / 2;
    rightEye.position.set(0.22, 0.1, 0.70);
    rightEye.scale.set(0.8, 1, 1.4); // Vertical oval shape
    headGroup.add(rightEye);

    // Antenna
    const antennaStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5);
    const antennaStem = new THREE.Mesh(antennaStemGeo, metalMat);
    antennaStem.position.y = 0.8;
    headGroup.add(antennaStem);

    const antennaBulbGeo = new THREE.SphereGeometry(0.08);
    const antennaBulb = new THREE.Mesh(antennaBulbGeo, blueGlowingMat);
    antennaBulb.position.y = 1.05;
    headGroup.add(antennaBulb);

    // 2. Body Group
    const bodyGroup = new THREE.Group();
    bodyGroup.position.y = -1.2;
    robotGroup.add(bodyGroup);

    const bodyGeo = new THREE.SphereGeometry(0.6, 32, 32);
    bodyGeo.scale(1, 1.3, 0.8); // Oval body
    const body = new THREE.Mesh(bodyGeo, whitePlasticMat);
    bodyGroup.add(body);

    // 3. Floating Hands
    const handGeo = new THREE.SphereGeometry(0.2, 32, 32);

    // Left Hand (Static/Floating)
    const leftHand = new THREE.Mesh(handGeo, whitePlasticMat);
    leftHand.position.set(-0.8, 0.2, 0);
    bodyGroup.add(leftHand);

    // Right Hand (Waving)
    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(0.8, 0.2, 0); // Pivot point
    bodyGroup.add(rightHandGroup);

    const rightHand = new THREE.Mesh(handGeo, whitePlasticMat);
    rightHand.position.set(0, 0, 0); // Local to pivot
    rightHandGroup.add(rightHand);


    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x3B82F6, 1, 10);
    blueLight.position.set(-2, 2, 2);
    scene.add(blueLight);

    // INTERACTION & ANIMATION VARIABLES
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Interaction
    const bubble = document.getElementById('robot-speech-bubble');
    const phrases = [
        "Hi there! 👋",
        "Data is beautiful! 📊",
        "Need a Data Analyst? 🚀",
        "I love Python! 🐍",
        "Check out my projects! 💻",
        "Think, Learn, Do It! 🧠",
        "Let's visualize success! 📈",
        "Have a great day! ☀️"
    ];

    function speak(text) {
        if (!bubble) return;
        bubble.textContent = text;
        bubble.style.opacity = '1';

        // Hide after 3 seconds
        setTimeout(() => {
            bubble.style.opacity = '0';
        }, 3000);
    }

    // Click to Speak
    container.addEventListener('click', () => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        speak(randomPhrase);

        // Jump animation
        jumpTime = 0;
    });

    // Initial Greeting
    setTimeout(() => {
        speak("Welcome to my Portfolio! 🚀");
    }, 2000);

    // Track mouse
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Mobile Touch Support
    document.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            mouseX = (event.touches[0].clientX - windowHalfX);
            mouseY = (event.touches[0].clientY - windowHalfY);
        }
    }, { passive: true });

    // Animation Loop
    let time = 0;
    let jumpTime = -1; // -1 means not jumping
    const tempVec = new THREE.Vector3();

    function animate() {
        requestAnimationFrame(animate);
        time += 0.05;

        // 1. Floating Animation (Up/Down) or Jump
        let yOffset = Math.sin(time * 0.5) * 0.1;

        if (jumpTime >= 0) {
            jumpTime += 0.1;
            // Simple jump curve: sin(0 to PI)
            if (jumpTime <= Math.PI) {
                yOffset += Math.sin(jumpTime) * 0.5; // Jump height
            } else {
                jumpTime = -1; // Reset
            }
        }

        // 2. Waving Animation (Right Arm)
        // Wave interval: every few seconds
        const waveSpeed = 5;
        // Make it wave continuously but gently
        rightHandGroup.rotation.z = Math.sin(time * waveSpeed) * 0.5 + 0.5; // Up and down wave

        // 3. Cursor Following (Head Tracking)
        // Lerp for smoothness
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        // Limit rotation (for head turning)
        const rotationTargetX = Math.max(-0.5, Math.min(0.5, targetX));
        const rotationTargetY = Math.max(-0.5, Math.min(0.5, targetY));

        headGroup.rotation.y += 0.1 * (rotationTargetX - headGroup.rotation.y);
        headGroup.rotation.x += 0.1 * (rotationTargetY - headGroup.rotation.x);

        // Body rotates less, for realism
        bodyGroup.rotation.y += 0.05 * (rotationTargetX - bodyGroup.rotation.y);

        // 4. Full Movement (Flying following cursor)
        // We allow the robot to move significantly in the scene
        const moveRangeX = 1.5; // Horizontal range
        const moveRangeY = 1.0; // Vertical range

        // Calculate target position in world space
        // Invert Y because mouse screen coords are top-down, but 3D world Y is bottom-up
        const destX = targetX * moveRangeX;
        const destY = targetY * -moveRangeY;

        // Floating Sine Wave (Base movement)
        const floatY = Math.sin(time * 0.5) * 0.1;

        // Smoothly interpolating position
        // Let's us specific variables for clarity
        // robotX and robotY will track destX/destY
        if (typeof robotGroup.userData.currentX === 'undefined') {
            robotGroup.userData.currentX = 0;
            robotGroup.userData.currentY = 0;
        }

        robotGroup.userData.currentX += 0.05 * (destX - robotGroup.userData.currentX);
        robotGroup.userData.currentY += 0.05 * (destY - robotGroup.userData.currentY);

        robotGroup.position.x = robotGroup.userData.currentX;
        robotGroup.position.y = robotGroup.userData.currentY + yOffset;

        renderer.render(scene, camera);

        // 5. Sync Bubble Position
        if (bubble) {
            // Get head position in world space
            headGroup.getWorldPosition(tempVec);
            // Offset to the RIGHT of the head (Significantly increased to 2.5)
            tempVec.x += 2.5;
            // Offset UP (Increased from 0.2 to 1.0 for "2 steps up")
            tempVec.y += 1.0;

            // Project to 2D screen space
            tempVec.project(camera);

            // Convert to CSS coordinates
            // The renderer is inside #robot-container, so coordinates are relative to that container
            // (width/2 + x * width/2, height/2 - y * height/2)
            const x = (tempVec.x * .5 + .5) * container.clientWidth;
            const y = (tempVec.y * -.5 + .5) * container.clientHeight;

            // Transform: Anchor left side of bubble to the point (0, -50%)
            // This makes it extend to the right
            // Transform: Increased margin strictly
            bubble.style.transform = `translate(${x}px, ${y}px) translate(50px, -50%)`;
            bubble.style.left = '0';
            bubble.style.top = '0';
            bubble.style.right = 'auto';
        }
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        // Since we are in a fixed container, we might not need full resize logic
        // But let's ensure it stays sharp
        // renderer.setSize(container.clientWidth, container.clientHeight);
        // camera.aspect = container.clientWidth / container.clientHeight;
        // camera.updateProjectionMatrix();
    });
});
