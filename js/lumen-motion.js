/**
 * LUMEN — THE IMPOSSIBLE MUSEUM
 * Motion & Scroll Orchestration Engine (GSAP + ScrollTrigger)
 * -------------------------------------------------------------------------
 * Drives camera choreography, horizontal exhibit gallery pinning,
 * clip-path typographic reveals, and custom cursor physics.
 */

(function () {
  'use strict';

  function initMotion() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded yet.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Setup Custom Cursor
    setupCursor();

    // Setup Act 1: Hero Reveals
    setupHeroAnimations();

    // Setup Act 2: Manifesto Kinetic Reveals
    setupManifestoAnimations();

    // Setup Act 3: Exhibit Hall Horizontal Pinning & Camera Tracking
    setupExhibitGallery();

    // Setup Act 4: The Studio Workbench Controls
    setupStudioControls();

    // Setup Act 5: Colophon
    setupColophon();
  }

  /* -------------------------------------------------------------------------
     CUSTOM MAGNETIC CURSOR
     ------------------------------------------------------------------------- */
  function setupCursor() {
    const cursor = document.getElementById('custom-cursor');
    const dot = document.getElementById('custom-cursor-dot');
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth cursor trailing loop
    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    });

    // Hover detection on interactive elements
    const interactives = document.querySelectorAll('a, button, input, .specimen-item, .dossier-dossier, .brand-mark');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  /* -------------------------------------------------------------------------
     ACT I: HERO INTRO & SCROLL DOLLY
     ------------------------------------------------------------------------- */
  function setupHeroAnimations() {
    const title = document.querySelector('.hero-monumental-title');
    const tag = document.querySelector('.hero-act-tag');
    const tagline = document.querySelector('.hero-tagline');
    const meta = document.querySelectorAll('.hero-top-meta, .hero-bottom-controls');

    // Initial Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(meta, 
      { opacity: 0, y: -15 }, 
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, delay: 0.3 }
    )
    .fromTo(tag,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8 },
      '-=0.8'
    )
    .fromTo(title,
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40, opacity: 0 },
      { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', y: 0, opacity: 1, duration: 1.6, ease: 'expo.out' },
      '-=0.6'
    )
    .fromTo(tagline,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2 },
      '-=1.0'
    );

    // Camera Dolly on Hero Scroll
    if (window.LumenEngine && window.LumenEngine.camera) {
      const camera = window.LumenEngine.camera;
      const heroGroup = window.LumenEngine.objects.heroArtifact;

      ScrollTrigger.create({
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          // Smooth dolly forward and subtle vertical parallax
          camera.position.z = 7.5 - progress * 2.8;
          camera.position.y = -progress * 1.5;
          if (heroGroup) {
            heroGroup.position.y = progress * 1.8;
          }
        }
      });
    }
  }

  /* -------------------------------------------------------------------------
     ACT II: MANIFESTO KINETIC REVEALS
     ------------------------------------------------------------------------- */
  function setupManifestoAnimations() {
    const manifestoSec = document.querySelector('.manifesto-section');
    const prose = document.querySelector('.manifesto-prose');
    const footnotes = document.querySelectorAll('.footnote-card');

    if (!manifestoSec) return;

    gsap.fromTo(prose,
      { opacity: 0.15, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: prose,
          start: 'top 80%',
          end: 'top 35%',
          scrub: 0.8
        }
      }
    );

    gsap.fromTo(footnotes,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.manifesto-footnotes',
          start: 'top 85%'
        }
      }
    );
  }

  /* -------------------------------------------------------------------------
     ACT III: EXHIBIT HALL HORIZONTAL PINNING & 3D CAMERA TRACKING
     ------------------------------------------------------------------------- */
  function setupExhibitGallery() {
    const gallerySection = document.querySelector('.exhibit-hall-section');
    const horizontalTrack = document.querySelector('.gallery-horizontal-track');
    const navPills = document.querySelectorAll('.exhibit-nav-btn');

    if (!gallerySection || !horizontalTrack) return;

    // Pin gallery container for 4 screens of horizontal exploration
    const scrollTween = gsap.to(horizontalTrack, {
      xPercent: -75, // 4 cards: 0%, -25%, -50%, -75%
      ease: 'none',
      scrollTrigger: {
        trigger: gallerySection,
        pin: true,
        scrub: 1.0,
        start: 'top top',
        end: () => `+=${window.innerWidth * 3.2}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const index = Math.min(3, Math.floor(p * 4));

          // Update active navigation pill
          navPills.forEach((btn, i) => {
            if (i === index) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });

          // Sync 3D Camera Pan across the 4 exhibits
          if (window.LumenEngine && window.LumenEngine.camera) {
            const cam = window.LumenEngine.camera;
            // Exhibit coords: X: -8.5 (Exhibit 1) -> 9.0 (Exhibit 4)
            // Range: -8.5 to +9.0 = 17.5 total delta
            const targetX = -8.5 + p * 17.5;
            cam.position.x = targetX;
            cam.position.y = -14;
            cam.position.z = 6.2;
            cam.lookAt(targetX, -14, 0);
          }
        }
      }
    });

    // Click pill to scroll directly to exhibit
    navPills.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const totalScroll = window.innerWidth * 3.2;
        const targetScroll = ScrollTrigger.getById('galleryTrigger') 
          ? ScrollTrigger.getById('galleryTrigger').start + (i / 3) * totalScroll
          : window.scrollY + (i * window.innerHeight);

        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      });
    });

    // Material mode toggles inside exhibit cards
    const materialToggles = document.querySelectorAll('.material-btn');
    materialToggles.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parent = btn.closest('.dossier-material-toggles');
        parent.querySelectorAll('.material-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.dataset.mode;
        if (window.LumenEngine && window.LumenEngine.setMaterialMode) {
          window.LumenEngine.setMaterialMode(mode);
        }
      });
    });
  }

  /* -------------------------------------------------------------------------
     ACT IV: THE STUDIO WORKBENCH INTERACTION
     ------------------------------------------------------------------------- */
  function setupStudioControls() {
    const studioSection = document.querySelector('.studio-section');
    if (!studioSection) return;

    // Camera move into Studio when scrolling into section
    ScrollTrigger.create({
      trigger: studioSection,
      start: 'top 70%',
      end: 'bottom bottom',
      onEnter: () => {
        if (window.LumenEngine && window.LumenEngine.camera) {
          gsap.to(window.LumenEngine.camera.position, {
            x: 0,
            y: 0,
            z: 7.2,
            duration: 1.6,
            ease: 'power3.out'
          });
          window.LumenEngine.camera.lookAt(0, 0, 0);
        }
      }
    });

    // Sliders
    const dispSlider = document.getElementById('slider-displacement');
    const freqSlider = document.getElementById('slider-frequency');
    const roughSlider = document.getElementById('slider-roughness');

    const dispVal = document.getElementById('val-displacement');
    const freqVal = document.getElementById('val-frequency');
    const roughVal = document.getElementById('val-roughness');

    function syncUniforms() {
      const d = parseFloat(dispSlider.value);
      const f = parseFloat(freqSlider.value);
      const r = parseFloat(roughSlider.value);

      if (dispVal) dispVal.textContent = d.toFixed(2);
      if (freqVal) freqVal.textContent = f.toFixed(1);
      if (roughVal) roughVal.textContent = r.toFixed(2);

      if (window.LumenEngine && window.LumenEngine.updateUniforms) {
        window.LumenEngine.updateUniforms(d, f, r);
      }
    }

    if (dispSlider) dispSlider.addEventListener('input', syncUniforms);
    if (freqSlider) freqSlider.addEventListener('input', syncUniforms);
    if (roughSlider) roughSlider.addEventListener('input', syncUniforms);
  }

  /* -------------------------------------------------------------------------
     ACT V: COLOPHON
     ------------------------------------------------------------------------- */
  function setupColophon() {
    const colophon = document.querySelector('.colophon-section');
    if (!colophon) return;

    gsap.fromTo('.colophon-brand-block, .colophon-column',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: colophon,
          start: 'top 80%'
        }
      }
    );
  }

  // Auto-init on window load
  window.addEventListener('load', () => {
    initMotion();
  });
})();
