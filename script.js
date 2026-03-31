/**
 * Site behavior only — styling is in styles.css.
 * - Nav + mobile panel
 * - Portfolio tracks + lightbox (modal markup is in index.html)
 * - Reduced motion: swaps GIFs for still images when user prefers reduced motion
 *
 * Editable copy and image lists live in site-content.js (name, hero paragraph,
 * contact labels/URLs, about, footer, art + advertising portfolios).
 */
(function () {
  /**
   * Random emoji / color subsection links under Contact, About, and Portfolio.
   * Set to true to restore them (drops the `no-section-dropdowns` simple-nav behavior).
   */
  const ENABLE_SECTION_DROPDOWNS = false;

  const defaultContent = {
    profile: {
      firstName: "Aidan",
      lastName: "McCauley",
      instagramLabel: "Instagram",
      emailLabel: "Email",
      instagramHandle: "@aidan_mccauley",
      instagramUrl: "https://instagram.com/aidan_mccauley",
      email: "aidan@example.com"
    },
    heroIntroText:
      "I'm an advertising creative and artist who believes in getting hands-on with the work. This site is coded from scratch, not using a template, and is an ultralight space that reflects how I think and make. My approach to both art and advertising is the same: cut through the clutter, resist oversaturation, and create work that feels intentional. This design draws from early internet nostalgia paired with modern clarity.",
    aboutText:
      "Edit the long About paragraph in site-content.js (look for aboutText). Save the file and refresh the page.",
    footerNote: "© 2026 Aidan McCauley. Thanks for dropping by."
  };

  const defaultArtPortfolioItems = [
    { src: "assets/Animation1.gif", caption: "Animation 1", alt: "Animated artwork 1" },
    { src: "assets/Animation2.gif", caption: "Animation 2", alt: "Animated artwork 2" }
  ];

  const defaultAdvertisingPortfolioItems = [
    { src: "assets/advertising/mcCauley_1Password_001.png", caption: "Advertising 001", alt: "Advertising work sample 001" },
    { src: "assets/advertising/mcCauley_1Password_002.png", caption: "Advertising 002", alt: "Advertising work sample 002" },
    { src: "assets/advertising/mcCauley_1Password_003.png", caption: "Advertising 003", alt: "Advertising work sample 003" },
    { src: "assets/advertising/mcCauley_1Password_004.png", caption: "Advertising 004", alt: "Advertising work sample 004" }
  ];

  const content = window.SITE_CONTENT || {};
  const profile = Object.assign({}, defaultContent.profile, content.profile || {});

  const heroFromFile =
    typeof content.heroIntroText === "string" ? content.heroIntroText.trim() : "";
  const headerTextAlias =
    typeof content.headerText === "string" ? content.headerText.trim() : "";
  const heroIntroText = heroFromFile || headerTextAlias || defaultContent.heroIntroText;

  const aboutCopyEl = document.getElementById("aboutCopy");
  const aboutFromDom = aboutCopyEl ? aboutCopyEl.textContent.trim() : "";
  const aboutFromFile =
    typeof content.aboutText === "string" ? content.aboutText.trim() : "";
  const aboutText = aboutFromFile || aboutFromDom || defaultContent.aboutText;
  const footerNote = typeof content.footerNote === "string" && content.footerNote.trim()
    ? content.footerNote
    : defaultContent.footerNote;

  const artPortfolioItems = Array.isArray(content.artPortfolioItems) && content.artPortfolioItems.length
    ? content.artPortfolioItems
    : Array.isArray(content.portfolioItems) && content.portfolioItems.length
      ? content.portfolioItems
      : defaultArtPortfolioItems;

  const advertisingPortfolioItems = Array.isArray(content.advertisingPortfolioItems) && content.advertisingPortfolioItems.length
    ? content.advertisingPortfolioItems
    : defaultAdvertisingPortfolioItems;

  const portfolioCarouselItems = artPortfolioItems.concat(advertisingPortfolioItems);

  const sectionTargets = {
    contact: "#contact",
    about: "#about",
    portfolio: "#portfolio"
  };

  const emojiPool = [
    "🎨", "🧠", "✨", "🌀", "🌈", "🚀", "🦈", "🍄", "💥", "🫧",
    "🌊", "🎬", "🎞️", "💌", "🎯", "🪩", "🤝", "🌞", "🧩", "🛸"
  ];

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

  const randInt = (max) => Math.floor(Math.random() * max);
  const randomSolidColor = () => "hsl(" + randInt(360) + " 95% 78%)";
  const randomEmojiString = () => Array.from({ length: 5 }, () => emojiPool[randInt(emojiPool.length)]).join("");

  function applyEditableContent() {
    const fullName = (profile.firstName + " " + profile.lastName).trim();
    document.getElementById("firstName").textContent = profile.firstName;
    document.getElementById("lastName").textContent = profile.lastName;
    document.getElementById("heroIntro").textContent = heroIntroText;
    document.getElementById("aboutCopy").textContent = aboutText;
    document.getElementById("footerNote").textContent = footerNote;

    const instagramLink = document.getElementById("instagramLink");
    instagramLink.href = profile.instagramUrl;
    instagramLink.setAttribute("aria-label", "Visit " + fullName + " Instagram");
    document.getElementById("instagramLabel").textContent = profile.instagramLabel;
    document.getElementById("instagramHandle").textContent = profile.instagramHandle;

    const emailLink = document.getElementById("emailLink");
    emailLink.href = "mailto:" + profile.email;
    emailLink.setAttribute("aria-label", "Email " + fullName);
    document.getElementById("emailLabel").textContent = profile.emailLabel;
    document.getElementById("emailAddress").textContent = profile.email;

    document.title = fullName;
    const desc = "Portfolio, contact details, and creative work by " + fullName + ".";
    document.querySelector("meta[name='description']").setAttribute("content", fullName + " - portfolio, contact, and about.");
    document.querySelector("meta[property='og:title']").setAttribute("content", fullName);
    document.querySelector("meta[property='og:description']").setAttribute("content", desc);
    document.querySelector("meta[property='og:image:alt']").setAttribute("content", fullName + " logo");
    document.querySelector("meta[name='twitter:title']").setAttribute("content", fullName);
    document.querySelector("meta[name='twitter:description']").setAttribute("content", desc);
  }

  function getScrollBehavior() {
    return prefersReducedMotion ? "auto" : "smooth";
  }

  function forceScrollTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  function applyMotionPreferences() {
    document.querySelectorAll("img[data-gif]").forEach(function (img) {
      const gifSrc = img.getAttribute("data-gif");
      const stillSrc = img.getAttribute("data-still");
      img.src = prefersReducedMotion && stillSrc ? stillSrc : gifSrc;
    });
  }

  function createDropdownLinks(sectionName, targetHash) {
    return Array.from({ length: 3 }, function (_, i) {
      const li = document.createElement("li");
      li.style.background = randomSolidColor();
      const a = document.createElement("a");
      a.href = targetHash;
      a.textContent = randomEmojiString();
      a.setAttribute("aria-label", "Go to " + sectionName + " section, option " + (i + 1));
      li.appendChild(a);
      return li;
    });
  }

  function refreshDropdownContent() {
    document.querySelectorAll(".dropdown li, .mobile-dropdown li").forEach(function (li) {
      li.style.background = randomSolidColor();
      const anchor = li.querySelector("a");
      if (anchor) {
        anchor.textContent = randomEmojiString();
      }
    });
  }

  function closeAllMenus(shouldRefresh) {
    document.querySelectorAll(".desktop-nav-item").forEach(function (it) {
      it.classList.remove("open");
      var deskBtn = it.querySelector(".menu-button");
      if (deskBtn && ENABLE_SECTION_DROPDOWNS) {
        deskBtn.setAttribute("aria-expanded", "false");
      }
    });
    if (ENABLE_SECTION_DROPDOWNS) {
      document.querySelectorAll(".mobile-section-button").forEach(function (button) {
        button.setAttribute("aria-expanded", "false");
      });
    }
    document.querySelectorAll(".mobile-right-list").forEach(function (group) {
      group.classList.remove("open");
    });
    mobilePanel.classList.remove("open");
    logoToggle.setAttribute("aria-expanded", "false");
    if (shouldRefresh && ENABLE_SECTION_DROPDOWNS) {
      refreshDropdownContent();
    }
  }

  function scrollToSection(targetSection) {
    const viewportHeight = window.innerHeight;
    const navHeight = nav.getBoundingClientRect().height;
    const sectionRect = targetSection.getBoundingClientRect();
    const sectionHeight = sectionRect.height;
    const sectionTopDocument = window.scrollY + sectionRect.top;
    let destination;

    if (sectionHeight < viewportHeight * 0.9) {
      const visibleHeight = viewportHeight - navHeight;
      const desiredTop = navHeight + Math.max((visibleHeight - sectionHeight) / 2, 0);
      destination = sectionTopDocument - desiredTop;
    } else {
      destination = sectionTopDocument - navHeight;
    }

    window.scrollTo({
      top: Math.max(destination, 0),
      behavior: getScrollBehavior()
    });
  }

  function filenameFromSrc(src) {
    return (src || "").split("/").pop() || "portfolio item";
  }

  applyEditableContent();

  function goToSectionByName(sectionName) {
    const targetHash = sectionTargets[sectionName];
    const targetSection = targetHash ? document.querySelector(targetHash) : null;
    if (targetSection) {
      closeAllMenus(false);
      scrollToSection(targetSection);
    }
  }

  if (ENABLE_SECTION_DROPDOWNS) {
    Object.keys(sectionTargets).forEach(function (sectionName) {
      const target = sectionTargets[sectionName];
      const desktopList = document.getElementById("desk-" + sectionName);
      const mobileList = document.getElementById("mobile-" + sectionName);
      createDropdownLinks(sectionName, target).forEach(function (item) {
        desktopList.appendChild(item);
        mobileList.appendChild(item.cloneNode(true));
      });
    });

    document.querySelectorAll(".dropdown a, .mobile-dropdown a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        const targetHash = link.getAttribute("href");
        const targetSection = targetHash ? document.querySelector(targetHash) : null;
        if (!targetSection) return;
        event.preventDefault();
        closeAllMenus(true);
        scrollToSection(targetSection);
      });
    });
  }

  function appendToPortfolioTrack(trackEl, items, carouselIndexOffset) {
    if (!trackEl) return;
    items.forEach(function (item, i) {
      const src = item.src;
      const captionText = item.caption || filenameFromSrc(src);
      const altText = item.alt || ("Portfolio image: " + captionText);
      const carouselIndex = carouselIndexOffset + i;

      const figure = document.createElement("figure");
      const button = document.createElement("button");
      button.type = "button";
      button.style.border = "0";
      button.style.background = "transparent";
      button.style.padding = "0";
      button.style.cursor = "pointer";
      const img = document.createElement("img");
      img.src = src;
      img.alt = altText;
      const caption = document.createElement("figcaption");
      caption.textContent = captionText;
      button.setAttribute("aria-label", "Open " + captionText + " in image carousel");
      button.appendChild(img);
      button.addEventListener("click", function () {
        openCarousel(carouselIndex);
      });
      figure.appendChild(button);
      figure.appendChild(caption);
      trackEl.appendChild(figure);
    });
  }

  appendToPortfolioTrack(document.getElementById("portfolioTrackArt"), artPortfolioItems, 0);
  appendToPortfolioTrack(
    document.getElementById("portfolioTrackAdvertising"),
    advertisingPortfolioItems,
    artPortfolioItems.length
  );

  logoToggle.addEventListener("click", function () {
    const next = !mobilePanel.classList.contains("open");
    mobilePanel.classList.toggle("open", next);
    logoToggle.setAttribute("aria-expanded", String(next));
    if (ENABLE_SECTION_DROPDOWNS) {
      refreshDropdownContent();
    }
  });

  if (ENABLE_SECTION_DROPDOWNS) {
    document.querySelectorAll(".mobile-section-button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const sectionName = btn.getAttribute("data-section");
        const isActive = btn.getAttribute("aria-expanded") === "true";
        document.querySelectorAll(".mobile-section-button").forEach(function (each) {
          each.setAttribute("aria-expanded", "false");
        });
        document.querySelectorAll(".mobile-right-list").forEach(function (group) {
          group.classList.remove("open");
        });
        if (!isActive) {
          btn.setAttribute("aria-expanded", "true");
          const list = document.getElementById("mobile-group-" + sectionName);
          if (list) {
            list.classList.add("open");
          }
        }
        refreshDropdownContent();
      });
    });

    document.querySelectorAll(".desktop-nav-item .menu-button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const item = btn.closest(".desktop-nav-item");
        const next = !item.classList.contains("open");
        document.querySelectorAll(".desktop-nav-item").forEach(function (it) {
          it.classList.remove("open");
          it.querySelector(".menu-button").setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("open", next);
        btn.setAttribute("aria-expanded", String(next));
        refreshDropdownContent();
      });
    });
  } else {
    document.querySelectorAll(".mobile-section-button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const sectionName = btn.getAttribute("data-section");
        if (sectionName) {
          goToSectionByName(sectionName);
        }
      });
    });

    document.querySelectorAll(".desktop-nav-item .menu-button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const item = btn.closest(".desktop-nav-item");
        const sectionName = item && item.getAttribute("data-section");
        if (sectionName) {
          goToSectionByName(sectionName);
        }
      });
    });
  }

  document.addEventListener("click", function (event) {
    if (!event.target.closest("nav") && !event.target.closest("#mobilePanel")) {
      closeAllMenus(true);
    }
  });

  const backToTop = document.getElementById("backToTop");
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  });

  /* Lightbox: looks (overlay, buttons) are 100% CSS in styles.css — no random colors here */
  const carouselModal = document.getElementById("carouselModal");
  const carouselMedia = document.getElementById("carouselMedia");
  const carouselCaption = document.getElementById("carouselCaption");
  const carouselClose = document.getElementById("carouselClose");
  const carouselPrev = document.getElementById("carouselPrev");
  const carouselNext = document.getElementById("carouselNext");
  let activeIndex = 0;

  function renderCarousel() {
    const item = portfolioCarouselItems[activeIndex];
    const src = item.src;
    const captionText = item.caption || filenameFromSrc(src);
    const altText = item.alt || ("Portfolio image: " + captionText);
    carouselMedia.src = src;
    carouselMedia.alt = altText;
    carouselCaption.textContent =
      captionText + " (" + (activeIndex + 1) + "/" + portfolioCarouselItems.length + ")";
  }

  function openCarousel(index) {
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
    activeIndex =
      (activeIndex + step + portfolioCarouselItems.length) % portfolioCarouselItems.length;
    renderCarousel();
  }

  carouselClose.addEventListener("click", closeCarousel);
  carouselPrev.addEventListener("click", function () { shiftCarousel(-1); });
  carouselNext.addEventListener("click", function () { shiftCarousel(1); });
  carouselModal.addEventListener("click", function (event) {
    if (event.target === carouselModal) {
      closeCarousel();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (!carouselModal.classList.contains("open")) return;
    if (event.key === "Escape") closeCarousel();
    if (event.key === "ArrowLeft") shiftCarousel(-1);
    if (event.key === "ArrowRight") shiftCarousel(1);
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
