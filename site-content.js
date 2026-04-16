/**
 * ===========================================================================
 * YOUR EDITABLE SITE SETTINGS (JavaScript file — works like a config sheet)
 * ===========================================================================
 * How to use:
 * 1. Open this file in any text editor (TextEdit, Notepad, VS Code).
 * 2. Change the text inside the "quote marks" only — see sections below.
 * 3. Save the file. Refresh the website in your browser to see changes.
 *
 * Do NOT delete the commas between items. Do NOT remove the { } brackets.
 * If something breaks, you can copy this file from a backup or re-download.
 *
 * This is NOT strict JSON (JSON needs double quotes everywhere); it is a
 * JavaScript object, which is more forgiving.
 * ===========================================================================
 */

window.SITE_CONTENT = {
  /* ----- Big name at the top of the page (header, browser tab, search snippets) ----- */
  profile: {
    firstName: "Aidan",
    lastName: "McCauley",

    /* Words shown before the Instagram handle and email (usually "Instagram" and "Email") */
    instagramLabel: "Instagram",
    emailLabel: "Email",

    /* What visitors see after "Instagram:" — usually your @handle */
    instagramHandle: "@aidan_mccauley",

    /* Full web address when someone clicks Instagram — must start with https:// */
    instagramUrl: "https://instagram.com/aidan_mccauley",

    /* Email shown and used when someone clicks the email line */
    email: "aidan@example.com"
  },

  /*
   * Gray / green box under your name on the first screen.
   * One continuous piece of text inside quote marks. You can use apostrophes inside
   * the sentence (like "I'm") — that's fine.
   */
  heroIntroText:
    "",

  /*
   * About section — the long paragraph on the About page.
   * Paste your bio as one block of text.
   */
  aboutText:
    `I am someone who values intentionality. When it comes to my work, I feel inspired by valuing the process. I appreciate bridging the gap between digital design and the human hand. 

There is no better start to the day than waking up early, moving methodically, and then going on a run before the day fully starts. I can talk your ear off about being an adult fan of Lego, Impressionist art, the writings of C.S. Lewis and Tolkien, or album cover design. 

I see advertising as the intersection of both sides of my brain: Solving problems and enjoying the process paired with creativity and intentionality. 
`,


  /*
   * ART portfolio — horizontal row labeled "Art" on the site.
   * Each item is one picture. Add or remove whole { ... } blocks.
   *
   *   src     — path to your image file (usually starts with "assets/")
   *   caption — short title; shows under the thumbnail and in the pop-up carousel
   *   alt     — image description for accessibility / screen readers (be specific)
   */
  artPortfolioItems: [
    { src: "assets/art/am_001.jpg", caption: "Art 001", alt: "Art portfolio image 001 — describe the work here" },
    { src: "assets/art/am_002.jpg", caption: "Art 002", alt: "Art portfolio image 002 — describe the work here" },
    { src: "assets/art/am_003.jpg", caption: "Art 003", alt: "Art portfolio image 003 — describe the work here" },
    { src: "assets/art/am_004.jpg", caption: "Art 004", alt: "Art portfolio image 004 — describe the work here" },
    { src: "assets/art/am_005.jpg", caption: "Art 005", alt: "Art portfolio image 005 — describe the work here" },
    { src: "assets/art/am_006.jpg", caption: "Art 006", alt: "Art portfolio image 006 — describe the work here" },
    { src: "assets/art/am_009.jpg", caption: "Art 009", alt: "Art portfolio image 009 — describe the work here" },
    { src: "assets/art/am_010.jpg", caption: "Art 010", alt: "Art portfolio image 010 — describe the work here" },
    { src: "assets/art/am_011.jpg", caption: "Art 011", alt: "Art portfolio image 011 — describe the work here" },
    { src: "assets/art/am_012.jpg", caption: "Art 012", alt: "Art portfolio image 012 — describe the work here" }
  ],

  /*
   * ADVERTISING portfolio — grid on the main page with hover-reveal effect.
   * Each item is one card. Fields:
   *
   *   src     — the ad image (shown on hover, and in the full-screen lightbox)
   *   logo    — image shown by default before hover (e.g. brand logo or campaign cover)
   *             omit this field to show src directly with no hover swap
   *   caption — short title shown in the lightbox
   *   alt     — description of the ad for screen readers
   *
   * To add a new campaign, copy one { } block and update the paths.
   * To add more pieces from the same campaign, repeat with the same logo path.
   */
  advertisingPortfolioItems: [
    {
      src: "assets/advertising/mcCauley_1Password_002.png",
      logo: "assets/advertising/mcCauley_1Password_001.png",
      caption: "1Password — 01",
      alt: "Describe this campaign piece for screen readers"
    },
    {
      src: "assets/advertising/mcCauley_1Password_003.png",
      logo: "assets/BFOLogo2026.png",
      caption: "1Password — 02",
      alt: "Describe this campaign piece for screen readers"
    },
    {
      src: "assets/advertising/mcCauley_1Password_004.png",
      logo: "assets/SEVENELEVENLOGO.png",
      caption: "1Password — 03",
      alt: "Describe this campaign piece for screen readers"
    }
  ]
};
