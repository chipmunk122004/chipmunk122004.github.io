(function () {
  const ENABLE_SECTION_DROPDOWNS = false;

  const nav = document.querySelector("nav");
  const logoToggle = document.getElementById("logoToggle");
  const mobilePanel = document.getElementById("mobilePanel");
  const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let prefersReducedMotion = prefersReducedMotionQuery.matches;

  if (!ENABLE_SECTION_DROPDOWNS) {
    document.documentElement.classList.add("no-section-dropdowns");
    document.querySelectorAll(".menu-button, .mobile-section-button").forEach(function (btn) {
      btn.removeAttribute("aria-expanded");
      btn.removeAttribute("aria-controls");
    });
  }

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  function applyMotionPreferences() {
    document.querySelectorAll("img[data-gif]").forEach(function (img) {
      var gifSrc = img.getAttribute("data-gif");
      var stillSrc = img.getAttribute("data-still");
      img.src = prefersReducedMotion && stillSrc ? stillSrc : gifSrc;
    });
  }

  function getScrollBehavior() {
    return prefersReducedMotion ? "auto" : "smooth";
  }

  function forceScrollTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  function closeAllMenus() {
    document.querySelectorAll(".desktop-nav-item").forEach(function (it) {
      it.classList.remove("open");
    });
    document.querySelectorAll(".mobile-right-list").forEach(function (group) {
      group.classList.remove("open");
    });
    if (mobilePanel) mobilePanel.classList.remove("open");
    if (logoToggle) logoToggle.setAttribute("aria-expanded", "false");
  }

  function scrollToSection(targetSection) {
    var viewportHeight = window.innerHeight;
    var navHeight = nav ? nav.getBoundingClientRect().height : 0;
    var sectionRect = targetSection.getBoundingClientRect();
    var sectionHeight = sectionRect.height;
    var sectionTopDocument = window.scrollY + sectionRect.top;
    var destination;

    if (sectionHeight < viewportHeight * 0.9) {
      var visibleHeight = viewportHeight - navHeight;
      var desiredTop = navHeight + Math.max((visibleHeight - sectionHeight) / 2, 0);
      destination = sectionTopDocument - desiredTop;
    } else {
      destination = sectionTopDocument - navHeight;
    }

    window.scrollTo({ top: Math.max(destination, 0), behavior: getScrollBehavior() });
  }

  var sectionTargets = { contact: "#contact", about: "#about", portfolio: "#portfolio" };

  function goToSectionByName(sectionName) {
    var targetHash = sectionTargets[sectionName];
    var targetSection = targetHash ? document.querySelector(targetHash) : null;
    if (targetSection) {
      closeAllMenus();
      scrollToSection(targetSection);
    } else if (targetHash) {
      window.location.href = "/" + targetHash;
    }
  }

  if (logoToggle) {
    logoToggle.addEventListener("click", function () {
      var next = !mobilePanel.classList.contains("open");
      mobilePanel.classList.toggle("open", next);
      logoToggle.setAttribute("aria-expanded", String(next));
    });
  }

  document.querySelectorAll(".mobile-section-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sectionName = btn.getAttribute("data-section");
      if (sectionName) goToSectionByName(sectionName);
    });
  });

  document.querySelectorAll(".desktop-nav-item .menu-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".desktop-nav-item");
      var sectionName = item && item.getAttribute("data-section");
      if (sectionName) goToSectionByName(sectionName);
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest("nav") && !event.target.closest("#mobilePanel")) {
      closeAllMenus();
    }
  });

  /* ---- Carousel ---- */
  var carouselModal = document.getElementById("carouselModal");
  var carouselMedia = document.getElementById("carouselMedia");
  var carouselCaption = document.getElementById("carouselCaption");
  var carouselClose = document.getElementById("carouselClose");
  var carouselPrev = document.getElementById("carouselPrev");
  var carouselNext = document.getElementById("carouselNext");
  var activeIndex = 0;
  var carouselItems = [];

  function gatherCarouselItems() {
    var btns = document.querySelectorAll("[data-carousel-src]");
    carouselItems = Array.from(btns).map(function (btn) {
      return {
        src: btn.getAttribute("data-carousel-src"),
        caption: btn.getAttribute("data-carousel-caption") || "",
        alt: btn.getAttribute("data-carousel-alt") || "",
      };
    });
  }

  function renderCarousel() {
    var item = carouselItems[activeIndex];
    if (!item || !carouselMedia) return;
    carouselMedia.src = item.src;
    carouselMedia.alt = item.alt;
    carouselCaption.textContent =
      item.caption + " (" + (activeIndex + 1) + "/" + carouselItems.length + ")";
  }

  function openCarousel(index) {
    gatherCarouselItems();
    activeIndex = index;
    renderCarousel();
    carouselModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCarousel() {
    carouselModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function shiftCarousel(step) {
    activeIndex = (activeIndex + step + carouselItems.length) % carouselItems.length;
    renderCarousel();
  }

  if (carouselClose) carouselClose.addEventListener("click", closeCarousel);
  if (carouselPrev) carouselPrev.addEventListener("click", function () { shiftCarousel(-1); });
  if (carouselNext) carouselNext.addEventListener("click", function () { shiftCarousel(1); });
  if (carouselModal) {
    carouselModal.addEventListener("click", function (event) {
      if (event.target === carouselModal) closeCarousel();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!carouselModal || !carouselModal.classList.contains("open")) return;
    if (event.key === "Escape") closeCarousel();
    if (event.key === "ArrowLeft") shiftCarousel(-1);
    if (event.key === "ArrowRight") shiftCarousel(1);
  });

  document.querySelectorAll("[data-carousel-src]").forEach(function (btn, i) {
    btn.addEventListener("click", function () { openCarousel(i); });
  });

  if (prefersReducedMotionQuery.addEventListener) {
    prefersReducedMotionQuery.addEventListener("change", function (event) {
      prefersReducedMotion = event.matches;
      applyMotionPreferences();
    });
  }

  window.addEventListener("load", forceScrollTop, { once: true });
  window.addEventListener("pageshow", forceScrollTop);

  applyMotionPreferences();
})();
