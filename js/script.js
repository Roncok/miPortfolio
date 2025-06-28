document.addEventListener('DOMContentLoaded', () => {
    // =============================================
    // 1. CONFIGURACIONES GLOBALES
    // =============================================
    
    // Inicializar AOS (animaciones al hacer scroll)
    AOS.init({ duration: 800, once: true });

    // =============================================
    // 2. SECCIÓN INICIO (HERO)
    // =============================================
    
    // Configuración de Three.js (fondo de partículas)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.body.insertBefore(renderer.domElement, document.body.firstChild);

    // Geometría de partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material de partículas
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x64ffda,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 2;

    // Animación del fondo
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Redimensionar
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // =============================================
    // 3. NAVEGACIÓN
    // =============================================
    
    // Cursor personalizado
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    // Efectos hover
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
    });

    // Menú hamburguesa
    document.querySelector('.burger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('nav-active');
        document.querySelector('.burger').classList.toggle('toggle');
    });

    // =============================================
    // 4. SECCIÓN SOBRE MÍ
    // =============================================
    
    // Modal del CV
    const modal = document.getElementById("cv-modal");
    document.getElementById("cv-btn").addEventListener('click', () => {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    });
    document.querySelector(".close").addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // =============================================
    // 5. SECCIÓN CONTACTO
    // =============================================
    
    // Botón de copiar email
    const copyBtn = document.getElementById('copy-btn');
    const emailText = document.getElementById('email-text');
    
    if (copyBtn && emailText) {  // Verificamos que los elementos existan
        copyBtn.addEventListener('click', () => {
            // Método moderno usando Clipboard API
            navigator.clipboard.writeText(emailText.textContent.trim())
                .then(() => {
                    // Feedback visual
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    // Fallback para navegadores antiguos
                    const tempInput = document.createElement('input');
                    tempInput.value = emailText.textContent;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                    
                    // Feedback visual
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
        });
    }

    // =============================================
    // 6. SECCIÓN PROYECTOS (si necesitas añadir algo)
    // =============================================
    
    // Puedes agregar aquí cualquier funcionalidad específica para proyectos
});