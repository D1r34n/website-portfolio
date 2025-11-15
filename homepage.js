
// Loader JS
const loader = document.getElementById("loading-screen");
const percentageEl = document.querySelector("#loader-percentage span");

let currentPercent = 0;

// Simulate progress until window.onload
const simulateProgress = setInterval(() => {
  // increment slowly to a max of 95%
  if (currentPercent < 95) {
    currentPercent += Math.floor(Math.random() * 3) + 1; // 1-3%
    if (currentPercent > 95) currentPercent = 95;
    percentageEl.textContent = currentPercent + "%";
  }
}, 50);

// Once all resources are loaded
window.addEventListener("load", () => {
  clearInterval(simulateProgress);

  // Animate the last 100% quickly
  let finalPercent = 95;
  const finishInterval = setInterval(() => {
    finalPercent++;
    percentageEl.textContent = finalPercent + "%";
    if (finalPercent >= 100) {
      clearInterval(finishInterval);
      // Hide loader
      loader.style.opacity = "0";
      loader.style.transform = "translateY(-100%)";
      setTimeout(() => loader.style.display = "none", 800);
    }
  }, 20);
});

// HOMEPAGE SCRIPTS

// ==== Parallax effect for hero section ====
const hero = document.querySelector(".hero");
const layers = {
  devtitle: document.querySelector(".devtitle"),
  heroText: document.querySelector(".hero-text"),
  subtitle: document.querySelector(".subtitle-parallax")
};

const intensity = { devtitle: 15, heroText: 25, subtitle: 10 };
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

if (hero) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
  });
}

function animateParallax() {
  // gradually interpolate towards mouse position
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  for (const key in layers) {
    if (layers[key]) { // only if element exists
      layers[key].style.transform = `translate3d(${targetX * intensity[key]}px, ${targetY * intensity[key]}px, 0)`;
    }
  }

  requestAnimationFrame(animateParallax);
}

animateParallax();

// ==== Binary Effect ====
function binaryTransition(element, text, interval = 100, duration = 2000) {
  const chars = "01"; // binary characters
  let iterations = 0;
  const maxIterations = duration / interval;

  const originalText = text.split("");
  const length = originalText.length;

  const intervalId = setInterval(() => {
    let output = "";
    for (let i = 0; i < length; i++) {
      if (i < (iterations / maxIterations) * length) {
        output += originalText[i]; // reveal actual character
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    element.textContent = output;

    iterations++;
    if (iterations > maxIterations) clearInterval(intervalId);
  }, interval);
}

// Usage
const heroTextEl = document.getElementById("homepage-hero-text");
if (heroTextEl) {
  binaryTransition(heroTextEl, "Edrian Evangelista");
}


// ==== Typewriter effect ====
const devTitle = document.getElementById("typewriter");
const text = "software developer";

if (devTitle) {
  let index = 0, forward = true;

  function typeWriter() {
    if (forward) {
      devTitle.textContent = text.slice(0, index + 1);
      index++;
      if (index === text.length) {
        forward = false;
        setTimeout(typeWriter, 3000); // pause at full text
        return;
      }
    } else {
      devTitle.textContent = text.slice(0, index);
      index--;
      if (index < 0) {
        forward = true;
        setTimeout(typeWriter, 500); // pause before retyping
        return;
      }
    }
    setTimeout(typeWriter, 150); // typing speed
  }

  // Wait until fade-in finishes
  const devTitleEl = document.querySelector(".devtitle");
  devTitleEl.addEventListener("animationend", () => {
    typeWriter(); // start typewriter only after fade-in
  });
}

// ==== tsParticles ====
//Enhanced Parallax Dust Particles Homepage
// ==== tsParticles - Fixed Single Configuration ====
if (document.getElementById("dustParticlesBackground")) {
  tsParticles.load("dustParticlesBackground", {
    fpsLimit: 60,
    background: { color: "transparent" },
    particles: {
      number: { value: 200, density: { enable: true, area: 2000 } },
      color: { value: "#e3e3e3" },
      shape: { type: "circle" },
      opacity: { 
        value: 0.3, 
        random: { enable: true, minimumValue: 0.8 } 
      },
      size: { 
        value: 1.5, 
        random: { enable: true, minimumValue: 0.8 } 
      },
      move: {
        enable: true,
        speed: 0.15,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" },
        attract: { enable: true, rotateX: 1200, rotateY: 2400 }
      },
      zIndex: { 
        value: { min: 0, max: 100 }, 
        opacityRate: 0.8, 
        sizeRate: 1, 
        velocityRate: 1 
      }
    },
    interactivity: {
      detectsOn: "window", // Changed from "canvas" to "window" for better detection
      events: {
        onHover: { 
          enable: true, 
          mode: "repulse", // Repulse mode
          parallax: { enable: true, force: 60, smooth: 10 }
        },
        onClick: { enable: false },
        resize: true
      },
      modes: { 
        repulse: { 
          distance: 100, 
          duration: 1,
          factor: 100,
          speed: 1,
          maxSpeed: 10,
          easing: "ease-out-quad"
        }
      }
    },
    detectRetina: true,
    smooth: true,
    fullScreen: { enable: false, zIndex: -1 },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true
  });

  // Custom parallax container movement
  const container = document.getElementById("dustParticlesBackground");
  if (container) {
    let containerX = 0, containerY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.01;
      targetY = (e.clientY - window.innerHeight / 2) * 0.01;
    });

    function animateContainer() {
      containerX += (targetX - containerX) * 0.1;
      containerY += (targetY - containerY) * 0.1;
      container.style.transform = `translate(${containerX}px, ${containerY}px)`;
      requestAnimationFrame(animateContainer);
    }
    
    animateContainer();
  }
}

//Parallax Particle Projects Page
if (document.getElementById("parallaxLinkBackground")) {
  tsParticles.load("parallaxLinkBackground", {
    fpsLimit: 60,
    background: { color: "transparent" },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "parallax"], // Grab links on hover
          parallax: {
            enable: true,
            force: 60,
            smooth: 10
          }
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        parallax: {
          enable: true,
          force: 60,
          smooth: 10
        },
        grab: {
          distance: 200,
          links: {
            opacity: 0.8,
            color: "#ffffff"
          }
        },
        push: {
          quantity: 4
        }
      }
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: "#e3e3e3"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: {
          enable: true,
          minimumValue: 0.1
        }
      },
      size: {
        value: {
          min: 1,
          max: 3
        }
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out"
        },
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
        triangles: {
          enable: false
        }
      },
      zIndex: {
        value: { min: 0, max: 50 },
        opacityRate: 1,
        sizeRate: 1,
        velocityRate: 1
      }
    },
    detectRetina: true,
    smooth: true
  });
}

// ==== Navbar & submenu behavior ====
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const blurOverlay = document.querySelector(".blur-overlay");
  const aboutButton = document.getElementById("about-me-btn");
  const aboutSubmenu = document.getElementById("about-me-submenu");
  const submenuLinks = document.querySelectorAll(".submenu-text, .menu-text:not(#about-me-btn)");

  // Ensure menu is closed on page load
  navbarToggler.classList.remove("open");
  blurOverlay.classList.remove("active");
  aboutSubmenu.classList.remove("active");

  // Toggle main menu overlay
  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("open");
    blurOverlay.classList.toggle("active");

    // Close About Me submenu when menu closes
    if (!navbarToggler.classList.contains("open")) {
      aboutSubmenu.classList.remove("active");
    }
  });

  // Toggle About Me submenu
  aboutButton.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent click from bubbling to document or other listeners
    aboutSubmenu.classList.toggle("active");
  });

  // Close menu when any link or submenu item is clicked (excluding About Me parent)
  submenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbarToggler.classList.remove("open");
      blurOverlay.classList.remove("active");
      aboutSubmenu.classList.remove("active");
    });
  });
});

window.addEventListener("scroll", () => {
  const schoolParagraph = document.querySelector(".school-paragraph");
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= documentHeight * 0.8) {
    schoolParagraph.classList.add("visible");
  } else {
    schoolParagraph.classList.remove("visible");
  }
});

window.addEventListener("scroll", () => {
  const mockupRows = document.querySelectorAll(".mockup-row");
  const triggerBottom = window.innerHeight * 0.85;
  const triggerTop = window.innerHeight * 0.15;

  mockupRows.forEach((row) => {
    const rect = row.getBoundingClientRect();
    
    if (rect.top < triggerBottom && rect.bottom > triggerTop) {
      row.classList.add("visible");
    } else {
      row.classList.remove("visible");
    }
  });
});

// Scroll-controlled orbit rotation with continuous auto-orbit
(function() {
  const orbit = document.querySelector('.orbit-container');
  if (!orbit) return;

  const numImages = 3;
  const rotationPerImage = 360 / numImages;
  const autoRotateSpeed = 0.05; // Adjust for slower/faster auto-rotation
  
  let currentRotation = 0;
  let targetRotation = 0;
  let isUserControlled = false;
  let isSnapping = false;
  let scrollTimeout;
  let rafId;
  let isInitialized = false;

  // Remove CSS animation and take manual control
  function initialize() {
    if (!isInitialized) {
      orbit.style.animation = 'none';
      isInitialized = true;
    }
  }

  // Smooth animation loop with auto-rotation
  function animate() {
    initialize();

    // If not user controlled, continuously rotate
    if (!isUserControlled && !isSnapping) {
      targetRotation += autoRotateSpeed;
      currentRotation = targetRotation;
    } else {
      // Ease towards target rotation when user is controlling or snapping
      const diff = targetRotation - currentRotation;
      const easingSpeed = isSnapping ? 0.08 : 0.1;
      currentRotation += diff * easingSpeed;
      
      // Check if snap is complete
      if (isSnapping && Math.abs(diff) < 0.1) {
        isSnapping = false;
        isUserControlled = false;
      }
    }

    // Apply rotation while preserving the translate
    orbit.style.transform = `translate(-50%, -50%) rotateY(${currentRotation}deg)`;

    // Continue animation
    rafId = requestAnimationFrame(animate);
  }

  // Start animation loop
  animate();

  // Handle scroll
  window.addEventListener('scroll', () => {
    isUserControlled = true;

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    // Calculate rotation based on scroll
    const totalRotation = scrollPercent * 360 * 3;
    targetRotation = totalRotation;

    clearTimeout(scrollTimeout);
    
    // Auto-snap and resume after scroll stops
    scrollTimeout = setTimeout(() => {
      // Snap to nearest image position
      const snappedRotation = Math.round(currentRotation / rotationPerImage) * rotationPerImage;
      targetRotation = snappedRotation;
      isSnapping = true;
      isUserControlled = false;
    }, 800);
  });

  // Mouse wheel control
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    isUserControlled = true;

    const delta = e.deltaY * 0.3;
    targetRotation = currentRotation + delta;

    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      // Snap to nearest position
      const snappedRotation = Math.round(currentRotation / rotationPerImage) * rotationPerImage;
      targetRotation = snappedRotation;
      isSnapping = true;
      isUserControlled = false;
    }, 800);
  }, { passive: false });

  // Touch support
  let touchStartY = 0;
  let touchStartRotation = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartRotation = currentRotation;
    isUserControlled = true;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const delta = (touchStartY - touchEndY) * 0.5;
    targetRotation = touchStartRotation + delta;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      // Snap to nearest position
      const snappedRotation = Math.round(currentRotation / rotationPerImage) * rotationPerImage;
      targetRotation = snappedRotation;
      isSnapping = true;
      isUserControlled = false;
    }, 800);
  }, { passive: true });
})();

const heroText = document.querySelector('.hero-text');
const orbitImages = document.querySelectorAll('.orbit-image');

let currentText = 'SKILLS';
let targetText = currentText;
let opacity = 1;
let fading = false;

// Smooth fade function
function fadeText(newText) {
  targetText = newText;
  if (fading) return; // prevent multiple calls
  fading = true;

  function animate() {
    // Fade out
    if (opacity > 0 && heroText.textContent !== targetText) {
      opacity -= 0.05; // speed of fade
      if (opacity < 0) opacity = 0;
      heroText.style.opacity = opacity;
      requestAnimationFrame(animate);
    } else {
      // Switch text when fully faded out
      heroText.textContent = targetText;

      function fadeIn() {
        opacity += 0.05;
        if (opacity > 1) opacity = 1;
        heroText.style.opacity = opacity;
        if (opacity < 1) requestAnimationFrame(fadeIn);
        else fading = false; // done
      }
      fadeIn();
    }
  }
  animate();
}

orbitImages.forEach(img => {
  img.addEventListener('mouseenter', () => fadeText(img.alt));
  img.addEventListener('mouseleave', () => fadeText('SKILLS'));
});

document.addEventListener('DOMContentLoaded', () => {
  const subtitles = document.querySelectorAll('.subtitle');
  const wrapper = document.querySelector('.preview-wrapper');
  if (!wrapper) return;

  const previewImage = wrapper.querySelector('.preview-image');
  let activeSubtitle = null;

  // === 3D Drag Variables ===
  let isDragging = false;
  let dragStartX = 0, dragStartY = 0;
  let dragCurrentX = 0, dragCurrentY = 0;

  // === Hover Tilt Variables ===
  let isHovering = false;
  let hoverX = 0, hoverY = 0;

  // === Update Transform Function ===
  function updateTransform() {
    const rotateY = dragCurrentX + (isHovering && !isDragging ? hoverX : 0);
    const rotateX = dragCurrentY + (isHovering && !isDragging ? hoverY : 0);
    previewImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }

  // === Subtitle Click Logic ===
  subtitles.forEach(sub => {
    sub.addEventListener('click', () => {
      // Remove "active" from previous subtitle
      if (activeSubtitle && activeSubtitle !== sub) {
        activeSubtitle.classList.remove('active');
      }

      // Toggle the clicked one
      if (activeSubtitle === sub) {
        sub.classList.remove('active');
        activeSubtitle = null;
        
        // Fade out and keep hidden
        wrapper.classList.remove('fade-in');
        wrapper.classList.add('fade-out');
        return; // Exit early, don't show image
      } else {
        sub.classList.add('active');
        activeSubtitle = sub;
      }

      // === Fade transition ===
      wrapper.classList.remove('fade-in');
      wrapper.classList.add('fade-out');

      setTimeout(() => {
        previewImage.src = sub.dataset.img;

        // Reset rotation
        dragCurrentX = 0;
        dragCurrentY = 0;
        updateTransform();

        // Force reflow
        void wrapper.offsetWidth;

        // Fade in
        wrapper.classList.remove('fade-out');
        wrapper.classList.add('fade-in');
      }, 400); // match fade CSS duration
    });
  });

  // === Hover Tilt Effect ===
  previewImage.addEventListener('mouseenter', () => {
    isHovering = true;
  });

  previewImage.addEventListener('mouseleave', () => {
    isHovering = false;
    hoverX = 0;
    hoverY = 0;
    updateTransform();
  });

  previewImage.addEventListener('mousemove', (e) => {
    if (!isHovering || isDragging) return;

    const rect = previewImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt based on mouse position relative to center
    hoverX = ((x - centerX) / centerX) * 30; // Max 30deg tilt (increase for more intensity)
    hoverY = -((y - centerY) / centerY) * 30; // Max 30deg tilt (increase for more intensity)
    
    updateTransform();
  });

  // === 3D Drag Interaction ===
  previewImage.style.cursor = 'grab';

  previewImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    previewImage.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    const rotateY = dragCurrentX + dx / 2;
    const rotateX = dragCurrentY - dy / 2;
    previewImage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    dragCurrentX += (e.clientX - dragStartX) / 2;
    dragCurrentY -= (e.clientY - dragStartY) / 2;
    previewImage.style.cursor = 'grab';
    updateTransform();
  });

  // Reset rotation on image click
  previewImage.addEventListener('click', () => {
    dragCurrentX = 0;
    dragCurrentY = 0;
    hoverX = 0;
    hoverY = 0;
    updateTransform();
  });
});

const dottedBg = document.querySelector('.dotted-bg');

if (dottedBg) {
  document.addEventListener('mousemove', (e) => {
    const offsetX = e.clientX / window.innerWidth * 20;
    const offsetY = e.clientY / window.innerHeight * 20;
    dottedBg.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
  });
}

// ===== Parallax Mouse Movement with 3D Tilt + Hover Scale =====
const profileContainerEl = document.querySelector('.profile-container');
const profilePicEl = document.querySelector('.profile-pic');
const heroRightEl = document.querySelector('.hero-right');
const gridFloorEl = document.querySelector('.grid-floor');
const rotatedHeroTextEl = document.querySelector('.rotated-hero-text');

if (profileContainerEl && profilePicEl && heroRightEl && gridFloorEl && rotatedHeroTextEl) {
  let mouseTargetX = 0, mouseTargetY = 0;
let mouseCurrentX = 0, mouseCurrentY = 0;
const parallaxSmoothing = 0.08; // smaller = smoother

// Track hover states
let isHoveringProfile = false;
let isHoveringParagraph = false;

profilePicEl.addEventListener('mouseenter', () => isHoveringProfile = true);
profilePicEl.addEventListener('mouseleave', () => isHoveringProfile = false);

heroRightEl.addEventListener('mouseenter', () => isHoveringParagraph = true);
heroRightEl.addEventListener('mouseleave', () => isHoveringParagraph = false);

function animateMouseParallax() {
  // Smooth parallax movement
  mouseCurrentX += (mouseTargetX - mouseCurrentX) * parallaxSmoothing;
  mouseCurrentY += (mouseTargetY - mouseCurrentY) * parallaxSmoothing;

  const x = mouseCurrentX;
  const y = mouseCurrentY;

  // Profile picture transform + scale
  const profileRotateTranslate = `rotateY(24deg) rotateX(2deg) translate(${x * -20}px, ${y * -20}px)`;
  const profileScale = isHoveringProfile ? 1.05 : 1;
  profilePicEl.style.transform = `${profileRotateTranslate} scale(${profileScale})`;


  profilePicEl.style.transition = 'transform 0.3s ease'; // ensures smooth scaling

  if (isHoveringProfile) {
    profileContainerEl.classList.add('hovered');
  } else {
    profileContainerEl.classList.remove('hovered');
  }

  // Hero paragraph transform + scale
  const paragraphScale = isHoveringParagraph ? 1.2 : 1;
  heroRightEl.style.transform = `
    rotateY(-12deg)
    rotateX(-2deg)
    translate(${x * -12}px, ${y * -12}px)
    scale(${paragraphScale})
  `;

  // Grid floor tilt + movement
  gridFloorEl.style.transform = `
    rotateX(${80 + y * 5}deg)
    rotateY(${x * 5}deg)
    translate(${x * 15}px, ${y * 15}px)
  `;

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (!isMobile) {
    // Desktop: apply parallax
    rotatedHeroTextEl.style.transform = `
      translateY(-50%) rotate(-90deg)
      translate(${x * -5}px, ${y * -5}px)
    `;
  } else {
    // Mobile: keep rotation from CSS
    rotatedHeroTextEl.style.transform = 'translateY(-50%) rotate(0deg) translate(${x * -5}px, ${y * -5}px)';
  }


  requestAnimationFrame(animateMouseParallax);
}

document.addEventListener('mousemove', (e) => {
  mouseTargetX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseTargetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

animateMouseParallax();
}



