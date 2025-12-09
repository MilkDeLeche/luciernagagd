/* ═══════════════════════════════════════════════════════════════
   DULCE LUCIÉRNAGA | Hotcakes Artesanales
   Cute & Delightful Interactions
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initFireflyCursor();
    initButtonBounce();
    initSparkleTrail();
    initBaseItemWiggle();
    initEmojiPop();
});

/* ═══════════════════════════════════════════════════════════════
   FIREFLY CURSOR ✨🪲
   ═══════════════════════════════════════════════════════════════ */

function initFireflyCursor() {
    // Only on desktop with hover capability
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.innerWidth < 768) return;
    
    const cursor = document.querySelector('.cursor-firefly');
    const glow = document.querySelector('.cursor-glow');
    const trail = document.querySelector('.cursor-trail');
    
    if (!cursor || !glow || !trail) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;
    
    // Track mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth animation loop
    function animate() {
        // Main cursor follows with slight delay
        const ease = 0.15;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        // Trail follows cursor with more delay
        const trailEase = 0.08;
        trailX += (cursorX - trailX) * trailEase;
        trailY += (cursorY - trailY) * trailEase;
        
        glow.style.left = `${cursorX}px`;
        glow.style.top = `${cursorY}px`;
        
        trail.style.left = `${trailX}px`;
        trail.style.top = `${trailY}px`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Create trailing particles
    let lastParticle = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastParticle < 50) return;
        lastParticle = now;
        
        createTrailParticle(e.clientX, e.clientY);
    });
    
    // Enhance glow on hover over interactive elements
    const interactives = document.querySelectorAll('a, button, .base-item, .logo-wrapper');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            glow.style.transform = 'translate(-50%, -50%) scale(1.8)';
            glow.style.background = 'radial-gradient(circle, #ff9ecd 0%, #ff69b4 30%, transparent 70%)';
            glow.style.boxShadow = '0 0 15px #ff69b4, 0 0 30px #ff69b4, 0 0 45px rgba(255, 105, 180, 0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            glow.style.transform = '';
            glow.style.background = '';
            glow.style.boxShadow = '';
        });
    });
}

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${3 + Math.random() * 4}px;
        height: ${3 + Math.random() * 4}px;
        background: #ffe566;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        box-shadow: 0 0 6px #ffe566, 0 0 10px rgba(255, 229, 102, 0.5);
        animation: trailFade 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
}

// Add trail fade animation if not exists
if (!document.querySelector('#trail-style')) {
    const style = document.createElement('style');
    style.id = 'trail-style';
    style.textContent = `
        @keyframes trailFade {
            0% {
                opacity: 0.8;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.3);
            }
        }
    `;
    document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════════
   BUTTON BOUNCE EFFECT
   ═══════════════════════════════════════════════════════════════ */

function initButtonBounce() {
    const buttons = document.querySelectorAll('.link-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.97)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/* ═══════════════════════════════════════════════════════════════
   SPARKLE TRAIL ON MOUSE MOVE (Desktop only)
   ═══════════════════════════════════════════════════════════════ */

function initSparkleTrail() {
    // Only on desktop
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;
    
    const card = document.querySelector('.card');
    if (!card) return;
    
    let lastSparkle = 0;
    const sparkleChars = ['✦', '✧', '♡', '·'];
    
    card.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < 100) return; // Throttle
        lastSparkle = now;
        
        // Only 20% chance to create sparkle
        if (Math.random() > 0.2) return;
        
        const sparkle = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: ${8 + Math.random() * 8}px;
            color: #f490a3;
            pointer-events: none;
            z-index: 100;
            animation: sparkleTrail 0.8s ease-out forwards;
        `;
        
        card.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    });
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleTrail {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-20px) scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════════
   BASE ITEMS WIGGLE ON HOVER
   ═══════════════════════════════════════════════════════════════ */

function initBaseItemWiggle() {
    const items = document.querySelectorAll('.base-item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const emoji = this.querySelector('.base-emoji');
            if (emoji) {
                emoji.style.animation = 'wiggle 0.5s ease-in-out';
                setTimeout(() => {
                    emoji.style.animation = '';
                }, 500);
            }
        });
    });
    
    // Add wiggle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
        }
    `;
    document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════════
   EMOJI POP ON LINK CLICK
   ═══════════════════════════════════════════════════════════════ */

function initEmojiPop() {
    const buttons = document.querySelectorAll('.link-btn');
    const emojis = ['🥞', '🍓', '🍯', '✨', '💕', '🌟'];
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create burst of emojis
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const emoji = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    
                    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    emoji.style.cssText = `
                        position: fixed;
                        left: ${rect.left + rect.width / 2}px;
                        top: ${rect.top + rect.height / 2}px;
                        font-size: 1.5rem;
                        pointer-events: none;
                        z-index: 9999;
                        animation: emojiBurst 0.8s ease-out forwards;
                        --tx: ${(Math.random() - 0.5) * 100}px;
                        --ty: ${-50 - Math.random() * 50}px;
                    `;
                    
                    document.body.appendChild(emoji);
                    setTimeout(() => emoji.remove(), 800);
                }, i * 50);
            }
        });
    });
    
    // Add burst animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes emojiBurst {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--tx), var(--ty)) scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════════
   HAPTIC FEEDBACK (Mobile)
   ═══════════════════════════════════════════════════════════════ */

if ('vibrate' in navigator) {
    document.querySelectorAll('.link-btn, .base-item').forEach(el => {
        el.addEventListener('touchstart', () => {
            navigator.vibrate(5);
        }, { passive: true });
    });
}

/* ═══════════════════════════════════════════════════════════════
   LOGO TAP EASTER EGG
   ═══════════════════════════════════════════════════════════════ */

let logoTaps = 0;
const logo = document.querySelector('.logo-wrapper');

if (logo) {
    logo.style.cursor = 'pointer';
    
    logo.addEventListener('click', () => {
        logoTaps++;
        
        // Spin animation
        logo.style.animation = 'none';
        logo.offsetHeight; // Trigger reflow
        logo.style.animation = 'logoSpin 0.6s ease-out';
        
        // After 5 taps, burst of fireflies
        if (logoTaps >= 5) {
            logoTaps = 0;
            createFireflyBurst();
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes logoSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function createFireflyBurst() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const firefly = document.createElement('span');
            firefly.style.cssText = `
                position: fixed;
                left: 50%;
                top: 30%;
                width: 8px;
                height: 8px;
                background: #e8b86d;
                border-radius: 50%;
                box-shadow: 0 0 10px #e8b86d, 0 0 20px #e8b86d;
                pointer-events: none;
                z-index: 9999;
                animation: fireflyBurst 1.5s ease-out forwards;
                --angle: ${(i / 8) * 360}deg;
            `;
            
            document.body.appendChild(firefly);
            setTimeout(() => firefly.remove(), 1500);
        }, i * 50);
    }
    
    // Add if not already added
    if (!document.querySelector('#firefly-burst-style')) {
        const style = document.createElement('style');
        style.id = 'firefly-burst-style';
        style.textContent = `
            @keyframes fireflyBurst {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) rotate(var(--angle)) translateX(150px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ═══════════════════════════════════════════════════════════════
   PERFORMANCE: Pause when tab hidden
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('visibilitychange', () => {
    const sparkles = document.querySelectorAll('.sparkle');
    const fireflies = document.querySelectorAll('.firefly');
    
    if (document.hidden) {
        sparkles.forEach(s => s.style.animationPlayState = 'paused');
        fireflies.forEach(f => f.style.animationPlayState = 'paused');
    } else {
        sparkles.forEach(s => s.style.animationPlayState = 'running');
        fireflies.forEach(f => f.style.animationPlayState = 'running');
    }
});

/* ═══════════════════════════════════════════════════════════════
   FOOTER TYPING ANIMATION & VIDEO
   ═══════════════════════════════════════════════════════════════ */

// Footer Text with Typing Animation
function typeText() {
    const timeElement = document.getElementById('local-time');
    if (!timeElement) return;
    
    const text1 = 'echo por MODO';
    const text2 = 'a tu MODO';
    let currentText = text1;
    let isFirstText = true;
    let index = 0;
    
    function type() {
        if (index < currentText.length) {
            const displayText = currentText.substring(0, index + 1);
            timeElement.innerHTML = displayText + '<span class="typing-cursor">|</span>';
            index++;
            setTimeout(type, 80); // Typing speed (80ms per character)
        } else {
            // Wait a bit, then clear and switch to next text
            setTimeout(() => {
                index = 0;
                // Clear text
                timeElement.innerHTML = '<span class="typing-cursor">|</span>';
                
                // Switch to next text after clearing
                setTimeout(() => {
                    isFirstText = !isFirstText;
                    currentText = isFirstText ? text1 : text2;
                    type(); // Start typing the next text
                }, 300); // Short pause before starting next text
            }, 1500); // Wait 1.5 seconds before clearing
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// Logo Video Playback
function initFooterVideo() {
    const logoContainer = document.querySelector('.logo-container');
    const footerVideo = document.querySelector('.footer-video');

    if (logoContainer && footerVideo) {
        // Play video on hover
        logoContainer.addEventListener('mouseenter', () => {
            footerVideo.play();
        });

        // Pause video when mouse leaves
        logoContainer.addEventListener('mouseleave', () => {
            footerVideo.pause();
            footerVideo.currentTime = 0; // Reset to start
        });
    }
}

// Initialize footer features
typeText();
initFooterVideo();
