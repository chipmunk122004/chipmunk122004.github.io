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

  /* ---- About heading vertical fill ---- */
  var aboutScaleTimer;
  var landscapeQuery = window.matchMedia("(min-aspect-ratio: 3/2)");

  function scaleAboutHeading() {
    var aboutSection = document.getElementById("about");
    if (!aboutSection) return;
    var h2 = aboutSection.querySelector("h2");
    var wrap = aboutSection.querySelector(".about-wrap");
    if (!h2 || !wrap) return;

    h2.style.transform = "";
    h2.style.transformOrigin = "";

    if (!landscapeQuery.matches) return;

    // Use canvas measureText to get actual ink bounds (not the CSS line box,
    // which includes dead space above caps and below baseline for descenders).
    var cs = window.getComputedStyle(h2);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
    // Measure each character individually and use the minimum ascent.
    // This anchors scale to the flat-topped letters (A, B, T) so they
    // exactly touch the section boundaries; rounder letters (O, U) with
    // optical overshoot extend beyond and get clipped by overflow:hidden.
    var text = h2.textContent.trim().toUpperCase();
    var minAscent = Infinity;
    for (var i = 0; i < text.length; i++) {
      var m = ctx.measureText(text[i]);
      if (m.actualBoundingBoxAscent > 0) {
        minAscent = Math.min(minAscent, m.actualBoundingBoxAscent);
      }
    }
    if (!isFinite(minAscent)) return;
    var glyphHeight = minAscent;

    // Inject a zero-size probe to locate the baseline within the h2.
    var probe = document.createElement("span");
    probe.style.cssText = "display:inline-block;width:0;height:0;line-height:0;";
    h2.appendChild(probe);
    var sectionRect = aboutSection.getBoundingClientRect();
    var h2Rect = h2.getBoundingClientRect();
    var probeRect = probe.getBoundingClientRect();
    h2.removeChild(probe);

    // Convert glyph bounds into section-relative coordinates.
    var baselineFromH2Top = probeRect.top - h2Rect.top;
    var glyphTopFromSection = (h2Rect.top - sectionRect.top) + (baselineFromH2Top - minAscent);

    // Scale so the ink fills the full section height.
    var scale = sectionRect.height / glyphHeight;

    // Solve for origin (section-relative) that maps glyph top → section top.
    // O + (glyphTop − O) × scale = 0  →  O = glyphTop × scale / (scale − 1)
    var originFromSection = scale > 1 ? glyphTopFromSection * scale / (scale - 1) : 0;
    var originFromH2 = originFromSection - (h2Rect.top - sectionRect.top);

    h2.style.transformOrigin = "left " + originFromH2 + "px";
    h2.style.transform = "scaleY(" + scale + ")";
  }

  function scaleAboutText() {
    var p = document.getElementById("aboutCopy");
    if (!p) return;

    p.style.fontSize = "";

    if (!landscapeQuery.matches) return;

    // clientHeight is fixed by flex stretch; scrollHeight grows with font size.
    var availH = p.clientHeight;
    if (!availH) return;

    var lo = 4, hi = 400;
    for (var i = 0; i < 24; i++) {
      var mid = (lo + hi) / 2;
      p.style.fontSize = mid + "px";
      if (p.scrollHeight <= availH) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    p.style.fontSize = lo + "px";
  }

  function scaleAbout() {
    scaleAboutHeading();
    scaleAboutText();
  }

  window.addEventListener("resize", function () {
    clearTimeout(aboutScaleTimer);
    aboutScaleTimer = setTimeout(scaleAbout, 50);
  });

  if (landscapeQuery.addEventListener) {
    landscapeQuery.addEventListener("change", scaleAbout);
  }

  scaleAbout();
})();
