document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const windowContainer = document.querySelector(".window-container");
  const skyContainer = document.querySelector(".sky-container");
  const heroCopy = document.querySelector(".hero-copy");
  const heroHeader = document.querySelector(".hero-header");

  const skyContainerHeight = skyContainer.offsetHeight;
  const viewportHeight = window.innerHeight;
  const skyMoveDistance = skyContainerHeight - viewportHeight;

  gsap.set(heroCopy, {
    yPercent: 100,
  });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: `+=${window.innerHeight * 3}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    // markers: true,
    onUpdate: (self) => {
      const progress = self.progress;
      let windowScale;

      if (progress <= 0.5) {
        windowScale = 1 + (progress / 0.5) * 4.5; // Scale từ 1 → 4
      } else {
        windowScale = 5.5; // GIỮ NGUYÊN 4, không đổi
      }

      gsap.set(windowContainer, {
        scale: windowScale,
        transformOrigin: "center center",
      });

      gsap.set(heroHeader, {
        scale: windowScale,
        z: progress * 500,
      });

      gsap.set(skyContainer, {
        y: -progress * skyMoveDistance,
      });

      let heroCopyY;
      if (progress <= 0.66) {
        heroCopyY = 100;
      } else if (progress >= 1) {
        heroCopyY = 0;
      } else {
        heroCopyY = 100 * (1 - (progress - 0.66) / 0.34);
      }

      gsap.set(heroCopy, {
        yPercent: heroCopyY,
      });
    },
  });
});
