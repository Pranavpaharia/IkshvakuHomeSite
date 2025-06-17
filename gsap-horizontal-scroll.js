// GSAP Horizontal Scroll Implementation
// Based on Filip Z's CodePen: https://codepen.io/filipz/pen/qEBoPWz
// This script requires GSAP and ScrollTrigger to be loaded via CDN in index.html

document.addEventListener("DOMContentLoaded", function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded.');
    return;
  }
  
  const container = document.querySelector('.horizontal-scroll-container');
  const panels = gsap.utils.toArray('.horizontal-panel');

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => "+=" + container.offsetWidth
    }
  });
});
